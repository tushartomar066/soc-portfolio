import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog & CTF Write-ups",
  description: "Threat analysis, incident response notes, and CTF walkthroughs.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-24">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-neon-green hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>

      <h1 className="text-4xl font-bold">
        <span className="text-gradient">Blog</span> & Write-ups
      </h1>
      <p className="mt-3 font-mono text-sm text-muted">
        Threat analysis, incident response, and CTF walkthroughs.
      </p>

      <div className="mt-12 space-y-6">
        {posts.length === 0 && (
          <p className="font-mono text-sm text-muted">No posts published yet.</p>
        )}

        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-neon-blue hover:shadow-neon-blue"
          >
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-base px-2.5 py-0.5 font-mono text-[11px] text-neon-green"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-slate-100 transition-colors group-hover:text-neon-blue">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{post.excerpt}</p>
            <span className="mt-3 flex items-center gap-1 font-mono text-xs text-muted">
              <Calendar className="h-3 w-3" /> {post.date}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
