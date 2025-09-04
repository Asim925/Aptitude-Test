"use client";
import { dowSectionsInfo, Question } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";

interface Props {
  marks: number;
  setMarks: (marks: number) => void;
}

const Questions = ({ marks, setMarks }: Props) => {
  const [sectionIDX, setSectionIDX] = useState(0);
  const [section, setSection] = useState(dowSectionsInfo[sectionIDX]);
  const [reply, setReply] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  GROG AI !!! =========================================================================
  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log("Groq AI Raw Response:", data.reply);

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

      setReply(parsedReply || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("❌ Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const msg = `
      Generate a JSON array of ${section.questions} MCAT questions from the latest Federal and Sindh board books of ${section.name}.
      The JSON must follow this structure exactly: 
      [
        {
          "id": Number,
          "question": "string",
          "options": ["", "", "", ""],
          "correct": "string"
        },...
      ]

      Difficulty distribution:
      - 20% Hard
      - 50% Medium
      - 30% Easy

      Rules:
      - No explanations, no extra text, no markdown. Return ONLY valid JSON. 
      - Each question must have exactly 4 options.
      - The "correct" field must match one of the options.
      - IDs should start from 1 and increment.
    `;
    sendMessage(msg);
  }, [section]);

  //  GROG AI end !!! =========================================================================

  const [queIDX, setQueIDX] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const currentQuestion = reply[queIDX];
  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNextBTN = () => {
    if (selectedOption === currentQuestion?.correct) setMarks(marks + 1);
    setSelectedOption("");
    setQueIDX(queIDX + 1);

    if (queIDX == reply.length - 1) {
      setSectionIDX(sectionIDX + 1);
      setSection(dowSectionsInfo[sectionIDX]);
    }
  };

  return (
    <div className="flex flex-col gap-7 justify-center items-center bg-[url('/main-bg-dull.png')] bg-fixed bg-cover min-h-screen">
      <h1 className="max-sm:mb-10 mb-5 px-5 text-center text-amber-400 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold ">
        {section.name}
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-white text-xl">Loading questions...</p>
      ) : reply.length > 0 ? (
        <div className="min-w-fit px-8 sm:px-20">
          <p className="font-bold text-2xl sm:text-3xl lg:text-3xl xl:text-5xl mb-4">
            {currentQuestion?.question}
          </p>
          <div>
            {currentQuestion?.options.map((option, idx) => (
              <div
                key={idx}
                className="text-lg sm:text-xl lg:text-2xl xl:text-2xl flex items-center w-full gap-2 sm:gap-4 ps-3 -ml-3"
              >
                <input
                  id={option}
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  name="question"
                  className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 accent-amber-400"
                  onChange={(e) => handleChange(e.target.value)}
                />
                <label
                  htmlFor={option}
                  className="w-full py-3 ms-2 cursor-pointer text-white"
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

      <div className="flex sm:gap-5 max-sm:flex-col items-center">
        <button
          disabled={!selectedOption}
          onClick={handleNextBTN}
          className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden sm:text-lg text-sm font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
            {!selectedOption ? "Select an option first" : "Next Question"}
          </span>
        </button>
        <button className="cursor-pointer max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-lg font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
            Skip
          </span>
        </button>
      </div>
    </div>
  );
};

export default Questions;
