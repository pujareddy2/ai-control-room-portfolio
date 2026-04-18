export type ModuleId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "certifications"
  | "contact";

export type ModuleTheme = {
  accent: string;
  glow: string;
  label: string;
};

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

export const MODULE_THEMES: Record<ModuleId, ModuleTheme> = {
  about: { accent: "#8ddcff", glow: "rgba(141, 220, 255, 0.28)", label: "ABOUT" },
  projects: { accent: "#5eead4", glow: "rgba(94, 234, 212, 0.28)", label: "PROJECTS" },
  skills: { accent: "#7dd3fc", glow: "rgba(125, 211, 252, 0.28)", label: "SKILLS" },
  experience: { accent: "#a78bfa", glow: "rgba(167, 139, 250, 0.28)", label: "EXPERIENCE" },
  certifications: { accent: "#fbbf24", glow: "rgba(251, 191, 36, 0.28)", label: "CERTIFICATIONS" },
  contact: { accent: "#f97316", glow: "rgba(249, 115, 22, 0.28)", label: "CONTACT" },
};

export const ABOUT = {
  name: "Puja Midde",
  title: "Applied AI Developer | Machine Learning Engineer",
  college: "Stanley College of Engineering and Technology for Women, Hyderabad",
  education: "Final-year B.E. Computer Science (CGPA: 8.8/10)",
  summary:
    "Final-year Computer Science student and fresher focused on Applied AI, Machine Learning, and production-ready intelligent systems. I build practical AI solutions with strong foundations in NLP, LLM workflows, full-stack APIs, and data-driven engineering.",
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
      "AI-driven Ayurvedic wellness platform for plant scanning, health guidance, and smart recommendations.",
    paragraphs: [
      "Developed an AI-driven healthcare assistant integrating Teachable Machine image classification and OpenAI chatbot capabilities to support real-time wellness exploration and medicinal-plant guidance.",
      "Implemented FastAPI backend services with Firebase integration for real-time health tracking, symptom support, and connected feature modules across chatbot, tracker, store, and recommendation flows.",
    ],
    highlights: [
      "Developed leaf identification system for medicinal plants with real-time prediction and benefit recommendations",
      "Integrated Teachable Machine + OpenAI API for AI classification and chatbot assistance",
      "Implemented backend using FastAPI and Firebase for real-time data workflows",
      "Designed features including AI chatbot, symptom tracker, Ayurvedic store, and wellness recommendations",
      "Delivered an end-to-end AI + healthcare product experience from scan to recommendation",
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
    title: "Canoply",
    subtitle: "Modern SaaS Product Landing Experience",
    image: "/projects/stay-booking.svg",
    summary:
      "Modern product landing and conversion-oriented web experience with clean section architecture.",
    paragraphs: [
      "Designed and implemented a polished product interface with strong hero messaging, feature storytelling, and clear CTA structure for better user onboarding and conversion flow.",
      "Focused on responsive design, smooth interactions, and production-ready component structure to make the landing journey professional across desktop and mobile.",
    ],
    highlights: [
      "Built a visually consistent, conversion-friendly UI with clear navigation",
      "Implemented responsive layouts and smooth motion-based interactions",
      "Structured sections for marketing, trust signals, and action flow",
      "Delivered a professional SaaS-style product showcase experience",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
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
    links: {
      live: "https://notion-assistant.vercel.app/",
      github: "https://github.com/pujareddy2/notion-assistant.git",
    },
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
    links: {
      github: "https://github.com/pujareddy2/airbnb.git",
    },
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
    links: {
      live: "https://pujareddy2.github.io/ProductHub/",
      github: "https://github.com/pujareddy2/ProductHub.git",
    },
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
      "Engineering production-grade Telugu LLM chatbot pipelines with measurable quality and accuracy improvements.",
    paragraphs: [
      "Built transformer-based Telugu NLP systems by curating 80+ high-quality corpus datasets and improving training reliability for production conversational AI behavior.",
      "Worked on intent classification, prompt engineering, and RAG-integrated workflows in collaboration with IIIT Hyderabad research teams for scalable regional-language AI systems.",
    ],
    tools: ["Python", "HuggingFace", "Transformers", "RAG", "Prompt Engineering"],
    outcomes: [
      "Engineered a production-grade Telugu LLM chatbot by curating 80+ corpus datasets and fine-tuning transformer NLP pipelines, improving response accuracy by 30%.",
      "Designed and optimized intent classification workflows with prompt engineering, reducing conversational errors by 25%.",
      "Built and tested RAG-based chatbot pipelines integrating document retrieval and LLM inference for contextual responses.",
      "Collaborated with IIIT Hyderabad researchers on NLP architecture and dataset structuring for scalable regional AI systems.",
      "Worked on tokenization, embeddings, and preprocessing to improve multilingual conversational model performance.",
    ],
  },
  {
    org: "Lunabers Space Technology Initiative",
    role: "Data Science & Machine Learning Intern",
    duration: "Feb 2026 - Present",
    summary:
      "Applying machine learning and analytics to space robotics and autonomous mission intelligence workflows.",
    paragraphs: [
      "Contributed to AI research around autonomous decision-making for lunar mining and extraterrestrial robotics through structured analysis frameworks.",
      "Translated high-complexity space-tech datasets into actionable insights and technical reports for cross-functional research communication.",
    ],
    tools: ["Machine Learning", "Research Analytics", "Data Structuring", "Technical Reporting"],
    outcomes: [
      "Applied machine learning techniques to space robotics datasets for autonomous decision-making analysis.",
      "Developed structured AI research frameworks that improved documentation clarity and reduced analysis time.",
      "Conducted research on robotic autonomy, mission planning, and intelligent control systems with actionable outputs.",
      "Produced analytical reports on AI-driven space exploration models for technical team communication.",
      "Explored integration of AI, robotics, and analytics for next-generation space infrastructure concepts.",
    ],
  },
  {
    org: "DRDO Cybersecurity Research",
    role: "Machine Learning Research Intern",
    duration: "Feb 2025 - Apr 2025",
    summary:
      "Built intrusion-detection-ready ML pipelines with deep feature engineering and robust preprocessing workflows.",
    paragraphs: [
      "Engineered rich network traffic features and developed data preprocessing systems for reliable training quality in cybersecurity ML pipelines.",
      "Performed attack-class analysis and interpretability studies to improve practical anomaly-detection model readiness.",
    ],
    tools: ["Python", "Pandas", "Feature Engineering", "EDA", "Cybersecurity ML"],
    outcomes: [
      "Engineered 55+ packet and flow-level network features for intrusion detection modeling using Python and Pandas.",
      "Built complete preprocessing pipelines handling missing values, infinite values, and outliers for high-quality datasets.",
      "Performed multi-class attack classification across DoS, PortScan, Bot, and BruteForce categories.",
      "Conducted exploratory analysis and feature correlation studies to improve model interpretability and accuracy.",
      "Contributed to production-level anomaly-detection workflow design for cybersecurity ML systems.",
    ],
  },
  {
    org: "Shell India (Edunet Foundation)",
    role: "Data Analytics Intern",
    duration: "Feb 2025 - Mar 2025",
    summary:
      "Automated ETL and built KPI dashboards for supply-chain visibility and faster data-driven reporting.",
    paragraphs: [
      "Automated data processing workflows and improved business reporting speed through cleaner ETL and data modeling pipelines.",
      "Developed dashboard systems with KPI tracking for operations, supplier performance, and delivery-quality decision support.",
    ],
    tools: ["Power BI", "ETL", "Data Modeling", "Analytics"],
    outcomes: [
      "Automated end-to-end ETL workflows for supply chain datasets, reducing manual reporting effort by 40%.",
      "Designed Power BI dashboards for timeline, supplier, and defect KPIs, improving clarity by 30%.",
      "Built relationship-driven data models enabling dynamic filtering and real-time business insight.",
      "Analyzed logistics and operations data to identify bottlenecks and optimization opportunities.",
      "Translated raw datasets into decision-ready insights through clear visual analytics workflows.",
    ],
  },
  {
    org: "ApexPlanet Software Pvt. Ltd.",
    role: "Web Development Intern",
    duration: "Apr 2025 - May 2025",
    summary:
      "Developed responsive React interfaces and API-driven modules with improved frontend performance.",
    paragraphs: [
      "Built reusable frontend components and integrated API-driven data behavior for practical business workflow interfaces.",
      "Focused on usability, rendering optimization, and backend-connected CRUD modules for real-world web app functionality.",
    ],
    tools: ["React", "JavaScript", "HTML", "CSS", "REST API", "MySQL"],
    outcomes: [
      "Developed 7+ responsive UI components using React, HTML, CSS, and JavaScript for better usability.",
      "Integrated REST APIs with MySQL-backed systems for dynamic data handling.",
      "Reduced application load time by 20% through optimized API calls and component rendering.",
      "Built CRUD modules, interactive forms, and API-driven features for practical product use cases.",
      "Strengthened frontend architecture and state-driven workflow implementation through production tasks.",
    ],
  },
  {
    org: "Microsoft (Edunet Foundation & AICTE)",
    role: "AI Intern",
    duration: "Apr 2025 - May 2025",
    summary:
      "Completed structured GenAI upskilling and delivered practical AI productivity sessions for learners.",
    paragraphs: [
      "Completed Microsoft Learn training tracks on Generative AI, Responsible AI, and Copilot workflows aligned with enterprise use cases.",
      "Delivered practical sessions to learners on AI-assisted productivity and real-world responsible AI adoption patterns.",
    ],
    tools: ["Microsoft Learn", "Microsoft Copilot", "Responsible AI", "GenAI Workflows"],
    outcomes: [
      "Completed 26 Microsoft Learn modules across Generative AI, Responsible AI, and Copilot.",
      "Delivered AI productivity training sessions to 50+ learners using practical use cases.",
      "Applied Microsoft Copilot for automation, content generation, and workflow optimization.",
      "Gained practical exposure to fairness, transparency, and ethical AI deployment principles.",
      "Strengthened understanding of enterprise-grade AI tools and ecosystems aligned with industry standards.",
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
