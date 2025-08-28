import Link from "next/link";
import React from "react";
import { nedInfo } from "../constants/constants";

const Page = () => {
  return (
    <div className="sm:my-10 xl:mx-20 sm:mx-15 m-5">
      <main className="sm:text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold">
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
        <div className="border rounded-2xl bg-gray-800/70 border-gray-600 p-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Section-wise Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-gray-100 text-sm sm:text-lg">
            <thead>
              <tr className="bg-gray-800/70">
                <th className="border border-gray-600 px-3 py-2">Section</th>
                <th className="border border-gray-600 px-3 py-2">Questions</th>
                <th className="border border-gray-600 px-3 py-2">Time</th>
                <th className="border border-gray-600 px-3 py-2">Weightage</th>
                <th className="border border-gray-600 px-3 py-2">Negative</th>
              </tr>
            </thead>
            <tbody>
              {nedInfo.map((sec, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-700/30" : "bg-gray-800/30"
                  } hover:bg-gray-700/60 transition`}
                >
                  <td className="border border-gray-600 px-3 py-2">
                    {sec.name}
                  </td>
                  <td className="border border-gray-600 px-3 py-2">
                    {sec.questions}
                  </td>
                  <td className="border border-gray-600 px-3 py-2">
                    {sec.time}
                  </td>
                  <td className="border border-gray-600 px-3 py-2">
                    {sec.weightage}
                  </td>
                  <td className="border border-gray-600 px-3 py-2">
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
          className="px-6 py-4 mt-6 bg-gradient-to-r from-green-700 to-emerald-800 text-white text-lg font-bold rounded-xl shadow hover:from-green-700 hover:to-emerald-700 transition-colors"
        >
          🚀 Start My Admission Test Now
        </Link>
      </div>
    </div>
  );
};

export default Page;
