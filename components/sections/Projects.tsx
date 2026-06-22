"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { gsap, prefersReducedMotion } from "@/lib/scroll";
import { projects } from "@/data/projects";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="// 04. projects"
        title="Projects & Labs"
        subtitle="Hands-on areas I've been learning and practicing in the SOC."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} index={i} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // 3D perspective tilt toward the cursor (GSAP), reset on leave.
  function onMove(e: React.MouseEvent) {
    if (!ref.current || prefersReducedMotion()) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, {
      rotateY: px * 10,
      rotateX: -py * 10,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  }

  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.5 });
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
      data-scroll-speed={index % 2 === 0 ? "0.8" : "1.4"}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-glow bg-background-secondary p-6 transition-shadow duration-300 hover:shadow-card-glow"
      >
        {/* gradient top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-accent-line" />

        <div className="mb-4">
          <FolderGit2 className="h-8 w-8 text-accent-purple" />
        </div>

        <h3 className="font-heading text-lg font-semibold text-text-primary transition-colors group-hover:text-accent-purple">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-accent-purple bg-accent-purple/15 px-2.5 py-1 font-mono text-[11px] text-text-primary transition-colors hover:bg-accent-purple hover:text-white"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
