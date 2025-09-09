"use client";
import { Question, SectionsInfo } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";
import Result from "./Result";
import Spinner from "./Spinner";
import CountDownTimer from "./CountDownTimer";

interface Props {
  sectionsInfo: SectionsInfo[];
  time: number;
  marks: number;
  setMarks: React.Dispatch<React.SetStateAction<number>>;
}

const Questions = ({ sectionsInfo, time, marks, setMarks }: Props) => {
  const [sectionIDX, setSectionIDX] = useState(0);
  // derived, no extra useState (had no idea about this)
  const section = sectionsInfo[sectionIDX];

  const [reply, setReply] = useState<Question[]>([]);
  const [batch, setBatch] = useState(1);
  const [queIDX, setQueIDX] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ApiCompleted, setApiCompleted] = useState(false);

  // =============== Prompt ===============
  const msg = `
      Generate a "JSON array" of exactly 10 Multiple Choice Questions (MCQs) strictly based on the **latest textbooks of Federal and Sindh boards** for the given subject: "${section.name}" always. Questions should not deviate from the subject. 

        Guidelines:
        - Questions must match the **style and wording of Pakistani ECAT and MCAT admission tests**, using only material from Federal and Sindh board textbooks.
        - For Science subjects (Mathematics, Physics, Chemistry, Biology):
          - Write equations and values exactly as they appear in board textbooks.
          - Use proper **subscripts** and **superscripts** (e.g., H₂O, x², CO₂, Na⁺).
          - Strictly AVOID non-textbook symbols like "^", "_", "*", "$", or LaTeX/inline math formatting.
          - Questions must sound like they were copied directly from a board exam book, written in **clear textbook English sentences**.
        - For English:
          - Focus on **comprehension passages, vocabulary, grammar usage, sentence correction, and logical reasoning**.
          - Do NOT include poems, stories, or irrelevant textbook literature.
        - Difficulty levels must follow this distribution:
          - 20% Hard
          - 50% Medium
          - 30% Easy

        Rules:
        - ❌ No explanations, ❌ no notes, ❌ no markdown, ❌ no introductions (e.g., "Here are 10 questions").
        - ✅ Return ONLY valid JSON (this is **very important**).
        - Each question must have exactly 4 options, with only 1 correct option.
        - All 4 options must be unique.
        - The "correct" field must exactly match one of the options.

        Output format (STRICTLY follow this structure):
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
            setError("❌ Please reload the Questions");
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

    // If end of current batch
    if (nextIndex === reply.length) {
      if (batch * 10 >= section.questions) {
        if (sectionIDX < sectionsInfo.length - 1) {
          setSectionIDX((prev) => prev + 1); // next section
          setBatch(1);
        } else {
          setApiCompleted(true); // no more sections
        }
      } else {
        setBatch((prev) => prev + 1);
        sendMessage(msg); // ✅ fetch next batch of same section
      }
    }
  };

  const [skipped, setSkipped] = useState<Question[]>([]);

  // ============ skip button ========== //
  const handleSkipBTN = () => {
    setSkipped([...skipped, currentQuestion]); // if skipped, then add to skipped array
    const nextIndex = queIDX + 1;

    if (nextIndex == skipped.length) {
      setTestCompleted(true); // test is Completed :)
    }

    if (nextIndex === reply.length) {
      if (batch * 10 >= section.questions) {
        // section changing
        if (sectionIDX < sectionsInfo.length - 1) {
          setSectionIDX((prev) => prev + 1);
          setBatch(1);
          setQueIDX(0);
        } else {
          setApiCompleted(true); // if, last section completed.
        }
      } else {
        setBatch((prev) => prev + 1); // new fetch for same section
        sendMessage(msg);
      }
    } else {
      setQueIDX(nextIndex); // if question wasnt last of the batch
    }
  };

  // =============== UI ===============
  useEffect(() => {
    setReply(skipped);
    setQueIDX(1);
  }, [ApiCompleted]);

  const [testCompleted, setTestCompleted] = useState(false);

  if (testCompleted) return <Result marks={marks} outOf={180} />;

  return (
    <div className="flex flex-col gap-7 justify-center items-center bg-[url('/main-bg-dull.jpg')] bg-fixed bg-cover min-h-screen">
      <CountDownTimer
        time={time}
        onComplete={() => {
          setTestCompleted(true);
        }}
      />

      <h1 className="mb-5 px-5 text-center text-amber-400 text-5xl lg:text-6xl xl:text-7xl font-extrabold ">
        {!ApiCompleted ? `${section.name}` : "Skipped Questions"}
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <Spinner />
      ) : reply.length > 0 ? (
        <div className="md:mx-20 lg:mx-40 mx-5 min-w-fit  border rounded-2xl backdrop-blur-sm bg-orange-800/5 border-amber-600 md:p-10 p-6">
          <p className="mb-4 text-md sm:text-lg md:text-xl lg:text-2xl ">
            {!ApiCompleted
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
        <div className="flex mt-3 gap-2 sm:gap-5 max-sm:flex-col items-center">
          <button
            disabled={!selectedOption}
            onClick={handleNextBTN}
            className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden sm:text-lg text-sm font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
              {!selectedOption ? "Select an option first" : "Next Question"}
            </span>
          </button>
          {!ApiCompleted && (
            <button
              onClick={handleSkipBTN}
              className="cursor-pointer max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-lg font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
                Skip
              </span>
            </button>
          )}
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
