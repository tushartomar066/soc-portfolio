/**
 * Filesystem-based MDX blog loader. Reads .mdx files from /content/blog,
 * parses frontmatter with gray-matter, and exposes helpers used by the
 * blog list and individual post pages.
 *
 * Server-only (uses node:fs).
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  tags: string[];
  author?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  /** estimated read time, e.g. "4 min read" */
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string; // raw MDX body
}

/** Words ÷ 200 wpm, rounded up to the nearest minute. */
function computeReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/** All post slugs (filenames without .mdx). */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Read a single post (frontmatter + body) by slug. */
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  return {
    slug,
    title: fm.title,
    date: fm.date,
    excerpt: fm.excerpt,
    tags: fm.tags ?? [],
    author: fm.author,
    readingTime: computeReadingTime(content),
    content,
  };
}

/** All posts' metadata, sorted newest-first (for the blog list). */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
