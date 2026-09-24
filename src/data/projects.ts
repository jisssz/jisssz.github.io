export type Project = {
  number: string;
  name: string;
  descriptor: string;
  description: string;
  tech: string[];
  accent: string;
  highlight?: string;
  featured?: boolean;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    number: '01',
    name: 'GREENPULSE / ECHOSCAN',
    descriptor: 'Civic environmental issue reporting & monitoring platform',
    description: 'A comprehensive civic platform for environmental issue reporting and resolution workflows. Features multi-role access (Citizen, Moderator, Field Worker, Admin), enforcement tracking, interactive geographic mapping, and civic reward mechanisms.',
    tech: ['React', 'Spring Boot', 'JWT Security', 'JPA / Hibernate', 'MySQL', 'Leaflet Maps', 'Chart.js'],
    accent: '#ff9a3d',
    highlight: 'Flagship Full-Stack Platform',
    featured: true,
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '02',
    name: 'ECOCLASSIFY AI',
    descriptor: 'AI web application for automated waste classification',
    description: 'An AI-powered web platform for real-time waste sorting and classification using Flask, client-side inference via TensorFlow.js, and an SQLAlchemy database backend.',
    tech: ['Flask', 'TensorFlow.js', 'SQLAlchemy', 'Python', 'Computer Vision'],
    accent: '#ff7700',
    highlight: 'Machine Learning System',
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '03',
    name: 'AI SHOPPING ASSISTANT',
    descriptor: 'Desktop application with secure login & modular architecture',
    description: 'A desktop application built using Java Swing, JDBC, and MySQL featuring user authentication, product catalog management, and modular system design.',
    tech: ['Java Swing', 'JDBC', 'MySQL', 'Desktop UI'],
    accent: '#f59e0b',
    highlight: 'Desktop Application',
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '04',
    name: 'ECOPOINTS PLATFORM',
    descriptor: 'Reward-based waste management with QR tagging',
    description: 'A civic waste management concept incorporating QR code tagging, user reward mechanisms, and environmental activity analytics.',
    tech: ['QR Tagging', 'Civic Tech', 'Analytics', 'Web Application'],
    accent: '#ea580c',
    highlight: 'Civic Technology',
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '05',
    name: 'FOOD SPOILAGE DETECTOR',
    descriptor: 'Arduino-based sensor system for real-time monitoring',
    description: 'An embedded hardware prototype using Arduino and gas/temperature sensors to monitor and signal real-time food spoilage patterns.',
    tech: ['Arduino', 'Hardware Sensors', 'Embedded C', 'IoT'],
    accent: '#f97316',
    highlight: 'IoT & Sensors',
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '06',
    name: 'MEDICAL FITNESS & CARE',
    descriptor: 'Healthcare consultation & medicine-access concept',
    description: 'A digital healthcare product concept designed to streamline patient consultation and local medicine access. Pitched at EVOLV 1.0 startup competition.',
    tech: ['Product Design', 'Healthcare Architecture', 'Strategy'],
    accent: '#fb923c',
    highlight: 'Pitchathon — 3rd Place',
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '07',
    name: 'WAR ROOM STARTUP SIM',
    descriptor: 'MVP planning & startup strategy simulation',
    description: 'An intensive startup strategy and fast-paced MVP planning simulation exercise focusing on business model viability and rapid problem-solving.',
    tech: ['MVP Planning', 'Startup Strategy', 'Agile Architecture'],
    accent: '#fdba74',
    highlight: 'Strategy Simulation',
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '08',
    name: 'LEGAL METROLOGY CHECKER (LMCC)',
    descriptor: 'Smart India Hackathon 2026 • Problem SIH26034 (Dept. of Consumer Affairs)',
    description: 'Offline-first Progressive Web Application designed by Team JAMH X4. Performs 100% client-side WebAssembly OCR (Tesseract.js) to evaluate packaged commodity labels against Rule 6 legal declarations with zero cloud image leakage.',
    tech: ['React', 'TypeScript', 'Tesseract.js WASM', 'Tailwind CSS', 'IndexedDB', 'FastAPI'],
    accent: '#ff5500',
    highlight: 'SIH 2026 Team Leader (JAMH X4)',
    featured: true,
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '09',
    name: 'DAILYVERSE AUTOMATOR',
    descriptor: 'Brand automation & digital asset orchestration engine',
    description: 'Cloud and edge automation system engineered to synchronize content assets, coordinate multi-platform API publishing across Pinterest and YouTube, and automate digital brand operations.',
    tech: ['React', 'TypeScript', 'Supabase', 'Pinterest API', 'n8n Workflows'],
    accent: '#ea580c',
    highlight: 'Automation Engine',
    githubUrl: 'https://github.com/jisssz',
  },
  {
    number: '10',
    name: 'HELL YEAH USELESS API',
    descriptor: 'Microservice API gateway & quirky endpoint sandbox',
    description: 'A developer sandbox exploring microservice orchestration, lightweight Node.js/Render deployment, and unconventional public API endpoints.',
    tech: ['Node.js', 'Express', 'Render Cloud', 'REST API'],
    accent: '#f97316',
    highlight: 'API Sandbox',
    githubUrl: 'https://github.com/jisssz',
  },
];
