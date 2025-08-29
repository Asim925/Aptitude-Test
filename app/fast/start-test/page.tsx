"use client";
import { fetchQuestionsBySubject } from "@/app/constants/getQuestions";
import { Question } from "@/app/constants/questions";
import React, { useEffect, useState } from "react";

let sub = ["Advanced Mathematics", "Basic Mathematics", "IQ", "English"];

const page = () => {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchQuestionsBySubject(sub[selectedSubject])
      .then((data) => {
        setQuestions(data);
      })
      .finally(() => setLoading(false));
  }, [selectedSubject]);

  console.log(questions, loading);
  return <>ehe</>;
};

export default page;
