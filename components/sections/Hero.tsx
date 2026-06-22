"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Typewriter } from "@/components/Typewriter";
import { MagneticButton } from "@/components/MagneticButton";
import { ThreatFeedWidget } from "@/components/ThreatFeedWidget";
import { personal } from "@/data/personal";

// Three.js must run client-side only — disable SSR to avoid `window` errors.
const ParticleBackground = dynamic(
  () =>
    import("@/components/ParticleBackground").then((m) => m.ParticleBackground),
  { ssr: false }
);

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="scanlines relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D wireframe threat nodes (parallax) */}
      <div data-scroll-speed="-4" className="absolute inset-0">
        <ParticleBackground />
      </div>

      {/* Kali dragon watermark behind content */}
      <KaliDragon />

      {/* faint grid + vignette */}
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background-primary/40 via-transparent to-background-primary"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        data-scroll-speed="-1.5"
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p variants={item} className="font-mono text-sm text-accent-blue">
          $ whoami
        </motion.p>

        <motion.h1
          variants={item}
          className="glitch mt-4 font-heading text-4xl font-bold tracking-tight text-text-primary sm:text-6xl"
          data-text={personal.name}
        >
          {personal.name}
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-4 text-xl sm:text-2xl"
          aria-live="polite"
        >
          <span className="text-text-secondary">&gt; </span>
          <Typewriter words={[...personal.titles]} />
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl font-mono text-sm leading-relaxed text-text-secondary"
        >
          {personal.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#projects">
            View My Work
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href={personal.cvPath}
            download="Tushar-Singh-Tomar-Resume.pdf"
            trackCvDownload
          >
            Download CV
            <Download className="h-4 w-4" />
          </MagneticButton>
        </motion.div>

        {/* Live SIEM-style threat feed */}
        <motion.div variants={item} className="flex justify-center">
          <ThreatFeedWidget />
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-xs text-text-secondary"
      >
        <div className="animate-float">scroll ↓</div>
      </motion.div>
    </section>
  );
}

/** Centered Kali dragon SVG watermark at 4% opacity in #9d00ff. */
function KaliDragon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 512 512"
        className="h-[36rem] w-[36rem] max-w-none text-accent-purple opacity-[0.04]"
        fill="currentColor"
      >
        <path d="M256 24c-18 40-10 78 14 110-44-20-86-18-122 6 30 6 54 22 70 48-40-8-76 2-104 30 36-4 66 6 88 32-34 2-62 18-80 48 40-14 76-10 106 12-26 14-44 38-50 70 30-28 64-40 102-38-14 26-16 54-6 84 14-34 38-58 72-70-2 32 8 62 30 88 4-40-6-76-30-106 34 8 66 0 94-24-34-2-62-16-80-44 38 6 72-6 98-36-38 8-72 2-98-22 30-12 52-36 62-70-28 22-58 32-92 30 18-30 22-64 12-100-18 28-42 46-72 54 8-36 2-70-22-100z" />
      </svg>
    </div>
  );
}
