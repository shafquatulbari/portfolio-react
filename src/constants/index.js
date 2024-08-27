import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  nodejs,
  mongodb,
  git,
  mundoai,
  searching,
  chess,
  touchvoid,
  proquest,
  focus,
  doomsday,
  python,
  cplusplus,
  csharp,
  sqlicon,
  unityicon,
} from "../../public/assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const technologies = [
  {
    name: "C++",
    icon: cplusplus,
  },
  {
    name: "C#",
    icon: csharp,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Sql",
    icon: sqlicon,
  },
  {
    name: "Unity",
    icon: unityicon,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
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
    name: "git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Co-Founder & Engineer",
    company_name: "MundoAI",
    icon: mundoai,
    iconBg: "#383E56",
    date: "August 2024 - Present",
    points: [
      "Canada-based tech startup focused on underrepresented languages in AI.",
      "Specialize in processing and training datasets for low-resource languages like Bengali, Urdu, and Turkic languages.",
      "Develop and curate high-quality, language-specific datasets to improve AI systems for diverse language support.",
      "Aiming to significantly enhance AI accessibility by bridging data gaps in underrepresented languages through innovative solutions.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Open For Work",
    icon: searching,
    iconBg: "#E6DEDD",
    date: "Ongoing",
    points: [
      "Developed and optimized complex algorithms and data structures for projects, including a chess game with AI implementation and a top-down shooter game with advanced pathfinding and AI systems.",
      "Engineered full-stack applications using MERN stack, enhancing user experiences through features like real-time chat, geolocation, and secure payment systems.",
      "Led and contributed to diverse projects, consistently delivering high-quality code under tight deadlines and collaborating effectively with teams to achieve project goals.",
      "Built and maintained scalable databases using MongoDB and SQL, ensuring efficient data management and seamless integration with front-end systems.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
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

export { technologies, experiences, testimonials, projects };
