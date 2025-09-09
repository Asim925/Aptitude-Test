"use client";
import { Question, SectionsInfo } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";
import Result from "./Result";
import CountDownTimer from "./CountDownTimer";
import BookLoader from "./BookLoader";

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
    You are an exam paper generator.

TASK:
Generate a JSON array of exactly 10 Multiple Choice Questions (MCQs) strictly based on the *latest Pakistani Federal and Sindh Board textbooks* for the subject: "${section.name}".

HARD RULES (must be obeyed):
1. The subject must be exactly "${section.name}". Do not switch to any other subject.
2. Return ONLY valid JSON. No explanations, no notes, no markdown, no text before or after JSON.
3. Each object in the array must follow this schema exactly:
   {
     "question": "string",
     "options": ["string", "string", "string", "string"],
     "correct": "string"
   }
4. There must be exactly 10 objects in the array.
5. Each question must have 4 **unique** options.
6. The "correct" value must exactly match one of the options.
7. Use *only* board-style English wording (as in ECAT/MCAT papers).

SUBJECT-SPECIFIC RULES:
- For Mathematics, Physics, Chemistry, Biology:
  - Write equations exactly as in board textbooks.
  - IMPORTANT: All exponents and subscripts must be written using Unicode characters exactly as in board textbooks.
    - Correct: H₂O, CO₂, Na⁺, x²
    - Incorrect: H2O, CO2, Na+, x^2, CO_2, Never use ^, _, *, $, or LaTeX.

  - Do NOT use ^, _, *, $, or LaTeX/inline math formatting.
- For English:
  - Focus on comprehension, grammar usage, vocabulary, sentence correction, logical reasoning.
  - No poems, stories, or irrelevant literature.

DIFFICULTY DISTRIBUTION:
- 20% Hard
- 50% Medium
- 30% Easy

OUTPUT FORMAT (strictly this):
[
  {
    "question": "...?",
    "options": ["...", "...", "...", "..."],
    "correct": "..."
  },
  {
    "question": "...?",
    "options": ["...", "...", "...", "..."],
    "correct": "..."
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
  }, [sectionIDX, msg]);

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

  // GPT said, if we dont add the changing value in dependencies,
  //  it would behave badly. so a warning during build
  useEffect(() => {
    setReply(skipped);
    setQueIDX(1);
  }, [ApiCompleted]);

  const [testCompleted, setTestCompleted] = useState(false);

  // ======================= UI ========================= //

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
        <BookLoader />
      ) : reply.length > 0 ? (
        <div className="md:mx-20 lg:mx-40 mx-5 min-w-fit shadow-[0_2px_10px_rgba(217,119,6,0.45)] border rounded-2xl backdrop-blur-sm bg-orange-800/5 border-amber-600 md:p-10 p-6">
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
