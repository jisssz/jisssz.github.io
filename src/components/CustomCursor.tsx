import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  isActive?: boolean;
}

export function CustomCursor({ isActive = true }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [isSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 768;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !isCoarse && !isSmall && !isReduced;
  });

  useEffect(() => {
    if (!isSupported || !isActive) return undefined;

    let rafId = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let dotX = -100;
    let dotY = -100;

    let isHoveringInteractive = false;
    let isHoveringProject = false;
    let isVisible = false;
    let customText = '';

    const cursorEl = cursorRef.current;
    const dotEl = dotRef.current;
    const textEl = textRef.current;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        dotX = targetX;
        dotY = targetY;
        if (cursorEl) cursorEl.style.opacity = '1';
        if (dotEl) dotEl.style.opacity = '1';
      }
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      if (projectEl) {
        isHoveringProject = true;
        isHoveringInteractive = false;
        customText = projectEl.getAttribute('data-cursor-text') || 'VIEW ↗';
        return;
      }

      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]');
      if (interactiveEl) {
        isHoveringInteractive = true;
        isHoveringProject = false;
        customText = '';
        return;
      }

      isHoveringInteractive = false;
      isHoveringProject = false;
      customText = '';
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (cursorEl) cursorEl.style.opacity = '0';
      if (dotEl) dotEl.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (cursorEl) cursorEl.style.opacity = '1';
      if (dotEl) dotEl.style.opacity = '1';
    };

    // Animation loop using translate3d and lerp
    const tick = () => {
      // Lerp for outer smooth ring
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      // Snappier lerp for inner precision dot
      dotX += (targetX - dotX) * 0.55;
      dotY += (targetY - dotY) * 0.55;

      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

        if (isHoveringProject) {
          cursorEl.style.width = '84px';
          cursorEl.style.height = '38px';
          cursorEl.style.borderRadius = '9999px';
          cursorEl.style.borderColor = 'rgba(255, 85, 0, 0.8)';
          cursorEl.style.backgroundColor = 'rgba(255, 85, 0, 0.9)';
          cursorEl.style.boxShadow = '0 0 24px rgba(255, 85, 0, 0.45)';
          if (textEl) {
            textEl.textContent = customText;
            textEl.style.opacity = '1';
            textEl.style.transform = 'scale(1)';
          }
          if (dotEl) dotEl.style.opacity = '0';
        } else if (isHoveringInteractive) {
          cursorEl.style.width = '52px';
          cursorEl.style.height = '52px';
          cursorEl.style.borderRadius = '9999px';
          cursorEl.style.borderColor = 'rgba(255, 85, 0, 0.7)';
          cursorEl.style.backgroundColor = 'rgba(255, 85, 0, 0.12)';
          cursorEl.style.boxShadow = '0 0 20px rgba(255, 85, 0, 0.3)';
          if (textEl) {
            textEl.textContent = '';
            textEl.style.opacity = '0';
            textEl.style.transform = 'scale(0.8)';
          }
          if (dotEl) {
            dotEl.style.opacity = isVisible ? '1' : '0';
            dotEl.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) scale(1.5)`;
          }
        } else {
          cursorEl.style.width = '30px';
          cursorEl.style.height = '30px';
          cursorEl.style.borderRadius = '9999px';
          cursorEl.style.borderColor = 'rgba(245, 245, 247, 0.35)';
          cursorEl.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
          cursorEl.style.boxShadow = 'none';
          if (textEl) {
            textEl.textContent = '';
            textEl.style.opacity = '0';
            textEl.style.transform = 'scale(0.8)';
          }
          if (dotEl) {
            dotEl.style.opacity = isVisible ? '1' : '0';
            dotEl.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) scale(1)`;
          }
        }
      }

      if (dotEl && !isHoveringInteractive) {
        dotEl.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) scale(1)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isSupported, isActive]);

  if (!isSupported || !isActive) {
    return null;
  }

  return (
    <>
      {/* Outer Smooth Motion Follower */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9990] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border backdrop-blur-[2px] transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out opacity-0"
        style={{
          width: '30px',
          height: '30px',
          borderColor: 'rgba(245, 245, 247, 0.35)',
        }}
      >
        <span
          ref={textRef}
          className="font-mono text-[10px] font-black uppercase tracking-wider text-[#080808] transition-all duration-150 opacity-0 select-none"
        />
      </div>

      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9991] w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out opacity-0"
      />
    </>
  );
}

export default CustomCursor;
