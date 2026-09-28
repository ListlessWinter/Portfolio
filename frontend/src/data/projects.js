// Projects without a screenshot get a generated ink-brush cover using `kanji`.
// `demoLink: null` hides the "Live Demo" button (no public deployment yet).
export const projects = [
  {
    id: 1,
    title: "SPARTA",
    category: "Web Dev (MERN)",
    description: "Sports Planning and Resource Tracking App.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    image: "/Sparta.png",
    kanji: "競",
    demoLink: "https://sparta-deployed.vercel.app/",
    repoLink: "https://github.com/ListlessWinter/SPARTA-DEPLOYED",
  },
  {
    id: 2,
    title: "PIMS",
    category: "Web Dev (MERN)",
    description: "Pharmacy Inventory Management System.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    image: null,
    kanji: "薬",
    demoLink: "https://pims-d-f.vercel.app/",
    repoLink: "https://github.com/ListlessWinter/PIMS_D",
  },
  {
    id: 3,
    title: "IMSU",
    category: "Web Dev (JS/HTML/CSS)",
    description: "Intramurals Management System for Universities.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/IMSU.png",
    kanji: "祭",
    demoLink: "https://vyv-imsu.vercel.app/",
    repoLink: "https://github.com/ListlessWinter/VYV-IMSU",
  },
  {
    id: 4,
    title: "Simple Calculator",
    category: "Frontend (JS/HTML/CSS)",
    description: "A functional calculator web application built with vanilla JavaScript.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: null,
    kanji: "計",
    demoLink: null,
    repoLink: "https://github.com/ListlessWinter/sparta",
  },
  {
    id: 5,
    title: "YUMHUNT",
    category: "Mobile App (Flutter & Dart)",
    description: "A food mobile app specifically made for ADNU.",
    stack: ["Flutter", "Dart"],
    image: "/YumHunt.png",
    kanji: "食",
    demoLink: null,
    repoLink: "https://github.com/ListlessWinter/YumHuntFileZero",
  },
  {
    id: 6,
    title: "ADNU-ECO",
    category: "Web Dev (Django/HTML/CSS)",
    description: "E-commerce website built for the ADNU community.",
    stack: ["Django", "HTML", "CSS"],
    image: "/ADNUeco.png",
    kanji: "商",
    demoLink: null,
    repoLink: "https://github.com/ListlessWinter/ADNU-E-Commerce",
  },
  {
    id: 7,
    title: "Swiftly Thread",
    category: "Web Dev (JS/HTML/CSS)",
    description: "A fan Taylor Swift tribute page.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Taylor.png",
    kanji: "歌",
    demoLink: "https://taylornation.web.app/",
    repoLink: "https://github.com/ListlessWinter/TaylorNation",
  },
  {
    id: 8,
    title: "Chargeee!!!",
    category: "Text-Based Game (C Language)",
    description: "Text and turn-based game created using C with client and server side implementation.",
    stack: ["C", "Sockets", "Client / Server"],
    image: null,
    kanji: "戦",
    demoLink: null,
    repoLink: "https://github.com/ListlessWinter/OperatingSystems",
  },
];

// Client projects from the internship (1 web + mobile, 2 UI/UX) — counted in the stats, not listed.
export const internshipProjectCount = 3;

export const frontendSkills = [
  "Prompt Engineering", "AI-Assisted Dev", "React.js", "Next.js", "Expo", "React Native", "Flutter",
  "HTML", "CSS", "Figma", "Node.js", "Express.js", "Supabase", "SQL", "MongoDB", "Django", "JWT",
];

export const languages = ["JavaScript", "Java", "C", "C++", "Dart", "HTML", "CSS", "SQL"];

export const experience = [
  {
    id: 'intern',
    kanji: '研修',
    accent: 'cyan',
    role: 'UI/UX & Fullstack Web/Mobile Developer Intern',
    entries: [
      {
        meta: 'Bald Puppies Solutions Inc.',
        date: 'January 2026 – April 2026',
        points: [
          'Completed 486 hours of internship, developing and styling responsive frontend interfaces for web applications using React, Next.js, and CSS.',
          'Built mobile applications using Expo and React Native. Transforming Figma UI designs into functional components.',
          'Integrated backend services and APIs using Supabase and JWT, implementing secure user authentication, role management, and database connections.',
          'Utilized AI tools to accelerate development processes, troubleshoot code, and enhance overall productivity.',
        ],
      },
    ],
    stack: ['React', 'Next.js', 'Expo', 'React Native', 'Supabase', 'JWT', 'Figma'],
  },
  {
    id: 'speaker',
    kanji: '講演',
    accent: 'magenta',
    role: 'AI Training Presenter',
    entries: [
      {
        meta: 'Resource Speaker · Parochial School',
        date: 'February 2026',
        points: [
          'Conducted an AI training seminar for school teachers, educating them on the practical applications and integration of artificial intelligence tools in their workflows.',
        ],
      },
      {
        meta: 'Resource Speaker · FJC RAELS FOOD SERVICE',
        date: 'March 2026',
        points: [
          'Served as a resource speaker on Artificial Intelligence, presenting on its practical applications and utility.',
        ],
      },
    ],
    stack: ['Prompt Engineering', 'AI Tools', 'Public Speaking'],
  },
];
