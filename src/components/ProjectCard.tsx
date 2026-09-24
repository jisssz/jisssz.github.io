import { useRef } from 'react';
import { ArrowUpRight, Terminal, Cpu, Database, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { Project } from '../data/projects';
import { editorialEase, smoothSpring } from '../lib/motion';

type ProjectCardProps = {
  project: Project;
  isDimmed?: boolean;
  onHoverChange?: (isHovering: boolean) => void;
};

// Map each of the 6 projects to a curated cinematic frame index
const projectFrameMap: Record<string, { frame: number; tag: string; icon: typeof Terminal }> = {
  '01': { frame: 25, tag: 'JAVA // SQL // OOP', icon: Database },
  '02': { frame: 85, tag: 'EDGE AI // VISION', icon: Cpu },
  '03': { frame: 130, tag: 'CIVIC PLATFORM', icon: Sparkles },
  '04': { frame: 175, tag: 'EMBEDDED HARDWARE', icon: Terminal },
  '05': { frame: 230, tag: 'PRODUCT STRATEGY', icon: Sparkles },
  '06': { frame: 285, tag: 'VENTURE SIMULATION', icon: Terminal },
};

export function ProjectCard({ project, isDimmed = false, onHoverChange }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-18, 18]);

  const localX = useMotionValue(0);
  const localY = useMotionValue(0);
  const springTiltX = useSpring(localX, smoothSpring);
  const springTiltY = useSpring(localY, smoothSpring);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    localX.set(x * 6);
    localY.set(y * 6);
  }

  function handleMouseLeave() {
    localX.set(0);
    localY.set(0);
    onHoverChange?.(false);
  }

  function handleMouseEnter() {
    onHoverChange?.(true);
  }

  const frameInfo = projectFrameMap[project.number] || { frame: 40, tag: 'COMPUTATION', icon: Terminal };
  const framePadded = String(frameInfo.frame).padStart(3, '0');
  const frameSrc = `/reference-frames/ezgif-frame-${framePadded}.jpg`;

  return (
    <motion.article
      ref={cardRef}
      className={`group relative transition-opacity duration-500 ${
        isDimmed ? 'opacity-35 scale-[0.99]' : 'opacity-100 scale-100'
      }`}
      initial={reduce ? false : { opacity: 0, y: 35 }}
      whileInView={reduce ? undefined : { opacity: isDimmed ? 0.35 : 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, ease: editorialEase }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="project"
      data-cursor-text="EXPLORE"
    >
      {/* Ambient Orange Glow Halo behind each card */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-600/10 to-amber-500/15 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e0c0a]/90 p-8 md:p-12 backdrop-blur-2xl shadow-card transition-all duration-500 group-hover:border-amber-500/40 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_35px_rgba(255,119,0,0.15)]"
      >
        <a
          href="#contact"
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 items-center outline-none"
        >
          {/* Left Column: Project Metadata, Big Typography, Description, Stack */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-amber-400">
                  {project.number} // {frameInfo.tag}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#ff7700]" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                {project.highlight}
              </span>
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold uppercase leading-[0.92] tracking-[-0.07em] text-bone transition-transform duration-500 ease-expo group-hover:translate-x-2 md:text-5xl lg:text-6xl">
                {project.name}
              </h3>
              <p className="mt-4 text-base font-normal text-bone/85 leading-relaxed md:text-lg">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-amber-500/40 group-hover:text-bone"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Action Trigger */}
            <div className="pt-2 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-amber-400 transition-colors">
              <span>EXPLORE CASE STUDY</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>

          {/* Right Column: Cinematic Visual Panel with Dynamic Preview */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070605] p-2 transition-transform duration-700 ease-expo group-hover:scale-[1.01]"
            onMouseMove={handleMouseMove}
          >
            <motion.div
              style={{
                y: parallaxY,
                rotateX: springTiltY,
                rotateY: springTiltX,
              }}
              className="relative aspect-[16/10] overflow-hidden rounded-xl"
            >
              {/* Cinematic Frame Image */}
              <img
                src={frameSrc}
                alt={project.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
              />

              {/* Cinematic Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-transparent to-[#0e0c0a]/40" />

              {/* Telemetry Badge */}
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-bone backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#ff7700]" />
                  SEQ_FRAME_{framePadded}
                </span>
              </div>

              {/* Bottom Project Tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-lg border border-white/10 bg-black/60 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-bone/90 backdrop-blur-md">
                  {project.descriptor}
                </span>
              </div>
            </motion.div>
          </div>
        </a>
      </div>
    </motion.article>
  );
}
