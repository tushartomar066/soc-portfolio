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
      "Monitored and triaged security alerts across Microsoft Defender ATP and Cortex XDR, investigating endpoint threats and reducing mean time to respond (MTTR).",
      "Conducted threat detection and investigation using Splunk SIEM, engineering and refining SPL detection queries to reduce false positives and improve alert fidelity.",
      "Automated SOC workflows and response playbooks with Torq (SOAR), enhancing response consistency.",
      "Managed continuous cloud security posture across enterprise environments using Wiz.",
      "Performed network traffic analysis and anomaly detection using Netography, identifying suspicious lateral movement and exfiltration patterns.",
      "Investigated phishing and email threats with Abnormal Security, identifying BEC and social engineering campaigns.",
      "Leveraged Rapid7 InsightIDR and SOC Radar / Cyberint for threat intelligence, tracking adversary TTPs and enriching investigations with external threat context.",
      "Managed privileged access monitoring and IAM-related investigations using CyberArk.",
      "Acted as SPOC for Microsoft Defender, Wiz, and Purple Teaming initiatives, driving cross-functional efforts to simulate attacks and validate security controls.",
      "Monitored web application traffic and enforced security controls via Imperva WAF.",
      "Managed data loss prevention policies through Zscaler DLP to identify policy violations and potential data exfiltration attempts.",
      "Collaborated with engineering teams to onboard new log sources, ensuring visibility across critical attack surfaces and improving detection coverage.",
    ],
  },
];
