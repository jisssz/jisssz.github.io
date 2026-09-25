import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

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
  const [isMuted, setIsMuted] = useState(true);

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

  // Toggle audio mute state safely
  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
    }
    setIsMuted(nextMuted);
  }, []);

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

  // Support Escape key to skip intro and M key to toggle mute while active
  useEffect(() => {
    if (phase === 'hidden' || phase === 'fading') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, finishIntro, toggleMute]);

  // Attempt unmuted autoplay first; gracefully fall back to muted autoplay if blocked by browser policy
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const startPlayback = async () => {
      if (!isMounted) return;
      try {
        // Attempt unmuted autoplay
        video.muted = false;
        video.volume = 1;
        await video.play();
        if (isMounted) {
          setIsMuted(false);
          setPhase('playing');
        }
      } catch {
        // Browser rejected unmuted autoplay -> fall back to muted autoplay immediately without delaying video
        try {
          video.muted = true;
          await video.play();
          if (isMounted) {
            setIsMuted(true);
            setPhase('playing');
          }
        } catch (fallbackErr) {
          console.warn('Intro video autoplay failed:', fallbackErr);
          if (isMounted) {
            finishIntro();
          }
        }
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('loadeddata', startPlayback, { once: true });
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    return () => {
      isMounted = false;
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
        playsInline
        preload="auto"
        onEnded={finishIntro}
        onError={finishIntro}
      />

      {/* ── Subtle Theme-Matched Controls in Bottom-Right ── */}
      {phase !== 'fading' && (
        <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-3">
          {/* Audio Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleMute}
            className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 hover:border-[#FF5500]/50 backdrop-blur-xl text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-lg cursor-pointer select-none"
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
          >
            {isMuted ? (
              <>
                <VolumeX
                  size={14}
                  className="text-white/70 group-hover:text-[#FF5500] transition-colors"
                />
                <span className="text-[11px] text-white/70 group-hover:text-white transition-colors">
                  UNMUTE
                </span>
              </>
            ) : (
              <>
                <Volume2
                  size={14}
                  className="text-[#FF5500] animate-pulse"
                />
                <span className="text-[11px] text-white/90">
                  MUTE
                </span>
              </>
            )}
          </button>

          {/* Skip Intro Button */}
          <button
            type="button"
            onClick={finishIntro}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 hover:border-[#FF5500]/50 backdrop-blur-xl text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-lg cursor-pointer select-none"
            aria-label="Skip website intro"
          >
            <span>SKIP INTRO</span>
            <ArrowRight
              size={13}
              className="text-[#FF5500] group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      )}
    </div>
  );
}
