"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const DATA = [
  { skill: "Threat Detection", score: 90 },
  { skill: "Incident Response", score: 85 },
  { skill: "Cloud Security", score: 80 },
  { skill: "SIEM Engineering", score: 85 },
  { skill: "Threat Intel", score: 75 },
  { skill: "Network Analysis", score: 70 },
  { skill: "Identity & Access", score: 72 },
  { skill: "Automation/SOAR", score: 78 },
  { skill: "Purple Teaming", score: 70 },
  { skill: "Malware Analysis", score: 65 },
];

/**
 * Supplementary skill radar for the Skills section. Draws itself in (scale +
 * fade) when scrolled into view; static under reduced-motion.
 */
export function SkillRadarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  // Render the chart only after mount so the ResponsiveContainer always has a
  // real measured size (avoids the SSG "width(-1)" warning + zero-size render).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: EASE }}
      className="mx-auto mt-12 max-w-2xl rounded-xl border border-glow bg-background-secondary p-4 sm:p-6"
    >
      <p className="mb-2 text-center font-mono text-xs text-text-secondary">
        // skill coverage map
      </p>
      <div className="h-[360px] w-full sm:h-[420px]">
        {mounted && (
        <ResponsiveContainer width="100%" height="100%" minHeight={360}>
          <RadarChart data={DATA} outerRadius="72%">
            <PolarGrid stroke="rgba(157,0,255,0.2)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: "#e8e8f0",
                fontSize: 10,
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            />
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              dataKey="score"
              stroke="#9d00ff"
              strokeWidth={2}
              fill="rgba(157,0,255,0.15)"
              fillOpacity={1}
              dot={{ r: 3, fill: "#ff003c", stroke: "#ff003c" }}
              isAnimationActive={inView}
              animationDuration={1200}
            />
          </RadarChart>
        </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
