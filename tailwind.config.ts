import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced cosmic theme with teal/cyan accents
        cosmic: {
          950: '#010109',
          900: '#030014',
          800: '#0a0520',
          700: '#120a30',
          600: '#1a0f40',
          500: '#251650',
        },
        comet: {
          glow: '#7c3aed',
          trail: '#a78bfa',
          core: '#f5f3ff',
          accent: '#c4b5fd',
          cyan: '#06b6d4',
          teal: '#14b8a6',
        },
        aurora: {
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#3b82f6',
          cyan: '#22d3ee',
        },
        cognizant: {
          blue: '#0033a0',
          light: '#0066ff',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #010109 0%, #030014 20%, #0a0520 40%, #120a30 60%, #0a0520 80%, #010109 100%)',
        'aurora-gradient': 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(236, 72, 153, 0.15) 0px, transparent 50%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'orbit': 'orbit 20s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'meteor': 'meteor 5s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(124, 58, 237, 0.2), 0 0 60px rgba(6, 182, 212, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.3), 0 0 90px rgba(6, 182, 212, 0.2)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'meteor': {
          '0%': { transform: 'translateX(-100%) translateY(-100%)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateX(200%) translateY(200%)', opacity: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}

export default config
