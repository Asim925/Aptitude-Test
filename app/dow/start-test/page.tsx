"use client";
import { Question, QuestionItselfType } from "@/app/constants/questions";
import { fetchQuestionsBySubject } from "@/app/constants/getQuestions";
import React, { useEffect, useState } from "react";

let sub = ["Advanced Mathematics", "Basic Mathematics", "IQ", "English"];

const page = () => {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [data, setData] = useState<{
    subject: string;
    questions: QuestionItselfType[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchQuestionsBySubject(sub[selectedSubject])
      .then((data) => {
        setData(data);
      })
      .finally(() => setLoading(false));
  }, [selectedSubject]);

  if (loading) return <p>loading...</p>;

  const subjectName = data?.subject;
  const questionData = data?.questions[0];

  return (
    <div>
      <h1>{subjectName}</h1>
      <p>{questionData?.question}</p>
    </div>
  );
};

export default page;
