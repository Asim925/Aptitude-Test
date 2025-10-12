import React from "react";
import Details from "../components/Details";
import {
  ibaSectionsInfo,
  ibaTestInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[5]}
        sectionsInfo={ibaSectionsInfo}
        testInfo={ibaTestInfo}
      />
    </>
  );
};

export default Page;
