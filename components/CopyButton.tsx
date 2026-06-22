"use client";

import { useRef, useState, type ReactNode } from "react";
import { Check, Clipboard } from "lucide-react";

/**
 * `pre` wrapper for MDX code blocks that adds a copy-to-clipboard button in
 * the top-right corner. Reads the rendered text content of the block on click.
 */
export function CodeBlock({ children }: { children?: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-[rgba(157,0,255,0.3)] bg-background-secondary text-text-secondary opacity-0 transition-all duration-200 hover:border-accent-purple hover:text-accent-purple hover:shadow-glow-purple group-hover:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-accent-green" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
      </button>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
}
