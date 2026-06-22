import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { BlogIndex } from "@/components/BlogIndex";
import { BlogTransition } from "@/components/BlogTransition";

export const metadata: Metadata = {
  title: "Blog & CTF Write-ups",
  description: "Threat analysis, incident response notes, and CTF walkthroughs.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <BlogTransition>
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-24">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-accent-purple hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        <h1 className="font-heading text-4xl font-bold">
          <span className="text-gradient">Blog</span> & Write-ups
        </h1>
        <p className="mt-3 font-mono text-sm text-text-secondary">
          Threat analysis, incident response, and CTF walkthroughs.
        </p>

        <BlogIndex posts={posts} />
      </main>
    </BlogTransition>
  );
}
