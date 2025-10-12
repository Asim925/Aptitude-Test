"use client";
import { useState } from "react";
import Questions from "../../components/Questions";
import { kuSectionsInfo } from "@/app/constants/constants";

const Page = () => {
  const [marks, setMarks] = useState<number>(0);

  return (
    <>
      <Questions
        sectionsInfo={kuSectionsInfo}
        time={60 * 60 * 1.5} // 1.5 hours !!
        marks={marks}
        setMarks={setMarks}
      />
    </>
  );
};

export default Page;
