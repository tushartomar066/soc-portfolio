"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { KaliTerminal } from "@/components/KaliTerminal";
import { skillCategories } from "@/data/skills";

/** kebab-case a category for the terminal path, e.g. "SIEM & Detection" → "siem-detection". */
function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function Skills() {
  return (
    <section
      id="skills"
      data-scroll-direction="horizontal"
      className="relative py-24 md:min-h-screen md:py-0"
    >
      <div className="mx-auto max-w-6xl px-6 md:pt-24">
        <SectionHeading
          label="// 02. skills"
          title="Skills & Tools"
          subtitle="The detection, response, and automation stack I work with daily."
        />
      </div>

      {/*
        On desktop the [data-h-track] row is pinned and scrolled horizontally
        by lib/scroll.ts. On mobile it falls back to a normal wrapping grid.
      */}
      <div className="mx-auto max-w-6xl px-6 md:max-w-none md:px-0">
        <div
          data-h-track
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:flex md:w-max md:flex-nowrap md:gap-6 md:px-[6vw]"
        >
          {skillCategories.map((cat) => (
            <KaliTerminal
              key={cat.category}
              title={`~/skills/${slug(cat.category)}`}
              className="md:w-[340px] md:shrink-0"
            >
              <p className="text-accent-purple">
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
                    <span className="text-text-secondary">tushar</span>{" "}
                    {skill}
                  </li>
                ))}
              </ul>
            </KaliTerminal>
          ))}
        </div>
      </div>
    </section>
  );
}
