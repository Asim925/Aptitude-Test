"use client";
import { useState } from "react";
import Questions from "../../components/Questions";
import { dowSectionsInfo } from "@/app/constants/constants";

const Page = () => {
  const [marks, setMarks] = useState<number>(0);

  return (
    <>
      <Questions
        sectionsInfo={dowSectionsInfo}
        time={60 * 60 * 3} // 3 hours !!
        marks={marks}
        setMarks={setMarks}
      />
    </>
  );
};

export default Page;
