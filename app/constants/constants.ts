export interface University {
  name: string[];
  img: string;
  text: string;
  route: string;
}

export interface SectionsInfo {
  name: string;
  questions: number;
  time: string; // per section
  weightage: string;
  negative: string;
}

export interface TestInfo {
  title: string;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

export const univerisities = [
  {
    name: ["NED University of Engineering & Technology", "NED"],
    img: "/NED.jpg",
    text: "Prepare for one of top engineering universities. The NED test evaluates your skills in Mathematics, Physics, English, and Logical Reasoning, ensuring you are ready for an engineering career.",
    route: "/ned",
  },
  {
    name: ["National University of Computer and Emerging Sciences", "FAST"],
    img: "/FAST.jpg",
    text: "Known for excellence in Computer Science and Engineering, FAST aptitude test challenges you in Mathematics, English, Analytical Ability, and IQ skills. Perfect for students aiming for a future in technology.",
    route: "/fast",
  },
  {
    name: ["Dow University of Health Sciences", "DUHS"],
    img: "/DOW.jpg",
    text: "Aspiring to join the medical field? The DOW test measures your knowledge in Biology, Chemistry, Physics, and English, designed for students passionate about medicine and healthcare.",
    route: "/dow",
  },
];

export const fastTestInfo = [
  {
    title: "Total Duration",
    value: "120 minutes",
  },
  {
    title: "Total Questions",
    value: "120 MCQs",
  },
  {
    title: "Negative Marking",
    value: "Yes (-0.25 in Math/IQ, -0.0833 in English)",
  },
  {
    title: "Calculator",
    value: "Not Allowed",
  },
  {
    title: "Navigation",
    value: "Once a section is completed or time is up, you cannot return.",
  },
];
export const fastSectionsInfo = [
  {
    name: "Advanced Mathematics",
    questions: 50,
    time: "upto you",
    weightage: "50%",
    negative: "-0.25",
  },
  {
    name: "Basic Mathematics",
    questions: 20,
    time: "upto you",
    weightage: "20%",
    negative: "-0.25",
  },
  {
    name: "Analytical / IQ",
    questions: 20,
    time: "upto you",
    weightage: "20%",
    negative: "-0.25",
  },
  {
    name: "English",
    questions: 30,
    time: "upto you",
    weightage: "10%",
    negative: "-0.0833",
  },
];

export const nedSectionsInfo = [
  {
    name: "Mathematics",
    questions: 30,
    time: "upto you",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Physics",
    questions: 30,
    time: "upto you",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Chemistry / Computer Science",
    questions: 30,
    time: "upto you",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "English",
    questions: 30,
    time: "upto you",
    weightage: "25%",
    negative: "None",
  },
];
export const nedTestsInfo = [
  {
    title: "Total Duration",
    value: "120 minutes",
  },
  {
    title: "Total Questions",
    value: "120 MCQs",
  },
  {
    title: "Negative Marking",
    value: "None",
  },
  {
    title: "Calculator",
    value: "Not Allowed",
  },
  {
    title: "Navigation",
    value: "Once a section is completed, you cannot return.",
  },
];

export const dowSectionsInfo = [
  {
    name: "Biology",
    questions: 80,
    time: "upto you",
    weightage: "45%",
    negative: "None",
  },
  {
    name: "Chemistry",
    questions: 40,
    time: "upto you",
    weightage: "22%",
    negative: "None",
  },
  {
    name: "Physics",
    questions: 40,
    time: "upto you",
    weightage: "22%",
    negative: "None",
  },
  {
    name: "English",
    questions: 10,
    time: "upto you",
    weightage: "12%",
    negative: "None",
  },
  {
    name: "Logical Reasoning",
    questions: 10,
    time: "upto you",
    weightage: "12%",
    negative: "None",
  },
];

export const dowTestInfo = [
  {
    title: "Total Duration",
    value: "180 minutes (3 hrs)",
  },
  {
    title: "Total Questions",
    value: "180 MCQs",
  },
  {
    title: "Negative Marking",
    value: "None",
  },
  {
    title: "Calculator",
    value: "Not Allowed",
  },
  {
    title: "Navigation",
    value: "Not Allowed",
  },
];
