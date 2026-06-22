"use client";

import { useEffect, useState } from "react";

/**
 * Reading-progress bar scoped to the blog article (not the whole page). Tracks
 * how far the user has scrolled through the element matched by `targetSelector`
 * (default `article`). Gradient #9d00ff → #00f5ff, distinct from the global
 * ScrollProgress bar (#9d00ff → #ff003c). Sits just below the navbar.
 */
export function BlogReadingProgress({
  targetSelector = "article",
}: {
  targetSelector?: string;
}) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      // scrolled distance into the article (top of article passes the viewport top)
      const scrolled = -rect.top;
      const ratio = total > 0 ? scrolled / total : 0;
      setPct(Math.min(100, Math.max(0, ratio * 100)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetSelector]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-[57px] z-[55] h-[3px] bg-transparent"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg,#9d00ff,#00f5ff)",
          boxShadow: "0 0 8px rgba(157,0,255,0.5)",
        }}
      />
    </div>
  );
}
