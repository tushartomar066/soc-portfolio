"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Client-side blog index with a Kali-terminal search box and tag-filter pills.
 * Filtering happens in the browser; posts are passed in from the server page.
 */
export function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div className="mt-10">
      {/* Terminal-style search */}
      <div className="rounded-lg border border-glow bg-background-secondary p-4 font-mono text-sm">
        <p className="text-accent-purple">
          ┌──(<span className="text-accent-red">tushar</span>㉿
          <span className="text-accent-blue">kali</span>)-[~/blog]
        </p>
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-accent-purple">└─$ grep -r</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='"search posts..."'
            aria-label="Search blog posts"
            spellCheck={false}
            className="flex-1 bg-transparent text-text-primary caret-accent-red outline-none placeholder:text-text-secondary"
          />
        </div>
      </div>

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <TagPill
            label="all"
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {allTags.map((tag) => (
            <TagPill
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="mt-12 font-mono text-sm text-accent-red">
          // no posts match
        </p>
      ) : (
        <motion.div layout className="mt-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-glow bg-background-secondary p-6 transition-all duration-300 hover:border-accent-purple hover:shadow-card-glow"
                >
                  <div className="mb-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background-primary px-2.5 py-0.5 font-mono text-[11px] text-accent-purple"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-text-primary transition-colors group-hover:text-accent-purple">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {post.readingTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ${
        active
          ? "border-accent-purple bg-accent-purple text-white"
          : "border-accent-purple/60 bg-background-secondary text-text-secondary hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}
