"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { KaliTerminal } from "@/components/KaliTerminal";
import { skillCategories } from "@/data/skills";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** kebab-case a category for the terminal path, e.g. "SIEM & Detection" → "siem-detection". */
function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="// 02. skills"
        title="Skills & Tools"
        subtitle="The detection, response, and automation tools I'm learning to work with in the SOC."
      />

      {/* Responsive grid of Kali-terminal cards (3 / 2 / 1 columns). */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: EASE }}
            className="h-full"
          >
            <KaliTerminal
              title={`~/skills/${slug(cat.category)}`}
              className="h-full"
            >
              <p className="break-all text-accent-purple">
                ┌──(<span className="text-accent-red">tushar</span>㉿
                <span className="text-accent-blue">kali</span>)-[~/skills/
                {slug(cat.category)}]
              </p>
              <p className="mb-2 text-accent-purple">
                └─$ <span className="text-text-secondary">ls -la</span>
              </p>
              <ul className="space-y-1">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-text-primary">
                    <span className="text-accent-green">-rwxr--r--</span>{" "}
                    <span className="text-text-secondary">tushar</span> {skill}
                  </li>
                ))}
              </ul>
            </KaliTerminal>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
