import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <p className="text-amber-400 text-sm font-light text-center mt-7 mb-3">
      DESIGNED BY{" "}
      <Link
        target="true"
        href={"https://www.linkedin.com/in/muhammad-asim-nazeer-b30b7a2a4/"}
      >
        M.ASIM NAZEER
      </Link>
    </p>
  );
};

export default Footer;
