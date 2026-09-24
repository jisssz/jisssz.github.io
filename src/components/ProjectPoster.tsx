import { forwardRef } from 'react';
import { ArrowUpRight, Code2, Sparkles, Terminal } from 'lucide-react';
import { type FlyingProject } from '../data/projects';

interface ProjectPosterProps {
  project: FlyingProject;
  index: number;
  total: number;
}

export const ProjectPoster = forwardRef<HTMLDivElement, ProjectPosterProps>(
  ({ project, index, total }, ref) => {
    return (
      <div
        ref={ref}
        data-project-index={index}
        className="absolute top-[52%] left-1/2 w-[92vw] sm:w-[560px] md:w-[620px] max-w-[660px] select-none pointer-events-none will-change-transform"
        style={{
          transformOrigin: '50% 50%',
        }}
      >
        <div className="relative rounded-[28px] sm:rounded-[34px] bg-[#09090D]/90 backdrop-blur-3xl border border-white/[0.14] p-6 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.92),0_0_40px_rgba(255,85,0,0.14)] overflow-hidden transition-colors duration-300 hover:border-[#FF5500]/50 group">
          {/* Subtle Ambient Corner Glow */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-52 h-52 rounded-full opacity-35"
            style={{
              background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {/* Top Metadata Row */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono mb-5 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2 text-[#FF5500] font-bold tracking-wider">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF5500]/15 border border-[#FF5500]/30 text-[#FF5500]">
                {index % 2 === 0 ? <Terminal size={12} /> : <Code2 size={12} />}
              </span>
              <span className="text-[11px] sm:text-xs uppercase">{project.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-[#D1D1D6]">
                {project.badge}
              </span>
              <span className="text-white/40 font-mono text-[11px]">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Main Title & Descriptor */}
          <div className="space-y-1.5">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#FFFFFF] tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {project.name}
            </h3>
            <p className="font-mono text-xs text-[#FF5500] font-semibold tracking-wide">
              {project.descriptor}
            </p>
          </div>

          {/* Concise Narrative Description */}
          <p className="mt-4 text-xs sm:text-sm text-[#A1A1A6] leading-relaxed line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>

          {/* Technical Stack Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[11px] font-mono text-[#E5E5EA] hover:border-[#FF5500]/40 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Interactive Bottom Bar */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8E8E93]">
              <Sparkles size={12} className="text-[#FF5500]" />
              <span>3D FLYING EXHIBIT</span>
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/[0.08] hover:bg-[#FF5500] text-[#F5F5F7] hover:text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-[#FF5500] shadow-sm hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer"
            >
              <span>VIEW SOURCE</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    );
  }
);

ProjectPoster.displayName = 'ProjectPoster';
