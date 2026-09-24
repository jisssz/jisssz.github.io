export type SkillAnimation = 'float' | 'pulse' | 'orbit' | 'glow' | 'breathe';

export type SkillItem = {
  id: string;
  name: string;
  animation: SkillAnimation;
  color: string;
  iconKey: string;
  subtitle?: string;
};

export type SkillCategory = {
  id: string;
  number: string;
  tag: string;
  label: string;
  title: string;
  summary: string;
  focus: string;
  skills: SkillItem[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'foundations',
    number: '01',
    tag: '[ 01 // FOUNDATIONS ]',
    label: 'Programming & Core CS',
    title: 'Programming & Core Computer Science',
    summary:
      'Strong algorithmic foundations, object-oriented software engineering, clean coding practices, and core systems architecture.',
    focus: 'Focus: Software Development & Core CS Fundamentals',
    skills: [
      { id: 'python', name: 'Python', animation: 'float', color: '#387EB8', iconKey: 'python' },
      { id: 'java', name: 'Java', animation: 'breathe', color: '#E76F00', iconKey: 'java' },
      { id: 'c', name: 'C', animation: 'glow', color: '#659AD2', iconKey: 'c' },
      { id: 'javascript', name: 'JavaScript', animation: 'float', color: '#F7DF1E', iconKey: 'javascript' },
      { id: 'html5', name: 'HTML5', animation: 'pulse', color: '#E34F26', iconKey: 'html5' },
      { id: 'css3', name: 'CSS3', animation: 'breathe', color: '#1572B6', iconKey: 'css3' },
      { id: 'sql', name: 'SQL', animation: 'glow', color: '#00758F', iconKey: 'sql' },
      { id: 'shell', name: 'Shell Scripting', animation: 'orbit', color: '#4EAA25', iconKey: 'shell' },
      { id: 'dsa', name: 'DSA', animation: 'float', color: '#FF5500', iconKey: 'dsa', subtitle: 'Data Structures & Algorithms' },
      { id: 'oop', name: 'OOP', animation: 'breathe', color: '#FF7700', iconKey: 'oop', subtitle: 'Object-Oriented Design' },
      { id: 'problem-solving', name: 'Problem Solving', animation: 'glow', color: '#FFAA00', iconKey: 'problem-solving' },
      { id: 'os', name: 'Operating Systems', animation: 'orbit', color: '#FF5500', iconKey: 'os' },
      { id: 'dbms', name: 'DBMS Fundamentals', animation: 'pulse', color: '#00B4D8', iconKey: 'dbms' },
    ],
  },
  {
    id: 'fullstack-ai',
    number: '02',
    tag: '[ 02 // FULL-STACK & AI ]',
    label: 'Frameworks, Libraries & ML',
    title: 'Frameworks, Libraries & Machine Learning',
    summary:
      'Modern reactive frontend interfaces, scalable enterprise backend services, and machine learning inference pipelines.',
    focus: 'Focus: Full-Stack Architecture & AI / ML Inference',
    skills: [
      { id: 'react', name: 'React.js', animation: 'orbit', color: '#61DAFB', iconKey: 'react' },
      { id: 'bootstrap', name: 'Bootstrap', animation: 'pulse', color: '#7952B3', iconKey: 'bootstrap' },
      { id: 'springboot', name: 'Spring Boot', animation: 'glow', color: '#6DB33F', iconKey: 'springboot' },
      { id: 'tensorflow', name: 'TensorFlow', animation: 'float', color: '#FF6F00', iconKey: 'tensorflow' },
      { id: 'numpy', name: 'NumPy', animation: 'breathe', color: '#4DABCF', iconKey: 'numpy' },
    ],
  },
  {
    id: 'tools-workflows',
    number: '03',
    tag: '[ 03 // TOOLS & WORKFLOWS ]',
    label: 'Developer Tools & Practices',
    title: 'Developer Tools & Software Development',
    summary:
      'Professional developer toolchains, Git version control, Unix environments, debugging workflows, and collaborative clean coding.',
    focus: 'Focus: Developer Toolchains & Engineering Hygiene',
    skills: [
      { id: 'git', name: 'Git', animation: 'pulse', color: '#F05032', iconKey: 'git' },
      { id: 'github', name: 'GitHub', animation: 'glow', color: '#FFFFFF', iconKey: 'github' },
      { id: 'linux', name: 'Linux / Unix Shell', animation: 'orbit', color: '#FCC624', iconKey: 'linux' },
      { id: 'vscode', name: 'VS Code', animation: 'float', color: '#007ACC', iconKey: 'vscode' },
      { id: 'debugging', name: 'Debugging', animation: 'breathe', color: '#FF5500', iconKey: 'debugging' },
      { id: 'code-opt', name: 'Code Optimization', animation: 'glow', color: '#10B981', iconKey: 'code-opt' },
      { id: 'version-ctrl', name: 'Version Control', animation: 'orbit', color: '#F05032', iconKey: 'version-ctrl' },
      { id: 'clean-code', name: 'Clean Coding', animation: 'pulse', color: '#6366F1', iconKey: 'clean-code' },
      { id: 'collaboration', name: 'Collaboration', animation: 'float', color: '#EC4899', iconKey: 'collaboration' },
    ],
  },
  {
    id: 'project-management',
    number: '04',
    tag: '[ 04 // PROJECT & MANAGEMENT ]',
    label: 'Project Management & Leadership',
    title: 'Project Management & Leadership',
    summary:
      'Workflow coordination across 100+ company proposals at CBS Ventures, technical hackathon event management, and team leadership.',
    focus: 'Focus: Technical Project Coordination & Delivery',
    skills: [
      { id: 'event-coord', name: 'Event Coordination', animation: 'float', color: '#FF5500', iconKey: 'event-coord' },
      { id: 'team-mgmt', name: 'Team Management', animation: 'orbit', color: '#3B82F6', iconKey: 'team-mgmt' },
      { id: 'marketing-outreach', name: 'Marketing & Outreach', animation: 'glow', color: '#F59E0B', iconKey: 'marketing-outreach' },
      { id: 'project-planning', name: 'Project Planning', animation: 'breathe', color: '#10B981', iconKey: 'project-planning' },
    ],
  },
  {
    id: 'interests',
    number: '05',
    tag: '[ 05 // INTERESTS ]',
    label: 'Technology, Data & Product',
    title: 'Technology, Data & Product Innovation',
    summary:
      'Exploring data-driven insights, product architecture, market viability analysis, and practical technical solutions.',
    focus: 'Focus: Data Analytics & Product Strategy',
    skills: [
      { id: 'data-analytics', name: 'Data Analytics', animation: 'float', color: '#06B6D4', iconKey: 'data-analytics' },
      { id: 'product-dev', name: 'Product Development', animation: 'orbit', color: '#8B5CF6', iconKey: 'product-dev' },
      { id: 'tech-solutions', name: 'Technology Solutions', animation: 'glow', color: '#F59E0B', iconKey: 'tech-solutions' },
      { id: 'marketing-strat', name: 'Marketing Strategy', animation: 'breathe', color: '#EC4899', iconKey: 'marketing-strat' },
    ],
  },
  {
    id: 'professional',
    number: '06',
    tag: '[ 06 // PROFESSIONAL ]',
    label: 'Professional Competencies',
    title: 'Professional Skills',
    summary:
      'Clear stakeholder communication, agile team leadership, structured time allocation, and rapid adaptability in dynamic environments.',
    focus: 'Focus: Executive Communication & Team Agility',
    skills: [
      { id: 'communication', name: 'Communication', animation: 'float', color: '#3B82F6', iconKey: 'communication' },
      { id: 'leadership', name: 'Leadership', animation: 'glow', color: '#FF5500', iconKey: 'leadership' },
      { id: 'teamwork', name: 'Teamwork', animation: 'pulse', color: '#10B981', iconKey: 'teamwork' },
      { id: 'time-mgmt', name: 'Time Management', animation: 'orbit', color: '#8B5CF6', iconKey: 'time-mgmt' },
      { id: 'adaptability', name: 'Adaptability', animation: 'breathe', color: '#F59E0B', iconKey: 'adaptability' },
    ],
  },
  {
    id: 'languages',
    number: '07',
    tag: '[ 07 // LANGUAGES ]',
    label: 'Communication Languages',
    title: 'Communication Languages',
    summary:
      'Multi-lingual fluency enabling clear cross-cultural dialogue, technical documentation, public presentation, and team coordination.',
    focus: 'Focus: Multi-Lingual Fluency & Regional Outreach',
    skills: [
      { id: 'english', name: 'English', animation: 'float', color: '#3B82F6', iconKey: 'lang-en', subtitle: 'Professional Proficiency' },
      { id: 'hindi', name: 'Hindi', animation: 'glow', color: '#F59E0B', iconKey: 'lang-hi', subtitle: 'Fluent Communication' },
      { id: 'malayalam', name: 'Malayalam', animation: 'pulse', color: '#10B981', iconKey: 'lang-ml', subtitle: 'Native Fluency' },
    ],
  },
];
