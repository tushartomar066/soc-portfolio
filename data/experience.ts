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
    title: "SOC Analyst Intern",
    company: "FICO",
    dates: "June 2025 – Present",
    location: "India",
    points: [
      "Monitoring and triaging day-to-day security alerts across Microsoft Defender and Cortex XDR, learning how to investigate endpoint threats as part of the blue team.",
      "Getting hands-on with Splunk SIEM — running searches and learning to write and tune SPL queries to cut down on false positives.",
      "Gaining exposure to SOAR automation in Torq, helping run and follow response playbooks alongside the team.",
      "Learning cloud security posture management with Wiz — reviewing misconfigurations and identity risks across cloud environments.",
      "Assisting with phishing and email-threat investigations in Abnormal Security, spotting BEC and social-engineering attempts.",
      "Picking up threat intelligence basics with Rapid7 InsightIDR, SOC Radar, and Cyberint to add context to investigations.",
      "Building familiarity with a wide SOC tool stack — Netography, CyberArk, Imperva WAF, and Zscaler DLP — a little at a time.",
      "Contributing to Purple Teaming exercises and learning how attacks are simulated and security controls validated.",
      "Working with the team to onboard new log sources and understand how detection coverage is built and maintained.",
    ],
  },
];
