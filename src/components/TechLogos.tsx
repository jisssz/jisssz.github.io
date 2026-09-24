export interface IconProps {
  size?: number;
  className?: string;
}

export function TechLogo({
  iconKey,
  size = 24,
  className = '',
}: { iconKey: string } & IconProps) {
  switch (iconKey) {
    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M11.914 2c-5.076 0-4.75 2.195-4.75 2.195l.006 2.274h4.82v.684H5.21S2 6.786 2 11.905c0 5.118 2.8 4.938 2.8 4.938h1.67v-2.348s-.09-2.8 2.754-2.8h4.73s2.664.045 2.664-2.613V4.654S17.07 2 11.914 2zm-2.61 1.488a.987.987 0 1 1 0 1.974.987.987 0 0 1 0-1.974z"
            fill="#387EB8"
          />
          <path
            d="M12.086 22c5.076 0 4.75-2.195 4.75-2.195l-.006-2.274h-4.82v-.684h6.78s3.21.367 3.21-4.752c0-5.118-2.8-4.938-2.8-4.938h-1.67v2.348s.09 2.8-2.754 2.8h-4.73s-2.664-.045-2.664 2.613v4.425s-.452 2.657 4.704 2.657zm2.61-1.488a.987.987 0 1 1 0-1.974.987.987 0 0 1 0 1.974z"
            fill="#FFE873"
          />
        </svg>
      );

    case 'java':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M8.85 16.84c0 .03-.02.05-.03.07-1.12.92-2.1 1.34-3.1 1.34-1.38 0-1.85-.75-1.85-1.5 0-1.28 1.44-2.7 4.98-3.07v3.16zm9.88.94c-.45-.6-.94-.96-1.58-.96-.4 0-.82.16-1.2.49-.9.76-1.58 1.1-2.45 1.1-.98 0-1.5-.47-1.84-1.11-.47-.9-1.24-1.8-2.26-2.26v-.03c4.27-.47 6.43-1.9 6.43-3.9 0-1.86-1.8-3.26-4.66-3.26-3.88 0-6.9 2.45-6.9 5.37 0 .5.1.98.28 1.43-2.9.7-4.54 2.2-4.54 4.02 0 1.8 1.48 3.27 4.22 3.27 2.44 0 4.67-1.07 6.54-2.43.32.2.7.32 1.12.32.74 0 1.3-.43 1.77-1.02.66-.8 2.05-.8 2.6-.8.56 0 1.05.06 1.46.2.2-.42.33-.94.33-1.46 0-.3-.04-.6-.1-.9-.23-.1-.58-.1-.92-.1-.85 0-1.27.35-1.68.74zM10.8 7.37c1.7 0 2.4.73 2.4 1.57 0 1.32-1.6 2.37-4.04 2.62.34-2.42 1.14-4.19 1.64-4.19zm-1.8-4.4c.1-.47.16-.94.16-1.42C9.16.7 8.56 0 7.8 0c-.8 0-1.42.75-1.42 1.66 0 .58.26 1.1.7 1.5l1.92 1.4v-.02c-.36-.45-.6-.97-.6-1.57zm5.55 1.18c.2-.5.3-.98.3-1.48C14.85 1.1 14.1.37 13.25.37c-.9 0-1.6.8-1.6 1.8 0 .66.33 1.25.84 1.7l1.9 1.45c-.32-.47-.53-1-.53-1.6z"/>
        </svg>
      );

    case 'c':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5c2.4 0 4.53 1.13 5.9 2.87l-2.6 1.73C14.37 7.97 13.25 7.5 12 7.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5c1.25 0 2.37-.47 3.3-1.6l2.6 1.73C16.53 18.37 14.4 19.5 12 19.5z"/>
        </svg>
      );

    case 'javascript':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M3 3h18v18H3V3zm13.78 14.65c1.78 0 2.87-.88 2.87-2.47v-5.2h-1.84v5.15c0 .76-.44 1.05-1.03 1.05-.66 0-.96-.4-1.34-.84l-1.06 1.23c.66.75 1.45 1.08 2.4 1.08zm-5.83-.02c1.7 0 2.76-.75 2.76-2.31 0-1.45-.88-2.07-2.14-2.6l-.61-.26c-.73-.31-1.07-.63-1.07-1.12 0-.54.43-.96 1.13-.96.65 0 1.08.28 1.45.74l1.11-1.19c-.64-.81-1.46-1.16-2.56-1.16-1.64 0-2.69.87-2.69 2.3 0 1.34.8 1.99 2.06 2.51l.61.26c.78.33 1.15.68 1.15 1.2 0 .58-.51 1.02-1.28 1.02-.85 0-1.33-.4-1.74-1.04l-1.19 1.15c.67.97 1.62 1.46 3.02 1.46z"/>
        </svg>
      );

    case 'html5':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2L3 5.25l1.35 15.22L12 23.25l7.65-2.78L21 5.25 12 2zm5.7 6.4h-9l.25 2.8h8.5l-.6 6.8-4.85 1.35-4.85-1.35-.35-3.8h2.3l.18 2 2.72.75 2.72-.75.3-3.4H6.55L5.8 6h12.15l-.25 2.4z"/>
        </svg>
      );

    case 'css3':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2L3 5.25l1.35 15.22L12 23.25l7.65-2.78L21 5.25 12 2zm5.7 6.4h-9l.25 2.8h8.5l-.6 6.8-4.85 1.35-4.85-1.35-.35-3.8h2.3l.18 2 2.72.75 2.72-.75.3-3.4H6.55L5.8 6h12.15l-.25 2.4z"/>
        </svg>
      );

    case 'sql':
    case 'dbms':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
          <path d="M3 12A9 3 0 0 0 21 12"/>
        </svg>
      );

    case 'shell':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <polyline points="4 17 10 11 4 5"/>
          <line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
      );

    case 'react':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="3.5" ry="3.5"/>
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="3.8"/>
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)"/>
          </g>
        </svg>
      );

    case 'bootstrap':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm5.5 4.5h4.2c1.7 0 2.8.9 2.8 2.3 0 1-.6 1.7-1.5 2 1.2.3 1.9 1.1 1.9 2.3 0 1.6-1.3 2.6-3.2 2.6H9.5V7.5zm2.1 1.8v2.2h2c.7 0 1.2-.4 1.2-1.1 0-.7-.5-1.1-1.2-1.1h-2zm0 3.8v2.5h2.2c.8 0 1.4-.4 1.4-1.2 0-.8-.6-1.3-1.4-1.3h-2.2z"/>
        </svg>
      );

    case 'springboot':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M21.2 11.2l-3.3-5.8c-.4-.7-1.1-1.1-1.9-1.1h-6.7c-.8 0-1.5.4-1.9 1.1L4.1 11.2c-.4.7-.4 1.5 0 2.2l3.3 5.8c.4.7 1.1 1.1 1.9 1.1h6.7c.8 0 1.5-.4 1.9-1.1l3.3-5.8c.4-.7.4-1.5 0-2.2zm-9.2 6.5c-3.1 0-5.7-2.6-5.7-5.7 0-2.8 2-5.1 4.7-5.6l-.3 1.5c-2 .4-3.4 2.1-3.4 4.1 0 2.3 1.9 4.2 4.2 4.2 1.6 0 3-1 3.7-2.4l1.3.7c-.9 1.9-2.8 3.2-4.5 3.2z"/>
        </svg>
      );

    case 'tensorflow':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2l-9 5.2v5.2l9-5.2v14.8l4.5-2.6V8.9l4.5 2.6V6.3L12 2z"/>
        </svg>
      );

    case 'numpy':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M3 4h4.5v6H12V4h4.5v16H12v-6H7.5v6H3V4zm13.5 0h4.5v16h-4.5V4z"/>
        </svg>
      );

    case 'git':
    case 'version-ctrl':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M21.6 10.7l-8.3-8.3c-.8-.8-2.2-.8-3 0L8.5 4.2l3.8 3.8c.9-.3 1.9-.1 2.6.6.7.7.9 1.7.6 2.6l3.7 3.7c.9-.3 1.9-.1 2.6.6 1 .9 1 2.5 0 3.5s-2.5 1-3.5 0c-.8-.8-.9-2-.4-3l-3.4-3.4v4.9c.4.3.7.8.7 1.4 0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2c0-.9.6-1.7 1.4-2v-5c-.8-.3-1.4-1.1-1.4-2 0-.6.3-1.2.7-1.6L5.3 7.4 2.4 10.3c-.8.8-.8 2.2 0 3l8.3 8.3c.8.8 2.2.8 3 0l7.9-7.9c.8-.8.8-2.2 0-3z"/>
        </svg>
      );

    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );

    case 'linux':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C9.5 2 8 3.5 8 6v4c-1.5 1-2.5 3-2.5 5 0 2.5 1.5 4.5 3.5 5 0 1 1 2 3 2s3-1 3-2c2-.5 3.5-2.5 3.5-5 0-2-1-4-2.5-5V6c0-2.5-1.5-4-4-4zm-2 5c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm4 0c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm-2 4c1 0 1.5.5 1.5 1s-.5 1-1.5 1-1.5-.5-1.5-1 .5-1 1.5-1z"/>
        </svg>
      );

    case 'vscode':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M17.5 2L8.2 9.5 4 6.2 2 7.5v9l2 1.3 4.2-3.3 9.3 7.5 4.5-2V4l-4.5-2zm-9.3 10l-3.2 2.5V9.5l3.2 2.5zm9.3 5.4L11.8 12l5.7-5.4v10.8z"/>
        </svg>
      );

    case 'dsa':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="5" r="3"/>
          <circle cx="6" cy="19" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <path d="M12 8v4"/>
          <path d="M6 16l6-4 6 4"/>
        </svg>
      );

    case 'oop':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      );

    case 'problem-solving':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      );

    case 'os':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <rect x="9" y="9" width="6" height="6"/>
          <line x1="9" y1="1" x2="9" y2="4"/>
          <line x1="15" y1="1" x2="15" y2="4"/>
          <line x1="9" y1="20" x2="9" y2="23"/>
          <line x1="15" y1="20" x2="15" y2="23"/>
          <line x1="20" y1="9" x2="23" y2="9"/>
          <line x1="20" y1="15" x2="23" y2="15"/>
          <line x1="1" y1="9" x2="4" y2="9"/>
          <line x1="1" y1="15" x2="4" y2="15"/>
        </svg>
      );

    case 'debugging':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect width="8" height="14" x="8" y="6" rx="4"/>
          <path d="m19 7-3 2"/>
          <path d="m5 7 3 2"/>
          <path d="m19 19-3-2"/>
          <path d="m5 19 3-2"/>
          <path d="M20 13h-4"/>
          <path d="M4 13h4"/>
          <path d="m10 4 1 2"/>
          <path d="m14 4-1 2"/>
        </svg>
      );

    case 'code-opt':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="m12 14 4-4"/>
          <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
        </svg>
      );

    case 'clean-code':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      );

    case 'collaboration':
    case 'teamwork':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      );

    case 'event-coord':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <path d="m12 14 1.5 2.5 2.5-1.5-1 3"/>
        </svg>
      );

    case 'team-mgmt':
    case 'leadership':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      );

    case 'marketing-outreach':
    case 'marketing-strat':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
      );

    case 'project-planning':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M8 7v7"/>
          <path d="M12 7v4"/>
          <path d="M16 7v9"/>
        </svg>
      );

    case 'data-analytics':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M3 3v18h18"/>
          <path d="m19 9-5 5-4-4-3 3"/>
        </svg>
      );

    case 'product-dev':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="m7.5 4.27 9 5.15"/>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5"/>
          <path d="M12 22V12"/>
        </svg>
      );

    case 'tech-solutions':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
        </svg>
      );

    case 'communication':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      );

    case 'time-mgmt':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      );

    case 'adaptability':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );

    case 'lang-en':
    case 'lang-hi':
    case 'lang-ml':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      );
  }
}
