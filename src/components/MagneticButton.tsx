import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { PropsWithChildren, MouseEvent } from 'react';
import { tactileSpring } from '../lib/motion';

type Props = PropsWithChildren<{
  className?: string;
  href?: string;
  variant?: 'solid' | 'ghost' | 'glow';
  target?: string;
  rel?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}>;

export function MagneticButton({
  children,
  className = '',
  href,
  variant = 'ghost',
  target,
  rel,
  onClick,
  icon,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, tactileSpring);
  const springY = useSpring(y, tactileSpring);
  const rotate = useTransform(springX, [-14, 14], [-1.2, 1.2]);

  const contentX = useTransform(springX, (val) => val * 0.35);
  const contentY = useTransform(springY, (val) => val * 0.35);

  function handleMove(event: MouseEvent<HTMLElement>) {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (event.clientX - centerX) * 0.22;
    const distanceY = (event.clientY - centerY) * 0.22;
    x.set(Math.max(-10, Math.min(10, distanceX)));
    y.set(Math.max(-10, Math.min(10, distanceY)));
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  // Variant styling
  const variantStyles = {
    solid:
      'border-amber-500/40 bg-gradient-to-r from-amber-600 to-orange-500 text-bone shadow-[0_0_25px_rgba(255,119,0,0.35)] hover:shadow-[0_0_40px_rgba(255,119,0,0.55)] hover:border-amber-400 hover:brightness-110',
    glow:
      'border-amber-500/30 bg-[#16120e]/90 text-bone shadow-[0_0_30px_rgba(255,119,0,0.22)] hover:border-amber-500 hover:shadow-[0_0_45px_rgba(255,119,0,0.45)] hover:bg-[#1f1913]',
    ghost:
      'border-white/12 bg-white/[0.03] text-bone/90 hover:border-amber-500/60 hover:text-amber-400 hover:bg-amber-500/[0.08] hover:shadow-[0_0_24px_rgba(255,119,0,0.2)]',
  }[variant];

  const content = (
    <motion.span
      style={{ x: contentX, y: contentY }}
      className="relative z-10 flex items-center justify-center gap-2.5"
    >
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 ease-expo group-hover:translate-x-1">{icon}</span>}
    </motion.span>
  );

  const baseClasses = `group relative inline-flex min-h-[3rem] items-center justify-center overflow-hidden rounded-full border px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] outline-none transition-all duration-300 ease-expo backdrop-blur-md focus-visible:ring-2 focus-visible:ring-amber-500 ${variantStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springX, y: springY, rotate }}
        className={baseClasses}
        data-cursor="interactive"
      >
        {/* Subtle orange inner highlight gradient on hover */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, rotate }}
      className={baseClasses}
      data-cursor="interactive"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {content}
    </motion.button>
  );
}