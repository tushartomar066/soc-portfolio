"use client";

import { useEffect, useState } from "react";

/**
 * 3px scroll-progress bar pinned to the very top of the viewport. Gradient
 * #9d00ff → #ff003c with a purple glow. Width tracks document scroll %.
 */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-accent-line shadow-glow-purple transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
