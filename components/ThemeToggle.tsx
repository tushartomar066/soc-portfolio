"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/scroll";

/**
 * Sun/moon dark-light toggle with a magnetic hover (GSAP quickTo, same pattern
 * as MagneticButton) and a rotate+fade icon swap. Renders a stable placeholder
 * until mounted to avoid hydration mismatch with next-themes.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => setMounted(true), []);

  function ensureQuickTo() {
    if (!ref.current || prefersReducedMotion()) return;
    if (!xTo.current) {
      xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.4, ease: "power3" });
      yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.4, ease: "power3" });
    }
  }
  function onMove(e: React.MouseEvent) {
    ensureQuickTo();
    if (!ref.current || !xTo.current || !yTo.current) return;
    const r = ref.current.getBoundingClientRect();
    xTo.current((e.clientX - (r.left + r.width / 2)) * 0.4);
    yTo.current((e.clientY - (r.top + r.height / 2)) * 0.4);
  }
  function onLeave() {
    xTo.current?.(0);
    yTo.current?.(0);
  }

  const isDark = resolvedTheme !== "light";

  return (
    <button
      ref={ref}
      type="button"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      className="magnetic flex h-9 w-9 items-center justify-center rounded-md border border-glow text-accent-purple transition-colors duration-300 hover:border-accent-purple hover:shadow-glow-purple"
    >
      {/* Until mounted, render a neutral icon to keep SSR/CSR markup stable */}
      {!mounted ? (
        <Moon className="h-4 w-4" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
