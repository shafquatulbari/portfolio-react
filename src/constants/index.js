import {
  javascript,
  reactjs,
  nodejs,
  mongodb,
  git,
  chess,
  touchvoid,
  proquest,
  focus,
  doomsday,
  python,
  cplusplus,
  sqlicon,
  pharmasphere,
} from "../../public/assets";

export const navLinks = [
  {
    id: "hero",
    title: "Home",
  },
  {
    id: "neural-profile",
    title: "About",
  },
  {
    id: "experience",
    title: "Work",
  },
];

export const moreNavLinks = [
  {
    id: "neural-matrix",
    title: "Neural Matrix",
  },
  {
    id: "tech",
    title: "Tech Stack",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "C++",
    icon: cplusplus,
  },
  {
    name: "SQL",
    icon: sqlicon,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "SQA Engineer I",
    company_name: "Brain Station 23",
    iconBg: "#233E56",
    date: "February 2025 - Present",
    points: [
      "Contributing to Phase 2 test automation for Grameenphone's MyGP app, ensuring quality for 21M+ monthly active users through rigorous UI, functional, and regression testing.",
      "Developing WebdriverIO, Mocha, and Appium test scripts for automated testing, validating backend API responses with Node.js, and optimizing test automation processes.",
      "Tracking and updating daily execution reports, improving test coverage and pass rates while working in an Agile Scrum environment.",
      "Utilizing tools like Jira, LambdaTest, and Jenkins for CI/CD test integration and improving automation workflows.",
    ],
    technologies: [
      "WebdriverIO",
      "Mocha",
      "Appium",
      "Node.js",
      "Jira",
      "Jenkins",
      "LambdaTest",
      "API Testing",
    ],
    achievements: [
      "Improved test automation coverage by 35% for critical user flows",
      "Reduced manual testing time by 60% through automated test scripts",
      "Successfully integrated CI/CD pipeline reducing deployment bugs by 40%",
    ],
  },
  {
    title: "Trainee, Software & QA Automation Engineer",
    company_name: "Brain Station 23",
    iconBg: "#233E56",
    date: "October 2024 - January 2025",
    points: [
      "Worked on test automation for MyGP, writing and debugging test cases to improve app stability across multiple devices.",
      "Developed full-stack applications with the MERN stack, focusing on scalable backend architectures and secure authentication.",
      "Designed a CamScanner-inspired app using Figma, applying UI/UX best practices.",
      "Gained experience in API testing, cross-device debugging, and frontend/backend development.",
    ],
    technologies: [
      "MERN Stack",
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Figma",
      "API Testing",
      "Mobile Testing",
    ],
    achievements: [
      "Completed comprehensive training program with 95% score",
      "Designed UI/UX for mobile app with user-centered design principles",
      "Built 3 full-stack applications during training period",
    ],
  },
  {
    title: "Co-Founder & Engineer",
    company_name: "AI Data Labeling Startup",
    iconBg: "#383E56",
    date: "July 2024 - October 2024",
    points: [
      "Worked on AI data collection for underrepresented languages such as Bengali and Urdu, contributing to dataset development for ML models.",
      "Designed and implemented workflows for processing and storing large-scale audio datasets using MongoDB and Google Cloud.",
      "Developed a mobile-based audio labeling platform using React Native and Node.js, optimizing contractor workflows for scalable operations.",
      "Streamlined data processing pipelines to improve resource utilization and efficiency.",
    ],
    technologies: [
      "React Native",
      "Node.js",
      "MongoDB",
      "Google Cloud",
      "Python",
      "Machine Learning",
      "Audio Processing",
    ],
    achievements: [
      "Processed over 10,000 hours of audio data in Bengali and Urdu",
      "Built scalable platform handling 100+ concurrent labelers",
      "Reduced data processing time by 70% through pipeline optimization",
    ],
  },
];

const projects = [
  {
    name: "PharmaSphere",
    description:
      "A pharmacy-based e-commerce platform offering a seamless shopping experience for medicines and healthcare products. Built using the MERN stack, PharmaSphere features a secure payment system with Stripe, a dynamic admin panel for inventory management, and a user-friendly interface with advanced search and sorting capabilities.",
    tags: [
      {
        name: "node-express-js",
        color: "blue-text-gradient",
      },
      {
        name: "react.js",
        color: "green-text-gradient",
      },
      {
        name: "e-commerce",
        color: "pink-text-gradient",
      },
    ],
    image: pharmasphere,
    source_code_link: "https://github.com/shafquatulbari/mern-e-commerce",
  },
  {
    name: "Chess Game",
    description:
      "A Python chess game with built-in AI that makes smart moves using advanced algorithms. The game offers a challenging experience with smooth gameplay and strict rule enforcement.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "pygame",
        color: "green-text-gradient",
      },
      {
        name: "algorithms",
        color: "pink-text-gradient",
      },
    ],
    image: chess,
    source_code_link: "https://github.com/shafquatulbari/chess-game-python",
  },
  {
    name: "Touch of the Void",
    description:
      "A procedurally generated dungeon crawler game developed in C++ with OpenGL, featuring advanced enemy AI and engaging top-down shooter mechanics for an immersive gaming experience.",
    tags: [
      {
        name: "c++",
        color: "blue-text-gradient",
      },
      {
        name: "opengl",
        color: "green-text-gradient",
      },
      {
        name: "artificial-intelligence",
        color: "pink-text-gradient",
      },
    ],
    image: touchvoid,
    source_code_link: "https://github.com/shafquatulbari/touch-of-the-void",
  },
  {
    name: "ProQuest",
    description:
      "An online service booking platform built with the MERN stack, featuring real-time chat, geolocation, and secure payments, designed for seamless user experience and efficient service management.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "node & expressjs",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
    ],
    image: proquest,
    source_code_link: "https://github.com/sajeedazam/ProQuest",
  },
  {
    name: "FocusFHIR",
    description:
      "A healthcare platform built using React and SQL, designed for doctors to efficiently access and manage patient data with customizable displays, streamlining workflows and enhancing patient care quality.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "aws",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: focus,
    source_code_link: "https://github.com/sajeedazam/MedicalDashboard",
  },
  {
    name: "Surviving Doomsday",
    description:
      "A 3D first-person shooter game set in a post-apocalyptic world, developed in Unity. It features complex game mechanics, engaging enemy AI, and immersive gameplay, earning Editor's Choice on SIMMER.io.",
    tags: [
      {
        name: "c#",
        color: "blue-text-gradient",
      },
      {
        name: "unity",
        color: "green-text-gradient",
      },
      {
        name: "3d fps",
        color: "pink-text-gradient",
      },
    ],
    image: doomsday,
    source_code_link: "https://github.com/shafquatulbari/SurvivingDoomsday",
  },
];

export { technologies, experiences, projects };
