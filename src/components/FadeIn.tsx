import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { ease } from '../lib/motion';

type FadeInProps = PropsWithChildren<{ className?: string; delay?: number }>;

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
