import type { Config } from "tailwindcss";

/**
 * "Blood & Void" palette — deep purple-black void with electric-violet,
 * cyber-red, and ice-blue accents. Neon green is reserved for success/defender
 * states only.
 *
 * Legacy aliases (base/card/border/neon/muted) are remapped onto the new
 * palette so any stray pre-rebuild class still resolves on-theme.
 */
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
        // ── Blood & Void tokens ──
        background: {
          primary: "#080010", // ultra deep purple-black (page)
          secondary: "#0e0018", // card / terminal background
        },
        accent: {
          purple: "#9d00ff", // primary — electric violet
          red: "#ff003c", // secondary — cyber red / danger
          blue: "#00f5ff", // tertiary — ice blue
          green: "#39ff14", // success / defender states only
        },
        text: {
          primary: "#e8e8f0", // cool white
          secondary: "#8888aa", // muted purple-grey
        },
        glow: "rgba(157, 0, 255, 0.25)", // border.glow

        // ── Legacy aliases → remapped to the new palette ──
        base: "#080010",
        card: "#0e0018",
        "card-hover": "#16012a",
        border: "rgba(157, 0, 255, 0.25)",
        neon: {
          green: "#39ff14",
          blue: "#00f5ff",
          purple: "#9d00ff",
          red: "#ff003c",
        },
        muted: "#8888aa",
      },
      fontFamily: {
        // bound to next/font CSS variables in app/layout.tsx
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-purple": "0 0 5px #9d00ff, 0 0 20px rgba(157,0,255,0.4)",
        "glow-red": "0 0 5px #ff003c, 0 0 20px rgba(255,0,60,0.4)",
        "glow-blue": "0 0 5px #00f5ff, 0 0 20px rgba(0,245,255,0.4)",
        "glow-green": "0 0 5px #39ff14, 0 0 18px rgba(57,255,20,0.4)",
        "card-glow":
          "0 0 0 1px rgba(157,0,255,0.35), 0 10px 40px rgba(157,0,255,0.18)",
        // legacy
        "neon-green": "0 0 5px #39ff14, 0 0 18px rgba(57,255,20,0.4)",
        "neon-blue": "0 0 5px #00f5ff, 0 0 20px rgba(0,245,255,0.4)",
      },
      backgroundImage: {
        "heading-gradient": "linear-gradient(90deg, #9d00ff, #00f5ff)",
        "accent-line": "linear-gradient(90deg, #9d00ff, #ff003c)",
        "grid-overlay":
          "linear-gradient(rgba(157,0,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(157,0,255,0.06) 1px, transparent 1px)",
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
        // RGB channel-split glitch for the hero name
        glitch: {
          "0%, 92%, 100%": {
            transform: "translate(0)",
            clipPath: "inset(0 0 0 0)",
            textShadow: "none",
          },
          "92.5%": {
            transform: "translate(-2px, 1px)",
            clipPath: "inset(10% 0 60% 0)",
            textShadow: "-2px 0 #ff003c, 2px 0 #00f5ff",
          },
          "94%": {
            transform: "translate(2px, -1px)",
            clipPath: "inset(50% 0 20% 0)",
            textShadow: "2px 0 #ff003c, -2px 0 #00f5ff",
          },
          "95.5%": {
            transform: "translate(-1px, 0)",
            clipPath: "inset(30% 0 40% 0)",
            textShadow: "-1px 0 #ff003c, 1px 0 #00f5ff",
          },
          "97%": {
            transform: "translate(1px, 1px)",
            clipPath: "inset(70% 0 5% 0)",
            textShadow: "1px 0 #ff003c, -1px 0 #00f5ff",
          },
        },
        // pulsing red SOC-alert node
        "pulse-alert": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(255,0,60,0.7), 0 0 8px rgba(255,0,60,0.9)",
          },
          "50%": {
            boxShadow:
              "0 0 0 8px rgba(255,0,60,0), 0 0 14px rgba(255,0,60,0.9)",
          },
        },
        // rotating conic border for the profile photo
        "gradient-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 4s ease-in-out infinite",
        scanline: "scanline-move 8s linear infinite",
        // name glitches for ~0.5s on a 4s cycle
        glitch: "glitch 4s infinite steps(1)",
        "pulse-alert": "pulse-alert 1.8s ease-out infinite",
        "gradient-rotate": "gradient-rotate 4s linear infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
