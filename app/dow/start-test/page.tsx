"use client";
import { Question, QuestionItselfType } from "@/app/constants/questions";
import { fetchQuestionsBySubject } from "@/app/constants/getQuestions";
import React, { useEffect, useState } from "react";

let sub = ["Advanced Mathematics", "Basic Mathematics", "IQ", "English"];

const page = () => {
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0); // getting subject from "sub" Array
  let [marks, setMarks] = useState(0);

  // this type is shit man..!!!
  const [data, setData] = useState<{
    subject: string;
    questions: QuestionItselfType[];
  } | null>(null);
  const [index, setIndex] = useState(Math.floor(Math.random() * 100));

  // since we got the obj which has name of subject and array of questions object. so ===>
  const subjectName = data?.subject;
  const questionData = data?.questions[index];

  // ============ fetching logic ===========>
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchQuestionsBySubject(sub[selectedSubjectIndex])
      .then((data) => {
        setData(data);
      })
      .finally(() => setLoading(false));
  }, [selectedSubjectIndex]);

  // ============ when the selection changes ==========>
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNextBTN = () => {
    if (selectedOption === questionData?.correct) setMarks(marks++);
    setIndex(Math.floor(Math.random() * 100));
    console.log(marks);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/main-bg-dull.png')] bg-fixed bg-cover min-h-screen ">
      <h1 className="px-5 text-center text-amber-400 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-15">
        {subjectName}
      </h1>
      <div className="min-w-fit">
        <p className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-4">
          {questionData?.question}
        </p>
        <div>
          {questionData?.options.map((option, idx) => (
            <div
              key={idx}
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl flex items-center w-full gap-4 ps-3"
            >
              <input
                id={option}
                type="radio"
                value={option}
                checked={selectedOption === option}
                name="question"
                className="w-8 h-8 accent-amber-400"
                onChange={(e) => handleChange(e.target.value)}
              />
              <label htmlFor={option} className="w-full py-3 ms-2  text-white">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNextBTN}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none "
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950  rounded-md group-hover:bg-transparent ">
          Next Question
        </span>
      </button>
    </div>
  );
};

export default page;
