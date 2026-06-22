"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications, type Certification } from "@/data/certifications";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="// 02b. certs"
        title="Certifications"
        subtitle="Where I'm headed — certifications I'm working toward and planning."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: EASE }}
          >
            <CertCard cert={cert} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const [flipped, setFlipped] = useState(false);
  const inProgress = cert.status === "In Progress";

  return (
    <div
      className="group relative h-56 [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-glow bg-background-secondary p-6 [backface-visibility:hidden] group-hover:shadow-card-glow">
          <div className="absolute inset-x-0 top-0 h-px bg-accent-line" />
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `${cert.color}1a`,
              border: `1px solid ${cert.color}66`,
            }}
          >
            <ShieldCheck className="h-6 w-6" style={{ color: cert.color }} />
          </div>

          <h3 className="font-heading text-lg font-semibold text-text-primary">
            {cert.name}
          </h3>
          <p className="font-mono text-xs text-text-secondary">{cert.issuer}</p>

          <div className="mt-auto">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold ${
                inProgress
                  ? "border border-accent-red/50 text-accent-red"
                  : "border border-text-secondary/40 text-text-secondary"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  inProgress ? "animate-pulse bg-accent-red" : "bg-text-secondary"
                }`}
              />
              {cert.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-accent-purple bg-background-secondary p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-card-glow">
          <div className="absolute inset-x-0 top-0 h-px bg-accent-line" />
          <div className="mb-2 flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 shrink-0 text-accent-purple" />
            <h3 className="font-heading text-sm font-semibold leading-tight text-text-primary">
              {cert.fullName}
            </h3>
          </div>
          <p className="font-mono text-[11px] text-accent-blue">{cert.issuer}</p>
          <p className="mt-3 text-xs leading-relaxed text-text-secondary">
            {cert.validates}
          </p>
          <p className="mt-auto font-mono text-[11px] text-accent-purple">
            ⏳ {cert.timeline}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
