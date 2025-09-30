import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },
        danger: "#dc2626",
        warning: "#f59e0b",
        success: "#16a34a",
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(37, 99, 235, 0.4)",
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
