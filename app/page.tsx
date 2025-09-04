"use client";
import Test from "./components/Test";
import UniCard from "./components/UniCard";
import { univerisities } from "./constants/constants";

export default function Home() {
  return (
    <div className="bg-[url('/main-bg.png')] bg-fixed bg-cover min-h-screen pb-10 ">
      <main className="p-7 sm:p-10 sm:text-center">
        <h1 className="text-amber-400 max-sm:text-center text-4xl sm:text-5xl font-extrabold">
          University Aptitude Test Practice
        </h1>
        <p className="text-xl font-semibold text-gray-100 mt-8">
          "Test your skills and get exam-ready! Select the university you aim to
          take admission in and practice with real-style aptitude questions.
          Choose wisely and start your journey toward success."
        </p>
        <p className="text-xl text-gray-200">
          This platform is a practice portal for university aptitude tests in
          Karachi. Students can select their desired university, attempt
          subject-wise questions, and test their preparation. It&apos;s designed
          to give a real exam-like experience with a simple and interactive
          interface.
        </p>
      </main>
      <div className=" sm:mx-5 flex justify-center gap-6 flex-wrap">
        {univerisities.map((uni, index) => (
          <UniCard uni={uni} key={index} />
        ))}
      </div>
    </div>
  );
}
