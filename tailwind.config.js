/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060504',
        obsidian: '#0a0807',
        charcoal: '#120f0d',
        card: '#16120e',
        bone: '#f5f0e8',
        muted: '#a39b91',
        line: 'rgba(245, 240, 232, 0.12)',
        folio: {
          bg: '#090706',
          surface: '#120B08',
          dark: '#1A0D08',
          accent: '#FF5A1F',
          orange: '#FF6A24',
          deep: '#E84212',
          glow: '#FF3B12',
          text: '#F7F3ED',
          subtext: '#B8ADA4',
          muted: '#766D66',
          burgundy: '#2A0D12',
        },
        vermilion: {
          DEFAULT: '#FF5A1F',
          dark: '#E84212',
          glow: 'rgba(255, 90, 31, 0.45)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Syne', 'Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        glow: '0 0 80px rgba(255, 119, 0, 0.22)',
        card: '0 24px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
        amberGlow: '0 0 50px -10px rgba(255, 119, 0, 0.35)',
        amberBorder: '0 0 20px rgba(255, 119, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
