"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="03."
        title="Certifications"
        subtitle="Validated knowledge across defensive and offensive security."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl"
      >
        <div className="glass flex flex-col items-center rounded-2xl p-10 text-center shadow-neon-green transition-all duration-300 hover:border-neon-green">
          {/* neon shield icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-neon-green/40 bg-neon-green/10 shadow-neon-green">
            <ShieldCheck className="h-8 w-8 text-neon-green" />
          </div>

          <h3 className="text-xl font-semibold text-slate-100">
            Certifications In Progress
          </h3>
          <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
            Currently preparing for CompTIA Security+, CEH, and Microsoft SC-200.
            Check back soon.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
