import type { Transition, Variants } from 'framer-motion';

/**
 * High-End Creative Developer Motion System
 * Calibrated for restraint, physical tactile response, and cinematic reveals.
 */

// Easing curves
export const cinematicEase = [0.19, 1, 0.22, 1] as const;
export const editorialEase = [0.16, 1, 0.3, 1] as const;
export const softEase = [0.25, 0.1, 0.25, 1] as const;
export const snapEase = [0.33, 1, 0.68, 1] as const;

// Backward-compatible default ease
export const ease = editorialEase;

// Spring physics configurations
export const smoothSpring = {
  stiffness: 220,
  damping: 28,
  mass: 0.4,
} as const;

export const tactileSpring = {
  stiffness: 280,
  damping: 22,
  mass: 0.25,
} as const;

export const snappySpring = {
  stiffness: 380,
  damping: 30,
  mass: 0.3,
} as const;

export const cursorSpring = {
  stiffness: 460,
  damping: 36,
  mass: 0.32,
} as const;

// Standard durations (in seconds)
export const durations = {
  micro: 0.18,
  fast: 0.3,
  normal: 0.6,
  moderate: 0.85,
  cinematic: 1.15,
} as const;

// Standard stagger intervals
export const staggers = {
  tight: 0.04,
  standard: 0.08,
  spacious: 0.14,
} as const;

// Reusable Motion Presets / Variants
export const cinematicReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: 'blur(4px)',
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: durations.moderate,
      delay: customDelay,
      ease: cinematicEase,
    },
  }),
};

export const softReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      delay: customDelay,
      ease: editorialEase,
    },
  }),
};

export const maskedReveal: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    y: 40,
    opacity: 0,
  },
  visible: (customDelay: number = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.cinematic,
      delay: customDelay,
      ease: cinematicEase,
    },
  }),
};

export const imageReveal: Variants = {
  hidden: {
    clipPath: 'inset(0% 100% 0% 0%)',
    scale: 1.05,
    opacity: 0.7,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: cinematicEase,
    },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.moderate,
      delay: customDelay,
      ease: editorialEase,
    },
  }),
};

export const staggerContainer = (staggerChildren = staggers.standard, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const hoverLift: Transition = {
  duration: 0.35,
  ease: editorialEase,
};

// Backward-compatible exports
export const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.moderate, ease: editorialEase } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: staggers.standard, delayChildren: 0.08 } },
};

