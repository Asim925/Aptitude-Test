import React from "react";
import Details from "../components/Details";
import {
  dowSectionsInfo,
  dowTestInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[2]}
        sectionsInfo={dowSectionsInfo}
        testInfo={dowTestInfo}
      />
    </>
  );
};

export default Page;
