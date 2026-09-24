import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

type CinematicVisualProps = {
  frameIndex: number; // 1 to 300
  alt?: string;
  className?: string;
  aspectRatio?: 'video' | 'portrait' | 'square' | 'wide' | 'auto';
  objectPosition?: string;
  tag?: string;
  caption?: string;
  overlayGradient?: boolean;
  glow?: boolean;
  hoverZoom?: boolean;
};

export function CinematicVisual({
  frameIndex,
  alt = 'Jis Shajan cinematic motion graphics capture',
  className = '',
  aspectRatio = 'video',
  objectPosition = 'center',
  tag,
  caption,
  overlayGradient = true,
  glow = true,
  hoverZoom = true,
}: CinematicVisualProps) {
  const reduce = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  const padded = String(Math.max(1, Math.min(300, frameIndex))).padStart(3, '0');
  const src = `/reference-frames/ezgif-frame-${padded}.jpg`;

  const aspectClass = {
    video: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    auto: 'h-full w-full',
  }[aspectRatio];

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0c0a] shadow-card ${className}`}>
      {/* Ambient Orange Glow Backlight */}
      {glow && (
        <div
          className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-600/10 to-amber-500/20 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
          aria-hidden="true"
        />
      )}

      {/* Frame Visual Container */}
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          style={{ objectPosition }}
          animate={{ opacity: isLoaded ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
          className={`h-full w-full object-cover transition-transform duration-700 ease-expo ${
            hoverZoom && !reduce ? 'group-hover:scale-105' : ''
          }`}
        />

        {/* Cinematic Film Vignette & Subtle Warm Rim Lighting */}
        {overlayGradient && (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060504] via-[#060504]/30 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Frame HUD Tag */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-bone backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#ff7700]" />
            FRAME_{padded}
          </span>
          {tag && (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-amber-400 backdrop-blur-md">
              {tag}
            </span>
          )}
        </div>

        {/* Bottom Caption Overlay if provided */}
        {caption && (
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10">
            <p className="font-mono text-xs uppercase tracking-wider text-bone/90 drop-shadow-md">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
