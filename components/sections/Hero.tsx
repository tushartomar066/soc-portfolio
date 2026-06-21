"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Typewriter } from "@/components/Typewriter";
import { personal } from "@/data/personal";

// Three.js must run client-side only — disable SSR to avoid `window` errors.
const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground").then((m) => m.ParticleBackground),
  { ssr: false }
);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="scanlines relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D particle network */}
      <ParticleBackground />

      {/* faint grid texture + vignette */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-base/40 via-transparent to-base"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p variants={item} className="font-mono text-sm text-neon-blue">
          $ whoami
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl"
        >
          {personal.name}
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-4 text-xl sm:text-2xl"
          aria-live="polite"
        >
          <span className="text-slate-400">&gt; </span>
          <Typewriter words={[...personal.titles]} />
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl font-mono text-sm leading-relaxed text-muted"
        >
          {personal.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="btn-neon border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-neon-green"
          >
            View My Work
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={personal.cvPath}
            download="Tushar-Singh-Tomar-Resume.pdf"
            className="btn-neon border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-neon-blue"
          >
            Download CV
            <Download className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-xs text-slate-500"
      >
        <div className="animate-float">scroll ↓</div>
      </motion.div>
    </section>
  );
}
