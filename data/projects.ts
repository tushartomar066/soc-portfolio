/**
 * Featured projects & labs rendered as glassmorphism cards.
 *
 * These are placeholder projects derived from real SOC responsibilities —
 * update descriptions with your actual work as projects mature.
 */

export interface Project {
  title: string;
  description: string;
  tools: string[];
}

export const projects: Project[] = [
  {
    title: "Learning SIEM Detection with Splunk",
    description:
      "Getting hands-on with Splunk — running searches, learning to write and tune SPL queries to reduce false positives, and starting to map detections to the MITRE ATT&CK framework.",
    tools: ["Splunk", "SPL", "MITRE ATT&CK", "Detection"],
  },
  {
    title: "Exploring Cloud Security Posture (Wiz)",
    description:
      "Learning cloud security posture management with Wiz — reviewing misconfigurations and identity risks in cloud environments and understanding how findings get prioritized and remediated.",
    tools: ["Wiz", "CSPM", "Cloud Security", "IAM"],
  },
  {
    title: "Phishing & BEC Investigations",
    description:
      "Assisting with phishing and email-threat investigations using Abnormal Security — learning to spot business email compromise (BEC) and social-engineering attempts and add threat-intel context.",
    tools: ["Abnormal Security", "BEC Detection", "Threat Intel", "Phishing"],
  },
  {
    title: "Getting Started with SOAR (Torq)",
    description:
      "Following and helping run incident-response playbooks in Torq — learning how SOC workflows get automated to make response faster and more consistent.",
    tools: ["Torq", "SOAR", "Automation", "Incident Response"],
  },
];
