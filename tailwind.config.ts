import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4C1D95',
          foreground: '#ffffff'
        }
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(76,29,149,0.35)'
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
