import { useState, type FC } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skillsData';
import { SkillVisual } from './SkillVisual';

interface SkillsSectionProps {
  onContactClick?: () => void;
}

export const SkillsSection: FC<SkillsSectionProps> = ({ onContactClick }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SKILL_CATEGORIES[0].id);

  const activeCategory =
    SKILL_CATEGORIES.find((cat) => cat.id === activeCategoryId) || SKILL_CATEGORIES[0];

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="skills" className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="font-mono text-xs font-semibold text-[#FF5500] mb-2 uppercase tracking-wider">
          [ 04 // TECHNICAL SKILLS &bull; CORE COMPETENCIES ]
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F5F5F7] tracking-tight">
          What I Build &amp; Tools I Use.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#8E8E93] max-w-2xl leading-relaxed">
          Interactive technology stack and verified engineering competencies across algorithmic foundations, full-stack systems, developer toolchains, and leadership.
        </p>
      </div>

      {/* Mobile Horizontal Category Selector (< 640px) */}
      <div className="sm:hidden mb-6 flex items-center gap-2 overflow-x-auto pb-3 -mx-6 px-6 scrollbar-none">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory.id;
          return (
            <button
              key={`mob-${cat.id}`}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#FF5500] text-black font-bold shadow-[0_4px_14px_rgba(255,85,0,0.35)]'
                  : 'bg-[#16161A] text-[#8E8E93] border border-white/10 hover:border-white/20'
              }`}
            >
              <span>{cat.number}</span>
              <span className="truncate max-w-[140px]">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop / Tablet Two-Column Interactive Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Category List */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className="hidden sm:flex flex-col lg:col-span-4 space-y-2.5"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory.id;
            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                tabIndex={isActive ? 0 : -1}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#16161C] border-[#FF5500]/60 shadow-[0_8px_30px_rgba(255,85,0,0.18)] translate-x-1'
                    : 'bg-[#121216]/70 border-white/[0.08] hover:border-white/20 hover:bg-[#15151B]'
                }`}
              >
                {/* Active Indicator Accent Bar */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF5500]" />
                )}

                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span
                    className={
                      isActive
                        ? 'text-[#FF5500] font-bold'
                        : 'text-[#8E8E93] group-hover:text-white transition-colors'
                    }
                  >
                    {cat.tag}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#FF5500]/15 text-[#FF5500]'
                        : 'bg-white/[0.04] text-[#8E8E93]'
                    }`}
                  >
                    {cat.skills.length} skills
                  </span>
                </div>

                <h3
                  className={`font-display text-base sm:text-lg font-bold transition-colors ${
                    isActive ? 'text-[#F5F5F7]' : 'text-[#8E8E93] group-hover:text-[#F5F5F7]'
                  }`}
                >
                  {cat.label}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Category Expanding Detail Card */}
        <div className="lg:col-span-8">
          <div
            role="tabpanel"
            id={`panel-${activeCategory.id}`}
            aria-labelledby={`tab-${activeCategory.id}`}
            key={activeCategory.id}
            className="rounded-[32px] framer-bento-glass p-6 sm:p-8 md:p-10 border border-white/10 relative overflow-hidden transition-all duration-300 animate-fadeIn"
          >
            {/* Top Meta Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#FF5500] font-bold">{activeCategory.tag}</span>
                <span className="text-[#8E8E93]">&bull;</span>
                <span className="text-[#8E8E93]">CATEGORY {activeCategory.number} OF 07</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white text-[11px]">
                {activeCategory.skills.length} TECHNOLOGIES
              </span>
            </div>

            {/* Category Title & Summary */}
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5F5F7] tracking-tight">
              {activeCategory.title}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-[#8E8E93] leading-relaxed">
              {activeCategory.summary}
            </p>

            {/* Technologies Visual Section */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-[#F5F5F7] uppercase tracking-wider">
                  Interactive Technology Visuals:
                </span>
                <span className="text-[11px] font-mono text-[#8E8E93]">
                  Hover for details &bull; Ambient motion active
                </span>
              </div>

              {/* Circular Visual Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {activeCategory.skills.map((skill) => (
                  <SkillVisual key={skill.id} skill={skill} />
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-mono text-xs text-[#8E8E93]">
                {activeCategory.focus}
              </span>
              <button
                type="button"
                onClick={handleContact}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5500] hover:text-[#FF7700] hover:underline cursor-pointer group"
              >
                <span>Discuss Opportunities</span>
                <ArrowUpRight
                  size={14}
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
