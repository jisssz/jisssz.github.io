export type Achievement = {
  title: string;
  roleOrResult: string;
  period: string;
  category: 'COMPETITION' | 'COORDINATION' | 'BOOTCAMP' | 'CERTIFICATION';
};

export const achievementsList: Achievement[] = [
  {
    title: 'EVOLV 1.0 Startup Bootcamp & Pitchathon',
    roleOrResult: '3rd Place',
    period: 'Oct 2024',
    category: 'COMPETITION',
  },
  {
    title: 'UI Blindfold Event — Techletics ’26',
    roleOrResult: 'Event Coordinator',
    period: 'Jan 2026',
    category: 'COORDINATION',
  },
  {
    title: 'Immersive AR/VR Experience Event',
    roleOrResult: 'Core Coordinator',
    period: 'Jan 2026',
    category: 'COORDINATION',
  },
  {
    title: 'Python Essentials 1 & 2 (Cisco)',
    roleOrResult: 'Cisco Networking Academy',
    period: 'Jun 2025',
    category: 'CERTIFICATION',
  },
  {
    title: 'Digital 101 Tech Skills',
    roleOrResult: 'Gold Category',
    period: 'May 2025',
    category: 'CERTIFICATION',
  },
  {
    title: 'Cybersecurity Bootcamp',
    roleOrResult: 'Student Coordinator',
    period: '2025',
    category: 'COORDINATION',
  },
  {
    title: 'Full-Stack Web Development Bootcamp',
    roleOrResult: 'Udemy (In Progress)',
    period: '2025',
    category: 'BOOTCAMP',
  },
  {
    title: 'BeachHack Outreach Initiative',
    roleOrResult: 'Elderly Mobile Awareness Session',
    period: 'Jan 2026',
    category: 'COORDINATION',
  },
  {
    title: 'War Room Startup Marathon',
    roleOrResult: 'Participant & Strategy Builder',
    period: '2025',
    category: 'COMPETITION',
  },
  {
    title: 'Jumpstart 7.0 Innovation Bootcamp',
    roleOrResult: 'Participant',
    period: '2025',
    category: 'BOOTCAMP',
  },
  {
    title: 'Robotics & IoT Workshop',
    roleOrResult: 'Hands-on Prototyping',
    period: 'Nov 2024',
    category: 'BOOTCAMP',
  },
  {
    title: 'AVIATOR Entrepreneurship Workshop',
    roleOrResult: 'Participant',
    period: 'Feb 2025',
    category: 'BOOTCAMP',
  },
];

export const societiesList = [
  'Member, FOSS Club — CCE',
  'Design Team Member, TinkerHub CCE',
  'Event Coordinator, Community of Developers (CODe) — CCE',
  'Member, English Club — CCE',
  'Member, Speech Club — CCE',
  'Member, TinkerHub CCE',
  'Member, Game Development Club — CCE',
  'Member, IEDC Club — CCE',
  'Member, NDLI Club — CCE',
];
