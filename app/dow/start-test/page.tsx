"use client";
import { useState } from "react";
import Questions from "./test-components/Questions";

const Page = () => {
  const [marks, setMarks] = useState(0);

  return <Questions marks={marks} setMarks={setMarks} />;
};

export default Page;
