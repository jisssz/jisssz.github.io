import { useState, useEffect, useRef } from 'react';
import { Layers, ChevronDown } from 'lucide-react';
import { FLYING_PROJECTS } from '../data/projects';
import { ProjectPoster } from './ProjectPoster';
import { scrollController } from '../lib/scrollController';

export function FlyingProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastActiveIndexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Register section for deterministic coordinate metrics
    const unregisterSection = scrollController.registerSection('showcase', section);

    // Direct transform renderer called on the unified rAF tick
    const applyTransforms = (progress: number) => {
      const total = FLYING_PROJECTS.length;
      // Deterministic mapping: physically attached to scroll position
      const activeFloat = progress * (total - 1);

      // Update minimal index indicator only when integer index changes
      const currentInt = Math.max(0, Math.min(total - 1, Math.round(activeFloat)));
      if (currentInt !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = currentInt;
        setActiveIndex(currentInt);
      }

      const isMobile = window.innerWidth < 640;
      const zGap = isMobile ? 220 : 360;
      const yGap = isMobile ? 20 : 32;

      for (let i = 0; i < total; i++) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        // delta: relative distance of card i from active focal plane
        // When delta is ~0, card i is FRONT and centered
        const delta = activeFloat - i;

        let z: number;
        let y: number;
        let scale: number;
        let rotX: number;
        let rotZ: number;
        let opacity: number;
        let blur: number;
        let pointerEvents: string;

        // ── 1. HOLD ZONE: |delta| <= 0.22 ──
        // Active card stays locked at FRONT with 100% opacity, 0 rotation, and full interactivity
        if (Math.abs(delta) <= 0.22) {
          z = 0;
          y = 0;
          scale = 1.0;
          rotX = 0;
          rotZ = 0;
          opacity = 1.0;
          blur = 0;
          pointerEvents = 'auto';
        } else if (delta < -0.22) {
          // ── 2. APPROACHING FROM DEPTH (delta < -0.22, upcoming cards) ──
          const u = -(delta + 0.22); // distance into depth (u > 0)
          z = -u * zGap;
          y = u * yGap;
          scale = Math.max(0.48, 1.0 - u * 0.14);
          rotX = Math.min(isMobile ? 5 : 8, u * 3.5);
          rotZ = (i % 2 === 0 ? 1 : -1) * Math.min(isMobile ? 2 : 3, u * 1.3);
          opacity = u < 2.5 ? Math.max(0, 1.0 - u * 0.38) : 0;
          blur = Math.min(5, u * 1.8);
          pointerEvents = 'none';
        } else {
          // ── 3. EXITING FORWARD (delta > 0.22, past cards flying forward) ──
          const v = delta - 0.22; // distance exiting forward (v > 0)
          z = v * (zGap * 0.75); // moves forward towards viewer
          y = -v * (yGap * 3.6); // glides smoothly upwards
          scale = 1.0 + v * 0.22;
          rotX = -v * 6.5;
          rotZ = (i % 2 === 0 ? -1 : 1) * 3.0;
          opacity = Math.max(0, 1.0 - v * 1.35);
          blur = v * 4.0;
          pointerEvents = 'none';
        }

        if (opacity <= 0.005) {
          cardEl.style.visibility = 'hidden';
          cardEl.style.opacity = '0';
        } else {
          cardEl.style.visibility = 'visible';
          cardEl.style.opacity = String(opacity);
          cardEl.style.transform = `translate3d(-50%, calc(-50% + ${y.toFixed(1)}px), ${z.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          cardEl.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none';
          cardEl.style.pointerEvents = pointerEvents;
        }
      }
    };

    // Subscribe to unified scroll progress
    const unsubscribeScroll = scrollController.subscribe((state) => {
      const progress = state.getSectionProgress('showcase');
      applyTransforms(progress);
    });

    return () => {
      unregisterSection();
      unsubscribeScroll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative h-[480vh] sm:h-[520vh] w-full"
    >
      {/* Sticky Full-Viewport 3D Stage */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between px-6 sm:px-10 md:px-16 pt-20 pb-6 overflow-hidden select-none pointer-events-none">
        {/* Top Header & Minimal Project Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto z-30">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF5500]/15 border border-[#FF5500]/30 text-[#FF5500]">
              <Layers size={13} />
            </span>
            <div className="font-mono text-xs font-semibold text-[#FF5500] tracking-wider uppercase">
              [ 01 // SELECTED WORK &bull; 3D FLYING POSTERS ]
            </div>
          </div>

          {/* Minimal 8-Segment Progress Counter */}
          <div className="flex items-center gap-3 bg-[#0A0A0E]/80 border border-white/[0.1] backdrop-blur-xl px-3.5 py-1.5 rounded-full text-xs font-mono text-[#8E8E93] shadow-md">
            <span className="text-white font-bold">
              PROJECT {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/20">/</span>
            <span>{String(FLYING_PROJECTS.length).padStart(2, '0')}</span>

            {/* Micro Dot Segments */}
            <div className="hidden sm:flex items-center gap-1 ml-1.5">
              {FLYING_PROJECTS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-4 bg-[#FF5500]'
                      : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center 3D Flying Stage with Hardware Perspective */}
        <div
          className="relative w-full flex-1 flex items-center justify-center pointer-events-none"
          style={{
            perspective: '1200px',
            perspectiveOrigin: 'center center',
          }}
        >
          {FLYING_PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute top-1/2 left-1/2 w-full max-w-lg sm:max-w-2xl md:max-w-3xl will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
            >
              <ProjectPoster project={project} index={i} total={FLYING_PROJECTS.length} />
            </div>
          ))}
        </div>

        {/* Bottom Editorial Scroll Prompt */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#8E8E93] pointer-events-auto z-30">
          <div className="flex items-center gap-2 text-white/50">
            <ChevronDown size={14} className="animate-bounce text-[#FF5500]" />
            <span>SCROLL TO TRAVERSE 3D ARCHIVE</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#8E8E93]">
            <span>DEPTH: 360PX Z-STEP</span>
            <span className="text-white/20">&bull;</span>
            <span>60 FPS DETERMINISTIC MATRIX</span>
          </div>
        </div>
      </div>
    </section>
  );
}
