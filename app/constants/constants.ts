export interface University {
  name: string[];
  img: string;
  text: string;
  route: string;
}

export interface SectionsInfo {
  name: string;
  questions: number;
  time: string;
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
  {
    name: ["Karachi University", "KU"],
    img: "/KU.webp",
    text: "KU's admission test evaluates your analytical thinking and core subject knowledge in English, General Knowledge, and Subject-Specific areas for your chosen discipline.",
    route: "/ku",
  },
  {
    name: ["Lahore University of Management Sciences", "LUMS"],
    img: "/LUMS.webp",
    text: "LUMS admission test; emphasizes logical reasoning, problem-solving, reading comprehension, and quantitative aptitude to assess well-rounded intellectual ability.",
    route: "/lums",
  },
  {
    name: ["Institute of Business Administration", "IBA"],
    img: "/IBA.webp",
    text: "IBA Karachi's test is designed to assess your command over English, Mathematics, and Analytical Reasoning. Ideal for students aiming for business and management degrees.",
    route: "/iba",
  },
  {
    name: ["Aga Khan University", "AKU"],
    img: "/AKU.jpg",
    text: "Aga Khan University's medical admission test assesses higher-order thinking in English comprehension, quantitative reasoning, and science reasoning (Biology, Chemistry, Physics). It emphasizes critical analysis and logical reasoning over rote learning.",
    route: "/aku",
  },
  {
    name: ["King Edward Medical University", "KEMU"],
    img: "/KEMU.jpg",
    text: "King Edward Medical University admits students based on the official MDCAT conducted by UHS. The test evaluates understanding in Biology, Chemistry, Physics, and English, emphasizing conceptual clarity and medical aptitude.",
    route: "/kemu",
  },
];

// ---------------- FAST ----------------
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

// ---------------- NED ----------------
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

// ---------------- DOW ----------------
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

// ---------------- ku ----------------
export const kuSectionsInfo = [
  {
    name: "English",
    questions: 20,
    time: "upto you",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "General Knowledge",
    questions: 10,
    time: "upto you",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Physics",
    questions: 20,
    time: "upto you",
    weightage: "20%",
    negative: "None",
  },
  {
    name: "Chemistry",
    questions: 20,
    time: "upto you",
    weightage: "20%",
    negative: "None",
  },
  {
    name: "Mathematics",
    questions: 30,
    time: "upto you",
    weightage: "25%",
    negative: "None",
  },
];

export const kuTestInfo = [
  {
    title: "Total Duration",
    value: "90 minutes",
  },
  {
    title: "Total Questions",
    value: "100 MCQs",
  },
  {
    title: "Negative Marking",
    value: "None",
  },
  {
    title: "Calculator",
    value: "Allowed (For specific programs)",
  },
  {
    title: "Navigation",
    value: "Section-wise navigation not allowed.",
  },
];

// ---------------- LUMS ----------------
export const lumsSectionsInfo = [
  {
    name: "Quantitative Reasoning",
    questions: 40,
    time: "upto you",
    weightage: "35%",
    negative: "None",
  },
  {
    name: "Verbal Reasoning",
    questions: 30,
    time: "upto you",
    weightage: "35%",
    negative: "None",
  },
  {
    name: "Analytical Writing / Logic",
    questions: 30,
    time: "upto you",
    weightage: "30%",
    negative: "None",
  },
];

export const lumsTestInfo = [
  {
    title: "Total Duration",
    value: "120 minutes",
  },
  {
    title: "Total Questions",
    value: "100 MCQs",
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
    value: "Allowed within each section.",
  },
];

// ---------------- IBA ----------------
export const ibaSectionsInfo = [
  {
    name: "English",
    questions: 30,
    time: "upto you",
    weightage: "30%",
    negative: "None",
  },
  {
    name: "Mathematics",
    questions: 30,
    time: "upto you",
    weightage: "40%",
    negative: "None",
  },
  {
    name: "Analytical Reasoning",
    questions: 20,
    time: "upto you",
    weightage: "20%",
    negative: "None",
  },
  {
    name: "General Knowledge",
    questions: 10,
    time: "upto you",
    weightage: "10%",
    negative: "None",
  },
];

export const ibaTestInfo = [
  {
    title: "Total Duration",
    value: "90 minutes",
  },
  {
    title: "Total Questions",
    value: "90 MCQs",
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
    value: "Allowed.",
  },
];

// ---------------- AKU ----------------
export const akuSectionsInfo = [
  {
    name: "English",
    questions: 30,
    time: "35 minutes",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Biology",
    questions: 20,
    time: "20 minutes",
    weightage: "16.7%",
    negative: "None",
  },
  {
    name: "Chemistry",
    questions: 20,
    time: "20 minutes",
    weightage: "16.7%",
    negative: "None",
  },
  {
    name: "Physics",
    questions: 20,
    time: "20 minutes",
    weightage: "16.7%",
    negative: "None",
  },
  {
    name: "Quantitative Reasoning",
    questions: 30,
    time: "25 minutes",
    weightage: "25%",
    negative: "None",
  },
];

export const akuTestInfo = [
  {
    title: "Total Duration",
    value: "120 minutes (2 hours)",
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
    value: "Allowed within each section.",
  },
];
// ---------------- KEMU ----------------

export const kemuSectionsInfo = [
  {
    name: "Biology",
    questions: 70,
    time: "60 minutes",
    weightage: "34%",
    negative: "None",
  },
  {
    name: "Chemistry",
    questions: 50,
    time: "45 minutes",
    weightage: "28%",
    negative: "None",
  },
  {
    name: "Physics",
    questions: 50,
    time: "45 minutes",
    weightage: "28%",
    negative: "None",
  },
  {
    name: "English",
    questions: 30,
    time: "30 minutes",
    weightage: "10%",
    negative: "None",
  },
];

export const kemuTestInfo = [
  {
    title: "Total Duration",
    value: "180 minutes (3 hours)",
  },
  {
    title: "Total Questions",
    value: "200 MCQs",
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
    value: "Allowed within each section.",
  },
];
