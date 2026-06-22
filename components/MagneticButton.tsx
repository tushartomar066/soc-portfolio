"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/scroll";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  download?: string | boolean;
  className?: string;
}

/**
 * Hero CTA: transparent with a 2px purple border + purple glow. On hover it
 * fills purple, text turns white, scales to 1.05, and the button follows the
 * cursor slightly (GSAP quickTo magnetic effect). Magnetic motion is skipped
 * under prefers-reduced-motion.
 */
export function MagneticButton({
  href,
  children,
  download,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  function ensureQuickTo() {
    if (!ref.current || prefersReducedMotion()) return;
    if (!xTo.current) {
      xTo.current = gsap.quickTo(ref.current, "x", {
        duration: 0.4,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(ref.current, "y", {
        duration: 0.4,
        ease: "power3",
      });
    }
  }

  function onMove(e: React.MouseEvent) {
    ensureQuickTo();
    if (!ref.current || !xTo.current || !yTo.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    xTo.current(x * 0.4);
    yTo.current(y * 0.4);
  }

  function onLeave() {
    if (!ref.current || !xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  }

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic group inline-flex items-center justify-center gap-2 rounded-md border-2 border-accent-purple px-6 py-3 font-mono text-sm font-medium text-accent-purple shadow-glow-purple transition-[background-color,color,transform,box-shadow] duration-300 hover:scale-105 hover:bg-accent-purple hover:text-white ${className}`}
    >
      {children}
    </a>
  );
}
