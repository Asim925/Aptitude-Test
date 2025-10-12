import React from "react";
import Details from "../components/Details";
import {
  kemuSectionsInfo,
  kemuTestInfo,
  univerisities,
} from "../constants/constants";

const Page = () => {
  return (
    <>
      <Details
        uni={univerisities[7]}
        sectionsInfo={kemuSectionsInfo}
        testInfo={kemuTestInfo}
      />
    </>
  );
};

export default Page;
