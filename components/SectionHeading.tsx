"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface SectionHeadingProps {
  /** terminal-style label rendered above the title, e.g. "// 01. about" */
  label?: string;
  title: string;
  subtitle?: string;
}

/**
 * Shared section heading: a JetBrains-mono red terminal label above a
 * gradient (#9d00ff → #00f5ff) Space-Grotesk title. The title carries a
 * `data-scroll-speed` for subtle parallax (driven by lib/scroll.ts).
 */
export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mb-12 text-center"
    >
      {label && (
        <p className="mb-3 font-mono text-sm text-accent-red">{label}</p>
      )}
      <h2
        data-scroll-speed="0.5"
        className="inline-block font-heading text-3xl font-bold sm:text-4xl"
      >
        <span className="text-gradient">{title}</span>
      </h2>
      {/* accent underline */}
      <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-accent-line" />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-text-secondary">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
