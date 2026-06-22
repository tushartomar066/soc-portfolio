"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { SectionHeading } from "@/components/SectionHeading";
import { KaliTerminal } from "@/components/KaliTerminal";
import { NeofetchCard } from "@/components/NeofetchCard";
import { StatCounter } from "@/components/StatCounter";
import { personal, about } from "@/data/personal";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="// 01. about" title="About Me" />

      {/* Profile + threat badge */}
      <div className="mb-12 flex flex-col items-center gap-6">
        <div data-scroll-speed="2" className="relative">
          {/* rotating conic gradient border */}
          <div className="relative h-44 w-44 rounded-full p-[3px]">
            <div className="absolute inset-0 animate-gradient-rotate rounded-full bg-[conic-gradient(from_0deg,#9d00ff,#ff003c,#00f5ff,#9d00ff)]" />
            <div className="relative h-full w-full overflow-hidden rounded-full bg-background-primary p-1">
              <Image
                src={personal.profileImage}
                alt="Tushar Singh Tomar"
                width={176}
                height={176}
                sizes="176px"
                className="h-full w-full rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* SOC severity badge */}
        <span className="inline-flex items-center gap-2 rounded-md border border-accent-green/50 bg-accent-green/10 px-3 py-1.5 font-mono text-xs font-semibold text-accent-green shadow-glow-green">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
          THREAT LEVEL: DEFENDER
        </span>
      </div>

      {/* Neofetch + bio terminal side by side */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <NeofetchCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <KaliTerminal title="tushar@kali: ~/portfolio">
            <p className="text-accent-purple">
              ┌──(<span className="text-accent-red">tushar</span>㉿
              <span className="text-accent-blue">kali</span>)-[~/portfolio]
            </p>
            <p className="text-accent-purple">
              └─$ <span className="text-text-secondary">cat bio.txt</span>
            </p>
            <div className="mt-3 min-h-[12rem] leading-relaxed text-text-primary">
              <TypeAnimation
                sequence={[about.bio.join("\n\n")]}
                speed={75}
                cursor
                wrapper="span"
                style={{ whiteSpace: "pre-line", display: "block" }}
              />
            </div>
            <div className="mt-4 rounded-md border-l-2 border-accent-purple bg-black/30 p-3 text-xs italic text-text-secondary">
              {about.mission}
            </div>
          </KaliTerminal>
        </motion.div>
      </div>

      {/* Stat counters */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCounter value={10} suffix="+" label="Tools Mastered" />
        <StatCounter value={3} suffix="+" label="Months at FICO" />
        <StatCounter value={100} suffix="%" label="Blue Team Focus" />
      </div>
    </section>
  );
}
