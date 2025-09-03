"use client";

import { useState } from "react";
import Questions from "./test-components/Questions";

const page = () => {
  let [marks, setMarks] = useState(0);
  return <Questions marks={marks} setMarks={setMarks} />;
};

export default page;
