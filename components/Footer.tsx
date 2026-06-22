"use client";

import { useEffect, useState } from "react";
import { personal } from "@/data/personal";
import { SocialRow } from "@/components/SocialRow";

export function Footer() {
  const year = new Date().getFullYear();
  const [visitors, setVisitors] = useState<number | null>(null);

  // Visitor counter — increments + reads from the KV-backed API. Fails
  // silently (renders nothing) if KV isn't configured.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/visitor")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.count === "number") {
          setVisitors(data.count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="border-t border-glow bg-background-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-1 font-heading text-lg font-bold md:justify-start">
              <span className="text-accent-red">&gt;_</span>
              <span className="text-text-primary">{personal.name}</span>
            </div>
            <p className="mt-2 font-mono text-sm text-text-secondary">
              {personal.tagline}
            </p>
          </div>

          <SocialRow />
        </div>

        {visitors !== null && (
          <p className="mt-8 text-center font-mono text-xs text-text-secondary">
            // {visitors.toLocaleString()} threat analysts visited
          </p>
        )}

        <p className="mt-2 text-center font-mono text-xs text-text-secondary">
          © {year} {personal.name}. Built with Next.js, Tailwind & Framer Motion.
        </p>
      </div>
    </footer>
  );
}
