import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Plus,
  Sparkles,
  TrendingUp,
  Zap,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  Phone,
  MapPin,
  Layers,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';
import { CinematicCanvas } from './components/CinematicCanvas';
import { IntroVideo } from './components/IntroVideo';
import { CustomCursor } from './components/CustomCursor';
import { GlitchText } from './components/GlitchText';
import { FlyingProjects } from './components/FlyingProjects';
import { HoneycombSkills } from './components/HoneycombSkills';
import { scrollController } from './lib/scrollController';
import { TOTAL_FRAMES } from './lib/scenes';
import { linkedInPosts, linkedInProfile } from './data/linkedin';

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function PinterestIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.48.02-3.55.13-.97.87-3.7 1.07-4.54a3.86 3.86 0 0 1-.27-1.45c0-1.37.79-2.39 1.78-2.39.84 0 1.25.63 1.25 1.39 0 .85-.54 2.11-.82 3.28-.23 1 .5 1.81 1.48 1.81 1.78 0 3.15-1.88 3.15-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.79.75 2.29.08.1.1.19.07.3-.08.31-.25 1.02-.28 1.16-.04.18-.15.22-.34.13-1.28-.59-2.07-2.45-2.07-3.95 0-3.21 2.33-6.16 6.73-6.16 3.53 0 6.28 2.52 6.28 5.88 0 3.51-2.21 6.34-5.28 6.34-1.03 0-2-.54-2.33-1.17l-.64 2.42c-.23.89-.86 2.01-1.28 2.7A12 12 0 1 0 12 0z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function WhatsappIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.12-.22-.19-.47-.31z"/>
    </svg>
  );
}

function LeetCodeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.593c.31.034.624.051.937.051a5.874 5.874 0 0 0 2.215-.434l3.774-1.48 2.76-1.08a1.37 1.37 0 0 0 .794-1.748 1.37 1.37 0 0 0-1.748-.794l-2.76 1.08-3.774 1.48a3.17 3.17 0 0 1-1.196.234 3.21 3.21 0 0 1-.506-.027 3.208 3.208 0 0 1-2.607-1.944 3.176 3.176 0 0 1-.189-.55 2.982 2.982 0 0 1-.034-1.278 2.87 2.87 0 0 1 .654-1.139l3.854-4.126 5.406-5.788a1.37 1.37 0 0 0-.97-2.345zm2.84 8.34a1.37 1.37 0 0 0-.97.401l-4.908 4.908a1.37 1.37 0 1 0 1.94 1.94l4.908-4.908a1.37 1.37 0 0 0-.97-2.341zm-1.884 6.724a1.37 1.37 0 0 0-.97 2.341l1.542 1.542a1.37 1.37 0 1 0 1.94-1.94l-1.542-1.542a1.37 1.37 0 0 0-.97-.401z"/>
    </svg>
  );
}

// ── Interactive Counter Component with IntersectionObserver Easing ──
function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 1800,
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Easing: easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = easeProgress * target;
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

// ── Interactive SVG Analytics Graph with Academic & Technical Milestones ──
function InteractiveAnalyticsGraph() {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    svgX: number;
    milestone: string;
    detail: string;
  }>({
    visible: false,
    x: 0,
    svgX: 0,
    milestone: 'B.Tech CSE-DS',
    detail: '8.96 CGPA',
  });

  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, rawX));
    const ratio = clampedX / rect.width;

    let milestone = 'Don Bosco HSS';
    let detail = '96.8% Score';

    if (ratio >= 0.25 && ratio < 0.6) {
      milestone = 'Christ College B.Tech';
      detail = '8.96 / 10 CGPA';
    } else if (ratio >= 0.6 && ratio < 0.85) {
      milestone = 'CBS Ventures Intern';
      detail = '100+ Proposals Managed';
    } else if (ratio >= 0.85) {
      milestone = 'Technical Builder';
      detail = '13+ Events & Projects';
    }

    setTooltip({
      visible: true,
      x: clampedX,
      svgX: ratio * 500,
      milestone,
      detail,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div
      className="relative w-full h-44 cursor-crosshair select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        ref={svgRef}
        className="w-full h-full overflow-visible"
        viewBox="0 0 500 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glowAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5500" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#FF6B2B" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B2B" />
            <stop offset="50%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FFAA00" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shaded Area Under Curve */}
        <path
          d="M 0,105 C 100,90 180,60 260,45 C 340,30 420,18 500,8 L 500,120 L 0,120 Z"
          fill="url(#glowAreaGradient)"
        />

        {/* Glowing Main Bezier Path */}
        <path
          d="M 0,105 C 100,90 180,60 260,45 C 340,30 420,18 500,8"
          fill="none"
          stroke="url(#strokeGradient)"
          strokeWidth="3.5"
          filter="url(#glowFilter)"
        />

        {/* Milestone Data Points */}
        <circle cx="120" cy="75" r="4.5" fill="#F5F5F7" stroke="#FF5500" strokeWidth="2.5" />
        <circle cx="260" cy="45" r="4.5" fill="#F5F5F7" stroke="#FF5500" strokeWidth="2.5" />
        <circle cx="390" cy="22" r="4.5" fill="#F5F5F7" stroke="#FF5500" strokeWidth="2.5" />
        <circle cx="500" cy="8" r="5" fill="#FF5500" className="animate-pulse" />

        {/* Dynamic Tooltip Cursor Guide Line */}
        {tooltip.visible && (
          <line
            x1={tooltip.svgX}
            y1={0}
            x2={tooltip.svgX}
            y2={120}
            stroke="rgba(255, 85, 0, 0.4)"
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />
        )}
      </svg>

      {/* Floating Glass Tooltip */}
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute -top-12 z-30 px-3 py-1.5 rounded-xl bg-[#121214]/90 border border-[#FF5500]/50 shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl -translate-x-1/2 flex items-center gap-2 font-mono text-[11px] text-white whitespace-nowrap transition-all duration-75"
          style={{ left: `${tooltip.x}px` }}
        >
          <span className="text-[#FF5500] font-bold">{tooltip.milestone}</span>
          <span className="text-white/40">&bull;</span>
          <span className="text-white/90">{tooltip.detail}</span>
        </div>
      )}
    </div>
  );
}

// ── Magnetic Dual-Text Button Component ──
function DualTextButton({
  label,
  onClick,
  primary = false,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
        primary
          ? 'bg-[#FF5500] hover:bg-[#FF6B2B] text-white shadow-[0_0_24px_rgba(255,85,0,0.35)] hover:shadow-[0_0_36px_rgba(255,85,0,0.55)]'
          : 'bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 hover:border-[#FF5500]/50 shadow-md'
      }`}
    >
      <div className="relative overflow-hidden h-4 flex flex-col justify-center">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute top-full left-0 inline-block text-white transition-transform duration-300 group-hover:-translate-y-full font-bold">
          {label}
        </span>
      </div>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#FF5500] transition-colors duration-300">
        <ArrowUpRight size={12} strokeWidth={2.8} />
      </span>
    </button>
  );
}

// ── FAQ Items with Genuine Information ──
const FAQ_ITEMS = [
  {
    q: 'What is your academic background and current focus?',
    a: 'I am pursuing my B.Tech in Computer Science & Engineering with specialization in Data Science (CSE-DS) at Christ College of Engineering, Irinjalakuda, Thrissur (Sept 2024 – Present), maintaining an academic performance of 8.96 / 10 CGPA.',
  },
  {
    q: 'What types of roles or internships are you targeting?',
    a: 'I am actively seeking software engineering internships, data analytics roles, and technical product/project management opportunities where I can combine technical implementation with product, business, and coordination thinking.',
  },
  {
    q: 'What hands-on experience do you have with project management?',
    a: 'During my Project Management Internship at CBS Ventures (Kochi, Kerala), I managed proposal workflows across 100+ companies, conducted comprehensive district-level coworking space market research in Kerala, worked within the Zoho ecosystem, and supported operational documentation.',
  },
  {
    q: 'What is GreenPulse and your major technical work?',
    a: 'GreenPulse is a full-stack civic environmental issue reporting and monitoring platform built with Spring Boot 3, React, Vite, Tailwind, Leaflet, and PostgreSQL. Other technical projects include AI Shopping Assistant (Java/JDBC), EcoClassify AI (Flask/TensorFlow.js), and EcoPoints Platform.',
  },
  {
    q: 'What are Daily Verse and the DailyVerse Automator side projects?',
    a: 'Daily Verse is a beauty and skincare content brand with visual and educational discovery strategies on Pinterest and YouTube. DailyVerse Automator is an internal automation stack built using Vite, TypeScript, Tailwind, Supabase, Pinterest API, Google Sheets, and n8n to streamline publishing workflows.',
  },
  {
    q: 'How do you balance technical development and leadership roles?',
    a: 'Alongside my engineering coursework, I have served as Class Representative, Core Marketing Team Lead for a student internship initiative, Event Coordinator for Techletics ’26 (UI Blindfold), and Core Coordinator for Immersive AR/VR Experience and Cybersecurity bootcamps.',
  },
];

// ── Achievements, Experience & Leadership Milestones ──
const MILESTONES = [
  {
    quote:
      'Project Management Intern at CBS Ventures (Kochi, Kerala). Coordinated proposal information across 100+ company proposals, conducted comprehensive district-level coworking space research across Kerala, utilized Zoho CRM and Zoho Projects, and supported business/client workflow management.',
    author: 'CBS VENTURES',
    role: 'Project Management Intern • Kochi, Kerala',
    avatar: 'PM',
    tag: 'EXPERIENCE',
  },
  {
    quote:
      'Awarded 3rd Place at EVOLV 1.0 Startup Bootcamp & Pitchathon (October 2024) for the Medical Fitness & Care App concept. Participated in War Room Startup Marathon, Jumpstart Innovation Bootcamp, and AVIATOR Entrepreneurship Workshop.',
    author: 'EVOLV 1.0 & PITCHATHON',
    role: '3rd Place Winner • Medical Fitness & Care App',
    avatar: '03',
    tag: 'ACHIEVEMENT',
  },
  {
    quote:
      'Event Coordinator for Techletics ’26 (UI Blindfold Event), Core Coordinator for Immersive AR/VR Experience Event (Techletics ’26), and Student Coordinator for Cybersecurity Bootcamp (2025). Class Representative and student leadership coordinator.',
    author: 'TECHLETICS ’26 & LEADERSHIP',
    role: 'Event & Core Coordinator • Christ College of Engg',
    avatar: 'EC',
    tag: 'LEADERSHIP',
  },
  {
    quote:
      'Executive member of CODe (Computer Department Association) and active contributor across IEDC, TinkerHub, English Club, FOSS Club, Speech Club, Game Development Club, and NDLI Club. Certified in Digital 101 (Gold Category) and Python Essentials 1 & 2 (Cisco Networking Academy).',
    author: 'CAMPUS CLUBS & ASSOCIATIONS',
    role: 'CODe, IEDC, TinkerHub & Certifications',
    avatar: 'CC',
    tag: 'COMMUNITY',
  },
];

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentTime, setCurrentTime] = useState('');

  const headerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Live Timezone Clock (IST / Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Direct header & progress bar updates on single rAF tick without re-rendering App
  useEffect(() => {
    return scrollController.subscribeGlobal((globalProgress) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.round(globalProgress * 100)}%`;
      }
      if (headerRef.current) {
        if (globalProgress > 0.02) {
          headerRef.current.classList.add(
            'bg-[#0A0A0C]/80',
            'backdrop-blur-2xl',
            'border-b',
            'border-white/[0.08]',
            'shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
          );
          headerRef.current.classList.remove('bg-transparent', 'border-transparent');
        } else {
          headerRef.current.classList.remove(
            'bg-[#0A0A0C]/80',
            'backdrop-blur-2xl',
            'border-b',
            'border-white/[0.08]',
            'shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
          );
          headerRef.current.classList.add('bg-transparent', 'border-transparent');
        }
      }
    });
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F5F7] font-sans selection:bg-[#FF5500] selection:text-[#080808] overflow-x-clip">
      {/* ── 0. Cinematic Motion-Graphics Video Intro / Loading Scene ── */}
      {!introFinished && (
        <IntroVideo onComplete={() => setIntroFinished(true)} />
      )}

      {/* ── Motion Cursor (Active only after intro has completed or skipped) ── */}
      <CustomCursor isActive={introFinished} />

      {/* ── 1. The Core 300-Frame Cinematic Scroll Canvas Engine ── */}
      <CinematicCanvas />

      {/* ── 2. Floating Ambient Radial Glow with Gentle Keyframe Pulse ── */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[850px] z-[1] hero-glow-pulse"
        style={{
          background:
            'radial-gradient(circle at 50% 22%, rgba(255, 85, 0, 0.28) 0%, rgba(255, 107, 43, 0.12) 35%, rgba(14, 14, 16, 0.05) 65%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 95% 85% at 50% 50%, transparent 40%, rgba(8, 8, 8, 0.72) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── 3. Floating Glass Navigation Header ── */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-transparent border-b border-transparent"
      >
        {/* Top Scroll Progress Line */}
        <div
          ref={progressBarRef}
          className="h-[2px] bg-gradient-to-r from-[#FF5500] via-[#FF6B2B] to-[#FFAA00] transition-all duration-75"
          style={{ width: '0%' }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo / Personal Monogram Badge */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-left cursor-pointer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/10 font-mono text-xs font-bold text-[#FF5500] group-hover:border-[#FF5500]/50 transition-all">
              JS
            </span>
            <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-[#F5F5F7] group-hover:text-[#FF5500] transition-colors">
              JIS SHAJAN
            </span>
            <span className="relative flex h-2 w-2">
              <span className="radar-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5500]" />
            </span>
          </button>

          {/* Desktop Navigation Links with Double-Text Hover Effect */}
          <nav className="hidden md:flex items-center gap-7 font-sans text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
            {[
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'showcase', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'journey', label: 'Updates' },
              { id: 'achievements', label: 'Milestones' },
              { id: 'faq', label: 'FAQ' },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="relative overflow-hidden group py-1 text-[#8E8E93] hover:text-[#F5F5F7] transition-colors cursor-pointer"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span className="absolute left-0 top-full inline-block text-[#FF5500] transition-transform duration-300 group-hover:-translate-y-full font-bold">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Liquid Magnetic CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <DualTextButton label="LET'S CONNECT" onClick={() => scrollTo('contact')} primary />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/[0.05] text-[#F5F5F7] border border-white/10"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0C]/95 border-b border-white/10 px-6 py-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col gap-4 font-sans text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
              <button
                type="button"
                onClick={() => scrollTo('about')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                About Me
              </button>
              <button
                type="button"
                onClick={() => scrollTo('education')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Education &amp; Metrics
              </button>
              <button
                type="button"
                onClick={() => scrollTo('showcase')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Projects &amp; Work
              </button>
              <button
                type="button"
                onClick={() => scrollTo('skills')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Technical Skills
              </button>
              <button
                type="button"
                onClick={() => scrollTo('experience')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Experience &amp; Leadership
              </button>
              <button
                type="button"
                onClick={() => scrollTo('journey')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                LinkedIn Updates &amp; Journey
              </button>
              <button
                type="button"
                onClick={() => scrollTo('achievements')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Achievements
              </button>
              <button
                type="button"
                onClick={() => scrollTo('faq')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                FAQ
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="text-left py-1 text-[#FF5500] font-bold"
              >
                Let&apos;s Connect &rarr;
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Document Flow Layer (Rich Translucent Panels Over Cinematic Canvas) ── */}
      <main className="relative z-10">
        {/* ════════════════════════════════════════════════════════
            SECTION A: HERO WITH MOTION SCROLL INTEGRATION
            Asymmetric negative space framing the video character.
        ════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-[100dvh] flex flex-col justify-between px-6 sm:px-10 md:px-16 pt-32 pb-14 max-w-7xl mx-auto"
        >
          {/* Top Asymmetric Headline Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start mt-6 sm:mt-10">
            {/* Left Headline */}
            <div className="lg:col-span-7">
              <div className="relative">
                <h1 className="font-display font-extrabold tracking-tight">
                  <GlitchText
                    speed={0.45}
                    enableShadows={true}
                    enableOnHover={false}
                    className="font-display font-extrabold tracking-tight text-white select-none block leading-[0.92] text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem]"
                  >
                    JIS SHAJAN
                  </GlitchText>
                  <span className="text-[#FF5500] text-3xl sm:text-5xl md:text-6xl block font-display font-extrabold leading-tight mt-3 sm:mt-4">
                    Building at the Intersection.
                  </span>
                </h1>
              </div>
            </div>

            {/* Right Supporting Copy & Dual-Pill CTA */}
            <div className="lg:col-span-5 lg:pt-6 lg:pl-6 space-y-4">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F5F7] leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Technology, Data, Product &amp; Innovation.
              </h2>
              <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                I am a Computer Science undergraduate interested in building practical technology solutions, exploring data-driven systems, and combining technical development with product, project management, and business thinking.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <DualTextButton label="VIEW MY WORK" onClick={() => scrollTo('showcase')} primary />
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F5F5F7] hover:text-[#FF5500] transition-colors cursor-pointer py-2.5 px-3"
                >
                  <span>LET&apos;S CONNECT</span>
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Hero Metadata Bar */}
          <div className="mt-auto pt-10 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-6">
            {/* Minimal Editorial Location & Academic Metadata */}
            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-[#FF5500] shrink-0 opacity-90 stroke-[2.2]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-left">
                <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#EDEDED] tracking-tight">
                  Puzhakkal, Thrissur, Kerala, India
                </span>
                <span className="hidden sm:inline text-white/20 text-xs font-light">&bull;</span>
                <span className="font-sans text-[11px] sm:text-xs text-[#8E8E93] tracking-normal">
                  B.Tech CSE-DS &bull; Christ College of Engineering
                </span>
              </div>
            </div>

            {/* Availability Indicator */}
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-mono text-[#8E8E93]">
              <span className="relative flex h-2 w-2">
                <span className="radar-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="tracking-wider uppercase">OPEN TO INTERNSHIPS &amp; COLLABORATIVE PROJECTS</span>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION B: 3D FLYING PROJECT POSTERS
            Scroll-driven depth presentation layered over cinematic canvas.
        ════════════════════════════════════════════════════════ */}
        <FlyingProjects />

        {/* ════════════════════════════════════════════════════════
            SECTION C: EDUCATION, METRICS & BENTO DASHBOARD
            Accurate CGPA, academic scores, and telemetry.
        ════════════════════════════════════════════════════════ */}
        <section id="education" className="relative py-28 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-semibold text-[#FF5500] mb-2 uppercase tracking-wider">
                [ 02 / ACADEMIC FOUNDATIONS &amp; METRICS ]
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#F5F5F7] tracking-tight">
                Academic Rigor &amp; Scale.
              </h2>
            </div>
            <span className="font-mono text-xs text-[#8E8E93]">
              VERIFIED ACADEMIC RECORDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Card 1: Primary B.Tech CGPA */}
            <div className="md:col-span-4 rounded-[32px] framer-bento-glass p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93] mb-4">
                  <span>CHRIST COLLEGE OF ENGG</span>
                  <span className="flex items-center gap-1 text-[#FF5500]">
                    <TrendingUp size={13} />
                    <span>LATEST CGPA</span>
                  </span>
                </div>
                <div className="font-display font-extrabold text-6xl text-[#FF5500] tracking-tight">
                  <AnimatedCounter target={8.96} decimals={2} />
                  <span className="text-3xl text-white/50 ml-1 font-normal">/ 10</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#F5F5F7] mt-3">
                  B.Tech Computer Science &amp; Engineering
                </h3>
                <p className="mt-2 text-xs text-[#8E8E93] leading-relaxed">
                  Specializing in Data Science (CSE-DS) at Christ College of Engineering, Irinjalakuda, Thrissur (Sept 2024 – Present).
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#8E8E93]">
                <span>DON BOSCO (MANNUTHY): 96.8%</span>
                <span className="text-[#FF5500]">BVP (ADAT): 80.0%</span>
              </div>
            </div>

            {/* Bento Card 2: Interactive SVG Telemetry Curve with Milestones */}
            <div className="md:col-span-8 rounded-[32px] framer-bento-glass p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8E8E93] mb-4">
                  <span className="text-[#FF5500] font-bold">[ ACADEMIC &amp; PROJECT VELOCITY ]</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white">
                    HOVER TO INSPECT MILESTONES
                  </span>
                </div>

                {/* SVG Curve with Live Hover Tooltip */}
                <InteractiveAnalyticsGraph />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] text-center sm:text-left">
                <div>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F5F7]">
                    <AnimatedCounter target={13} suffix="+" />
                  </div>
                  <div className="text-[11px] font-mono text-[#8E8E93] mt-0.5">Hackathons &amp; Events</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#FF5500]">
                    <AnimatedCounter target={96.8} decimals={1} suffix="%" />
                  </div>
                  <div className="text-[11px] font-mono text-[#8E8E93] mt-0.5">Don Bosco Higher Sec</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F5F7]">
                    100+
                  </div>
                  <div className="text-[11px] font-mono text-[#8E8E93] mt-0.5">Company Proposals</div>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Dynamic Status Radar Beacon */}
            <div className="md:col-span-6 rounded-[32px] framer-bento-glass p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="relative flex h-4 w-4">
                  <span className="radar-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#10B981]" />
                </span>
                <div>
                  <div className="font-display text-base font-bold text-[#F5F5F7]">
                    Open to Internships &amp; Collaborations
                  </div>
                  <div className="text-xs text-[#8E8E93] mt-0.5">
                    Software engineering, data analytics &amp; product management roles
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="hidden sm:inline-flex p-2.5 rounded-full bg-white/[0.06] text-[#FF5500] hover:bg-[#FF5500] hover:text-white transition-colors cursor-pointer"
                aria-label="Contact Jis Shajan"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Bento Card 4: System Architecture Uptime */}
            <div className="md:col-span-6 rounded-[32px] framer-bento-glass p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-[#FF5500] border border-white/10">
                  <Zap size={18} />
                </span>
                <div>
                  <div className="font-display text-base font-bold text-[#F5F5F7]">
                    99.9% Uptime &bull; Native {TOTAL_FRAMES}-Frame Engine
                  </div>
                  <div className="text-xs text-[#8E8E93] mt-0.5">
                    Zero third-party scroll hijacking &bull; GPU accelerated
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs text-[#FF5500] font-bold">OPTIMIZED</div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION D: ABOUT ME ("Behind the Builder")
        ════════════════════════════════════════════════════════ */}
        <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Headline & Manifesto */}
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-semibold text-[#FF5500] mb-3 uppercase tracking-wider flex items-center gap-2">
                <Compass size={14} />
                <span>[ 03 / ABOUT ME &bull; CORE DIRECTION ]</span>
              </div>

              <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#F5F5F7] leading-[0.95] tracking-tight">
                TECHNICAL BUILDER.
                <br />
                <span className="text-[#FF5500]">PRODUCT THINKER.</span>
                <br />
                CONTINUOUS LEARNER.
              </h2>

              <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed">
                <p className="font-display font-bold text-xl sm:text-2xl leading-snug">
                  <span className="text-[#F5F5F7]">I am a Computer Science &amp; Engineering undergraduate with a strong interest in </span>
                  <span className="text-[#FF5500]">Data Science, software development, product development, project management </span>
                  <span className="text-[#F5F5F7]">and technology-driven problem solving.</span>
                </p>
                <p className="text-[#8E8E93]">
                  I enjoy turning ideas into practical projects, coordinating teams and events, experimenting with emerging technologies, and learning how technology can create useful real-world solutions.
                </p>

                {/* Interest Badges */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  {[
                    'Data Analytics',
                    'Product Development',
                    'Project Management',
                    'Business & Technology',
                    'Software Development',
                    'Emerging Technologies',
                    'Marketing & Outreach',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#F5F5F7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                <DualTextButton label="LET'S CONNECT" onClick={() => scrollTo('contact')} primary />
                <span className="font-mono text-xs text-[#8E8E93]">
                  LANGUAGES: ENGLISH &bull; HINDI &bull; MALAYALAM
                </span>
              </div>
            </div>

            {/* Right: Ghibli Profile Showcase Card & Education */}
            <div className="lg:col-span-5">
              <div className="group rounded-[36px] framer-bento-glass p-6 sm:p-8 border border-white/[0.1] relative overflow-hidden transition-all duration-300 hover:border-[#FF5500]/40 shadow-2xl">
                {/* Ambient Orange Glow Effect */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#FF5500]/15 blur-3xl group-hover:bg-[#FF5500]/25 transition-all duration-500"
                  aria-hidden="true"
                />

                {/* ── 1. The Exact Uploaded Ghibli Profile Visual ── */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0c0c0e] shadow-xl group-hover:border-[#FF5500]/40 transition-colors duration-300">
                  <img
                    src="/jis-ghibli-profile.jpg"
                    alt="Jis Shajan - Engineering & Data Science Illustration"
                    className="w-full h-auto object-cover max-h-[380px] sm:max-h-[420px] transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-black/20"
                    aria-hidden="true"
                  />
                  {/* Subtle Profile Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono text-[#F5F5F7]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                    <span>JIS SHAJAN</span>
                    <span className="text-[#8E8E93]">&bull;</span>
                    <span className="text-[#FF5500] font-semibold">CSE-DS</span>
                  </div>
                </div>

                {/* ── 2. Compact Education Dashboard Card (Directly Under Image) ── */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] relative z-10">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-[#FF5500] font-bold tracking-wider flex items-center gap-2">
                      <GraduationCap size={15} className="text-[#FF5500]" />
                      EDUCATION
                    </span>
                    <span className="text-[#8E8E93] text-[10px] uppercase tracking-wider font-semibold">
                      VERIFIED ACADEMIC
                    </span>
                  </div>

                  <div className="space-y-2.5 font-sans">
                    {/* Christ College of Engineering */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#FF5500]/30 transition-all duration-200">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-display font-bold text-sm sm:text-base text-[#F5F5F7] leading-snug">
                          Christ College of Engineering, Irinjalakuda
                        </div>
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30">
                          Sep 2024 – Present
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-[#8E8E93]">
                        B.Tech — Computer Science &amp; Engineering / Data Science
                      </div>
                    </div>

                    {/* Don Bosco School */}
                    <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/10 transition-all duration-200">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-display font-semibold text-xs sm:text-sm text-[#F5F5F7]">
                            Don Bosco School, Mannuthy
                          </div>
                          <div className="text-[11px] text-[#8E8E93]">
                            Higher Secondary Education
                          </div>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/[0.06] text-[#F5F5F7] border border-white/10">
                          96.8%
                        </span>
                      </div>
                    </div>

                    {/* BVP School */}
                    <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/10 transition-all duration-200">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-display font-semibold text-xs sm:text-sm text-[#F5F5F7]">
                            BVP School, Adat
                          </div>
                          <div className="text-[11px] text-[#8E8E93]">
                            Secondary Education
                          </div>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/[0.06] text-[#F5F5F7] border border-white/10">
                          80.0%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            FEATURED CASE STUDY: GREENPULSE
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-16 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="rounded-[40px] framer-bento-glass p-8 sm:p-12 md:p-14 border border-white/[0.1] relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="font-mono text-xs font-semibold text-[#FF5500] uppercase tracking-wider flex items-center gap-2">
                <Layers size={14} />
                <span>[ FEATURED CASE STUDY &bull; CIVIC TECHNOLOGY ]</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#8E8E93]">
                Spring Boot 3 &bull; React &bull; Leaflet &bull; PostgreSQL
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#F5F5F7]">
                  GREENPULSE — Civic Environmental Platform
                </h3>
                <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed">
                  A comprehensive civic environmental issue reporting and monitoring platform designed to connect citizens, moderators, field workers, and administrators through a structured issue-resolution and enforcement workflow.
                </p>

                <div className="pt-2 grid sm:grid-cols-2 gap-3 text-xs text-[#F5F5F7]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                    <span>Geographical issue mapping with Leaflet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                    <span>Role-Based Access: Citizen, Mod, Worker, Admin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                    <span>Spring Security with JWT authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                    <span>Spring Data JPA &amp; relational PostgreSQL schema</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 space-y-4">
                <div className="text-xs font-mono font-bold text-[#FF5500] uppercase">
                  Tech Stack Overview
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {[
                    'Spring Boot 3',
                    'React',
                    'Vite',
                    'Tailwind CSS',
                    'Leaflet Maps',
                    'Chart.js',
                    'Java 17',
                    'Spring Security',
                    'JWT',
                    'Hibernate / JPA',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION E: 3D HONEYCOMB SKILL NETWORK
            Unified 3D hexagonal technology mesh.
        ════════════════════════════════════════════════════════ */}
        <HoneycombSkills onContactClick={() => scrollTo('contact')} />

        {/* ════════════════════════════════════════════════════════
            SIDE BUSINESS & DIGITAL BRANDS: DAILY VERSE
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-16 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="rounded-[40px] framer-bento-glass p-8 sm:p-12 border border-white/[0.1] grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs font-semibold text-[#FF5500] uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={14} />
                <span>[ SIDE BUSINESS &bull; BEAUTY &amp; SKINCARE CONTENT BRAND ]</span>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#F5F5F7]">
                DAILY VERSE
              </h3>
              <div className="font-mono text-xs text-[#FF5500] uppercase font-bold tracking-wide">
                Pinterest Content &bull; Affiliate Marketing &bull; Content Automation &bull; Discovery Strategy
              </div>
              <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed">
                A specialized digital content brand created to deliver educational skincare breakdowns and visual beauty guides. The brand operates through organic visual search discovery on Pinterest and YouTube, monetization through curated affiliate partnerships, and high-frequency content generation backed by custom engineering.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://in.pinterest.com/DailyVerse07/_created/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 text-xs font-mono font-bold uppercase transition-all"
                >
                  <PinterestIcon size={14} />
                  <span>Pinterest: DailyVerse07</span>
                  <ExternalLink size={12} className="text-[#FF5500]" />
                </a>
                <a
                  href="https://www.youtube.com/@DailyVerse-skincare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 text-xs font-mono font-bold uppercase transition-all"
                >
                  <YoutubeIcon size={14} />
                  <span>YouTube: @DailyVerse-skincare</span>
                  <ExternalLink size={12} className="text-[#FF5500]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 space-y-3 font-mono text-xs text-[#8E8E93]">
              <div className="text-white font-bold mb-1 flex items-center justify-between">
                <span>DAILYVERSE AUTOMATOR</span>
                <span className="text-[#FF5500] text-[10px] uppercase font-semibold">[ TECH PIPELINE ]</span>
              </div>
              <p className="text-[11px] text-[#8E8E93] leading-relaxed mb-3">
                Technical automation engine engineered to synchronize content assets, coordinate API publishing, and automate digital brand operations.
              </p>
              <div className="space-y-1.5 text-xs text-[#F5F5F7]">
                <div>&bull; <strong>Frontend:</strong> React / Vite, TypeScript, Tailwind CSS</div>
                <div>&bull; <strong>Backend / DB:</strong> Supabase cloud layer &amp; server functions</div>
                <div>&bull; <strong>Publishing:</strong> Pinterest API integration &amp; workflow</div>
                <div>&bull; <strong>Data Sync:</strong> Google Sheets bi-directional sync</div>
                <div>&bull; <strong>Orchestration:</strong> n8n workflow automation pipelines</div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION F: ACHIEVEMENTS, EXPERIENCE & LEADERSHIP
        ════════════════════════════════════════════════════════ */}
        <section id="experience" className="relative py-28 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-mono text-xs font-semibold text-[#FF5500] mb-2 uppercase tracking-wider">
              [ 05 / TRACK RECORD &bull; ACHIEVEMENTS &amp; LEADERSHIP ]
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F5F5F7] tracking-tight">
              Milestones &amp; Experience.
            </h2>
          </div>

          <div id="achievements" className="grid md:grid-cols-2 gap-6">
            {MILESTONES.map((t, idx) => (
              <div
                key={idx}
                className="rounded-[28px] framer-bento-glass p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93] mb-4">
                    <span className="text-[#FF5500] font-bold">[ {t.tag} ]</span>
                    <span>VERIFIED</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#F5F5F7] leading-relaxed">
                    {t.quote}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 font-mono text-xs font-bold text-[#FF5500]">
                      {t.avatar}
                    </span>
                    <div>
                      <div className="font-display text-sm font-bold text-[#F5F5F7]">
                        {t.author}
                      </div>
                      <div className="text-xs text-[#8E8E93]">{t.role}</div>
                    </div>
                  </div>
                  <CheckCircle2 size={16} className="text-[#FF5500]" />
                </div>
              </div>
            ))}
          </div>

          {/* Campus Community Badges */}
          <div className="mt-10 rounded-2xl framer-bento-glass p-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8E8E93]">
            <span className="text-white font-bold">CAMPUS SOCIETIES &amp; CLUBS:</span>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {[
                'CODe CCE',
                'TinkerHub CCE (Design Team)',
                'FOSS Club CCE',
                'IEDC Club CCE',
                'English & Speech Club',
                'Game Dev Club',
                'NDLI Club',
              ].map((club) => (
                <span
                  key={club}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/80"
                >
                  {club}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 05.B: FROM LINKEDIN • JOURNEY & UPDATES
        ════════════════════════════════════════════════════════ */}
        <section id="journey" className="relative py-20 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-mono text-xs font-semibold text-[#FF5500] mb-2 uppercase tracking-wider flex items-center gap-2">
                <LinkedinIcon size={14} />
                <span>[ 05.B / FROM LINKEDIN &bull; JOURNEY &amp; UPDATES ]</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5F5F7] tracking-tight">
                Verified Career &amp; Project Updates.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#8E8E93] max-w-2xl leading-relaxed">
                Extracted directly from hackathon leadership, campus event coordination, project launches, and technical milestones across my verified LinkedIn timeline.
              </p>
            </div>

            <a
              href={linkedInProfile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 text-[#70B5F9] border border-[#0A66C2]/30 text-xs font-mono font-bold uppercase transition-all shadow-[0_0_20px_rgba(10,102,194,0.15)] self-start md:self-auto"
            >
              <LinkedinIcon size={14} />
              <span>View Profile on LinkedIn</span>
              <ExternalLink size={12} className="text-[#70B5F9]" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedInPosts.map((post) => (
              <div
                key={post.id}
                className="group rounded-[28px] framer-bento-glass p-7 flex flex-col justify-between border border-white/[0.08] hover:border-[#FF5500]/40 transition-all duration-300"
              >
                <div>
                  {/* Category & Date Header */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#FF5500] font-semibold">
                      {post.category}
                    </span>
                    <span className="text-[#8E8E93]">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-[#F5F5F7] group-hover:text-[#FF5500] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-5">
                    {post.content}
                  </p>

                  {/* Media Status Pill */}
                  <div className="mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-2.5 text-[11px] font-mono text-[#8E8E93]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                    <span>VERIFIED RECORD &bull; {post.mediaStatus}</span>
                  </div>

                  {/* Related Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {post.relatedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-white/70 border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8E8E93] flex items-center gap-1.5">
                    <LinkedinIcon size={12} />
                    <span>Jis Shajan</span>
                  </span>
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#FF5500] hover:text-[#FFAA00] font-bold transition-colors"
                  >
                    <span>View Post</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION G: INTERACTIVE ACCORDION FAQ
        ════════════════════════════════════════════════════════ */}
        <section id="faq" className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <div className="font-mono text-xs font-semibold text-[#FF5500] mb-2 uppercase tracking-wider">
                [ 06 / FAQ &bull; PROFILE &amp; QUESTIONS ]
              </div>
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F5F5F7] tracking-tight">
                Frequently Asked
                <br />
                Questions.
              </h2>
              <p className="mt-6 text-sm text-[#8E8E93] leading-relaxed max-w-sm">
                Have questions regarding my academic coursework, technical stack, internship experience, or project interests? Here are quick answers.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl framer-bento-glass overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 sm:p-7 text-left cursor-pointer hover:bg-white/[0.02]"
                    >
                      <span className="font-display text-base sm:text-lg font-bold text-[#F5F5F7] pr-4">
                        {item.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-[#FF5500] transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm text-[#8E8E93] leading-relaxed border-t border-white/[0.06] pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION H: HIGH-IMPACT CLOSING CTA & FOOTER REVEAL
        ════════════════════════════════════════════════════════ */}
        <section
          id="contact"
          className="relative min-h-[90dvh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
        >
          <div className="relative rounded-[40px] md:rounded-[56px] framer-bento-glass p-8 sm:p-14 md:p-20 overflow-hidden my-auto">
            {/* Ambient Orange Horizon Glow */}
            <div
              className="pointer-events-none absolute -bottom-36 left-1/2 -translate-x-1/2 w-full h-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.35)_0%,transparent_70%)] blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl">
              <div className="font-mono text-xs sm:text-sm font-semibold text-[#FF5500] mb-4 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={14} />
                <span>[ 07 / LET&apos;S BUILD SOMETHING &bull; GET IN TOUCH ]</span>
              </div>

              <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl text-[#F5F5F7] leading-[0.92] tracking-tight">
                HAVE AN IDEA?
                <br />
                <span className="text-[#FF5500]">LET&apos;S BUILD IT.</span>
              </h2>

              <p className="mt-6 text-sm sm:text-base text-[#8E8E93] max-w-lg leading-relaxed">
                I&apos;m always interested in technology, product ideas, collaborative projects, internships, and opportunities to build meaningful solutions.
              </p>

              {/* Direct Contact Cards with Premium Icons */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <a
                  href="mailto:jisshajan1@gmail.com"
                  className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5500]/50 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-wider mb-0.5">
                      EMAIL
                    </div>
                    <span className="text-xs sm:text-sm text-[#F5F5F7] font-sans font-semibold group-hover:text-[#FF5500] transition-colors">
                      jisshajan1@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+919048028956"
                  className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5500]/50 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-wider mb-0.5">
                      PHONE
                    </div>
                    <span className="text-xs sm:text-sm text-[#F5F5F7] font-sans font-semibold group-hover:text-[#FF5500] transition-colors">
                      +91 90480 28956
                    </span>
                  </div>
                </a>
              </div>

              {/* Available For Banner */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono">
                <span className="text-[#FF5500] font-bold uppercase tracking-wider">[ AVAILABLE FOR ]</span>
                <span className="text-[#F5F5F7]">Internships &bull; Technical Projects &bull; Product Ideas &bull; Collaborations</span>
              </div>

              {/* Structured Social & Profile Hub */}
              <div className="mt-8 space-y-4">
                <div className="text-xs font-mono font-semibold text-[#8E8E93] uppercase tracking-wider">
                  ONLINE PROFILES &amp; SOCIAL PRESENCE
                </div>

                {/* Profiles Row: LinkedIn, GitHub, LeetCode, YouTube, Pinterest, WhatsApp, Live Portfolio */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jis-shajan"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#FF6B2B] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(255,85,0,0.35)] transition-all"
                  >
                    <LinkedinIcon size={14} />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href="https://github.com/jisssz"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Profile"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 font-sans text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <GithubIcon size={14} />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href="https://leetcode.com/u/bMFExkNlUl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LeetCode Coding Profile"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 font-sans text-xs font-bold uppercase tracking-wider transition-all hover:border-[#FFA116]/50"
                  >
                    <LeetCodeIcon size={14} />
                    <span>LEETCODE</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@DailyVerse-skincare"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="DAILY VERSE YouTube"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 font-sans text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <YoutubeIcon size={14} />
                    <span>YOUTUBE</span>
                  </a>
                  <a
                    href="https://in.pinterest.com/DailyVerse07/_created/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="DAILY VERSE Pinterest"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 font-sans text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <PinterestIcon size={14} />
                    <span>PINTEREST</span>
                  </a>
                  <a
                    href="https://wa.me/919048028956"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Connect on WhatsApp"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 font-sans text-xs font-bold uppercase tracking-wider transition-all hover:border-[#25D366]/50"
                  >
                    <WhatsappIcon size={14} />
                    <span>WHATSAPP</span>
                  </a>
                  <a
                    href="https://jis-shajan-portfolio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Portfolio"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/10 font-sans text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <ExternalLink size={14} className="text-[#FF5500]" />
                    <span>LIVE PORTFOLIO</span>
                  </a>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#8E8E93] hover:text-[#F5F5F7] transition-colors py-2 cursor-pointer"
                  >
                    <span>BACK TO TOP &uarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Studio Footer with Location & Live Clock */}
          <footer className="relative z-10 mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E93]">
            <div className="flex items-center gap-4">
              <span>JIS SHAJAN &bull; CSE (DATA SCIENCE) UNDERGRADUATE</span>
              <span className="hidden sm:inline text-white/20">&bull;</span>
              <span>THRISSUR, KERALA</span>
              <span className="hidden sm:inline text-white/20">&bull;</span>
              <span className="hidden sm:flex items-center gap-1.5 text-[#F5F5F7]">
                <Clock size={12} className="text-[#FF5500]" />
                <span>{currentTime || '00:00:00 IST'}</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span>&copy; 2026 JIS SHAJAN. ALL RIGHTS RESERVED.</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-[#FF5500] transition-colors cursor-pointer"
              >
                TOP &uarr;
              </button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
