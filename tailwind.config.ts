import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core dark theme
        base: "#0a0f1e", // deep navy page background
        card: "#0d1526", // card background
        "card-hover": "#111c33",
        border: "#1c2842",
        // Neon accents
        neon: {
          green: "#00ff9f",
          blue: "#00d4ff",
        },
        muted: "#8aa0c5",
      },
      fontFamily: {
        // bound to the next/font CSS variables in app/layout.tsx
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "neon-green": "0 0 5px #00ff9f, 0 0 20px rgba(0,255,159,0.35)",
        "neon-blue": "0 0 5px #00d4ff, 0 0 20px rgba(0,212,255,0.35)",
        "card-glow": "0 0 0 1px rgba(0,212,255,0.15), 0 8px 30px rgba(0,0,0,0.6)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "scanline-move": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 4s ease-in-out infinite",
        scanline: "scanline-move 8s linear infinite",
      },
      backgroundImage: {
        "grid-overlay":
          "linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
