import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";

interface Params {
  params: { slug: string };
}

// Pre-render every post at build time.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Per-post SEO metadata.
export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function PostPage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-neon-green hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>

      <article>
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

        <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">{post.title}</h1>

        <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
          <Calendar className="h-3 w-3" /> {post.date}
          {post.author && <span>· {post.author}</span>}
        </div>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-neon-green to-transparent" />

        {/* Rendered MDX with GFM + syntax highlighting + heading anchors */}
        <div className="prose prose-invert mt-8 max-w-none prose-headings:text-slate-100 prose-a:text-neon-blue prose-strong:text-slate-100 prose-code:text-neon-green">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeHighlight],
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}
