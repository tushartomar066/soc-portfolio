"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/scroll";

interface StatCounterProps {
  /** numeric target the counter animates up to */
  value: number;
  /** rendered after the number, e.g. "+" or "%" */
  suffix?: string;
  label: string;
}

/**
 * Animated stat counter that counts up from 0 → value when scrolled into
 * view (GSAP ScrollTrigger). Honors reduced-motion by showing the final
 * value immediately.
 */
export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.textContent = String(value);
        return;
      }

      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.val));
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="rounded-lg border border-glow bg-background-secondary px-6 py-5 text-center transition-colors hover:border-accent-purple"
    >
      <div className="font-heading text-3xl font-bold text-accent-purple sm:text-4xl">
        <span ref={numRef}>0</span>
        {suffix}
      </div>
      <p className="mt-1 font-mono text-xs text-text-secondary">{label}</p>
    </div>
  );
}
