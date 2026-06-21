"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { PostMeta } from "@/lib/mdx";

export function Blog({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="06."
        title="Blog / CTF Write-ups"
        subtitle="Threat analysis, incident response notes, and CTF walkthroughs."
      />

      {posts.length === 0 ? (
        <p className="text-center font-mono text-sm text-muted">
          No posts yet — add <code className="text-neon-green">.mdx</code> files to{" "}
          <code className="text-neon-blue">/content/blog</code>.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-neon-blue hover:shadow-neon-blue"
              >
                <FileText className="mb-4 h-7 w-7 text-neon-blue" />

                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-base px-2.5 py-0.5 font-mono text-[11px] text-neon-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-neon-blue">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-neon-blue">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="btn-neon border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-neon-blue"
        >
          View all posts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
