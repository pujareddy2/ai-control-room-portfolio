export type ModuleId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "certifications"
  | "contact";

export type PortfolioProject = {
  title: string;
  subtitle?: string;
  image?: string;
  summary: string;
  paragraphs: [string, string];
  highlights: string[];
  stack: string[];
  links: {
    live?: string;
    github?: string;
  };
  contribution?: string;
};

export type PortfolioExperience = {
  org: string;
  role: string;
  duration: string;
  summary: string;
  paragraphs: [string, string];
  tools: string[];
  outcomes: string[];
};

export type PortfolioCertification = {
  title: string;
  issuer: string;
  year?: string;
  credentialId?: string;
};

export type PortfolioContact = {
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  portfolioUrl: string;
  resumeUrl: string;
};

export type SkillCategories = {
  programmingLanguages: string[];
  aiMl: string[];
  frameworksApis: string[];
  databasesCloud: string[];
  developerTools: string[];
};

export const MODULES: { id: ModuleId; label: string }[] = [
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "contact", label: "CONTACT" },
];

export const ABOUT = {
  name: "Puja Midde",
  title: "Applied AI Developer | Machine Learning Engineer",
  college: "Stanley College of Engineering and Technology for Women, Hyderabad",
  education: "Final-year B.E. Computer Science (CGPA: 8.8/10)",
  summary:
    "Welcome to the About Section. I am a final-year B.E. Computer Science student focused on Applied AI and Machine Learning. I build AI-driven tools, ML systems, and interactive web experiences with a strong focus on practical problem solving, GenAI, and useful real-world systems.",
};

export const PROJECTS: PortfolioProject[] = [
  {
    title: "Legal Guardian AI",
    subtitle: "GenAI Legal Analysis Platform",
    image: "/projects/legal-guardian-ai.svg",
    summary:
      "End-to-end AI-powered legal document analysis system for intelligent contract understanding.",
    paragraphs: [
      "Built an end-to-end AI-powered legal document analysis platform using FastAPI, Gemini AI, and Google Document AI for contract understanding, clause intelligence, and risk-aware decision support.",
      "Implemented scalable backend APIs and integrated Firestore with a React frontend for real-time document workflows, secure storage of summaries and feedback, and practical legal automation at production speed.",
    ],
    highlights: [
      "Implemented automated clause extraction, summarization, and risk scoring, reducing legal review time by 40%",
      "Designed What-If simulation workflows using LLM reasoning to predict outcomes of contract clauses",
      "Integrated Firestore for secure storage of summaries, risk analysis, and user feedback data",
      "Developed scalable backend APIs connected to a React frontend for real-time processing",
      "Delivered an end-to-end GenAI legal analysis workflow from ingestion to actionable insight",
    ],
    stack: [
      "FastAPI",
      "React",
      "Gemini AI",
      "Google Document AI",
      "Firestore",
      "Python",
    ],
    links: {
      live: "https://legal-guardian-ai.vercel.app/",
      github: "https://legal-guardian-ai.vercel.app/",
    },
    contribution:
      "Primary backend owner: API design, AI service integration, model workflows, cloud configuration, and frontend-backend connectivity.",
  },
  {
    title: "AyuCare",
    subtitle: "Ayurvedic AI Health Assistant",
    image: "/projects/ayucare.svg",
    summary:
      "AI Ayurvedic healthcare assistant prototype built for AIHackDays 2025 (Runner-Up).",
    paragraphs: [
      "Developed an AI-driven healthcare assistant integrating Teachable Machine image classification and OpenAI chatbot capabilities to support real-time wellness exploration and medicinal-plant guidance.",
      "Implemented FastAPI backend services with Firebase integration for real-time health tracking, symptom support, and connected feature modules across chatbot, tracker, store, and recommendation flows.",
    ],
    highlights: [
      "Developed leaf identification system for medicinal plants with real-time prediction and benefit recommendations",
      "Integrated Teachable Machine + OpenAI API for AI classification and chatbot assistance",
      "Implemented backend using FastAPI and Firebase for real-time data workflows",
      "Designed features including AI chatbot, symptom tracker, Ayurvedic store, and wellness recommendations",
      "Delivered a complete working AI + healthcare prototype in a hackathon environment",
    ],
    stack: [
      "FastAPI",
      "OpenAI API",
      "Teachable Machine",
      "Firebase",
      "JavaScript",
      "Python",
    ],
    links: {
      live: "https://pujareddy2.github.io/AyuCare/",
      github: "https://github.com/pujareddy2/AyuCare.git",
    },
    contribution:
      "Built backend logic and integrated AI services; contributed to full prototype connectivity across chatbot, leaf scanner, and tracker flows.",
  },
  {
    title: "Smart Attendance System",
    subtitle: "AI Face Recognition Tracker",
    image: "/projects/smart-attendance.svg",
    summary:
      "AI attendance platform with CNN + OpenCV for real-time classroom presence tracking.",
    paragraphs: [
      "Developed an AI-based attendance tracker using a CNN model and OpenCV for real-time face recognition, enabling automated attendance marking with timestamped records.",
      "Integrated Firebase-backed real-time updates, student dashboard features, and profile/task management to deliver a complete AI + database system for smart classroom environments.",
    ],
    highlights: [
      "3rd Place at Infinity 2K25 Hackathon",
      "Automated attendance marking with name, date, and time stored securely in Firebase",
      "Built a student dashboard with task tracking and profile management",
      "Integrated real-time data updates and backend logic for seamless performance",
      "Designed a complete AI + database + real-time smart classroom solution",
    ],
    stack: ["CNN", "OpenCV", "Firebase", "Python"],
    links: {},
  },
  {
    title: "AI-Driven Stay Booking Web App",
    subtitle: "Lovable AI Platform Build",
    image: "/projects/stay-booking.svg",
    summary:
      "Full-stack stay-booking application built with Lovable AI-powered code generation.",
    paragraphs: [
      "Built a stay-booking web application with full-stack flow support, including listing discovery, booking lifecycle handling, responsive UI behavior, and persistent data interactions.",
      "Leveraged AI-assisted full-stack generation to accelerate delivery while validating backend logic, database operations, and booking workflows through focused end-to-end testing.",
    ],
    highlights: [
      "Implemented stay listing, booking flow, data persistence, and responsive UI",
      "Reduced development time by approximately 60% using AI-assisted generation",
      "Validated backend logic, database operations, and booking workflows through testing",
      "Demonstrated rapid MVP delivery using practical AI engineering workflows",
    ],
    stack: ["React", "AI-assisted Full Stack", "Lovable"],
    links: {
      live: "https://lovable.dev/projects/7e7129c5-0f29-42e7-ae7c-9f7169a43340",
    },
  },
  {
    title: "Visual Pattern Classification",
    subtitle: "KNN vs SVM ML Web App",
    image: "/projects/visual-pattern-classification.svg",
    summary:
      "Interactive Streamlit ML web app comparing KNN and SVM for pattern classification.",
    paragraphs: [
      "Built an interactive Streamlit application to compare KNN and SVM classifiers using a complete ML workflow that includes data generation, normalization with StandardScaler, model training, and evaluation.",
      "Visualized decision boundaries and real-time predictions to make model behavior intuitive and explainable, then deployed the application on Streamlit Cloud for public accessibility.",
    ],
    highlights: [
      "Implemented full pipeline: data generation, normalization, training, and evaluation",
      "Visualized decision boundaries and real-time predictions for intuitive ML interpretation",
      "Achieved high classification accuracy (~95-100%) with optimized model performance",
      "Deployed the application on Streamlit Cloud for public access",
    ],
    stack: ["Python", "Streamlit", "KNN", "SVM", "Scikit-learn"],
    links: {
      live: "https://visual-pattern-classifier.streamlit.app/",
      github: "https://github.com/pujareddy2/visual-pattern-classifier.git",
    },
  },
  {
    title: "RepoinTel",
    subtitle: "AI GitHub Repository Intelligence Tool",
    image: "/projects/repointel.svg",
    summary:
      "Agentic AI GitHub repository intelligence tool for automated codebase understanding.",
    paragraphs: [
      "Engineered an Agentic AI platform that analyzes GitHub repositories and produces structured technical insights including metadata, architecture hints, and technology stack extraction.",
      "Integrated GitHub API with NLP/LLM workflows to automate developer-friendly summaries and repository intelligence, reducing onboarding time for developers, students, and researchers.",
    ],
    highlights: [
      "Integrated GitHub API + NLP/LLM techniques for repository metadata and architecture analysis",
      "Automated generation of project summaries, architecture insights, and developer-facing explanations",
      "Designed workflows for codebase understanding, documentation analysis, and intelligent interpretation",
      "Built as a productivity tool to understand complex repositories quickly",
    ],
    stack: ["Python", "GitHub API", "NLP", "LLM Workflows"],
    links: {
      github: "https://github.com/pujareddy2/ai-repository-agent.git",
    },
  },
  {
    title: "AI Notion Assistant",
    subtitle: "Gemini AI Automation Tool",
    image: "/projects/notion-assistant.svg",
    summary:
      "Prompt-driven Notion workflow automation assistant powered by Gemini and Notion APIs.",
    paragraphs: [
      "AI Notion Assistant automates day-to-day documentation workflows by translating natural language instructions into structured Notion operations. It focuses on reducing repetitive manual edits while keeping workspace data organized.",
      "The project demonstrates practical prompt engineering and API orchestration by connecting Gemini-powered intent understanding to Notion data actions for page creation, restructuring, and content updates.",
    ],
    highlights: [
      "Natural-language-driven Notion workflow automation",
      "Gemini intent handling for structured operations",
      "Prompt engineering for reliable document actions",
    ],
    stack: ["Gemini AI", "Notion API", "Prompt Engineering", "Automation"],
    links: {},
  },
  {
    title: "Airbnb Price Prediction",
    subtitle: "Regression ML Model",
    image: "/projects/airbnb-price-prediction.svg",
    summary:
      "Scikit-learn regression pipeline for estimating listing price from market and listing features.",
    paragraphs: [
      "Airbnb Price Prediction is a regression-focused ML project that models listing prices using features such as location, room type, and availability factors. It includes exploratory data analysis and feature engineering to improve predictive quality.",
      "The project emphasizes practical data science workflow discipline: data cleaning, feature preparation, model comparison, and performance review with explainable variable impacts.",
    ],
    highlights: [
      "Feature engineering for price-sensitive variables",
      "Complete EDA and regression modeling workflow",
      "Scikit-learn based reproducible pipeline",
    ],
    stack: ["Python", "Scikit-learn", "Pandas", "Regression"],
    links: {},
  },
  {
    title: "ProductHub",
    subtitle: "Full-Stack Product Management System",
    image: "/projects/producthub.svg",
    summary:
      "CRUD product management platform with React frontend and Flask REST backend.",
    paragraphs: [
      "ProductHub is a full-stack product management application that supports dynamic product creation, editing, and deletion workflows. It was built to demonstrate practical API integration and UI-state synchronization for business-style operations.",
      "The application pairs a React interface with a Flask REST API backend and emphasizes clean CRUD behavior, responsive forms, and deployable architecture suitable for portfolio and interview demonstrations.",
    ],
    highlights: [
      "End-to-end CRUD operations with REST integration",
      "React + Flask architecture for clear separation of concerns",
      "Deployment-ready structure and API-driven UI behavior",
    ],
    stack: ["React", "Flask", "REST API", "JavaScript", "Python"],
    links: {},
  },
];

export const SKILLS: SkillCategories = {
  programmingLanguages: ["Python", "JavaScript", "Java", "C", "HTML", "CSS"],
  aiMl: [
    "Machine Learning",
    "Generative AI",
    "NLP",
    "LLMs",
    "Prompt Engineering",
    "HuggingFace Transformers",
    "Scikit-learn",
    "CNN",
    "Teachable Machine",
  ],
  frameworksApis: [
    "FastAPI",
    "Flask",
    "React",
    "Streamlit",
    "OpenAI API",
    "Gemini API",
    "Google Document AI",
    "GitHub API",
    "REST APIs",
  ],
  databasesCloud: [
    "Firebase",
    "Firestore",
    "MySQL",
    "SQL",
    "Google Cloud Platform",
    "Oracle Cloud Infrastructure",
  ],
  developerTools: [
    "Git",
    "GitHub",
    "Jupyter Notebook",
    "Google Colab",
    "Power BI",
    "VS Code",
    "OpenCV",
    "Pandas",
    "NumPy",
  ],
};

export const EXPERIENCE: PortfolioExperience[] = [
  {
    org: "Viswam.AI (Swecha & IIIT Hyderabad)",
    role: "AI Developer Intern",
    duration: "May 2025 - Present",
    summary:
      "Built Telugu LLM chatbot systems with measurable quality improvements through dataset curation and prompt optimization.",
    paragraphs: [
      "At Viswam.AI, I worked on production-grade regional language AI, focusing on Telugu conversational systems. I curated 80+ corpus dataset files and improved model quality by building cleaner training data pipelines and stronger prompt structures for intent-heavy interactions.",
      "The work included transformer-based NLP pipelines, intent-classification tuning, and practical RAG workflow experimentation for document-grounded responses. I collaborated with research teams to strengthen multilingual pipeline reliability and reduce conversational error rates.",
    ],
    tools: ["Python", "HuggingFace", "LLM Prompt Engineering", "RAG", "NLP Pipelines"],
    outcomes: [
      "Improved response accuracy by approximately 30%",
      "Reduced conversational errors by approximately 25%",
      "Contributed to scalable regional language AI workflows",
    ],
  },
  {
    org: "Lunabers Space Technology Initiative",
    role: "Data Science & Machine Learning Intern",
    duration: "Feb 2026 - Present",
    summary:
      "Conducting structured AI and analytics research for space robotics, lunar mining, and autonomous mission concepts.",
    paragraphs: [
      "At Lunabers, I analyze space-technology research data and build structured technical frameworks around robotic autonomy, mission planning, and lunar resource operations. My internship focuses on converting exploratory research into organized and decision-ready technical insights.",
      "I contribute through technical reporting, conceptual modeling, and AI-assisted analysis workflows that improve research clarity for early-stage space systems. The work blends AI, data analytics, and robotics-oriented systems thinking in a high-complexity domain.",
    ],
    tools: ["Research Analytics", "ML Concepts", "Data Structuring", "Technical Reporting"],
    outcomes: [
      "Improved clarity of complex research deliverables",
      "Reduced analysis effort through structured frameworks",
      "Contributed to conceptual modeling for lunar operations",
    ],
  },
  {
    org: "DRDO Cybersecurity Research",
    role: "Machine Learning Research Intern",
    duration: "Feb 2025 - Apr 2025",
    summary:
      "Designed ML preprocessing pipelines for intrusion detection using network traffic features and anomaly-focused analysis.",
    paragraphs: [
      "This research internship focused on IDS-oriented machine learning workflows. I analyzed CICIDS-style traffic datasets and engineered 55+ network flow features, including packet statistics, TCP flags, and inter-arrival metrics relevant for attack detection.",
      "I built preprocessing strategies to address missing values, infinite values, and outliers, while studying multi-class attack behavior such as DoS, PortScan, Bot, and BruteForce patterns. The result was a more robust foundation for downstream intrusion-detection modeling.",
    ],
    tools: ["Python", "Pandas", "NumPy", "Jupyter", "Cybersecurity Datasets"],
    outcomes: [
      "Built structured IDS preprocessing pipeline",
      "Improved data quality for model readiness",
      "Enhanced attack pattern analysis and interpretability",
    ],
  },
  {
    org: "Microsoft / Edunet Foundation / AICTE",
    role: "AI Intern",
    duration: "Apr 2025 - May 2025",
    summary:
      "Completed Microsoft GenAI learning track and trained 50+ learners in practical AI productivity workflows.",
    paragraphs: [
      "I completed 26 Microsoft Learn modules focused on Generative AI, Responsible AI, and Copilot productivity patterns. The program sharpened my understanding of enterprise AI adoption and responsible-use principles in real-world settings.",
      "Beyond learning modules, I delivered practical sessions for more than 50 learners, translating advanced AI concepts into usable workflows for task automation, content generation, and responsible AI behavior in productivity environments.",
    ],
    tools: ["Microsoft Learn", "Microsoft Copilot", "Responsible AI"],
    outcomes: [
      "Completed 26 AI learning modules",
      "Trained 50+ learners on applied AI usage",
      "Strengthened enterprise-AI implementation understanding",
    ],
  },
  {
    org: "Shell India / Edunet Foundation",
    role: "Data Analytics Intern",
    duration: "Feb 2025 - Mar 2025",
    summary:
      "Automated ETL and built KPI dashboards for supply-chain reporting and operational visibility.",
    paragraphs: [
      "During this internship, I worked on supply-chain analytics workflows and automated ETL processes to reduce manual reporting effort. I transformed operational datasets into clean analysis-ready models for dashboarding and decision support.",
      "I created Power BI dashboards tracking delivery timelines, supplier behavior, and defect patterns with better clarity and filterability. This improved reporting speed and made KPI insights more actionable for operational review.",
    ],
    tools: ["Power BI", "ETL", "Data Modeling", "Supply Chain Analytics"],
    outcomes: [
      "Reduced manual reporting effort by approximately 40%",
      "Improved reporting clarity by approximately 30%",
      "Enabled stronger KPI-driven decision support",
    ],
  },
  {
    org: "ApexPlanet Software Pvt. Ltd.",
    role: "Web Development Intern",
    duration: "Apr 2025 - May 2025",
    summary:
      "Built responsive React components and API-driven modules with measurable frontend performance improvements.",
    paragraphs: [
      "At ApexPlanet, I developed 7+ responsive UI components and integrated REST API flows with MySQL-backed systems. The internship emphasized practical frontend engineering for real user interactions and data-backed interfaces.",
      "I worked on CRUD modules, interactive forms, and dynamic component rendering while optimizing API behavior to reduce page data load time. This improved both responsiveness and reliability for common application tasks.",
    ],
    tools: ["React", "HTML", "CSS", "JavaScript", "REST APIs", "MySQL"],
    outcomes: [
      "Built 7+ reusable UI components",
      "Reduced application load time by approximately 20%",
      "Improved API-driven UI flow reliability",
    ],
  },
];

export const CERTIFICATIONS: PortfolioCertification[] = [
  {
    title: "Oracle Cloud Infrastructure - AI Foundations Associate",
    issuer: "Oracle",
    year: "2025",
  },
  {
    title: "Machine Learning with Python",
    issuer: "IBM",
    year: "2024",
  },
  {
    title: "Customer Clustering with KMeans",
    issuer: "IBM",
    year: "2024",
  },
  {
    title: "Crash Course on Python",
    issuer: "Google / Coursera",
    year: "2024",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte / Forage",
    year: "2025",
  },
  {
    title: "AI Internship Program",
    issuer: "Microsoft / Edunet Foundation / AICTE",
    year: "2025",
  },
  {
    title: "IoT Bootcamp",
    issuer: "NIELIT / FutureSkills PRIME",
    year: "2024",
  },
];

export const ACHIEVEMENTS = [
  "Runner-Up - AIHack Days 2025 (Viswam.AI Hackathon)",
  "3rd Place - Infinity 2K25 National Hackathon",
  "Top Performer - Flipkart GRiD Challenge",
  "State 1st Rank - Telangana Intermediate Board (2022)",
  "Winner - 3 State-Level Literary Competitions",
];

export const CONTACT: PortfolioContact = {
  phone: "+91 9121290915",
  email: "middepuja1005@gmail.com",
  github: "https://github.com/pujareddy2",
  linkedin: "https://linkedin.com/in/puja-midde3",
  portfolioUrl: "https://puja-portfolio-lime.vercel.app",
  resumeUrl: "/docs/Midde_Puja_Resume.pdf",
};
