import type { FC } from 'react';
import type { SkillItem } from '../data/skillsData';
import { TechLogo } from './TechLogos';
import './SkillVisual.css';

interface SkillVisualProps {
  skill: SkillItem;
}

export const SkillVisual: FC<SkillVisualProps> = ({ skill }) => {
  const animClass = `skill-anim-${skill.animation}`;

  return (
    <div
      className="group relative flex flex-col items-center justify-start p-3 sm:p-4 rounded-2xl bg-[#121216]/60 border border-white/[0.08] hover:border-[#FF5500]/50 hover:bg-[#181820]/80 transition-all duration-300 skill-circle hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
      title={skill.subtitle ? `${skill.name} — ${skill.subtitle}` : skill.name}
    >
      {/* Animated Circular Housing */}
      <div className="relative mb-2.5">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"
          style={{ backgroundColor: skill.color ? `${skill.color}33` : 'rgba(255,85,0,0.2)' }}
        />

        {/* The Circle */}
        <div
          className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-[#18181E] border border-white/[0.12] group-hover:border-white/30 transition-all duration-300 skill-motion ${animClass}`}
          style={{
            boxShadow: 'inset 0 1px 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Subtle Ring Accent */}
          <div
            className="absolute inset-[3px] rounded-full border border-white/[0.05] pointer-events-none"
          />

          {/* Authentic Vector Logo / Icon */}
          <div
            className="relative z-10 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
            style={{ color: skill.color || '#F5F5F7' }}
          >
            <TechLogo iconKey={skill.iconKey} size={26} />
          </div>
        </div>
      </div>

      {/* Primary Skill Label */}
      <span className="font-display font-medium text-xs sm:text-[13px] text-[#F5F5F7] text-center tracking-tight leading-tight line-clamp-1 group-hover:text-white transition-colors">
        {skill.name}
      </span>

      {/* Subtitle / Focus Note if Available */}
      {skill.subtitle && (
        <span className="text-[10px] text-[#8E8E93] text-center mt-0.5 line-clamp-1 group-hover:text-[#A1A1A6] transition-colors">
          {skill.subtitle}
        </span>
      )}
    </div>
  );
};
