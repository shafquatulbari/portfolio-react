const github = "/assets/github.png";
const assets = {
  logo: "/assets/logo.svg",
  menu: "/assets/menu.svg",
  close: "/assets/close.svg",
  javascript: "/assets/tech/javascript.png",
  mongodb: "/assets/tech/mongodb.png",
  nodejs: "/assets/tech/nodejs.png",
  reactjs: "/assets/tech/reactjs.png",
  python: "/assets/tech/python.png",
  cplusplus: "/assets/tech/cplusplus.png",
  sqlicon: "/assets/tech/sql.png",
  git: "/assets/tech/git.png",
  chess: "/assets/works/chess.png",
  touchvoid: "/assets/works/touchvoid.png",
  proquest: "/assets/works/proquest.png",
  focus: "/assets/works/focus.png",
  doomsday: "/assets/works/doomsday.png",
  pharmasphere: "/assets/works/pharmasphere.png",
};

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
    icon: assets.javascript,
  },
  {
    name: "Python",
    icon: assets.python,
  },
  {
    name: "React JS",
    icon: assets.reactjs,
  },
  {
    name: "Node JS",
    icon: assets.nodejs,
  },
  {
    name: "MongoDB",
    icon: assets.mongodb,
  },
  {
    name: "C++",
    icon: assets.cplusplus,
  },
  {
    name: "SQL",
    icon: assets.sqlicon,
  },
  {
    name: "Git",
    icon: assets.git,
  },
];

const experiences = [
  {
    title: "SQA Engineer I",
    company_name: "Brain Station 23",
    iconBg: "#233E56",
    date: "February 2025 - June 2025",
    points: [
      "Contributed to Phase 2 test automation for Grameenphone's MyGP app, ensuring quality for 21M+ monthly active users through rigorous UI, functional, and regression testing.",
      "Developed and maintained end-to-end, functional, regression, and UI test scripts across Android and iOS platforms using WebdriverIO, Mocha, and Appium.",
      "Refactored and cleaned up existing code, improving the overall test automation framework to boost test coverage, maintainability, and execution efficiency.",
      "Verified backend API responses using Node.js, ensuring data consistency and API reliability across all user-facing features.",
      "Collaborated proactively with management teams and frontend developers to understand implementation logic, enabling creation of stable and future-proof automation scripts.",
      "Helped onboard new team member through guidance and mentoring, and was actively involved in code reviews and technical presentations/demos.",
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
      "Mentored new team member and led technical knowledge sharing sessions",
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
    title: "AI Trainer & Prompt Engineer",
    company_name: "Outlier",
    iconBg: "#1a1a2e",
    date: "December 2024 - January 2025",
    points: [
      "Contributed to enhancing AI models by providing human insights that improved their accuracy, clarity, and reliability for a wide range of global applications.",
      "Created challenging prompts to train and evaluate AI performance, focusing on ensuring AI-generated responses were helpful, accurate, clear, and safe.",
      "Refined AI responses through detailed writing and editing to ensure high quality and factual accuracy across diverse use cases.",
      "Evaluated and ranked AI model outputs to identify optimal solutions, helping AI systems minimize hallucinations, misunderstandings, and irrelevant outputs.",
    ],
    technologies: [
      "Python",
      "Prompt Engineering",
      "Data Annotation",
      "Model Training",
      "AI/ML",
      "Natural Language Processing",
      "Quality Assurance",
    ],
    achievements: [
      "Enhanced AI model accuracy through systematic prompt engineering techniques",
      "Contributed to reducing AI hallucinations and improving response reliability",
      "Delivered human-like precision in AI outputs through comprehensive evaluation methods",
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
  {
    title: "Full Stack Developer",
    company_name: "HOTJEK LTD.",
    iconBg: "#2B3A55",
    date: "June 2024 - September 2024",
    points: [
      "Contributed to Pathsala LMS, a Laravel-based platform focused on accessible and interactive education.",
      "Implemented RESTful routes and core LMS features using Laravel, MySQL, and Eloquent ORM.",
      "Built responsive, interactive UI with jQuery, Bootstrap, and libraries such as OWL Carousel, SweetAlert2, and Moment.js.",
      "Optimized frontend assets with Webpack and core-js for cross-browser performance.",
      "Collaborated with designers and QA to ensure functional stability and intuitive UX.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "jQuery",
      "Bootstrap",
      "Webpack",
      "core-js",
      "OWL Carousel",
      "SweetAlert2",
      "Moment.js",
      "JavaScript",
      "REST APIs",
    ],
    achievements: [
      "Delivered end-to-end features for Pathsala LMS across backend and frontend.",
      "Improved load performance by optimizing bundling and asset delivery.",
      "Shipped responsive UI components aligned with accessibility and UX goals.",
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
    image: assets.pharmasphere,
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
    image: assets.chess,
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
    image: assets.touchvoid,
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
    image: assets.proquest,
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
    image: assets.focus,
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
    image: assets.doomsday,
    source_code_link: "https://github.com/shafquatulbari/SurvivingDoomsday",
  },
];

export { technologies, experiences, projects };
