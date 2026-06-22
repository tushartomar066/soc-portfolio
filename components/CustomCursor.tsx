"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isMobile, prefersReducedMotion } from "@/lib/scroll";

/**
 * SOC targeting-reticle cursor.
 *
 * - Inner: 16px crosshair (4 lines with a center gap), #ff003c.
 * - Outer: 40px square with corner brackets only (#9d00ff), spring-lagged
 *   behind the pointer (GSAP quickTo, lerp ~0.12).
 * - Over button/link: outer → 60px, faint purple fill, crosshair → #9d00ff
 *   (locked-on). Over text: crosshair shrinks to an 8px I-beam.
 * - A 6-dot fading trail (#9d00ff) follows via a ring buffer.
 *
 * Desktop + motion-enabled only; on touch / reduced-motion / <768px it renders
 * nothing and leaves the native cursor intact.
 */

const TRAIL_LENGTH = 6;

export function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isMobile() || prefersReducedMotion() || "ontouchstart" in window) {
      return;
    }
    setActive(true);
    document.body.classList.add("cursor-none");

    const inner = innerRef.current!;
    const outer = outerRef.current!;

    // Inner crosshair tracks tightly; outer reticle lags (spring).
    const xIn = gsap.quickTo(inner, "x", { duration: 0.06, ease: "power3" });
    const yIn = gsap.quickTo(inner, "y", { duration: 0.06, ease: "power3" });
    const xOut = gsap.quickTo(outer, "x", { duration: 0.4, ease: "power3" });
    const yOut = gsap.quickTo(outer, "y", { duration: 0.4, ease: "power3" });

    // Trail ring buffer of recent positions.
    const positions = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: 0,
      y: 0,
    }));
    let head = 0;

    const onMove = (e: MouseEvent) => {
      xIn(e.clientX);
      yIn(e.clientY);
      xOut(e.clientX);
      yOut(e.clientY);

      positions[head] = { x: e.clientX, y: e.clientY };
      head = (head + 1) % TRAIL_LENGTH;
      // Render trail: most-recent dot first, fading back.
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const idx = (head - 1 - i + TRAIL_LENGTH * 2) % TRAIL_LENGTH;
        const dot = trailRefs.current[i];
        const p = positions[idx];
        if (dot && p) {
          gsap.to(dot, {
            x: p.x,
            y: p.y,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
          });
        }
      }
    };

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
      outer.dataset.mode = mode;
      inner.dataset.mode = mode;
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
      {/* Trail dots (oldest = faintest) */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[9997] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple"
          style={{ opacity: 0.6 - i * (0.5 / TRAIL_LENGTH) }}
        />
      ))}

      {/* Inner crosshair */}
      <div
        ref={innerRef}
        data-mode="default"
        aria-hidden="true"
        className="cursor-inner pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="cursor-cross"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* four lines meeting at center with a 4px gap (center 8, gap ±2) */}
          <line x1="8" y1="0" x2="8" y2="6" />
          <line x1="8" y1="10" x2="8" y2="16" />
          <line x1="0" y1="8" x2="6" y2="8" />
          <line x1="10" y1="8" x2="16" y2="8" />
        </svg>
      </div>

      {/* Outer corner-bracket reticle */}
      <div
        ref={outerRef}
        data-mode="default"
        aria-hidden="true"
        className="cursor-outer pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />
      </div>
    </>
  );
}
