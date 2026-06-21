"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="03."
        title="Certifications"
        subtitle="Validated knowledge across defensive and offensive security."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group h-52 [perspective:1200px]"
          >
            {/* Inner wrapper rotates on hover (flip) */}
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center [backface-visibility:hidden]">
                <Award className="mb-3 h-8 w-8 text-neon-green" />
                <h3 className="font-semibold text-slate-100">{cert.name}</h3>
                <p className="mt-1 font-mono text-xs text-muted">{cert.issuer}</p>
                <span className="mt-3 rounded-full border border-border px-3 py-1 font-mono text-xs text-neon-blue">
                  {cert.year}
                </span>
              </div>

              {/* Back */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-neon-green bg-card-hover p-6 text-center shadow-neon-green [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="font-mono text-xs leading-relaxed text-slate-300">
                  {cert.blurb}
                </p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-neon-green hover:underline"
                >
                  Verify credential <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
