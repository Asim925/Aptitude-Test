import Link from "next/link";
import React from "react";
import Footer from "./Footer";

interface Props {
  marks: number;
  outOf: number;
}

const getPercentage = (marks: number, outOf: number) => {
  return `${((marks / outOf) * 100).toFixed(2)}%`;
};

const getGrade = (percentage: number) => {
  if (percentage >= 95) return "A++ 🏆";
  if (percentage >= 90) return "A+ 🏆";
  if (percentage >= 85) return "A 🏆";
  if (percentage >= 80) return "B++ 🏆";
  if (percentage >= 75) return "B+";
  if (percentage >= 70) return "B";
  if (percentage >= 65) return "C++";
  if (percentage >= 60) return "C+";
  if (percentage >= 55) return "C";
  if (percentage >= 50) return "D";
  return "F";
};

const getKudosMessage = (percentage: number) => {
  if (percentage >= 90) {
    return "Outstanding performance! 🌟 Your preparation is excellent and you're mastering concepts at a very high level. Keep pushing forward and you'll maintain this top standard.";
  }
  if (percentage >= 75) {
    return "Strong work! 👍 You've developed a solid understanding and your efforts are showing. With a little extra polish, you can easily move into the very top range.";
  }
  if (percentage >= 60) {
    return "Good progress! 💪 You're on the right path and building your skills steadily. More consistent revision and practice will lift you to even higher grades.";
  }
  if (percentage >= 50) {
    return "Fair attempt! 📚 You've got the basics but need to strengthen your grasp of tougher concepts. Stay dedicated and the next step up will come quickly.";
  }
  return "Don't be discouraged! 🚀 Every test is a chance to learn where to focus. Keep practicing, and you'll see big improvement in the next round.";
};

const Result = ({ marks, outOf }: Props) => {
  const percentage = (marks / outOf) * 100;

  return (
    <div className="flex flex-col gap-7 justify-center items-center bg-[url('/main-bg.png')] bg-fixed bg-cover min-h-screen">
      <h1 className="mb-5 px-5 text-center text-amber-400 text-3xl lg:text-4xl xl:text-5xl font-extrabold ">
        Test Completed 🎉
      </h1>
      <p className="text-md sm:text-lg md:text-xl lg:text-2xl">
        You got <span className="text-amber-400 font-bold">{marks}</span> out of{" "}
        <span className="text-amber-400 font-bold">{outOf}</span>
      </p>
      <p className="text-md sm:text-lg md:text-xl lg:text-2xl">
        Percentage:{" "}
        <span className="text-amber-400 font-bold">
          {getPercentage(marks, outOf)}
        </span>
      </p>
      <p className="text-md sm:text-lg md:text-xl lg:text-2xl">
        Grade:{" "}
        <span className="text-amber-400 font-bold">{getGrade(percentage)}</span>
      </p>
      <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-center max-w-[90%] sm:max-w-[50%]">
        {getKudosMessage(percentage)}
      </p>
      <Link href={"/"}>
        <button className="shadow-[0_2px_10px_rgba(217,119,6,0.45)] cursor-pointer max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-lg font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
            Go to Home
          </span>
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default Result;
