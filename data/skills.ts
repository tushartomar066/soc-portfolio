/**
 * Skills grouped by category. Rendered as the animated card grid in
 * the Skills & Tools section.
 */

export interface SkillCategory {
  category: string;
  /** alternating neon accent in the UI */
  accent: "green" | "blue";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Security Operations",
    accent: "green",
    skills: [
      "Threat Detection",
      "Threat Hunting",
      "Incident Response",
      "Alert Triage",
      "Report Writing",
      "Problem Resolution",
    ],
  },
  {
    category: "Cloud Security",
    accent: "blue",
    skills: [
      "Cloud Security Posture Management (CSPM)",
      "Wiz",
      "Zscaler DLP",
      "IAM Investigations",
    ],
  },
  {
    category: "SIEM & Detection",
    accent: "green",
    skills: ["Splunk (SPL)", "Rapid7 InsightIDR", "Microsoft Sentinel"],
  },
  {
    category: "EDR / XDR",
    accent: "blue",
    skills: ["Microsoft Defender ATP", "Cortex XDR", "CrowdStrike"],
  },
  {
    category: "SOAR & Automation",
    accent: "green",
    skills: ["Torq", "Response Playbook Automation"],
  },
  {
    category: "Threat Intelligence",
    accent: "blue",
    skills: ["SOC Radar", "Cyberint", "Adversary TTP Tracking", "MITRE ATT&CK"],
  },
  {
    category: "Network Security",
    accent: "green",
    skills: [
      "Netography",
      "Imperva WAF",
      "Network Traffic Analysis",
      "Anomaly Detection",
    ],
  },
  {
    category: "Email Security",
    accent: "blue",
    skills: ["Abnormal Security", "BEC Detection", "Phishing Investigation"],
  },
  {
    category: "Identity & Access",
    accent: "green",
    skills: ["CyberArk", "Privileged Access Monitoring"],
  },
  {
    category: "Offensive / Purple Team",
    accent: "blue",
    skills: ["Purple Teaming", "Attack Simulation", "Security Control Validation"],
  },
];
