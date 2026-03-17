import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          light: "#ede9fe",
        },
        accent: {
          cyan: "#06b6d4",
          purple: "#7c3aed",
          dark: "#7c5bf5",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 8s ease-in-out 2s infinite",
        "float-slow": "float 10s ease-in-out 4s infinite",
        "gradient": "gradient 8s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 91, 245, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 91, 245, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
