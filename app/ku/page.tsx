import React from "react";
import Details from "../components/Details";
import {
  kuSectionsInfo,
  kuTestInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[3]}
        sectionsInfo={kuSectionsInfo}
        testInfo={kuTestInfo}
      />
    </>
  );
};

export default Page;
