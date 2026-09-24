import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cursorSpring } from '../lib/motion';

type CursorMode = 'default' | 'interactive' | 'project' | 'hidden';

export function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [projectText, setProjectText] = useState('VIEW');
  const [visible, setVisible] = useState(false);

  // Raw pointer coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring coordinates
  const springX = useSpring(mouseX, cursorSpring);
  const springY = useSpring(mouseY, cursorSpring);

  // Micro dot coordinates (faster spring for crisp center tracking)
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 45, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 45, mass: 0.1 });

  useEffect(() => {
    // Disable on touch devices, small screens, and reduced-motion preference
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 768;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isCoarse || isSmall || isReduced) {
      return;
    }

    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      if (projectEl) {
        setMode('project');
        const customLabel = projectEl.getAttribute('data-cursor-text');
        setProjectText(customLabel || 'VIEW');
        return;
      }

      const interactiveEl = target.closest('a, button, [data-cursor="interactive"], input, textarea');
      if (interactiveEl) {
        setMode('interactive');
        return;
      }

      setMode('default');
    };

    const handleLeaveWindow = () => {
      setVisible(false);
    };

    const handleEnterWindow = () => {
      setVisible(true);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('mouseleave', handleLeaveWindow);
    document.addEventListener('mouseenter', handleEnterWindow);
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', handleOver);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      document.removeEventListener('mouseenter', handleEnterWindow);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [mouseX, mouseY, visible]);

  if (typeof window !== 'undefined') {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      return null;
    }
  }

  const isProject = mode === 'project';
  const isInteractive = mode === 'interactive';

  return (
    <>
      {/* Outer Spring Follower / Badge */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex"
        style={{
          x: springX,
          y: springY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: isProject ? 88 : isInteractive ? 48 : 28,
          height: isProject ? 42 : isInteractive ? 48 : 28,
          backgroundColor: isProject
            ? 'rgba(120, 247, 209, 0.95)'
            : isInteractive
            ? 'rgba(120, 247, 209, 0.12)'
            : 'transparent',
          borderColor: isProject
            ? '#78f7d1'
            : isInteractive
            ? '#78f7d1'
            : 'rgba(244, 240, 232, 0.4)',
          borderRadius: isProject ? 999 : 999,
          backdropFilter: isProject ? 'blur(8px)' : isInteractive ? 'blur(4px)' : 'none',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
      >
        {isProject && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="flex items-center gap-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-ink"
          >
            {projectText} <span>↗</span>
          </motion.span>
        )}
      </motion.div>

      {/* Center Precision Dot (fades when over project badge) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric md:block"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          width: isProject ? 0 : isInteractive ? 6 : 4,
          height: isProject ? 0 : isInteractive ? 6 : 4,
          opacity: visible && !isProject ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

