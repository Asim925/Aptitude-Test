"use client";
import { Question, SectionsInfo } from "@/app/constants/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

  // request id to ignore stale responses
  const requestIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // =============== Prompt ===============
  const msg = useMemo(() => {
    return `Make exactly 10 MCQs for "${section.name}" in ECAT/MCAT style from Federal & Sindh board textbooks.

Output ONLY this JSON array, nothing else:

[
  {
    "question": "…?",
    "options": ["opt1", "opt2", "opt3", "opt4"],
    "correct": "one of the options"
  }
]

Rules:
- Output must start with [ and end with ].
- No text before or after JSON.
- 4 options must be separate strings.
- "correct" must exactly match one option.
Write equations exactly like in board textbooks.
- Use superscripts and subscripts where needed (x², H₂O).
- Do not use ^ or unusual symbols.
- No LaTeX, no Unicode arrows.
`;
  }, [section.name]);

  // =============== API Call ===============
 
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
          setError("❌ Invalid JSON received");
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

  // When sectionIDX or batch changes we load questions (unless ApiCompleted)
  useEffect(() => {
    if (!ApiCompleted) {
      // clamp: if last batch, we still ask for 10 but UI logic will handle counts
      sendMessage(msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIDX, batch]);

  const currentQuestion = reply[queIDX];
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  // Helper: total questions before this section (for numbering)
  const totalBeforeSection = sectionsInfo
    .slice(0, sectionIDX)
    .reduce((sum, s) => sum + s.questions, 0);

  // =============== Next Button ===============
  const handleNextBTN = () => {
    // Protect against no question
    if (!currentQuestion) return;

    if (selectedOption === currentQuestion.correct) {
      setMarks((prev) => prev + 1);
    }

    setSelectedOption("");

    const nextIndex = queIDX + 1;

    // If not end of current reply batch, just move to next
    if (nextIndex < reply.length) {
      setQueIDX(nextIndex);
      return;
    }

    // end of current batch
    const questionsAlreadyServedInSection = (batch - 1) * 10 + reply.length;
    const sectionTotal = section.questions;

    // if we've served all required questions for this section
    if (questionsAlreadyServedInSection >= sectionTotal) {
      // move to next section or finish
      if (sectionIDX < sectionsInfo.length - 1) {
        setSectionIDX((prev) => prev + 1);
        setBatch(1);
        setReply([]); // clear until next fetch lands
        setQueIDX(0);
      } else {
        // last section finished => if skipped exist show skipped set, otherwise mark ApiCompleted
        if (skippedRef.current.length > 0) {
          // show skipped questions
          setReply(skippedRef.current.slice()); // copy
          setQueIDX(0);
          setApiCompleted(true);
          // clear skippedRef so we don't loop
          skippedRef.current = [];
          setSkipped([]); // clear state too
        } else {
          setApiCompleted(true);
          setTestCompleted(true);
        }
      }
    } else {
      // need next batch for same section
      setBatch((prev) => prev + 1);
      // sendMessage will be triggered by effect; keep reply until new arrives
    }
  };

  // skipped is stored in both state (for re-render) and a ref for correct immediate checks
  const [skipped, setSkipped] = useState<Question[]>([]);
  const skippedRef = useRef<Question[]>([]);
  // keep ref & state in sync when state changes
  useEffect(() => {
    skippedRef.current = skipped;
  }, [skipped]);

  // ============ skip button ========== //
  const [testCompleted, setTestCompleted] = useState(false);

  const handleSkipBTN = () => {
    if (!currentQuestion) return;

    // push to skipped (both ref and state)
    skippedRef.current = [...skippedRef.current, currentQuestion];
    setSkipped(skippedRef.current.slice());

    setSelectedOption("");

    const nextIndex = queIDX + 1;

    if (nextIndex < reply.length) {
      setQueIDX(nextIndex);
      return;
    }

    // end of batch
    const questionsAlreadyServedInSection = (batch - 1) * 10 + reply.length;
    const sectionTotal = section.questions;

    if (questionsAlreadyServedInSection >= sectionTotal) {
      // section done, move to next section or show skipped
      if (sectionIDX < sectionsInfo.length - 1) {
        setSectionIDX((prev) => prev + 1);
        setBatch(1);
        setReply([]);
        setQueIDX(0);
      } else {
        // last section finished
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
      // fetch next batch for same section
      setBatch((prev) => prev + 1);
    }
  };

  // If user clicks Reload Questions after error or wants to re-run the same batch
  const handleReload = () => {
    setError("");
    // reset selection & re-request same section & batch
    setSelectedOption("");
    sendMessage(msg);
  };

  // ======================= UI ========================= //

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

  // compute displayed question number (global)
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
        <div className="md:mx-20 lg:mx-40 mx-5 min-w-fit shadow-[0_2px_10px_rgba(217,119,6,0.45)] border rounded-2xl backdrop-blur-sm bg-orange-800/5 border-amber-600 md:p-10 p-6">
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
        </div>
      ) : (
        <p className="text-white text-xl">No questions available</p>
      )}

      <div className="flex mt-3 gap-2 sm:gap-5 max-sm:flex-col items-center">
        {!error && (
          <button
            disabled={!selectedOption}
            onClick={handleNextBTN}
            className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden sm:text-lg text-sm font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
              {!selectedOption ? "Select an option first" : "Next Question"}
            </span>
          </button>
        )}
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

      {error && (
        <button
          onClick={() => {
            handleReload();
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
