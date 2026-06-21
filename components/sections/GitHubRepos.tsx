"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Github } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { GitHubRepo } from "@/lib/github";

// Small color map for common language dots.
const langColor: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Shell: "#89e051",
  PowerShell: "#012456",
  Go: "#00ADD8",
  HTML: "#e34c26",
  Jupyter: "#DA5B0B",
};

export function GitHubRepos({ repos }: { repos: GitHubRepo[] }) {
  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="07."
        title="GitHub Repositories"
        subtitle="Live from the GitHub REST API — my latest public work."
      />

      {repos.length === 0 ? (
        <p className="text-center font-mono text-sm text-muted">
          Set <code className="text-neon-green">NEXT_PUBLIC_GITHUB_USERNAME</code> in{" "}
          <code className="text-neon-blue">.env.local</code> to display your repositories.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-neon-green hover:shadow-card-glow"
            >
              <div className="mb-3 flex items-center gap-2">
                <Github className="h-5 w-5 text-neon-green" />
                <h3 className="truncate font-mono text-sm font-semibold text-slate-100 group-hover:text-neon-green">
                  {repo.name}
                </h3>
              </div>

              <p className="flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
                {repo.description ?? "No description provided."}
              </p>

              <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: langColor[repo.language] ?? "#8aa0c5" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" /> {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
