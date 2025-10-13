"use client";

import Footer from "./components/Footer";
import UniCard from "./components/UniCard";
import { univerisities } from "./constants/constants";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const card: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="bg-[url('/main-bg.png')] bg-fixed bg-cover min-h-screen pb-5">
      <main className="p-7 mx-2 md:mx-10 lg:mx-15 xl:mx-25 sm:p-10 sm:text-center">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-amber-400 max-sm:text-center text-4xl sm:text-5xl font-extrabold"
        >
          University Aptitude Test Practice
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-gray-100 mt-8"
        >
          &quot;Test your skills and get exam-ready! Select the university you
          aim to take admission in and practice with real-style aptitude
          questions. Choose wisely and start your journey toward success.&quot;
        </motion.p>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-200 mt-4"
        >
          This platform is a practice portal for university aptitude tests in
          Karachi. Students can select their desired university, attempt
          subject-wise questions, and test their preparation. It&apos;s designed
          to give a real exam-like experience with a simple and interactive
          interface.
        </motion.p>
      </main>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-3 sm:mx-5 flex justify-center gap-6 flex-wrap"
      >
        {univerisities.map((uni, index) => (
          <motion.div key={index} variants={card}>
            <UniCard uni={uni} />
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </div>
  );
}
