import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { BlogTransition } from "@/components/BlogTransition";
import { BlogReadingProgress } from "@/components/BlogReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { CodeBlock } from "@/components/CopyButton";

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
    <>
      {/* Reading-progress bar scoped to the article */}
      <BlogReadingProgress />

      <BlogTransition>
        <main className="mx-auto min-h-screen max-w-6xl px-6 py-24">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-accent-purple hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>

          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_240px] lg:gap-10">
            {/* TOC: dropdown above content on mobile, sticky sidebar on desktop */}
            <aside className="order-first lg:order-last">
              <TableOfContents />
            </aside>

            <article className="min-w-0 max-w-3xl">
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-background-secondary px-2.5 py-0.5 font-mono text-[11px] text-accent-purple"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                {post.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {post.readingTime}
                </span>
                {post.author && <span>· {post.author}</span>}
              </div>

              <div className="mt-4 h-px w-full bg-gradient-to-r from-accent-purple to-transparent" />

              {/* Rendered MDX with GFM + syntax highlighting + heading anchors */}
              <div className="prose prose-invert mt-8 max-w-none prose-headings:text-text-primary prose-a:text-accent-blue prose-strong:text-text-primary prose-code:text-accent-purple">
                <MDXRemote
                  source={post.content}
                  components={{ pre: CodeBlock }}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug, rehypeHighlight],
                    },
                  }}
                />
              </div>
            </article>
          </div>
        </main>
      </BlogTransition>
    </>
  );
}
