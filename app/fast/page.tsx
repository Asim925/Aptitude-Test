import React from "react";
import Details from "../components/Details";
import {
  fastSectionsInfo,
  fastTestInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[1]}
        sectionsInfo={fastSectionsInfo}
        testInfo={fastTestInfo}
      />
    </>
  );
};

export default Page;
