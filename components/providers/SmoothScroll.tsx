"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/scroll";

/**
 * Smooth-scroll + parallax provider.
 *
 * - Wraps the app in a root Lenis instance (lerp 0.08 / duration 1.4).
 * - Disabled on screens < 768px and when prefers-reduced-motion → native scroll.
 * - Drives GSAP ScrollTrigger from Lenis' scroll loop, then animates:
 *     • every [data-scroll-speed] element  → vertical parallax
 *     • [data-scroll-direction="horizontal"] → pinned horizontal scroll
 *   All triggers/tweens are cleaned up on unmount / breakpoint change.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide whether smooth scroll should run (desktop + motion allowed).
  useEffect(() => {
    const decide = () =>
      setEnabled(
        window.matchMedia("(min-width: 768px)").matches &&
          !prefersReducedMotion()
      );
    decide();
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  // Bridge Lenis' RAF into GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if (!enabled) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    lenisRef.current?.lenis?.on("scroll", onScroll);

    return () => {
      gsap.ticker.remove(update);
      lenisRef.current?.lenis?.off("scroll", onScroll);
    };
  }, [enabled]);

  // Parallax + horizontal-skills driver.
  useEffect(() => {
    if (!enabled) return;

    const ctx = gsap.context(() => {
      // ── Vertical parallax for every [data-scroll-speed] ──
      const els = gsap.utils.toArray<HTMLElement>("[data-scroll-speed]");
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.scrollSpeed || "0");
        if (!speed || el.dataset.scrollDirection === "horizontal") return;
        // speed > 0 → moves slower (drifts down), speed < 0 → moves up faster.
        gsap.to(el, {
          yPercent: speed * -12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ── Horizontal scroll for the skills track ──
      const hSection = document.querySelector<HTMLElement>(
        '[data-scroll-direction="horizontal"]'
      );
      const track = hSection?.querySelector<HTMLElement>("[data-h-track]");
      if (hSection && track) {
        const distance = () => track.scrollWidth - window.innerWidth;
        if (distance() > 0) {
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: hSection,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }
      }
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.08, duration: 1.4, smoothWheel: true, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}
