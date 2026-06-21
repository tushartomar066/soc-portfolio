"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="02."
        title="Skills & Tools"
        subtitle="The detection, response, and automation stack I work with daily."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-neon-blue/40"
          >
            <h3
              className={`mb-4 font-mono text-sm font-semibold ${
                cat.accent === "green" ? "text-neon-green" : "text-neon-blue"
              }`}
            >
              {cat.category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.08 }}
                  className={`cursor-default rounded-md border px-3 py-1.5 font-mono text-xs text-slate-300 transition-all duration-300 ${
                    cat.accent === "green"
                      ? "border-border hover:border-neon-green hover:text-neon-green hover:shadow-neon-green"
                      : "border-border hover:border-neon-blue hover:text-neon-blue hover:shadow-neon-blue"
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
