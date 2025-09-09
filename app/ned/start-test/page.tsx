"use client";
import { useState } from "react";
import Questions from "../../components/Questions";
import { nedSectionsInfo } from "@/app/constants/constants";

const Page = () => {
  const [marks, setMarks] = useState<number>(0);

  return (
    <>
      <Questions
        sectionsInfo={nedSectionsInfo}
        time={60 * 60 * 2} // 2 hours !!
        marks={marks}
        setMarks={setMarks}
      />
    </>
  );
};

export default Page;
