"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Central GSAP setup. ScrollTrigger is registered once (guarded for the
 * browser only). Import { gsap, ScrollTrigger } from here everywhere so the
 * plugin is guaranteed registered.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Shared Framer Motion / GSAP easing curve (spec: cubic-bezier). */
export const EASE = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_CSS = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isMobile(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
  );
}

export { gsap, ScrollTrigger };
