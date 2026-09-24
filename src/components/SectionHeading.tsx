import { motion, useReducedMotion } from 'framer-motion';
import { cinematicEase } from '../lib/motion';


type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
  number?: string;
};

export function SectionHeading({ eyebrow, title, className = '', number }: SectionHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`mb-12 border-t border-line/60 pt-6 md:mb-20 ${className}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
          {number && (
            <span className="font-mono text-xs font-bold text-muted">
              [{number}]
            </span>
          )}
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-electric">
            {eyebrow}
          </span>
        </div>
        <div className="max-w-4xl overflow-hidden">
          <motion.h2
            initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)', y: 36, opacity: 0 }}
            whileInView={reduce ? undefined : { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: cinematicEase }}
            className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-[-0.07em] text-bone md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h2>
        </div>
      </div>
    </div>
  );
}

