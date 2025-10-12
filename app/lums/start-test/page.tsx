"use client";
import { useState } from "react";
import Questions from "../../components/Questions";
import { lumsSectionsInfo } from "@/app/constants/constants";

const Page = () => {
  const [marks, setMarks] = useState<number>(0);

  return (
    <>
      <Questions
        sectionsInfo={lumsSectionsInfo}
        time={60 * 60 * 2} // 3 hours !!
        marks={marks}
        setMarks={setMarks}
      />
    </>
  );
};

export default Page;
