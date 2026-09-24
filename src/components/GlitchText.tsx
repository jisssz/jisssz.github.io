import { type FC, type CSSProperties } from 'react';
import './GlitchText.css';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'p';
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration'?: string;
  '--before-duration'?: string;
  '--after-shadow'?: string;
  '--before-shadow'?: string;
  '--after-offset'?: string;
  '--before-offset'?: string;
}

export const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.45,
  enableShadows = true,
  enableOnHover = false,
  className = '',
  as = 'span',
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-3px 0 rgba(255, 30, 60, 0.85)' : 'none',
    '--before-shadow': enableShadows ? '3px 0 rgba(0, 240, 255, 0.85)' : 'none',
    '--after-offset': '3px',
    '--before-offset': '-3px',
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';
  const Tag = as;

  return (
    <Tag
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
    </Tag>
  );
};

export default GlitchText;
