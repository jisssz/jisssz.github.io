import { useState, useEffect, useRef, useCallback } from 'react';
import { TOTAL_FRAMES, getFrameUrl } from '../lib/scenes';
import { scrollController } from '../lib/scrollController';

type Props = {
  onProgressChange?: (progress: number, frame: number) => void;
};

/**
 * Ultra-Smooth Fixed Cinematic Canvas Engine.
 *
 * Requirements:
 * 1. Pinned full-viewport background: fixed inset-0, z-index 0.
 * 2. 16:9 Aspect-ratio cover scaling with top-biased centering (never crops face/head).
 * 3. Native document scroll single source of truth:
 *      window.scrollY / maxScroll -> progress (0.0 to 1.0) -> targetFrame (0 to 239).
 * 4. Zero black voids, zero wheel-hijacking, zero artificial scroll libraries.
 * 5. Nearest-frame fallback with automatic re-draw as soon as target frame arrives.
 * 6. Predictive priority preloader around current scroll position (bounded to 6 parallel requests).
 */
export function CinematicCanvas({ onProgressChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cached frame images array [0..239]
  const images = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const requestedSet = useRef<Set<number>>(new Set());
  const activeCountRef = useRef<number>(0);
  const MAX_CONCURRENCY = 6;

  // Single source of truth for rendering
  const targetFrameRef = useRef<number>(0);
  const drawnFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);

  // Draw image with full-frame contain scaling preserving complete subject (never crops hair/face/body)
  const drawImageToCanvas = useCallback((img: HTMLImageElement, frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Contain scaling: guarantees complete subject and full 16:9 composition are 100% visible
    const scale = Math.min(cw / iw, ch / ih);
    const rw = iw * scale;
    const rh = ih * scale;
    const ox = (cw - rw) / 2;

    const isPortrait = ch > cw;
    // On portrait screens, position in upper third so subject sits under hero typography.
    // On landscape screens, align to top (oy = 0) so the top of head, curly hair, and orange flare touch top naturally.
    const oy = isPortrait ? Math.max(72 * (ch / (window.innerHeight || ch)), (ch - rh) * 0.28) : 0;

    // Solid seamless canvas background fill matching page dark tone
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, cw, ch);

    // Draw full uncropped image
    ctx.drawImage(img, ox, oy, rw, rh);

    // Soft edge feathering if frame does not completely cover viewport, eliminating any hard rectangular edges
    const dpr = window.devicePixelRatio || 1;
    const featherX = Math.round(40 * dpr);
    const featherY = Math.round(36 * dpr);

    // Feather left & right if pillarboxed
    if (ox > 0) {
      const gradLeft = ctx.createLinearGradient(ox, 0, ox + featherX, 0);
      gradLeft.addColorStop(0, '#080808');
      gradLeft.addColorStop(1, 'rgba(8, 8, 8, 0)');
      ctx.fillStyle = gradLeft;
      ctx.fillRect(ox, oy, featherX, rh);

      const gradRight = ctx.createLinearGradient(ox + rw - featherX, 0, ox + rw, 0);
      gradRight.addColorStop(0, 'rgba(8, 8, 8, 0)');
      gradRight.addColorStop(1, '#080808');
      ctx.fillStyle = gradRight;
      ctx.fillRect(ox + rw - featherX, oy, featherX, rh);
    }

    // Feather top if letterboxed in portrait
    if (oy > 0) {
      const gradTop = ctx.createLinearGradient(0, oy, 0, oy + featherY);
      gradTop.addColorStop(0, '#080808');
      gradTop.addColorStop(1, 'rgba(8, 8, 8, 0)');
      ctx.fillStyle = gradTop;
      ctx.fillRect(ox, oy, rw, featherY);
    }

    // Feather bottom if letterboxed
    if (oy + rh < ch) {
      const gradBottom = ctx.createLinearGradient(0, oy + rh - featherY, 0, oy + rh);
      gradBottom.addColorStop(0, 'rgba(8, 8, 8, 0)');
      gradBottom.addColorStop(1, '#080808');
      ctx.fillStyle = gradBottom;
      ctx.fillRect(ox, oy + rh - featherY, rw, featherY);
    }

    drawnFrameRef.current = frameIdx;
  }, []);

  // Find nearest loaded frame in cache
  const getNearestLoadedImage = useCallback((target: number): { img: HTMLImageElement; index: number } | null => {
    const cache = images.current;
    if (cache[target]) return { img: cache[target]!, index: target };

    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const down = target - d;
      if (down >= 0 && cache[down]) return { img: cache[down]!, index: down };
      const up = target + d;
      if (up < TOTAL_FRAMES && cache[up]) return { img: cache[up]!, index: up };
    }
    return null;
  }, []);

  // Request redraw on next animation frame
  const scheduleRender = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const target = targetFrameRef.current;
      const best = getNearestLoadedImage(target);
      if (best) {
        drawImageToCanvas(best.img, best.index);
      }
    });
  }, [drawImageToCanvas, getNearestLoadedImage]);

  // Priority queue worker: preloads frames closest to current targetFrame
  const pumpQueueRef = useRef<() => void>(() => {});

  const pumpQueue = useCallback(() => {
    while (activeCountRef.current < MAX_CONCURRENCY) {
      const target = targetFrameRef.current;
      let nextIdx: number | null = null;

      // 1. Immediate neighborhood around current scroll target (radius 16)
      for (let offset = 0; offset <= 16; offset++) {
        const down = target + offset;
        if (down < TOTAL_FRAMES && !requestedSet.current.has(down)) {
          nextIdx = down;
          break;
        }
        const up = target - offset;
        if (up >= 0 && !requestedSet.current.has(up)) {
          nextIdx = up;
          break;
        }
      }

      // 2. Keyframe spine (every 8th frame for instant scrub coverage)
      if (nextIdx === null) {
        for (let i = 0; i < TOTAL_FRAMES; i += 8) {
          if (!requestedSet.current.has(i)) {
            nextIdx = i;
            break;
          }
        }
      }

      // 3. Sequential fill outward from target
      if (nextIdx === null) {
        for (let d = 17; d < TOTAL_FRAMES; d++) {
          const f = target + d;
          if (f < TOTAL_FRAMES && !requestedSet.current.has(f)) {
            nextIdx = f;
            break;
          }
          const b = target - d;
          if (b >= 0 && !requestedSet.current.has(b)) {
            nextIdx = b;
            break;
          }
        }
      }

      if (nextIdx === null) break; // All requested

      requestedSet.current.add(nextIdx);
      activeCountRef.current++;

      const img = new Image();
      img.src = getFrameUrl(nextIdx);
      const loadingIdx = nextIdx;

      img.onload = () => {
        images.current[loadingIdx] = img;
        activeCountRef.current--;

        // Redraw if this frame is equal to target or closer than what is currently drawn
        const curTarget = targetFrameRef.current;
        const curDrawn = drawnFrameRef.current;
        const currentDist = curDrawn >= 0 ? Math.abs(curDrawn - curTarget) : Infinity;
        const newDist = Math.abs(loadingIdx - curTarget);

        if (loadingIdx === curTarget || newDist < currentDist) {
          scheduleRender();
        }

        pumpQueueRef.current();
      };

      img.onerror = () => {
        activeCountRef.current--;
        pumpQueueRef.current();
      };
    }
  }, [scheduleRender]);

  useEffect(() => {
    pumpQueueRef.current = pumpQueue;
  }, [pumpQueue]);

  // Responsive canvas size with DPR cap
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      scheduleRender();
    }
  }, [scheduleRender]);

  // Single source of truth scroll subscriber
  useEffect(() => {
    resizeCanvas();

    const unsubscribe = scrollController.subscribe((state) => {
      const target = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(state.globalProgress * (TOTAL_FRAMES - 1)))
      );
      targetFrameRef.current = target;
      if (onProgressChange) {
        onProgressChange(state.globalProgress, target + 1);
      }
      scheduleRender();
      pumpQueue();
    });

    const onResize = () => {
      resizeCanvas();
      scrollController.recalculateMetrics();
    };

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onProgressChange, pumpQueue, resizeCanvas, scheduleRender]);

  // Initial load: fetch Frame 001 immediately and paint it
  useEffect(() => {
    let unmounted = false;
    const f1 = new Image();
    f1.src = getFrameUrl(0);
    requestedSet.current.add(0);

    f1.onload = () => {
      if (unmounted) return;
      images.current[0] = f1;
      resizeCanvas();
      drawImageToCanvas(f1, 0);

      setIsLoaded(true);
      pumpQueue();
    };

    return () => {
      unmounted = true;
    };
  }, [drawImageToCanvas, pumpQueue, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full pointer-events-none select-none z-0 will-change-transform"
      style={{
        display: 'block',
        touchAction: 'pan-y',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-hidden="true"
    />
  );
}
