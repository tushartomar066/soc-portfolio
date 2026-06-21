/**
 * Core personal info + profile content.
 * Feeds the Hero, About section, navbar, footer, and SEO metadata.
 */

export const personal = {
  name: "Tushar Singh Tomar",
  role: "SOC Analyst Intern @ FICO",
  // shown in the browser tab / SEO short label
  shortName: "Tushar Singh Tomar | SOC Analyst",
  // rotated by the typewriter in the hero
  titles: [
    "SOC Analyst",
    "Threat Hunter",
    "Incident Responder",
    "Cloud Security Specialist",
    "Blue Teamer",
  ],
  tagline:
    "Securing enterprise cloud environments through threat detection, automation, and rapid incident response.",
  // full summary used as the About bio
  summary:
    "SOC Analyst with proven expertise in securing enterprise cloud environments, threat detection, and incident response. Demonstrated ability to strengthen cloud security posture management, streamline response workflows through automation, and drive down mean time to respond — enabling faster, more effective investigations across complex cloud-scale infrastructures.",
  // SEO description
  description:
    "Tushar Singh Tomar — SOC Analyst Intern at FICO specializing in cloud security, threat detection, SIEM engineering, and incident response. Portfolio of projects, certifications, and write-ups.",
  location: "Meerut, Uttar Pradesh 250001, India",
  email: "tushartomar066@gmail.com",
  phone: "+91 6397206501",
  // absolute URL of the deployed site (update before deploy — used for SEO/OG)
  url: "https://myportfolio-wheat-xi.vercel.app",
  // path inside /public to your CV/resume PDF
  cvPath: "/cv/Tushar-Singh-Tomar-Resume.pdf",
  // path inside /public to your profile photo
  profileImage: "/images/profile.jpg",
} as const;

export const about = {
  currentRole: "SOC Analyst Intern @ FICO",
  // bio paragraphs shown in the About section
  bio: [
    personal.summary,
    "Currently pursuing a B.E. in Computer Science & Engineering at Chitkara University (2022–2026) while working as a SOC Analyst Intern at FICO — applying classroom fundamentals to real-world detection engineering, cloud security posture management, and incident response on enterprise-scale infrastructure.",
  ],
  mission:
    "My mission is to make defenders faster than attackers — through resilient detection engineering, cloud-native security monitoring, and automation that turns hours of triage into minutes.",
} as const;
