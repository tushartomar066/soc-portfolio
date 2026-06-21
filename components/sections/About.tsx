"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Target } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { personal, about } from "@/data/personal";
import { education } from "@/data/education";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="01." title="About Me" />

      <div className="grid items-center gap-12 md:grid-cols-[320px_1fr]">
        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto"
        >
          {/* neon ring + glow around the photo */}
          <div className="relative h-72 w-72 overflow-hidden rounded-2xl border-2 border-neon-green/60 shadow-neon-green ring-2 ring-neon-green/20 ring-offset-4 ring-offset-base">
            <Image
              src={personal.profileImage}
              alt="Tushar Singh Tomar"
              width={288}
              height={288}
              sizes="288px"
              className="h-full w-full object-cover"
              priority
            />
          </div>
          {/* neon corner accents */}
          <div className="absolute -left-2 -top-2 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-neon-green" />
          <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-neon-blue" />
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* quick stats */}
          <div className="mb-6 flex flex-wrap gap-4">
            <Stat
              icon={<Briefcase className="h-4 w-4 text-neon-green" />}
              label={about.currentRole}
            />
            <Stat
              icon={<MapPin className="h-4 w-4 text-neon-blue" />}
              label={personal.location}
            />
          </div>

          {about.bio.map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed text-slate-300">
              {para}
            </p>
          ))}

          {/* education */}
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="mt-4 flex gap-3 rounded-lg border-l-2 border-neon-blue bg-card/60 p-4"
            >
              <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-neon-blue" />
              <div>
                <p className="text-sm font-semibold text-slate-100">{edu.degree}</p>
                <p className="font-mono text-xs text-muted">
                  {edu.university}, {edu.location} · {edu.dates}
                </p>
              </div>
            </div>
          ))}

          {/* mission statement */}
          <div className="mt-4 flex gap-3 rounded-lg border-l-2 border-neon-green bg-card/60 p-4">
            <Target className="mt-1 h-5 w-5 shrink-0 text-neon-green" />
            <p className="font-mono text-sm italic text-muted">{about.mission}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 font-mono text-xs text-slate-300">
      {icon}
      {label}
    </div>
  );
}
