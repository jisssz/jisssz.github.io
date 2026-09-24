export interface LinkedInProfile {
  name: string;
  headline: string;
  location: string;
  summary: string;
  profileUrl: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    score: string;
    scoreType: string;
  }[];
  experience: {
    title: string;
    organization: string;
    period: string;
    location: string;
    description: string;
    highlights: string[];
  }[];
  certifications: {
    title: string;
    issuer: string;
    date: string;
  }[];
  campusLeadership: string[];
}

export interface LinkedInPost {
  id: string;
  date: string;
  title: string;
  content: string;
  hashtags: string[];
  images: string[];
  mediaStatus: 'LOCALLY_AVAILABLE' | 'IMAGE NOT LOCALLY AVAILABLE';
  category: 'HACKATHON' | 'COORDINATION' | 'COMMUNITY' | 'ACHIEVEMENT' | 'EXPERIENCE' | 'PROJECT';
  relatedSkills: string[];
  relatedProject?: string;
  postUrl: string;
}

export const linkedInProfile: LinkedInProfile = {
  name: 'Jis Shajan',
  headline: 'Computer Science & Engineering Undergraduate | Data Science Enthusiast | Creative Developer',
  location: 'Thrissur, Kerala, India',
  summary: 'Computer Science Engineering undergraduate passionate about software development, data science, and emerging technologies, with hands-on experience through academic projects, technical events, and collaborative initiatives. Skilled in Python, C, and Java with strong problem-solving ability and growing experience in application development. Experienced in event coordination, team management, and marketing collaboration, with active participation and achievements in technical competitions and student-led activities.',
  profileUrl: 'https://www.linkedin.com/in/jis-shajan',
  education: [
    {
      institution: 'Christ College of Engineering, Irinjalakuda',
      degree: 'B.Tech Computer Science & Engineering (Data Science)',
      period: 'Sept 2024 – Present',
      score: '8.96 / 10',
      scoreType: 'CGPA',
    },
    {
      institution: 'Don Bosco School, Mannuthy',
      degree: 'Higher Secondary Education',
      period: 'Apr 2023 – Apr 2024',
      score: '96.8%',
      scoreType: 'Percentage',
    },
    {
      institution: 'BVP School, Adat',
      degree: 'Secondary Education',
      period: 'Completed Apr 2023',
      score: '80.0%',
      scoreType: 'Percentage',
    },
  ],
  experience: [
    {
      title: 'Project Management & Franchise Strategy Intern',
      organization: 'CBS Ventures',
      period: '2025',
      location: 'Kochi, Kerala, India',
      description: 'Managed end-to-end franchise proposal evaluation workflows (100+ proposals), strategy analysis, district-level coworking space research across Kerala, and client engagement tracking utilizing Zoho CRM and Zoho Projects.',
      highlights: ['100+ Proposals Managed', 'Franchise Strategy Analysis', 'Zoho CRM & Projects', 'Workflow Optimization'],
    },
    {
      title: 'Core Marketing Team Lead',
      organization: 'Student Internship Initiative',
      period: '2025',
      location: 'Kerala, India',
      description: 'Led marketing outreach, coordinated team planning, and supported execution of a student-driven internship initiative; concluded due to academic time constraints.',
      highlights: ['Marketing Outreach', 'Team Planning', 'Initiative Execution', 'Academic Leadership'],
    },
    {
      title: 'Event Coordinator & Community Lead',
      organization: 'Techletics, TinkerHub & CODe',
      period: '2025 – 2026',
      location: 'Christ College of Engineering',
      description: 'Coordinated technical events including UI Blindfold at Techletics ’26, Immersive AR/VR experience, and cybersecurity bootcamps across campus communities.',
      highlights: ['Techletics ’26 UI Blindfold', 'Immersive AR/VR Experience', 'Cybersecurity Bootcamp', 'Class Representative'],
    },
  ],
  certifications: [
    {
      title: 'Python Essentials 1 & 2',
      issuer: 'Cisco Networking Academy',
      date: 'Jun 2025',
    },
    {
      title: 'Digital 101 Tech Skills (Gold Category)',
      issuer: 'National Tech Initiative',
      date: 'May 2025',
    },
    {
      title: 'Full-Stack Web Development Bootcamp',
      issuer: 'Udemy (In Progress)',
      date: '2025',
    },
  ],
  campusLeadership: [
    'Executive Member, Community of Developers (CODe) — CCE',
    'Design Team Member, TinkerHub CCE',
    'Member, FOSS Club — CCE',
    'Member, IEDC Club — CCE',
    'Member, English Club — CCE',
    'Member, Speech Club — CCE',
    'Member, Game Development Club — CCE',
    'Member, NDLI Club — CCE',
  ],
};

export const linkedInPosts: LinkedInPost[] = [
  {
    id: 'post-01',
    date: 'Sep 2026',
    title: 'Smart India Hackathon 2026 — Nominated as Team Leader (JAMH X4)',
    content: 'Proud to be nominated as Team Leader for Team JAMH X4 representing Christ College of Engineering at Smart India Hackathon 2026! Working on Problem Statement SIH26034 under the Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution. Our project, Legal Metrology Compliance Checker (LMCC), is an offline-first PWA powered by client-side WebAssembly Tesseract.js OCR that verifies packaged commodity compliance against Rule 6 with zero server image leakage.',
    hashtags: ['#SmartIndiaHackathon', '#SIH2026', '#LegalMetrology', '#PWA', '#WebAssembly', '#ComputerVision'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'HACKATHON',
    relatedSkills: ['Offline-First PWA', 'Tesseract.js / WASM', 'React', 'FastAPI', 'Legal Metrology Rules Engine'],
    relatedProject: 'SIH 2026 LMCC (JAMH X4)',
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
  {
    id: 'post-02',
    date: 'Jan 2026',
    title: 'Coordinating Techletics ’26: UI Blindfold & Immersive AR/VR',
    content: 'Thrilled to serve as Event Coordinator for the UI Blindfold event and Core Coordinator for the Immersive AR/VR experience at Techletics ’26 (Christ College of Engineering). Challenging student developers to design and code production-grade interfaces under extreme constraints pushed creative problem solving to new heights.',
    hashtags: ['#Techletics26', '#UIDesign', '#EventCoordination', '#ARVR', '#StudentLeadership', '#CCE'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'COORDINATION',
    relatedSkills: ['Event Management', 'UI/UX Design', 'AR/VR Coordination', 'Public Speaking'],
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
  {
    id: 'post-03',
    date: 'Jan 2026',
    title: 'BeachHack Outreach: Elderly Mobile Awareness & Digital Literacy',
    content: 'As part of our BeachHack social outreach initiative, led a dedicated digital awareness and smartphone literacy workshop for elderly citizens. Demystifying mobile interfaces, online safety, payment verification, and scam prevention to bridge the digital divide.',
    hashtags: ['#BeachHack', '#CommunityOutreach', '#DigitalInclusion', '#SocialImpact', '#TechForGood'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'COMMUNITY',
    relatedSkills: ['Community Outreach', 'Empathy & Communication', 'Digital Literacy', 'Social Impact'],
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
  {
    id: 'post-04',
    date: 'Oct 2024',
    title: '3rd Place Winner at EVOLV 1.0 Startup Pitchathon',
    content: 'Excited to share that our team secured 3rd Place at the EVOLV 1.0 Startup Bootcamp & Pitchathon! We pitched the Medical Fitness & Care App — an emergency medicine accessibility and triage consultation platform addressing acute last-mile healthcare logistics.',
    hashtags: ['#StartupPitchathon', '#EVOLV', '#HealthTech', '#Innovation', '#Entrepreneurship'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'ACHIEVEMENT',
    relatedSkills: ['Startup Pitching', 'Product Architecture', 'Healthcare Tech', 'Business Modeling'],
    relatedProject: 'Medical Fitness & Care App',
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
  {
    id: 'post-05',
    date: 'Jun 2025',
    title: 'Cisco Networking Academy — Python Essentials 1 & 2 Certified',
    content: 'Earned dual certification in Python Essentials 1 and 2 from Cisco Networking Academy. Strengthened core programming paradigms: OOP, algorithm optimization, exception handling, data structures, and modular software packaging.',
    hashtags: ['#Cisco', '#PythonCertified', '#SoftwareEngineering', '#DataStructures', '#ContinuousLearning'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'ACHIEVEMENT',
    relatedSkills: ['Python', 'Object-Oriented Programming', 'Data Structures & Algorithms', 'Cisco Academy'],
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
  {
    id: 'post-06',
    date: '2025',
    title: 'CBS Ventures: Scaling Franchise Strategy & Proposal Workflows',
    content: 'Reflecting on my experience as Project Management Intern at CBS Ventures (Kochi). Streamlined franchise evaluation across 100+ business proposals, executed district-level coworking space research across Kerala, and utilized Zoho CRM to drive operational consistency.',
    hashtags: ['#ProjectManagement', '#CBSVentures', '#ZohoCRM', '#FranchiseStrategy', '#BusinessOperations'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'EXPERIENCE',
    relatedSkills: ['Zoho CRM & Projects', 'Franchise Strategy', 'Data Research', 'Client Workflows'],
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
  {
    id: 'post-07',
    date: '2025',
    title: 'GreenPulse / EchoScan — Civic Environmental Action Architecture',
    content: 'Engineered GreenPulse: a full-stack civic reporting platform designed to eliminate bureaucracy in environmental issue management. Built with Spring Boot 3, React, Leaflet geo-mapping, and JWT role-based security to empower citizens and field teams with real-time tracking.',
    hashtags: ['#CivicTech', '#SpringBoot', '#ReactJS', '#LeafletMaps', '#FullStackDevelopment'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'PROJECT',
    relatedSkills: ['Spring Boot', 'React', 'Leaflet', 'MySQL', 'JWT Security', 'REST APIs'],
    relatedProject: 'GreenPulse / EchoScan',
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
  {
    id: 'post-08',
    date: '2025',
    title: 'EcoClassify AI — On-Device Computer Vision Waste Sorting',
    content: 'Developed EcoClassify AI to bring real-time recyclable and organic waste classification directly into client browsers using TensorFlow.js and a lightweight Flask backend, demonstrating edge AI capabilities without server computational bottlenecks.',
    hashtags: ['#ArtificialIntelligence', '#TensorFlow', '#MachineLearning', '#EdgeAI', '#Flask'],
    images: ['IMAGE NOT LOCALLY AVAILABLE'],
    mediaStatus: 'IMAGE NOT LOCALLY AVAILABLE',
    category: 'PROJECT',
    relatedSkills: ['TensorFlow.js', 'Flask', 'Computer Vision', 'Python', 'Client-Side AI'],
    relatedProject: 'EcoClassify AI',
    postUrl: 'https://www.linkedin.com/in/jis-shajan',
  },
];
