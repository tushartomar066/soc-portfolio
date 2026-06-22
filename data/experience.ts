/**
 * Work history rendered in the animated vertical timeline.
 */

export interface ExperienceItem {
  title: string;
  company: string;
  dates: string;
  location: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: "SOC Analyst (Associate)",
    company: "FICO",
    dates: "June 2026 – Present",
    location: "India",
    points: [
      "Working actively on the blue team — monitoring and triaging day-to-day security alerts across Microsoft Defender and Cortex XDR and investigating endpoint threats.",
      "Running detections and investigations in Splunk SIEM, writing and tuning SPL queries to cut down on false positives.",
      "Following and helping run incident-response playbooks in Torq (SOAR) to keep response consistent.",
      "Reviewing cloud security posture in Wiz — checking misconfigurations and identity risks across cloud environments.",
      "Investigating phishing and email threats in Abnormal Security, spotting BEC and social-engineering attempts.",
      "Building familiarity across a wide SOC tool stack — Rapid7 InsightIDR, SOC Radar, Cyberint, Netography, CyberArk, Imperva WAF, and Zscaler DLP — a little at a time.",
      "Contributing to Purple Teaming exercises and learning how attacks are simulated and security controls validated.",
    ],
  },
  {
    title: "SOC Analyst Intern",
    company: "FICO",
    dates: "June 2025 – June 2026",
    location: "India",
    points: [
      "Started on the blue team as an intern, learning to monitor and triage security alerts and investigate endpoint threats with Microsoft Defender and Cortex XDR.",
      "Got hands-on with Splunk SIEM — running searches and learning to write and tune SPL detection queries.",
      "Gained exposure to SOAR automation in Torq, cloud posture management in Wiz, and email-threat investigation in Abnormal Security.",
      "Picked up threat-intelligence basics and built familiarity with the broader SOC tool stack while finding my footing in the field.",
      "Worked with the team to understand how log sources are onboarded and how detection coverage is built and maintained.",
    ],
  },
];
