"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MapPin, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/scroll";
import { experience } from "@/data/experience";

export function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Draw the vertical timeline line as the section scrolls.
      const el = line.current;
      if (el) {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        });
      }

      // Character-by-character slide-up reveal for each card heading.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((node) => {
        const chars = node.querySelectorAll("[data-char]");
        gsap.from(chars, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.02,
          ease: "power3.out",
          duration: 0.5,
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading
        label="// 03. experience"
        title="Experience"
        subtitle="Where I'm currently learning the ropes of the SOC."
      />

      <div ref={root} className="relative pl-8 md:pl-0">
        {/* Animated SVG timeline line */}
        <svg
          className="absolute left-2 top-0 h-full w-2 md:left-1/2 md:-translate-x-1/2"
          preserveAspectRatio="none"
          viewBox="0 0 2 1000"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9d00ff" />
              <stop offset="100%" stopColor="#ff003c" />
            </linearGradient>
          </defs>
          <line
            ref={line}
            x1="1"
            y1="0"
            x2="1"
            y2="1000"
            stroke="url(#timeline-grad)"
            strokeWidth="2"
          />
        </svg>

        <div className="space-y-12">
          {experience.map((item, i) => {
            const leftSide = i % 2 === 0;
            return (
              <div
                key={`${item.company}-${item.title}`}
                className={`relative md:w-1/2 ${
                  leftSide ? "md:pr-10" : "md:ml-auto md:pl-10"
                }`}
              >
                {/* pulsing red SOC-alert node */}
                <span
                  className={`absolute -left-[26px] top-3 h-3 w-3 animate-pulse-alert rounded-full bg-accent-red md:left-auto ${
                    leftSide ? "md:-right-[7px]" : "md:-left-[7px]"
                  }`}
                />

                <div className="rounded-xl border border-glow bg-background-secondary p-6 transition-all duration-300 hover:border-accent-purple hover:shadow-card-glow">
                  <h3
                    data-reveal
                    className="overflow-hidden font-heading font-semibold text-text-primary"
                  >
                    <RevealText text={item.title} />
                  </h3>
                  <p className="font-mono text-sm text-accent-blue">
                    {item.company}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {item.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {item.location}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm text-text-primary"
                      >
                        <span className="mt-1 text-accent-purple">▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Splits text into per-character spans for the GSAP slide-up reveal. */
function RevealText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((ch, i) => (
        <span key={i} data-char className="inline-block">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
