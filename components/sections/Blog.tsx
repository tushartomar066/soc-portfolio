"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, FileText, Clock } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { PostMeta } from "@/lib/mdx";

export function Blog({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="// 06. blog"
        title="Blog / CTF Write-ups"
        subtitle="Threat analysis, incident response notes, and CTF walkthroughs."
      />

      {posts.length === 0 ? (
        <p className="text-center font-mono text-sm text-text-secondary">
          No posts yet — add <code className="text-accent-purple">.mdx</code> files to{" "}
          <code className="text-accent-blue">/content/blog</code>.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group flex h-full flex-col rounded-xl border border-glow bg-background-secondary p-6 transition-all duration-300 hover:border-accent-purple hover:shadow-card-glow"
              >
                <FileText className="mb-4 h-7 w-7 text-accent-blue" />

                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background-primary px-2.5 py-0.5 font-mono text-[11px] text-accent-purple"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-heading text-lg font-semibold text-text-primary transition-colors group-hover:text-accent-purple">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between font-mono text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readingTime}
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
          className="btn-neon border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white hover:shadow-glow-purple"
        >
          View all posts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
