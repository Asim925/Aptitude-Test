"use client";
import { Question, SectionsInfo } from "@/app/constants/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Result from "./Result";
import CountDownTimer from "./CountDownTimer";
import BookLoader from "./BookLoader";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  sectionsInfo: SectionsInfo[];
  time: number;
  marks: number;
  setMarks: React.Dispatch<React.SetStateAction<number>>;
}

const Questions = ({ sectionsInfo, time, marks, setMarks }: Props) => {
  const [sectionIDX, setSectionIDX] = useState(0);
  const section = sectionsInfo[sectionIDX];
  const [reply, setReply] = useState<Question[]>([]);
  const [batch, setBatch] = useState(1);
  const [queIDX, setQueIDX] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ApiCompleted, setApiCompleted] = useState(false);

  const requestIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const msg = useMemo(() => {
    return `You are an ECAT/MCAT level exam generator.

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
  - Use correct subscripts/superscripts (H₂O, x², CO₂, Na⁺).
  - Do NOT use ^, _, *, $, or LaTeX/inline math formatting.
  IMPORTANT: All exponents and subscripts must be written using Unicode characters exactly as in board textbooks.
- Correct: H₂O, CO₂, Na⁺, x²
- Incorrect: H2O, CO2, Na+, x^2, CO_2
Never use ^, _, *, $, or LaTeX.

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
  }, [section.name]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError("");
    const thisRequestId = ++requestIdRef.current;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (thisRequestId !== requestIdRef.current || !mountedRef.current) return;

      let parsedReply: Question[] = [];

      if (Array.isArray(data.reply)) {
        parsedReply = data.reply;
      } else if (typeof data.reply === "string") {
        try {
          parsedReply = JSON.parse(data.reply);
        } catch (err) {
          console.error("❌ JSON parse error:", err);
          setError("❌ Sometimes AI responses unusually, please try again");
          setReply([]);
          setLoading(false);
          return;
        }
      } else {
        setError("❌ Unexpected AI reply");
        setReply([]);
        setLoading(false);
        return;
      }

      if (!Array.isArray(parsedReply) || parsedReply.length === 0) {
        setError("❌ No questions returned");
        setReply([]);
        setLoading(false);
        return;
      }

      setReply(parsedReply);
      setQueIDX(0);
    } catch (err) {
      console.error("Fetch error:", err);
      setReply([]);
      setError("❌ Failed to get AI response");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    if (!ApiCompleted) sendMessage(msg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIDX, batch]);

  const currentQuestion = reply[queIDX];
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const totalBeforeSection = sectionsInfo
    .slice(0, sectionIDX)
    .reduce((sum, s) => sum + s.questions, 0);

  const handleNextBTN = () => {
    if (!currentQuestion) return;

    if (selectedOption === currentQuestion.correct) {
      setMarks((prev) => prev + 1);
    }

    setSelectedOption("");
    const nextIndex = queIDX + 1;

    if (nextIndex < reply.length) {
      setQueIDX(nextIndex);
      return;
    }

    const questionsAlreadyServedInSection = (batch - 1) * 10 + reply.length;
    const sectionTotal = section.questions;

    if (questionsAlreadyServedInSection >= sectionTotal) {
      if (sectionIDX < sectionsInfo.length - 1) {
        setSectionIDX((prev) => prev + 1);
        setBatch(1);
        setReply([]);
        setQueIDX(0);
      } else {
        if (skippedRef.current.length > 0) {
          setReply(skippedRef.current.slice());
          setQueIDX(0);
          setApiCompleted(true);
          skippedRef.current = [];
          setSkipped([]);
        } else {
          setApiCompleted(true);
          setTestCompleted(true);
        }
      }
    } else {
      setBatch((prev) => prev + 1);
    }
  };

  const [skipped, setSkipped] = useState<Question[]>([]);
  const skippedRef = useRef<Question[]>([]);
  useEffect(() => {
    skippedRef.current = skipped;
  }, [skipped]);

  const [testCompleted, setTestCompleted] = useState(false);

  const handleSkipBTN = () => {
    if (!currentQuestion) return;
    skippedRef.current = [...skippedRef.current, currentQuestion];
    setSkipped(skippedRef.current.slice());
    setSelectedOption("");

    const nextIndex = queIDX + 1;
    if (nextIndex < reply.length) {
      setQueIDX(nextIndex);
      return;
    }

    const questionsAlreadyServedInSection = (batch - 1) * 10 + reply.length;
    const sectionTotal = section.questions;

    if (questionsAlreadyServedInSection >= sectionTotal) {
      if (sectionIDX < sectionsInfo.length - 1) {
        setSectionIDX((prev) => prev + 1);
        setBatch(1);
        setReply([]);
        setQueIDX(0);
      } else {
        if (skippedRef.current.length > 0) {
          setReply(skippedRef.current.slice());
          setQueIDX(0);
          setApiCompleted(true);
          skippedRef.current = [];
          setSkipped([]);
        } else {
          setApiCompleted(true);
          setTestCompleted(true);
        }
      }
    } else {
      setBatch((prev) => prev + 1);
    }
  };

  const handleReload = () => {
    setError("");
    setSelectedOption("");
    sendMessage(msg);
  };

  if (testCompleted)
    return (
      <Result
        marks={marks}
        outOf={sectionsInfo.reduce(
          (sum, section) => sum + section.questions,
          0
        )}
      />
    );

  const displayedNumber = !ApiCompleted
    ? totalBeforeSection + (batch - 1) * 10 + queIDX + 1
    : queIDX + 1;

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
        <AnimatePresence mode="wait">
          <motion.div
            key={displayedNumber}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:mx-20 lg:mx-40 mx-5 min-w-fit shadow-[0_2px_10px_rgba(217,119,6,0.45)] border rounded-2xl backdrop-blur-sm bg-orange-800/5 border-amber-600 md:p-10 p-6"
          >
            <p className="mb-4 text-md sm:text-lg md:text-xl lg:text-2xl ">
              {`${displayedNumber}. ${currentQuestion?.question}`}
            </p>
            <div>
              {currentQuestion?.options.map((option, idx) => {
                const radioId = `q-${sectionIDX}-b-${batch}-i-${queIDX}-opt-${idx}`;
                return (
                  <div
                    key={idx}
                    className="text-md sm:text-lg flex items-center w-full gap-1 ps-3 -ml-3"
                  >
                    <input
                      id={radioId}
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      name={`question-${displayedNumber}`}
                      className="w-4 h-4 cursor-pointer sm:w-5 sm:h-5 md:w-6 md:h-6 accent-orange-400"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <label
                      htmlFor={radioId}
                      className="w-full py-2 ms-2 cursor-pointer text-white"
                    >
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className="text-white text-xl">No questions available</p>
      )}

      {!loading && !error ? (
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

          <button
            onClick={() => setTestCompleted(true)}
            className="cursor-pointer max-sm:mt-5 max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-lg font-medium rounded-lg group bg-gradient-to-br from-red-700 to-red-800 group-hover:from-red-700 group-hover:to-red-800 text-white focus:outline-none"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-red-950 rounded-md group-hover:bg-transparent">
              Abort Test
            </span>
          </button>
        </div>
      ) : null}

      {error && (
        <button
          onClick={handleReload}
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
