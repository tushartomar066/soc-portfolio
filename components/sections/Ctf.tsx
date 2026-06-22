"use client";

import { motion } from "framer-motion";
import { ExternalLink, Flag, Trophy } from "lucide-react";
import { SiTryhackme, SiHackthebox } from "react-icons/si";
import { SectionHeading } from "@/components/SectionHeading";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const THM_URL = "https://tryhackme.com/p/AnonSeeker?vccr=1";
const HTB_URL = "https://profile.hackthebox.com/";

// Static, illustrative scoreboard rows (no public unauthenticated API).
interface Row {
  rank: number;
  challenge: string;
  platform: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Solved" | "In Progress";
}

const ROWS: Row[] = [
  { rank: 1, challenge: "Lateral Movement Lab", platform: "TryHackMe", difficulty: "Medium", status: "Solved" },
  { rank: 2, challenge: "Phishing Analysis", platform: "TryHackMe", difficulty: "Easy", status: "Solved" },
  { rank: 3, challenge: "SOC Level 1 Path", platform: "TryHackMe", difficulty: "Medium", status: "Solved" },
  { rank: 4, challenge: "Windows Forensics", platform: "TryHackMe", difficulty: "Medium", status: "Solved" },
  { rank: 5, challenge: "Splunk Boss of the SOC", platform: "TryHackMe", difficulty: "Hard", status: "In Progress" },
  { rank: 6, challenge: "Starting Point", platform: "Hack The Box", difficulty: "Easy", status: "Solved" },
];

const DIFF_COLOR: Record<Row["difficulty"], string> = {
  Easy: "#39ff14",
  Medium: "#ffcc00",
  Hard: "#ff003c",
};

export function Ctf() {
  return (
    <section id="ctf" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="// 07. ctf & labs"
        title="CTF & Labs"
        subtitle="Hands-on practice on TryHackMe and Hack The Box — sharpening detection and investigation skills."
      />

      {/* Platform cards */}
      <div className="mb-10 grid gap-6 md:grid-cols-2">
        {/* TryHackMe */}
        <motion.a
          href={THM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-glow bg-background-secondary p-6 transition-all duration-300 hover:shadow-card-glow"
          style={{ borderColor: "rgba(157,0,255,0.25)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-accent-line" />
          <SiTryhackme className="h-9 w-9" style={{ color: "#ff003c" }} />
          <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">
            TryHackMe
          </h3>
          <p className="mt-1 font-mono text-xs text-text-secondary">
            @AnonSeeker · SOC Level 1 path & blue-team rooms
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent-red">
            View Full Profile <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </motion.a>

        {/* Hack The Box (static — no public API) */}
        <motion.a
          href={HTB_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
          className="group relative flex flex-col overflow-hidden rounded-xl border bg-background-secondary p-6 transition-all duration-300 hover:shadow-card-glow"
          style={{ borderColor: "rgba(159,239,0,0.35)" }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg,#9fef00,#9d00ff)" }}
          />
          <SiHackthebox className="h-9 w-9" style={{ color: "#9fef00" }} />
          <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">
            Hack The Box
          </h3>
          <p className="mt-1 font-mono text-xs text-text-secondary">
            Pentesting & defensive labs · profile stats on HTB
          </p>
          <span
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs"
            style={{ color: "#9fef00" }}
          >
            View Full Profile <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </motion.a>
      </div>

      {/* SOC-style scoreboard */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="overflow-hidden rounded-xl border border-glow"
      >
        <div className="flex items-center gap-2 border-b border-glow bg-background-secondary px-4 py-2.5">
          <Trophy className="h-4 w-4 text-accent-purple" />
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            scoreboard
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-xs sm:text-sm">
            <thead>
              <tr className="text-left text-text-secondary">
                <th className="px-4 py-2 font-medium">#</th>
                <th className="px-4 py-2 font-medium">Challenge</th>
                <th className="px-4 py-2 font-medium">Platform</th>
                <th className="px-4 py-2 font-medium">Difficulty</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr
                  key={r.rank}
                  style={{ background: i % 2 === 0 ? "#0e0018" : "#0a000f" }}
                >
                  <td className="px-4 py-2.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-accent-purple/50 text-accent-purple">
                      {r.rank}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-text-primary">
                    <Flag className="mr-1.5 inline h-3 w-3 text-accent-blue" />
                    {r.challenge}
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary">
                    {r.platform}
                  </td>
                  <td className="px-4 py-2.5">
                    <span style={{ color: DIFF_COLOR[r.difficulty] }}>
                      {r.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={
                        r.status === "Solved"
                          ? "text-accent-green"
                          : "text-text-secondary"
                      }
                    >
                      {r.status === "Solved" ? "✓ Solved" : "… In Progress"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="mt-4 text-center font-mono text-[11px] text-text-secondary">
        // illustrative selection — full activity on each platform profile
      </p>
    </section>
  );
}
