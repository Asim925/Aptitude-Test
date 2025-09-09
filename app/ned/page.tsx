import React from "react";
import Details from "../components/Details";
import {
  nedSectionsInfo,
  nedTestsInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[0]}
        sectionsInfo={nedSectionsInfo}
        testInfo={nedTestsInfo}
      />
    </>
  );
};

export default Page;
