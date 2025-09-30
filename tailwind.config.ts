import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#5C6AC4",
          dark: "#3E4BA8",
          light: "#8C9EFF"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
