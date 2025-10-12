import React from "react";
import Details from "../components/Details";
import {
  lumsSectionsInfo,
  lumsTestInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[4]}
        sectionsInfo={lumsSectionsInfo}
        testInfo={lumsTestInfo}
      />
    </>
  );
};

export default Page;
