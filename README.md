# JIS SHAJAN — Developer Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-jis--shajan--portfolio.vercel.app-FF5500?style=for-the-badge&logo=vercel&logoColor=white)](https://jis-shajan-portfolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-jisssz-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jisssz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jis--shajan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jis-shajan)
[![Tech Stack](https://img.shields.io/badge/Stack-React_•_Vite_•_TypeScript_•_Tailwind-61DAFB?style=for-the-badge)](https://react.dev)

A modern, high-performance cinematic developer portfolio built with React, Vite, TypeScript, and Tailwind CSS. Designed around interactive product storytelling, custom canvas rendering, and a 300-frame scroll-driven visual experience.

🌐 **Production Website:** [https://jis-shajan-portfolio.vercel.app](https://jis-shajan-portfolio.vercel.app)  
📁 **Repository:** [https://github.com/jisssz/jisssz.github.io](https://github.com/jisssz/jisssz.github.io)

---

## 1. Professional Overview

I am **Jis Shajan**, a Computer Science & Engineering undergraduate focusing on Data Science at Christ College of Engineering. My work spans practical software engineering, full-stack application development, AI/ML inference, and product strategy.

- **Focus:** Technology, Data, Product & Innovation
- **Philosophy:** Building reliable, performant, and purposeful software that solves real civic, consumer, and engineering challenges.
- **Approach:** Pairing strong core computer science fundamentals (data structures, algorithms, systems) with modern design and execution.

---

## 2. Featured Projects

The portfolio showcases real academic, hackathon, and open-source engineering initiatives:

### 01. GREENPULSE / ECHOSCAN
*Civic environmental issue reporting & monitoring platform*
- **Architecture:** Multi-role workflow engine (Citizen, Moderator, Field Worker, Admin) with enforcement tracking, civic rewards, and interactive geographic mapping.
- **Tech Stack:** Spring Boot 3, React, JWT Security, JPA / Hibernate, MySQL / PostgreSQL, Leaflet Maps, Chart.js.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 02. ECOCLASSIFY AI
*AI-powered web application for automated waste classification*
- **Architecture:** Real-time waste sorting and classification system combining a lightweight web server with client-side inference.
- **Tech Stack:** Flask, TensorFlow.js, SQLAlchemy, Python, Computer Vision.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 03. ECOPOINTS PLATFORM
*Reward-based waste management with QR tagging & analytics*
- **Architecture:** Civic sustainability platform integrating QR code asset tagging, user incentive mechanisms, and environmental activity metrics.
- **Tech Stack:** Civic Tech, QR Tagging, Analytics, Web Application.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 04. AI SHOPPING ASSISTANT
*Desktop application with modular architecture & secure authentication*
- **Architecture:** Desktop client featuring session authentication, catalog browsing, and structured database integration.
- **Tech Stack:** Java Swing, JDBC, MySQL, Desktop UI.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 05. FOOD SPOILAGE DETECTION
*Embedded sensor device for real-time freshness monitoring*
- **Architecture:** Embedded hardware prototype utilizing sensor arrays to monitor gas and temperature fluctuations for real-time spoilage detection.
- **Tech Stack:** Arduino, Hardware Sensors, Embedded C, IoT.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 06. DAILYVERSE AUTOMATOR
*Brand automation & digital asset orchestration pipeline*
- **Architecture:** Automated content publishing pipeline synchronizing digital assets and coordinating multi-platform API distribution across social channels.
- **Tech Stack:** React, TypeScript, Supabase, n8n Workflows, Pinterest API.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 07. MEDICAL FITNESS & CARE APP
*Healthcare consultation & medicine-access concept*
- **Architecture:** Digital healthcare workflow concept designed to streamline patient consultations and local pharmacy access. Awarded 3rd Place at the EVOLV 1.0 startup competition.
- **Tech Stack:** Product Design, Healthcare UX, Agile Strategy.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 08. USELESS API GATEWAY
*Microservice API gateway & developer sandbox*
- **Architecture:** Lightweight backend gateway created during TinkerHub Useless Projects 3.0 (Team HELL YEAH) exploring endpoint orchestration and cloud deployment.
- **Tech Stack:** Node.js, Express, REST API, Render Cloud.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

### 09. LEGAL METROLOGY CHECKER (LMCC)
*Smart India Hackathon 2026 • Problem SIH26034 (Dept. of Consumer Affairs)*
- **Architecture:** Offline-first Progressive Web Application by Team JAMH X4. Performs 100% client-side WebAssembly OCR (Tesseract.js) to evaluate packaged commodity labels against legal declaration standards without transmitting sensitive imagery.
- **Tech Stack:** React, TypeScript, Tesseract.js WASM, Tailwind CSS, IndexedDB.
- **Repository:** [github.com/jisssz](https://github.com/jisssz)

---

## 3. Technical Skills

| Domain | Technologies & Skills |
| :--- | :--- |
| **Programming Languages** | Python, Java, C, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3, Shell Scripting |
| **Core Computer Science** | Data Structures & Algorithms, Object-Oriented Programming (OOP), Operating Systems, DBMS Fundamentals, Problem Solving |
| **Frameworks & Libraries** | React, Vite, Spring Boot, Flask, Tailwind CSS, TensorFlow, NumPy, Framer Motion |
| **Tools & Platforms** | Git, GitHub, Linux / Unix Shell, VS Code, Supabase, Vercel, MySQL, PostgreSQL |
| **Software Practices** | Clean Code Architecture, Version Control, Debugging, API Design, System Optimization |
| **Project & Coordination** | Technical Event Coordination, Team Leadership, Sprint Planning, Community Outreach |

---

## 4. Architecture & Engineering Highlights

```
┌─────────────────────────────────────────────────────────────┐
│                      Portfolio Architecture                 │
├──────────────────────────────┬──────────────────────────────┤
│ 1. Loading & Intro Experience │ 1080p MP4 + Autoplay Policy  │
│ 2. Background Visual Engine  │ 300-Frame Cinematic Canvas   │
│ 3. Interactive FX Layer      │ CursorGrid & Motion Cursor   │
│ 4. Content & Presentation    │ Hero, Projects, Skills, Hub  │
└──────────────────────────────┴──────────────────────────────┘
```

### A. 300-Frame Cinematic Scroll Engine
- **Implementation:** [`src/components/CinematicCanvas.tsx`](src/components/CinematicCanvas.tsx)
- **Mechanism:** The background features 300 high-resolution sequential photographic frames (`public/reference-frames/ezgif-frame-001.jpg` through `300.jpg`).
- **Scroll Sync:** A decoupled scroll-controller calculates exact document scroll progress and renders the corresponding frame via HTML5 Canvas using double buffering and `requestAnimationFrame`.
- **Preloading Strategy:** Dual-phase progressive loading buffers initial frames first to enable immediate interactivity, followed by background cache warming of remaining frames.
- **Aspect Correction:** Responsive cover-scaling logic calculates sub-pixel letterbox positioning to prevent warping across desktop, tablet, and mobile displays.

### B. 10-Second Cinematic Loading Intro
- **Implementation:** [`src/components/IntroVideo.tsx`](src/components/IntroVideo.tsx)
- **Sound-On Intent:** Prioritizes unmuted autoplay (`video.muted = false`, `volume = 1`) on initial mount.
- **Autoplay Policy Handling:** If a user agent's strict autoplay policy blocks unmuted playback, the player gracefully falls back to muted playback without pausing or delaying the intro.
- **One-Click Audio Activation:** When blocked, a glowing `🔊 ENABLE SOUND` button appears. A single click enables sound without restarting or interrupting playback, transitioning the control to `MUTE`.
- **Keyboard & Touch Controls:** Supports `Escape` to skip immediately with a 650ms smooth transition, `M` key to toggle audio, and a dedicated `SKIP INTRO →` button.

### C. Theme-Matched CursorGrid & Custom Cursor
- **Implementation:** [`src/components/CursorGrid.tsx`](src/components/CursorGrid.tsx) & [`src/components/CustomCursor.tsx`](src/components/CustomCursor.tsx)
- **Grid FX:** A performant canvas grid overlay responds dynamically to pointer coordinates, creating proximity illumination and click-wave ripples styled with `#FF5500` vermilion tones.
- **Spring Cursor:** Smoothly interpolated trailing cursor with magnetic button detection. Automatically disabled on touch-primary devices.

### D. Design Philosophy & Layout Balance
- **Aesthetic:** Dark industrial minimalism (`#080808` background) with high-contrast `#FF5500` accents and subtle glassmorphic surfaces (`backdrop-blur-xl`).
- **Hero Face Clearance:** Asymmetric layout designed with precise typography bounds to ensure the focal visual of the creator's portrait remains unobstructed across all display sizes.

---

## 5. Education & Background

### Christ College of Engineering, Irinjalakuda
- **Degree:** B.Tech in Computer Science & Engineering (Data Science)
- **Timeline:** September 2024 – Present
- **Academic Standing:** CGPA 8.96 / 10
- **Location:** Kerala, India

### Don Bosco Higher Secondary School, Mannuthy
- **Stream:** Higher Secondary Education (Science & Computer Science)
- **Timeline:** April 2023 – April 2024
- **Result:** 96.8%
- **Location:** Thrissur, India

### Bharatiya Vidya Bhavan (BVP), Adat
- **Stream:** Secondary School Education
- **Timeline:** Completed April 2023
- **Result:** 80.0%
- **Location:** Thrissur, India

---

## 6. Experience & Leadership

- **Project Management & Franchise Strategy Intern — CBS Ventures (2025):**  
  Evaluated franchise proposal workflows (100+ proposals), conducted market research across Kerala coworking spaces, and managed tracking pipelines using Zoho CRM and Zoho Projects.
- **Event Coordinator & Community Lead — Techletics, TinkerHub & CODe (2025 – 2026):**  
  Coordinated university technical events including the UI Blindfold contest at Techletics ’26, campus AR/VR demonstrations, and student cybersecurity bootcamps.
- **Hackathon Leadership:**  
  Team Leader of Team JAMH X4 for Smart India Hackathon 2026 (Problem SIH26034). 3rd Place Winner at the EVOLV 1.0 Pitchathon.

---

## 7. Project Structure

```text
├── public/
│   ├── reference-frames/         # 300 sequential photographic scroll frames
│   ├── video/                    # High-definition video sources
│   ├── website-loading-intro.mp4 # Canonical 1080p loading intro video
│   └── jis-ghibli-profile.jpg    # Verified Ghibli portrait asset
├── src/
│   ├── components/
│   │   ├── CinematicCanvas.tsx   # 300-frame scroll-driven canvas engine
│   │   ├── IntroVideo.tsx        # 10s video loader with smart audio controls
│   │   ├── CursorGrid.tsx        # Interactive canvas pointer illumination grid
│   │   ├── CustomCursor.tsx      # Spring-physics custom pointer
│   │   ├── FlyingProjects.tsx    # 3D interactive flying project showcase
│   │   ├── HoneycombSkills.tsx   # Hexagonal interactive skills visualization
│   │   ├── GlitchText.tsx        # Cyberpunk glitch typography effect
│   │   └── WarpText.tsx          # Kinetic warping text animation
│   ├── data/
│   │   ├── projects.ts           # Project catalog & metadata
│   │   ├── skills.ts             # Categorized technical competencies
│   │   ├── education.ts          # Verified academic history
│   │   ├── experience.ts         # Internship & leadership roles
│   │   ├── achievements.ts       # Hackathons, bootcamps & awards
│   │   └── linkedin.ts           # Professional summary & public timeline
│   ├── lib/
│   │   └── scrollController.ts   # Normalized scroll physics & progress math
│   ├── App.tsx                   # Main portfolio application & layout
│   ├── main.tsx                  # Application entry point
│   └── styles.css                # Tailwind utility layer & custom styling
├── AGENTS.md                     # Permanent repository sync & safety rules
├── GEMINI.md                     # Permanent repository sync & safety rules
├── package.json                  # Dependencies & execution scripts
├── tailwind.config.js            # Tailwind theme tokens & color definitions
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build configuration
```

---

## 8. Local Development Setup

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm or yarn

### Installation & Execution
```bash
# 1. Clone the repository
git clone https://github.com/jisssz/jisssz.github.io.git
cd jisssz.github.io

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run lint checks
npm run lint

# 5. Build for production
npm run build

# 6. Preview production build locally
npm run preview
```

---

## 9. Deployment

The portfolio is deployed to production via **Vercel** with automatic continuous delivery connected to the `main` branch.

- **Production URL:** [https://jis-shajan-portfolio.vercel.app](https://jis-shajan-portfolio.vercel.app)
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 10. Contact & Profiles

- **Website:** [https://jis-shajan-portfolio.vercel.app](https://jis-shajan-portfolio.vercel.app)
- **LinkedIn:** [linkedin.com/in/jis-shajan](https://www.linkedin.com/in/jis-shajan)
- **GitHub:** [github.com/jisssz](https://github.com/jisssz)
- **Email:** [jisshajan1@gmail.com](mailto:jisshajan1@gmail.com)
- **Phone:** +91 90480 28956
- **Location:** Thrissur, Kerala, India

---

## 11. License

This repository is published for personal portfolio and showcase purposes. Project source code is available under the repository terms.
