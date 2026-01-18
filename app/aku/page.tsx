import React from "react";
import Details from "../components/Details";
import {
  akuSectionsInfo,
  akuTestInfo,
  univerisities,
} from "../constants/constants";
import Navbar from "../components/Navbar";

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
