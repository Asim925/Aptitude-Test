"use client";

import React from "react";
import { SectionsInfo, TestInfo, University } from "../constants/constants";
import Link from "next/link";
import Footer from "./Footer";
import { motion, Variants } from "framer-motion";
import Navbar from "./Navbar";
import { div } from "framer-motion/client";

interface Props {
  uni: University;
  sectionsInfo: SectionsInfo[];
  testInfo: TestInfo[];
}

const Details = ({ uni, sectionsInfo, testInfo }: Props) => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <Navbar />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="bg-[url('/main-bg.png')] bg-fixed min-h-screen bg-cover sm:py-10 xl:px-20 sm:px-15 p-5"
      >
        <main className="sm:text-center">
          <motion.h1
            variants={fadeUp}
            className="text-amber-400 text-3xl sm:text-5xl font-extrabold"
          >
            {uni.name[0]}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-md sm:text-lg font-semibold text-gray-100 mt-4 px-2 sm:mt-8"
          >
            {uni.text}
          </motion.p>
        </main>

        {/* Test Info */}
        <motion.div
          variants={fadeUp}
          className="mt-5 border shadow-[0_2px_10px_rgba(217,119,6,0.45)] rounded-2xl backdrop-blur-sm bg-orange-800/10 border-amber-600 p-6"
        >
          <h2 className="text-amber-400 text-2xl sm:text-3xl font-bold mb-4">
            Test Information
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-md sm:text-lg">
            {testInfo.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">{item.title}:</span>{" "}
                {item.value}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Section Breakdown */}
        <motion.div variants={fadeUp} className="mt-8">
          <h2 className="text-amber-400 text-2xl sm:text-3xl font-bold mb-4 text-center">
            Section-wise Breakdown
          </h2>
          <div className="overflow-x-auto shadow-[0_2px_10px_rgba(217,119,6,0.45)]">
            <table className="w-full backdrop-blur-sm bg-black/50 border-collapse text-gray-100 text-sm sm:text-lg">
              <thead>
                <tr className="bg-amber-800/70">
                  <th className="border border-orange-600 px-3 py-2">
                    Section
                  </th>
                  <th className="border border-orange-600 px-3 py-2">
                    Questions
                  </th>
                  <th className="border border-orange-600 px-3 py-2">Time</th>
                  <th className="border border-orange-600 px-3 py-2">
                    Weightage
                  </th>
                  <th className="border border-orange-600 px-3 py-2">
                    Negative
                  </th>
                </tr>
              </thead>
              <tbody>
                {sectionsInfo.map((sec, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-orange-400/10" : "bg-orange-300/10"
                    } hover:bg-orange-500/15 transition`}
                  >
                    <td className="border border-orange-400 px-3 py-2">
                      {sec.name}
                    </td>
                    <td className="border border-orange-400 px-3 py-2">
                      {sec.questions}
                    </td>
                    <td className="border border-orange-400 px-3 py-2">
                      {sec.time}
                    </td>
                    <td className="border border-orange-400 px-3 py-2">
                      {sec.weightage}
                    </td>
                    <td className="border border-orange-400 px-3 py-2">
                      {sec.negative}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Start Test Button */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center mt-7"
          transition={{ delay: 0.2 }}
        >
          <Link href={`${uni.route}/start-test`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-lg font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
                Up for the Challenge 🚀?
              </span>
            </motion.button>
          </Link>
        </motion.div>

        <Footer />
      </motion.div>
    </>
  );
};

export default Details;
