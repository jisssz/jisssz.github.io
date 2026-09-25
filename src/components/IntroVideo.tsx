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
  // Default audio intent is SOUND ON (isMuted = false); updated if browser blocks unmuted autoplay
  const [isMuted, setIsMuted] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

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

  // Handle single-click audio activation / toggle
  const handleAudioAction = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      // Unmute and ensure full volume without pausing or restarting video
      video.muted = false;
      video.volume = 1;
      if (video.paused) {
        video.play().catch(() => {});
      }
      setIsMuted(false);
      setAudioBlocked(false);
    } else {
      // Mute audio
      video.muted = true;
      setIsMuted(true);
    }
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

  // Support Escape key to skip intro and M key to toggle/enable audio while active
  useEffect(() => {
    if (phase === 'hidden' || phase === 'fading') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      } else if (e.key === 'm' || e.key === 'M') {
        handleAudioAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, finishIntro, handleAudioAction]);

  // Synchronize isMuted with actual video element state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onVolumeChange = () => {
      setIsMuted(video.muted);
    };

    video.addEventListener('volumechange', onVolumeChange);
    return () => {
      video.removeEventListener('volumechange', onVolumeChange);
    };
  }, []);

  // Prioritize SOUND-ON autoplay: attempt unmuted first; gracefully fall back to muted if browser blocks it
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;
    let hasStarted = false;

    const startPlayback = async () => {
      if (!isMounted || hasStarted) return;
      hasStarted = true;

      // Clean up event listeners so subsequent ready events do not re-trigger
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);

      // 1. Default intended state = SOUND ON
      video.muted = false;
      video.volume = 1;

      try {
        // Attempt unmuted autoplay immediately
        await video.play();
        if (isMounted) {
          setIsMuted(false);
          setAudioBlocked(false);
          setPhase('playing');
        }
      } catch {
        // Browser rejected unmuted autoplay -> fall back immediately to muted playback so video is not stuck
        try {
          video.muted = true;
          await video.play();
          if (isMounted) {
            setIsMuted(true);
            setAudioBlocked(true);
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

    const handleReady = () => {
      startPlayback();
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('loadeddata', handleReady, { once: true });
      video.addEventListener('canplay', handleReady, { once: true });
    }

    return () => {
      isMounted = false;
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
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
        playsInline
        preload="auto"
        onEnded={finishIntro}
        onError={finishIntro}
      />

      {/* ── Subtle Theme-Matched Controls in Bottom-Right ── */}
      {phase !== 'fading' && (
        <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-3">
          {/* Audio Control Button */}
          <button
            type="button"
            onClick={handleAudioAction}
            className={`group inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border backdrop-blur-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-lg cursor-pointer select-none ${
              audioBlocked && isMuted
                ? 'border-[#FF5500]/60 hover:border-[#FF5500] text-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.25)]'
                : 'border-white/10 hover:border-[#FF5500]/50 text-white'
            }`}
            aria-label={
              audioBlocked && isMuted
                ? 'Enable video sound'
                : isMuted
                ? 'Unmute video audio'
                : 'Mute video audio'
            }
            title={
              audioBlocked && isMuted
                ? 'Enable Sound (M)'
                : isMuted
                ? 'Unmute (M)'
                : 'Mute (M)'
            }
          >
            {isMuted ? (
              audioBlocked ? (
                <>
                  <VolumeX
                    size={14}
                    className="text-[#FF5500] animate-pulse"
                  />
                  <span className="text-[11px] text-[#FF5500] font-semibold tracking-wider">
                    ENABLE SOUND
                  </span>
                </>
              ) : (
                <>
                  <VolumeX
                    size={14}
                    className="text-white/70 group-hover:text-[#FF5500] transition-colors"
                  />
                  <span className="text-[11px] text-white/70 group-hover:text-white transition-colors">
                    UNMUTE
                  </span>
                </>
              )
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
