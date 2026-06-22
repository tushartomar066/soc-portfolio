"use client";

import { useEffect, useState } from "react";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

interface Alert {
  severity: Severity;
  text: string;
  source: string;
  /** seconds since the alert fired (increments live) */
  baseSeconds: number;
}

const SEV_COLOR: Record<Severity, string> = {
  CRITICAL: "#ff003c",
  HIGH: "#ff6b00",
  MEDIUM: "#ffcc00",
  LOW: "#39ff14",
  INFO: "#00f5ff",
};

// 12 fake-but-realistic SOC alerts.
const ALERTS: Alert[] = [
  { severity: "CRITICAL", text: "Lateral movement detected — 192.168.1.45 → DC01", source: "Splunk", baseSeconds: 1 },
  { severity: "HIGH", text: "Suspicious PowerShell execution — ENDPOINT-007", source: "Defender ATP", baseSeconds: 3 },
  { severity: "MEDIUM", text: "Failed login x47 — admin@corp.com", source: "InsightIDR", baseSeconds: 7 },
  { severity: "LOW", text: "Outbound DNS anomaly — 10.0.0.22", source: "Netography", baseSeconds: 12 },
  { severity: "CRITICAL", text: "Ransomware IOC matched — WKSTN-112", source: "CrowdStrike", baseSeconds: 15 },
  { severity: "INFO", text: "New log source onboarded — fw-edge-03", source: "Splunk", baseSeconds: 21 },
  { severity: "HIGH", text: "Impossible travel — user jdoe (US → RU)", source: "Sentinel", baseSeconds: 28 },
  { severity: "MEDIUM", text: "BEC attempt flagged — invoice-update@…", source: "Abnormal", baseSeconds: 34 },
  { severity: "LOW", text: "Port scan from internal host — 10.0.4.9", source: "Netography", baseSeconds: 41 },
  { severity: "CRITICAL", text: "Credential dumping (LSASS) — SRV-DB02", source: "Cortex XDR", baseSeconds: 47 },
  { severity: "HIGH", text: "Privilege escalation attempt — svc_backup", source: "CyberArk", baseSeconds: 53 },
  { severity: "MEDIUM", text: "Data exfil policy violation — 38MB upload", source: "Zscaler DLP", baseSeconds: 60 },
];

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(s)}`;
}

/**
 * Infinite right-to-left SIEM-style alert ticker for the hero. Timestamps
 * increment in real time; the row list is duplicated for a seamless loop.
 */
export function ThreatFeedWidget() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const rows = [...ALERTS, ...ALERTS]; // duplicated for seamless loop

  return (
    <div
      className="relative mt-10 w-full max-w-2xl overflow-hidden rounded-md border border-glow"
      style={{ background: "#0a000f" }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-glow px-3 py-1.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent-red" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
          live threat feed
        </span>
      </div>

      <div className="threat-mask relative py-2">
        <div className="threat-track flex w-max gap-8 whitespace-nowrap">
          {rows.map((a, i) => (
            <span
              key={i}
              className="flex items-center gap-2 pl-3 font-mono text-xs"
              style={{ borderLeft: `3px solid ${SEV_COLOR[a.severity]}` }}
            >
              <span style={{ color: SEV_COLOR[a.severity] }}>
                [{a.severity}]
              </span>
              <span className="text-text-primary">{a.text}</span>
              <span className="text-text-secondary">| {a.source} |</span>
              <span className="text-text-secondary">
                {fmt(a.baseSeconds + tick)} ago
              </span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .threat-track {
          animation: threat-scroll 40s linear infinite;
        }
        @keyframes threat-scroll {
          from {
            transform: translateX(0);
          }
          to {
            /* shift by half (one full copy of the list) for a seamless loop */
            transform: translateX(-50%);
          }
        }
        .threat-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 8%,
            #000 92%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 8%,
            #000 92%,
            transparent
          );
        }
        @media (prefers-reduced-motion: reduce) {
          .threat-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
