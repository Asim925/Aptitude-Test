import Link from "next/link";
import React from "react";
import { nedInfo } from "../constants/constants";

const Page = () => {
  return (
    <div className="bg-[url('/main-bg.png')] bg-fixed bg-no-repeat sm:py-10 xl:px-20 sm:px-15 p-5">
      <main className="sm:text-center">
        <h1 className="text-amber-400 text-3xl sm:text-5xl font-extrabold">
          NED University – Admission Test
        </h1>
        <p className="text-md sm:text-lg font-semibold text-gray-100 mt-4 px-2 sm:mt-8">
          A timed, multiple-choice entry assessment covering Mathematics,
          Physics, Chemistry/CS, and English. No negative marking—just pure
          preparation.
        </p>
      </main>

      {/* Test Info */}
      <div className="mt-5">
        <div className="border rounded-2xl backdrop-blur-sm bg-orange-800/10 border-amber-600 p-6">
          <h2 className="text-amber-400 text-2xl sm:text-3xl font-bold mb-4">
            Test Information
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-md sm:text-lg">
            <li>
              <span className="font-semibold">Total Duration:</span> 120 minutes
            </li>
            <li>
              <span className="font-semibold">Total Questions:</span> 100 MCQs
            </li>
            <li>
              <span className="font-semibold">Negative Marking:</span> None
            </li>
            <li>
              <span className="font-semibold">Calculator:</span> Not Allowed
            </li>
            <li>
              <span className="font-semibold">Navigation:</span> Once a section
              is completed or time is up, you cannot return.
            </li>
          </ul>
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="mt-8">
        <h2 className="text-amber-400 text-2xl sm:text-3xl font-bold mb-4 text-center">
          Section-wise Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full backdrop-blur-sm bg-black/50 border-collapse text-gray-100 text-sm sm:text-lg">
            <thead>
              <tr className="bg-amber-800/70">
                <th className="border border-orange-600 px-3 py-2">Section</th>
                <th className="border border-orange-600 px-3 py-2">
                  Questions
                </th>
                <th className="border border-orange-600 px-3 py-2">Time</th>
                <th className="border border-orange-600 px-3 py-2">
                  Weightage
                </th>
                <th className="border border-orange-600 px-3 py-2">Negative</th>
              </tr>
            </thead>
            <tbody>
              {nedInfo.map((sec, index) => (
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
      </div>

      {/* Start Test Button */}
      <div className="flex justify-center">
        <Link
          href="/ned/start-test"
          className="px-6 py-4 mt-6 bg-gradient-to-r from-orange-400 to-amber-900
                     text-white text-lg font-bold rounded-xl shadow
                     hover:from-orange-500 hover:to-amber-900 transition-colors"
        >
          Up for the Challenge 🚀?
        </Link>
      </div>
    </div>
  );
};

export default Page;
