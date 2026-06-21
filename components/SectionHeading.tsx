"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  /** small mono label, e.g. "01." */
  index?: string;
  title: string;
  subtitle?: string;
}

/**
 * Shared section heading with a neon accent underline and fade-in.
 */
export function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h2 className="inline-block text-3xl font-bold sm:text-4xl">
        {index && <span className="mr-2 font-mono text-neon-green">{index}</span>}
        <span className="text-slate-100">{title}</span>
      </h2>
      {/* neon accent underline */}
      <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-neon-green to-neon-blue" />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted">{subtitle}</p>
      )}
    </motion.div>
  );
}
