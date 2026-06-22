"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/contact";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  // Heavier background once scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlighting via IntersectionObserver.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-glow bg-background-primary/85 backdrop-blur-[14px]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand: >_ Tushar */}
        <a
          href="#"
          className="flex items-center gap-1 font-heading text-lg font-bold"
        >
          <span className="text-accent-red">&gt;_</span>
          <span className="text-text-primary">Tushar</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`group relative font-mono text-sm transition-colors ${
                  active === link.href
                    ? "text-accent-purple"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {/* active = purple glow underline; hover = red slide-up underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-red transition-transform duration-300 group-hover:scale-x-100 ${
                    active === link.href
                      ? "scale-x-100 bg-accent-purple shadow-glow-purple"
                      : ""
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="text-text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden border-t border-glow bg-background-primary/95 backdrop-blur-[14px] md:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.href} className="border-t border-glow">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 font-mono text-sm transition-colors hover:bg-background-secondary ${
                    active === link.href
                      ? "text-accent-purple"
                      : "text-text-secondary hover:text-accent-purple"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
