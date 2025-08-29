import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchSubject = async () => {
  const res = await fetch("api/questions");
  return res.json();
};

const page = () => {
  return <div>ned test</div>;
};

export default page;
