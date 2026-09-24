import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Reusable luxury glass-panel dashboard card inspired by the Velocity design language:
 * - Crisp razor-thin top rim highlight (golden-amber reflection)
 * - Deep obsidian/charcoal glass gradient
 * - Radiant amber bottom bloom when glow is enabled
 * - Responsive padding to prevent clipping on mobile viewports
 */
export function CinematicPanel({ children, className = '', glow = false, size = 'md' }: Props) {
  const padding =
    size === 'sm'
      ? 'p-3.5 sm:p-4'
      : size === 'lg'
      ? 'p-5 sm:p-7 md:p-8'
      : 'p-4 sm:p-5 md:p-6';

  return (
    <div
      className={`
        pointer-events-auto relative overflow-hidden rounded-2xl md:rounded-3xl border
        bg-gradient-to-b from-[#181410]/85 via-[#0e0c0a]/92 to-[#070605]/96
        backdrop-blur-2xl shadow-card transition-all duration-300
        before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-amber-400/40 before:to-transparent
        ${glow ? 'border-amber-500/25 shadow-amberGlow' : 'border-white/[0.08] hover:border-amber-500/20'}
        ${padding}
        ${className}
      `}
    >
      {glow && (
        <div
          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-20 w-4/5 rounded-full bg-gradient-to-t from-amber-500/15 via-amber-600/5 to-transparent blur-2xl"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
