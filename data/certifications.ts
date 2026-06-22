/**
 * Certifications shown as flip cards in the Certifications section.
 * `status` drives the badge; `color` is the issuer/brand accent.
 */

export type CertStatus = "In Progress" | "Planned" | "Completed";

export interface Certification {
  name: string;
  /** full name shown on the card back */
  fullName: string;
  issuer: string;
  status: CertStatus;
  /** issuer/brand accent color */
  color: string;
  /** one-line description of what it validates */
  validates: string;
  /** expected timeline shown on the back */
  timeline: string;
}

export const certifications: Certification[] = [
  {
    name: "Security+",
    fullName: "CompTIA Security+",
    issuer: "CompTIA",
    status: "In Progress",
    color: "#FF0000",
    validates: "Core security skills: threats, architecture, operations, and incident response.",
    timeline: "Targeting 2026",
  },
  {
    name: "CEH",
    fullName: "Certified Ethical Hacker",
    issuer: "EC-Council",
    status: "In Progress",
    color: "#FF6B00",
    validates: "Offensive techniques and tooling used to assess and harden defenses.",
    timeline: "Targeting 2026",
  },
  {
    name: "SC-200",
    fullName: "Microsoft Security Operations Analyst (SC-200)",
    issuer: "Microsoft",
    status: "In Progress",
    color: "#00A4EF",
    validates: "Threat detection and response across Microsoft Sentinel and Defender.",
    timeline: "Targeting 2026",
  },
  {
    name: "CySA+",
    fullName: "CompTIA Cybersecurity Analyst (CySA+)",
    issuer: "CompTIA",
    status: "Planned",
    color: "#FF0000",
    validates: "Behavioral analytics, threat hunting, and SOC analyst workflows.",
    timeline: "Planned 2027",
  },
  {
    name: "OSCP",
    fullName: "Offensive Security Certified Professional",
    issuer: "Offensive Security",
    status: "Planned",
    color: "#000000",
    validates: "Hands-on penetration testing and exploit development under exam conditions.",
    timeline: "Planned 2027",
  },
  {
    name: "CISSP",
    fullName: "Certified Information Systems Security Professional",
    issuer: "ISC2",
    status: "Planned",
    color: "#005A8E",
    validates: "Broad security leadership across eight domains of the CISSP CBK.",
    timeline: "Long-term goal",
  },
];
