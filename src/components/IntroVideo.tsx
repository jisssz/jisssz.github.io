import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
  videoSrc?: string;
}

export function IntroVideo({
  onComplete,
  videoSrc = '/website-loading-intro.mp4',
}: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'loading' | 'playing' | 'fading' | 'hidden'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'hidden';
    }
    return 'loading';
  });

  // Finish intro with 650ms smooth fade transition into existing portfolio
  const finishIntro = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
      } catch {
        // ignore if already ended
      }
    }
    setPhase('fading');
    const timer = setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      onComplete();
    }, 650);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Lock body scroll during intro; restore upon exit
  useEffect(() => {
    if (phase === 'hidden') {
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase, onComplete]);

  // Support Escape key to skip intro while active
  useEffect(() => {
    if (phase === 'hidden' || phase === 'fading') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, finishIntro]);

  // Attempt autoplay immediately upon mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = async () => {
      try {
        video.muted = true;
        await video.play();
        setPhase('playing');
      } catch (err) {
        console.warn('Autoplay error:', err);
        finishIntro();
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('loadeddata', startPlayback, { once: true });
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
    };
  }, [finishIntro]);

  if (phase === 'hidden') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] w-full h-full max-w-[100vw] max-h-[100vh] bg-[#000000] flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Website Loading Intro"
    >
      {/* ── Exact Website Loading Intro Video (Original 16:9 Composition Preserved) ── */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full max-w-full max-h-full object-contain object-center bg-[#000000]"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finishIntro}
        onError={finishIntro}
      />

      {/* ── Small, Premium Skip Intro Control in Bottom-Right ── */}
      {phase !== 'fading' && (
        <button
          type="button"
          onClick={finishIntro}
          className="absolute bottom-6 right-6 z-30 group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 hover:border-[#FF5500]/50 backdrop-blur-xl text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
          aria-label="Skip website intro"
        >
          <span>SKIP INTRO</span>
          <ArrowRight
            size={13}
            className="text-[#FF5500] group-hover:translate-x-1 transition-transform"
          />
        </button>
      )}
    </div>
  );
}
