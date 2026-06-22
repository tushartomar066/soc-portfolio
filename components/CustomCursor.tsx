"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isMobile, prefersReducedMotion } from "@/lib/scroll";

/**
 * Custom cursor: a 6px red dot + a 32px purple ring that lags behind with a
 * spring (GSAP quickTo). Over buttons/links the ring locks to a 52px reticle
 * (dot hidden); over text it morphs to an ice-blue I-beam.
 *
 * Desktop + motion-enabled only. On touch / reduced-motion it renders nothing
 * and leaves the native cursor intact.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isMobile() || prefersReducedMotion() || "ontouchstart" in window) {
      return;
    }
    setActive(true);
    document.body.classList.add("cursor-none");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    // Detect what we're hovering and switch cursor modes.
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      let mode = "default";
      if (t.closest("a, button, [role='button'], .magnetic")) {
        mode = "lock";
      } else if (
        t.closest("p, h1, h2, h3, h4, li, label, input, textarea, code")
      ) {
        mode = "text";
      }
      ring.dataset.mode = mode;
      dot.style.opacity = mode === "lock" ? "0" : "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red"
      />
      <div
        ref={ringRef}
        data-mode="default"
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-purple transition-[width,height,background-color,border-radius] duration-200 data-[mode=default]:h-8 data-[mode=default]:w-8 data-[mode=lock]:h-[52px] data-[mode=lock]:w-[52px] data-[mode=lock]:bg-accent-purple/[0.15] data-[mode=text]:h-6 data-[mode=text]:w-1 data-[mode=text]:rounded-sm data-[mode=text]:border-accent-blue"
      />
    </>
  );
}
