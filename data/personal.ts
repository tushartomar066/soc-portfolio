/**
 * Core personal info + profile content.
 * Feeds the Hero, About section, navbar, footer, and SEO metadata.
 */

export const personal = {
  name: "Tushar Singh Tomar",
  role: "SOC Analyst (Associate) @ FICO",
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
    "Early-career SOC Analyst working as an Associate at FICO, where I'm an active part of the blue team — monitoring and triaging security alerts day to day. I started here as an intern in June 2025 and have been building real-world experience in security operations ever since, getting hands-on with a wide range of SOC tools: SIEM, EDR, cloud security, email security, and threat intelligence.",
  // SEO description
  description:
    "Tushar Singh Tomar — SOC Analyst (Associate) at FICO, working in the blue team on threat detection, alert triage, and incident response. Portfolio of hands-on work, projects, and write-ups.",
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
  currentRole: "SOC Analyst (Associate) @ FICO",
  // bio paragraphs shown in the About section
  bio: [
    personal.summary,
    "I completed my B.E. in Computer Science & Engineering at Chitkara University in June 2026. I joined FICO's SOC as an intern in June 2025 and have since moved into an Associate role on the blue team — taking what I learned in the classroom and applying it for real: watching alerts, triaging incidents, and getting more comfortable across the SOC tool stack every day.",
  ],
  mission:
    "My goal right now is simple: keep learning, sharpen my detection and investigation skills every day, and grow into a strong defender on the blue team.",
} as const;

/** Live "currently learning" list — easy to update; shown in the About badge. */
export const currentlyLearning: string[] = [
  "CompTIA Security+",
  "Microsoft SC-200",
  "Threat Hunting with KQL",
  "OSCP Prep",
];
