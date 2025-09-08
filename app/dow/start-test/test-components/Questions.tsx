"use client";
import { dowSectionsInfo, Question } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";

interface Props {
  marks: number;
  setMarks: React.Dispatch<React.SetStateAction<number>>;
}

const Questions = ({ marks, setMarks }: Props) => {
  const [sectionIDX, setSectionIDX] = useState(0);
  const section = dowSectionsInfo[sectionIDX]; // ✅ derived, no extra useState

  const [reply, setReply] = useState<Question[]>([]);
  const [batch, setBatch] = useState(1);
  const [queIDX, setQueIDX] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  // =============== Prompt ===============
  const msg = `
      Generate a "JSON array" of 10 MCAT questions from the of latest books of Federal and Sindh board of strict this subject: "${section.name}".
      Do not use inline math formatting or LaTeX equations. Write every math, physics, and chemistry question exactly in the style of a textbook, using normal text sentences. For example, instead of writing x = 2, 
      write 'If the value of x is 2'. Avoid symbols like ^, _, *, or $. Write questions in clean English sentences, just like they appear in board exam books
      questions should not deviate from the subject. If the subject is English, then you have to give "comprehension, vocabulary, and logical English usage, grammatical devices".
      Questions should be at the level of **Pakistani University admission tests (ECAT, MDCAT, NTS, etc.)

      Difficulty distribution:
      - 20% Hard
      - 50% Medium
      - 30% Easy

      Rules: 
      - "No explanations", "no extra text", no markdown". "Return ONLY valid JSON". (VERY IMPORTANT !!!)
      - Each question must have exactly 4 options.
      - The "correct" field must match one of the options.
      Format must be "**strict JSON array**" like this:
      [
        {
          "question": "....?",
          "options": ["..", "...", "....", "..."],
          "correct": "..."
        },
        {
          "question": "",
          "options": ["", "", "", ""],
          "correct": ""
        }
      ]
     Ensure:
        - Each question has **1 correct answer only**.
        - options must always contain **exactly 4 unique choices**.
        - Correct option must be included inside the options.
        - Do not include explanations, only JSON.
      Return only the JSON array, nothing else.
    `;

  // =============== API Call ===============
  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      let parsedReply: Question[] = [];
      if (typeof data.reply === "string") {
        const start = data.reply.indexOf("[");
        const end = data.reply.lastIndexOf("]");
        if (start !== -1 && end !== -1) {
          try {
            const jsonString = data.reply.slice(start, end + 1);
            parsedReply = JSON.parse(jsonString);
          } catch (err) {
            console.error("JSON parse error:", err);
            setError("❌ Invalid JSON from AI");
          }
        }
      } else if (Array.isArray(data.reply)) {
        parsedReply = data.reply;
      }

      setReply(parsedReply); // ✅ fresh batch each time
      setQueIDX(0);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("❌ Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  // Load first section
  useEffect(() => {
    sendMessage(msg);
  }, [sectionIDX]);

  const currentQuestion = reply[queIDX];
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  // =============== Next Button ===============
  const nextIndex = queIDX + 1;

  const handleNextBTN = () => {
    if (selectedOption === currentQuestion?.correct) {
      setMarks((prev) => prev + 1);
    }

    setSelectedOption("");

    setQueIDX(nextIndex);

    // If we've reached end of current batch
    if (nextIndex === reply.length) {
      if (batch * 10 >= section.questions) {
        if (sectionIDX < dowSectionsInfo.length - 1) {
          setSectionIDX((prev) => prev + 1); // ✅ next section
          setBatch(1);
        } else {
          setCompleted(true); // ✅ no more sections
        }
      } else {
        setBatch((prev) => prev + 1);
        sendMessage(msg); // ✅ fetch next batch of same section
      }
    }
  };

  const [skipped, setSkipped] = useState<Question[]>([]);

  const handleSkipBTN = () => {
    setSkipped([...skipped, currentQuestion]);
    setQueIDX(nextIndex);
  };

  // =============== UI ===============
  if (completed) {
    setReply(skipped);
    setQueIDX(1);
  }

  return (
    <div className="flex flex-col gap-7 justify-center items-center bg-[url('/main-bg-dull.png')] bg-fixed bg-cover min-h-screen">
      <h1 className="mb-5 px-5 text-center text-amber-400 text-5xl lg:text-6xl xl:text-7xl font-extrabold ">
        {section.name}
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-white text-xl">Loading questions...</p>
      ) : reply.length > 0 ? (
        <div className="md:mx-20 lg:mx-40 mx-5 min-w-fit  border rounded-2xl backdrop-blur-sm bg-orange-800/5 border-amber-600 md:p-10 p-6">
          <p className="mb-4 text-md sm:text-lg md:text-xl lg:text-2xl ">
            {!completed
              ? `${queIDX + 1 + batch * 10 - 10}. ${currentQuestion?.question}`
              : `${queIDX}. ${currentQuestion?.question}`}
          </p>
          <div>
            {currentQuestion?.options.map((option, idx) => (
              <div
                key={idx}
                className="text-md sm:text-lg flex items-center w-full gap-1 ps-3 -ml-3"
              >
                <input
                  id={option}
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  name="question"
                  className="w-4 h-4 cursor-pointer sm:w-5 sm:h-5 md:w-6 md:h-6 accent-orange-400"
                  onChange={(e) => handleChange(e.target.value)}
                />
                <label
                  htmlFor={option}
                  className="w-full py-2 ms-2 cursor-pointer text-white"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-white text-xl">No questions available</p>
      )}

      {!error && (
        <div className="flex gap-2 sm:gap-5 max-sm:flex-col items-center">
          <button
            disabled={!selectedOption}
            onClick={handleNextBTN}
            className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden sm:text-lg text-sm font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
              {!selectedOption ? "Select an option first" : "Next Question"}
            </span>
          </button>
          <button
            disabled={completed && skipped.length > 0}
            onClick={handleSkipBTN}
            className="cursor-pointer max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-lg font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
              Skip
            </span>
          </button>
        </div>
      )}
      {error && (
        <button
          onClick={() => {
            sendMessage(msg);
            setError("");
          }}
          className="cursor-pointer max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-lg font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
            Reload Questions
          </span>
        </button>
      )}
    </div>
  );
};

export default Questions;
