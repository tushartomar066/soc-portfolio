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
    "Blue Team Defender",
    "Threat Detection",
    "Incident Response",
    "Always Learning",
  ],
  tagline:
    "Just getting started in the SOC — learning threat detection, alert triage, and blue-team operations hands-on, one investigation at a time.",
  // full summary used as the About bio
  summary:
    "Entry-level SOC Analyst currently interning at FICO, where I work day-to-day with the blue team monitoring and triaging security alerts. I'm building real-world experience in security operations and getting hands-on exposure to a wide range of SOC tools — SIEM, EDR, cloud security, email security, and threat intelligence — as I find my footing in the field.",
  // SEO description
  description:
    "Tushar Singh Tomar — entry-level SOC Analyst Intern at FICO, working in the blue team on threat detection, alert triage, and incident response. Portfolio of hands-on learning, projects, and write-ups.",
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
    "I completed my B.E. in Computer Science & Engineering at Chitkara University in June 2026, and have been working as a SOC Analyst Intern at FICO since June 2025 — taking what I learned in the classroom and applying it on a real blue team: watching alerts, triaging incidents, and slowly getting comfortable across the SOC tool stack.",
  ],
  mission:
    "My goal right now is simple: keep learning, sharpen my detection and investigation skills every day, and grow into a strong defender on the blue team.",
} as const;
