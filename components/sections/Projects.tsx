"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="05."
        title="Projects & Labs"
        subtitle="Hands-on security engineering, detection labs, and write-ups."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neon-green hover:shadow-card-glow"
          >
            <div className="mb-4 flex items-center justify-between">
              <FolderGit2 className="h-8 w-8 text-neon-green" />
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  className="text-slate-400 transition-colors hover:text-neon-green"
                >
                  <Github className="h-5 w-5" />
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="text-slate-400 transition-colors hover:text-neon-blue"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-neon-green">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md bg-base px-2.5 py-1 font-mono text-[11px] text-neon-blue"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
