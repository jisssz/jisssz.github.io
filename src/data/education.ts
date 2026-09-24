export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  score: string;
  scoreLabel: string;
  location: string;
};

export const educationList: EducationItem[] = [
  {
    institution: 'Christ College of Engineering, Irinjalakuda',
    degree: 'B.Tech Computer Science & Engineering',
    period: 'September 2024 – Present',
    score: '8.96 / 10',
    scoreLabel: 'CGPA',
    location: 'Kerala, India',
  },
  {
    institution: 'Don Bosco School, Mannuthy',
    degree: 'Higher Secondary Education',
    period: 'April 2023 – April 2024',
    score: '96.8%',
    scoreLabel: 'Percentage',
    location: 'Thrissur, India',
  },
  {
    institution: 'BVP School, Adat',
    degree: 'Secondary School Education',
    period: 'Completed April 2023',
    score: '80.0%',
    scoreLabel: 'Percentage',
    location: 'Thrissur, India',
  },
];
