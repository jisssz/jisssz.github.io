import { useState, useEffect, useRef, useMemo, type FC } from 'react';
import { ArrowUpRight, Hexagon } from 'lucide-react';
import { HONEYCOMB_SKILLS } from '../data/honeycombData';
import { TechLogo } from './TechLogos';
import { scrollController } from '../lib/scrollController';
import './HoneycombSkills.css';

interface HoneycombSkillsProps {
  onContactClick?: () => void;
}

export const HoneycombSkills: FC<HoneycombSkillsProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Default active skill to React or Python so inspection HUD is always rich
  const [activeSkillId, setActiveSkillId] = useState<string>('react');
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const activeSkill = useMemo(() => {
    return (
      HONEYCOMB_SKILLS.find((s) => s.id === (hoveredSkillId || activeSkillId)) ||
      HONEYCOMB_SKILLS[0]
    );
  }, [activeSkillId, hoveredSkillId]);

  // Pre-calculate unique network line pairs for SVG filament background
  const connectionLines = useMemo(() => {
    const lines: { id: string; x1: number; y1: number; x2: number; y2: number; nodeA: string; nodeB: string }[] = [];
    const seen = new Set<string>();

    HONEYCOMB_SKILLS.forEach((node) => {
      node.neighbors.forEach((neighborId) => {
        const neighbor = HONEYCOMB_SKILLS.find((n) => n.id === neighborId);
        if (!neighbor) return;

        const key = [node.id, neighbor.id].sort().join('--');
        if (!seen.has(key)) {
          seen.add(key);
          lines.push({
            id: key,
            x1: node.x,
            y1: node.y,
            x2: neighbor.x,
            y2: neighbor.y,
            nodeA: node.id,
            nodeB: neighbor.id,
          });
        }
      });
    });

    return lines;
  }, []);

  // Connect to centralized scroll controller
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // Register section for document coordinate calculation
    const unregisterSection = scrollController.registerSection('skills', sectionEl);

    // Subscribe to unified scroll progress
    const unsubscribeScroll = scrollController.subscribe((state) => {
      const p = state.getSectionProgress('skills');
      const cluster = clusterRef.current;
      if (!cluster) return;

      const isMobile = window.innerWidth < 640;
      const baseScale = isMobile ? 0.72 : 1.0;

      let z: number;
      let y: number;
      let rotX: number;
      let rotY: number;
      let scale: number;
      let opacity: number;

      // ── PHASE 1 & 2: Approaching from distance (0.0 -> 0.22) ──
      if (p < 0.22) {
        const u = p / 0.22; // 0.0 to 1.0
        z = -350 * (1 - u);
        y = 40 * (1 - u);
        rotX = 16 * (1 - u);
        rotY = -12 * (1 - u);
        scale = baseScale * (0.74 + 0.26 * u);
        opacity = Math.max(0.05, u * 1.0);
      }
      // ── PHASE 3, 4, 5: Fully in Focal View & Parallax (0.22 -> 0.80) ──
      else if (p <= 0.8) {
        const midProgress = (p - 0.22) / 0.58; // 0.0 to 1.0
        const centerOffset = midProgress - 0.5; // -0.5 to +0.5

        z = 0;
        y = 0;
        rotX = -centerOffset * (isMobile ? 4 : 8);
        rotY = centerOffset * (isMobile ? 6 : 14);
        scale = baseScale;
        opacity = 1.0;
      }
      // ── PHASE 6: Transitioning out forward/upward (0.80 -> 1.0) ──
      else {
        const v = (p - 0.8) / 0.2; // 0.0 to 1.0
        z = v * 220;
        y = -v * 80;
        rotX = -v * 8;
        rotY = v * 6;
        scale = baseScale * (1.0 + v * 0.12);
        opacity = Math.max(0, 1.0 - v * 1.2);
      }

      cluster.style.opacity = String(opacity);
      cluster.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    });

    return () => {
      unregisterSection();
      unsubscribeScroll();
    };
  }, []);

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative h-[280vh] sm:h-[320vh] w-full"
    >
      {/* Sticky Full-Viewport 3D Stage */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-18 pb-4 overflow-hidden select-none pointer-events-none">
        {/* Top Header & Telemetry */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-auto z-20">
          <div>
            <div className="font-mono text-xs font-semibold text-[#FF5500] mb-1 uppercase tracking-wider flex items-center gap-2">
              <Hexagon size={13} className="text-[#FF5500]" />
              <span>[ 04 // TECHNICAL SKILLS &bull; 3D HONEYCOMB NETWORK ]</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#F5F5F7] tracking-tight">
              What I Build &amp; Tools I Use.
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-[#0C0C10]/85 border border-white/[0.1] backdrop-blur-xl px-3.5 py-1.5 rounded-full text-xs font-mono text-[#8E8E93] shadow-lg self-start sm:self-auto">
            <span className="flex h-2 w-2 relative">
              <span className="radar-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5500]" />
            </span>
            <span className="text-[#F5F5F7] font-bold">23 INTERLOCKING NODES</span>
            <span className="text-white/20">&bull;</span>
            <span className="hidden sm:inline">HOVER TO INSPECT</span>
          </div>
        </div>

        {/* Center 3D Stage with Preserved Perspective */}
        <div className="relative w-full flex-1 flex items-center justify-center honeycomb-stage my-1 pointer-events-auto">
          {/* Unified 3D Honeycomb Cluster */}
          <div
            ref={clusterRef}
            className="relative honeycomb-cluster w-[520px] h-[500px] flex items-center justify-center"
            style={{ transformOrigin: 'center center' }}
          >
            {/* SVG Network Filaments / Connections */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="-260 -250 520 500"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="lineGradDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
                </linearGradient>
                <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5500" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFAA00" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {connectionLines.map((line) => {
                const isConnectedToActive =
                  line.nodeA === activeSkill.id || line.nodeB === activeSkill.id;

                return (
                  <line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={isConnectedToActive ? 'url(#lineGradActive)' : 'url(#lineGradDefault)'}
                    strokeWidth={isConnectedToActive ? 2 : 1}
                    strokeDasharray={isConnectedToActive ? 'none' : '3 3'}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* 23 Hexagonal Skill Nodes */}
            {HONEYCOMB_SKILLS.map((skill, idx) => {
              const isSelected = skill.id === activeSkill.id;
              const hasHover = Boolean(hoveredSkillId);
              const isDimmed = hasHover && !isSelected;
              const animVariant = idx % 2 === 0 ? 'hex-anim-float-a' : 'hex-anim-float-b';

              return (
                <div
                  key={skill.id}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(skill.id, el);
                    else nodeRefs.current.delete(skill.id);
                  }}
                  onMouseEnter={() => setHoveredSkillId(skill.id)}
                  onMouseLeave={() => setHoveredSkillId(null)}
                  onClick={() => setActiveSkillId(skill.id)}
                  className={`honeycomb-node-wrapper cursor-pointer ${
                    isDimmed ? 'opacity-40' : 'opacity-100'
                  }`}
                  style={{
                    left: `calc(50% + ${skill.x}px - 42px)`,
                    top: `calc(50% + ${skill.y}px - 48px)`,
                    width: '84px',
                    height: '96px',
                    transform: `translateZ(${
                      isSelected ? skill.z + 36 : skill.z
                    }px) scale(${isSelected ? 1.15 : 1.0})`,
                    zIndex: isSelected ? 40 : 10 + Math.round(skill.z),
                  }}
                  title={`${skill.name} — ${skill.highlight}`}
                >
                  {/* Subtle Organic Motion Wrapper */}
                  <div className={`w-full h-full relative ${animVariant}`}>
                    {/* SVG Hexagonal Outer Stroke & Glow */}
                    <svg
                      className="absolute inset-0 w-full h-full overflow-visible"
                      viewBox="0 0 84 96"
                      fill="none"
                      aria-hidden="true"
                    >
                      <polygon
                        points="42 2, 82 24, 82 72, 42 94, 2 72, 2 24"
                        fill="#0E0E14"
                        fillOpacity="0.82"
                        stroke={isSelected ? skill.color || '#FF5500' : 'rgba(255,255,255,0.12)'}
                        strokeWidth={isSelected ? '2.5' : '1.2'}
                        className="transition-colors duration-300"
                        style={{
                          filter: isSelected
                            ? `drop-shadow(0 0 12px ${skill.accentGlow})`
                            : 'none',
                        }}
                      />
                    </svg>

                    {/* Hexagon Content Area */}
                    <div className="absolute inset-0 hex-clip flex flex-col items-center justify-center p-2 text-center pointer-events-auto">
                      {/* Ambient Radial Fill */}
                      <div
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${skill.color}25 0%, transparent 70%)`,
                        }}
                      />

                      {/* Authentic Vector Logo */}
                      <div
                        className={`transition-transform duration-300 ${
                          isSelected ? 'scale-115' : 'scale-100'
                        } flex items-center justify-center mb-1`}
                        style={{ color: skill.color || '#F5F5F7' }}
                      >
                        <TechLogo iconKey={skill.iconKey} size={24} />
                      </div>

                      {/* Crisp Label */}
                      <span
                        className={`font-display text-[10px] font-bold tracking-tight truncate max-w-[70px] ${
                          isSelected ? 'text-white' : 'text-[#8E8E93]'
                        } transition-colors`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Inspection HUD / Active Skill Telemetry */}
        <div className="max-w-4xl mx-auto w-full pointer-events-auto z-20">
          <div className="rounded-2xl framer-bento-glass p-4 sm:p-5 border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
            {/* Left: Active Skill Meta */}
            <div className="flex items-start gap-3.5">
              <div
                className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border border-white/15 bg-[#14141A]"
                style={{
                  color: activeSkill.color || '#FF5500',
                  boxShadow: `0 0 16px ${activeSkill.accentGlow}`,
                }}
              >
                <TechLogo iconKey={activeSkill.iconKey} size={24} />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono mb-0.5">
                  <span className="text-[#FF5500] font-bold">{activeSkill.categoryTag}</span>
                  <span className="text-white/20">&bull;</span>
                  <span className="text-[#8E8E93] text-[11px] uppercase tracking-wide">
                    {activeSkill.category}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                  {activeSkill.name}
                  <span className="ml-2 font-mono text-xs font-normal text-[#8E8E93]">
                    — {activeSkill.highlight}
                  </span>
                </h3>
                <p className="text-xs text-[#A1A1A6] mt-0.5 max-w-xl leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0 flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.08]">
              <button
                type="button"
                onClick={handleContact}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FF5500]/15 text-[#FF5500] hover:bg-[#FF5500] hover:text-black border border-[#FF5500]/30 hover:border-[#FF5500] transition-all cursor-pointer shadow-md group"
              >
                <span>Discuss Opportunities</span>
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
