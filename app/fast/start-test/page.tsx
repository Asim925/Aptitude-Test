"use client";
import { useState } from "react";
import Questions from "../../components/Questions";
import { fastSectionsInfo } from "@/app/constants/constants";

const Page = () => {
  const [marks, setMarks] = useState<number>(0);

  return (
    <>
      <Questions
        sectionsInfo={fastSectionsInfo}
        time={60 * 60 * 2} // 2 hours !!
        marks={marks}
        setMarks={setMarks}
      />
    </>
  );
};

export default Page;
