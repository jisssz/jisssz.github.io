import { type MotionValue, useTransform } from 'framer-motion';

export const TOTAL_FRAMES = 300;

export type SceneConfig = {
  id: string;
  chapter: string;
  label: string;
  start: number;
  end: number;
};

/**
 * Master scene timeline. Ranges overlap slightly for smooth cross-dissolve transitions.
 */
export const SCENES: SceneConfig[] = [
  { id: 'identity',     chapter: '01', label: 'IDENTITY',       start: 0.000, end: 0.120 },
  { id: 'profile',      chapter: '01', label: 'PROFILE',        start: 0.100, end: 0.220 },
  { id: 'skills',       chapter: '02', label: 'SYSTEM PROFILE', start: 0.200, end: 0.340 },
  { id: 'projects',     chapter: '03', label: 'SELECTED WORK',  start: 0.320, end: 0.540 },
  { id: 'experience',   chapter: '04', label: 'EXPERIENCE',     start: 0.520, end: 0.640 },
  { id: 'community',    chapter: '05', label: 'COMMUNITY',      start: 0.620, end: 0.740 },
  { id: 'achievements', chapter: '06', label: 'ACHIEVEMENTS',   start: 0.720, end: 0.830 },
  { id: 'education',    chapter: '06', label: 'EDUCATION',      start: 0.810, end: 0.910 },
  { id: 'contact',      chapter: '07', label: 'CONTACT',        start: 0.890, end: 1.000 },
];

export function getSceneById(id: string): SceneConfig {
  const s = SCENES.find(sc => sc.id === id);
  if (!s) throw new Error(`Scene "${id}" not found`);
  return s;
}

/**
 * Derive opacity, y-translate, and local progress (0→1) from master scroll progress.
 * Guarantees:
 * 1. Scene 01 (Identity) is fully visible at masterProgress = 0.000 (no blank initial screen).
 * 2. Scene 07 (Contact) remains fully visible at masterProgress = 1.000 (no blank screen at the end).
 * 3. All transforms are strictly clamped.
 */
export function useSceneTransforms(masterProgress: MotionValue<number>, scene: SceneConfig) {
  const range = scene.end - scene.start;
  const isFirst = scene.start === 0;
  const isLast = scene.end === 1.0;

  const enterEnd = scene.start + range * 0.22;
  const exitStart = scene.end - range * 0.22;

  const inputMap = isFirst
    ? [scene.start, exitStart, scene.end]
    : isLast
    ? [scene.start, enterEnd, scene.end]
    : [scene.start, enterEnd, exitStart, scene.end];

  const opacityMap = isFirst
    ? [1, 1, 0]
    : isLast
    ? [0, 1, 1]
    : [0, 1, 1, 0];

  const yMap = isFirst
    ? [0, 0, -36]
    : isLast
    ? [40, 0, 0]
    : [40, 0, 0, -36];

  const opacity = useTransform(masterProgress, inputMap, opacityMap, { clamp: true });
  const y = useTransform(masterProgress, inputMap, yMap, { clamp: true });
  const localProgress = useTransform(masterProgress, [scene.start, scene.end], [0, 1], { clamp: true });

  return { opacity, y, localProgress };
}

/** Map master progress (0→1) to frame index (0→299) */
export function progressToFrame(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.min(TOTAL_FRAMES - 1, Math.round(clamped * (TOTAL_FRAMES - 1)));
}

/** Get URL for a frame by zero-based index */
export function getFrameUrl(index: number): string {
  const padded = String(index + 1).padStart(3, '0');
  return `/reference-frames/ezgif-frame-${padded}.jpg`;
}

/** Programmatically scroll to a scene's active position */
export function scrollToScene(sceneId: string) {
  const scene = SCENES.find(s => s.id === sceneId);
  if (!scene) return;

  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const range = scene.end - scene.start;
  const targetProgress = scene.start === 0 ? 0 : scene.start + range * 0.28;
  const targetScrollY = targetProgress * maxScroll;

  window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
}
