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
 * 2. 16:9 Aspect-ratio contain scaling with top-biased centering (never crops face/head).
 * 3. Native document scroll single source of truth:
 *      window.scrollY / maxScroll -> progress (0.0 to 1.0) -> targetFrame (0 to 299).
 * 4. Zero black voids, zero wheel-hijacking, zero artificial scroll libraries.
 * 5. Nearest-frame fallback with automatic re-draw as soon as target frame arrives.
 * 6. High-throughput progressive preloader:
 *      - Immediate burst of frames 0..20
 *      - Global keyframe spine (every 5th frame)
 *      - Complete background fill of all 300 frames with 20 parallel streams
 *      - High-priority lookahead for immediate scroll neighborhood
 */
export function CinematicCanvas({ onProgressChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cached frame images array [0..299]
  const images = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const requestedSet = useRef<Set<number>>(new Set());
  const priorityQueue = useRef<number[]>([]);
  const activeCountRef = useRef<number>(0);
  const MAX_CONCURRENCY = 20;

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
    if (!img.complete || img.naturalWidth === 0) return;

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
    if (cache[target] && cache[target]!.complete && cache[target]!.naturalWidth > 0) {
      return { img: cache[target]!, index: target };
    }

    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const down = target - d;
      if (down >= 0 && cache[down] && cache[down]!.complete && cache[down]!.naturalWidth > 0) {
        return { img: cache[down]!, index: down };
      }
      const up = target + d;
      if (up < TOTAL_FRAMES && cache[up] && cache[up]!.complete && cache[up]!.naturalWidth > 0) {
        return { img: cache[up]!, index: up };
      }
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

  // High-throughput priority queue pump
  const pumpQueueRef = useRef<() => void>(() => {});

  const pumpQueue = useCallback(() => {
    while (activeCountRef.current < MAX_CONCURRENCY) {
      let nextIdx: number | null = null;

      // 1. Check priority queue first
      while (priorityQueue.current.length > 0) {
        const candidate = priorityQueue.current.shift()!;
        if (!requestedSet.current.has(candidate)) {
          nextIdx = candidate;
          break;
        }
      }

      // 2. If priority queue is empty, fill keyframes first (every 5th frame)
      if (nextIdx === null) {
        for (let i = 0; i < TOTAL_FRAMES; i += 5) {
          if (!requestedSet.current.has(i)) {
            nextIdx = i;
            break;
          }
        }
      }

      // 3. Sequential fill outward from current target
      if (nextIdx === null) {
        const target = targetFrameRef.current;
        for (let d = 0; d < TOTAL_FRAMES; d++) {
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

      if (nextIdx === null) break; // All 300 frames have been requested!

      requestedSet.current.add(nextIdx);
      activeCountRef.current++;

      const img = new Image();
      img.decoding = 'async';
      img.src = getFrameUrl(nextIdx);
      const loadingIdx = nextIdx;

      img.onload = () => {
        images.current[loadingIdx] = img;
        activeCountRef.current--;

        // Redraw immediately if this frame is equal to target or closer than what is currently drawn
        const curTarget = targetFrameRef.current;
        const curDrawn = drawnFrameRef.current;
        const currentDist = curDrawn >= 0 ? Math.abs(curDrawn - curTarget) : Infinity;
        const newDist = Math.abs(loadingIdx - curTarget);

        if (loadingIdx === curTarget || newDist < currentDist) {
          drawImageToCanvas(img, loadingIdx);
        }

        pumpQueueRef.current();
      };

      img.onerror = () => {
        activeCountRef.current--;
        pumpQueueRef.current();
      };
    }
  }, [drawImageToCanvas]);

  useEffect(() => {
    pumpQueueRef.current = pumpQueue;
  }, [pumpQueue]);

  // Request high-priority load for frames surrounding current target
  const prioritizeNeighborhood = useCallback((target: number) => {
    const urgent: number[] = [];
    urgent.push(target);
    for (let o = 1; o <= 6; o++) {
      if (target + o < TOTAL_FRAMES) urgent.push(target + o);
      if (target - o >= 0) urgent.push(target - o);
    }
    const needed = urgent.filter((idx) => !requestedSet.current.has(idx));
    if (needed.length > 0) {
      priorityQueue.current = [...needed, ...priorityQueue.current];
      pumpQueue();
    }
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

  // Master Scroll Subscriber — synchronous 1:1 painting on the same animation frame
  useEffect(() => {
    resizeCanvas();

    const unsubscribe = scrollController.subscribeCanvas((target, progress) => {
      targetFrameRef.current = target;
      prioritizeNeighborhood(target);

      const exact = images.current[target];
      if (exact && exact.complete && exact.naturalWidth > 0) {
        drawImageToCanvas(exact, target);
      } else {
        const best = getNearestLoadedImage(target);
        if (best) {
          drawImageToCanvas(best.img, best.index);
        }
      }

      if (onProgressChange) {
        onProgressChange(progress, target + 1);
      }
    });

    const onResize = () => {
      resizeCanvas();
      scrollController.recalculateLayout();
    };

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [drawImageToCanvas, getNearestLoadedImage, onProgressChange, prioritizeNeighborhood, resizeCanvas]);

  // Initial load: fetch Frame 001 immediately, paint it, and launch high-throughput preloader
  useEffect(() => {
    let unmounted = false;
    const f1 = new Image();
    f1.decoding = 'async';
    f1.src = getFrameUrl(0);
    requestedSet.current.add(0);

    f1.onload = () => {
      if (unmounted) return;
      images.current[0] = f1;
      resizeCanvas();
      drawImageToCanvas(f1, 0);

      setIsLoaded(true);

      // Preload first 20 frames immediately into priority queue
      const initialBurst: number[] = [];
      for (let i = 1; i <= 20; i++) {
        initialBurst.push(i);
      }
      priorityQueue.current = initialBurst;
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
