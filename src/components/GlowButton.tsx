import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { smoothSpring } from '../lib/motion';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  className?: string;
};

/**
 * Premium CTA button styled as a sleek pill (`rounded-full`) matching the Velocity aesthetic:
 * - Magnetic hover cursor response
 * - Warm radiant amber glow & border highlight
 * - Smooth micro-interaction for the directional arrow
 */
export function GlowButton({ children, href, onClick, variant = 'primary', icon, className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, smoothSpring);
  const sy = useSpring(my, smoothSpring);

  function handleMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const isPrimary = variant === 'primary';

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon || <ArrowUpRight size={13} />}
      </span>
      {isPrimary && (
        <span
          className="pointer-events-none absolute inset-0 -z-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at 50% 100%, rgba(255,140,50,0.3) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );

  const cls = `
    pointer-events-auto group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3
    font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.16em]
    transition-all duration-300 ease-expo
    ${isPrimary
      ? 'border border-amber-500/50 bg-gradient-to-b from-[#221a14]/90 via-[#18120d]/90 to-[#0e0a07]/90 text-amber-300 shadow-[0_4px_20px_rgba(255,119,0,0.18)] hover:border-amber-400 hover:text-amber-200 hover:shadow-[0_0_28px_rgba(255,119,0,0.35)] hover:-translate-y-0.5'
      : 'border border-white/10 bg-white/[0.03] text-bone/80 hover:border-amber-500/30 hover:bg-white/[0.06] hover:text-bone hover:-translate-y-0.5'
    }
    ${className}
  `;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
        style={{ x: sx, y: sy }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cls}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cls}
    >
      {inner}
    </motion.button>
  );
}
