import { motion, useReducedMotion } from 'framer-motion';
import { cinematicEase } from '../lib/motion';

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const reduce = useReducedMotion();
  const lines = text.split('\n');

  return (
    <span className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden pb-1">
          <motion.span
            className="block will-change-transform"
            initial={
              reduce
                ? false
                : {
                    clipPath: 'inset(100% 0% 0% 0%)',
                    y: '105%',
                    opacity: 0.15,
                  }
            }
            whileInView={
              reduce
                ? undefined
                : {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    y: '0%',
                    opacity: 1,
                  }
            }
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 1.05,
              delay: delay + index * 0.1,
              ease: cinematicEase,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

