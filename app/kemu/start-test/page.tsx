"use client";
import { useState } from "react";
import Questions from "../../components/Questions";
import { kemuSectionsInfo } from "@/app/constants/constants";

const Page = () => {
  const [marks, setMarks] = useState<number>(0);

  return (
    <>
      <Questions
        sectionsInfo={kemuSectionsInfo}
        time={60 * 60 * 3} // 3 hours !!
        marks={marks}
        setMarks={setMarks}
      />
    </>
  );
};

export default Page;
