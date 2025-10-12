import React from "react";
import Details from "../components/Details";
import {
  akuSectionsInfo,
  akuTestInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[6]}
        sectionsInfo={akuSectionsInfo}
        testInfo={akuTestInfo}
      />
    </>
  );
};

export default Page;
