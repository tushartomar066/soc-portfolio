/**
 * Featured projects & labs rendered as glassmorphism cards.
 *
 * These are placeholder projects derived from real SOC responsibilities —
 * update descriptions and links with your actual repos/write-ups.
 */

export interface Project {
  title: string;
  description: string;
  tools: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Enterprise SIEM Detection Engineering",
    description:
      "Engineered and refined Splunk SPL detection queries to reduce false positives and improve alert fidelity across enterprise log sources — tuning rules against real telemetry and mapping coverage to MITRE ATT&CK.",
    tools: ["Splunk", "SPL", "MITRE ATT&CK", "Detection Engineering"],
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Cloud Security Posture Monitoring",
    description:
      "Continuous cloud security posture management across enterprise environments using Wiz — surfacing misconfigurations, identity risks, and toxic combinations, then driving remediation with engineering teams.",
    tools: ["Wiz", "CSPM", "Cloud Security", "IAM"],
    githubUrl: "#",
  },
  {
    title: "Phishing & BEC Investigation Dashboard",
    description:
      "Investigation workflow for phishing and email threats using Abnormal Security — identifying business email compromise (BEC) and social engineering campaigns, with enrichment from external threat intelligence.",
    tools: ["Abnormal Security", "BEC Detection", "Threat Intel", "Phishing"],
    githubUrl: "#",
  },
  {
    title: "SOAR Playbook Automation with Torq",
    description:
      "Automated SOC workflows and incident response playbooks in Torq — standardizing enrichment and response actions to improve consistency and drive down mean time to respond (MTTR).",
    tools: ["Torq", "SOAR", "Automation", "Incident Response"],
    githubUrl: "#",
    demoUrl: "#",
  },
];
