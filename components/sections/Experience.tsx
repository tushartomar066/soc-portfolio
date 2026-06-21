"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger the line-draw animation when the timeline scrolls into view.
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading
        index="04."
        title="Experience"
        subtitle="A timeline of defending environments across the SOC."
      />

      <div ref={ref} className="relative pl-8 md:pl-0">
        {/* Vertical track (animated draw) */}
        <div className="absolute left-2 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="h-full w-full bg-gradient-to-b from-neon-green to-neon-blue"
          />
        </div>

        <div className="space-y-12">
          {experience.map((item, i) => {
            const leftSide = i % 2 === 0;
            return (
              <motion.div
                key={`${item.company}-${item.title}`}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                className={`relative md:w-1/2 ${
                  leftSide ? "md:pr-10" : "md:ml-auto md:pl-10"
                }`}
              >
                {/* Node dot */}
                <span
                  className={`absolute -left-[26px] top-2 h-3 w-3 rounded-full bg-neon-green shadow-neon-green md:left-auto ${
                    leftSide
                      ? "md:-right-[6px]"
                      : "md:-left-[6px]"
                  }`}
                />

                <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-neon-green/40">
                  <h3 className="font-semibold text-slate-100">{item.title}</h3>
                  <p className="font-mono text-sm text-neon-blue">{item.company}</p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {item.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {item.location}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex gap-2 text-sm text-slate-300">
                        <span className="mt-1 text-neon-green">▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
