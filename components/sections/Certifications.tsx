"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="// 02b. certs"
        title="Certifications"
        subtitle="Validated knowledge across defensive and offensive security."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto max-w-xl"
      >
        <div className="flex flex-col items-center rounded-2xl border border-glow bg-background-secondary p-10 text-center shadow-card-glow transition-all duration-300 hover:border-accent-purple">
          {/* neon shield icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent-purple/40 bg-accent-purple/10 shadow-glow-purple">
            <ShieldCheck className="h-8 w-8 text-accent-purple" />
          </div>

          <h3 className="font-heading text-xl font-semibold text-text-primary">
            Certifications In Progress
          </h3>
          <p className="mt-3 font-mono text-sm leading-relaxed text-text-secondary">
            Currently preparing for CompTIA Security+, CEH, and Microsoft SC-200.
            Check back soon.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
