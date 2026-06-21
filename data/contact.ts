/**
 * Contact details + social/platform links.
 * Used by the Contact section and Footer.
 *
 * TODO: Replace the "#" placeholders below with your real profile URLs.
 */

export const contact = {
  email: "tushartomar066@gmail.com",
  phone: "+91 6397206501",
  location: "Meerut, Uttar Pradesh, India",
} as const;

export interface SocialLink {
  label: string;
  href: string;
  /** key resolved to a react-icons component in the UI */
  icon: "linkedin" | "github" | "tryhackme" | "hackthebox" | "twitter";
}

export const socialLinks: SocialLink[] = [
  // TODO: Add your LinkedIn URL
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  // TODO: Add your GitHub URL
  { label: "GitHub", href: "#", icon: "github" },
  // TODO: Add your TryHackMe URL
  { label: "TryHackMe", href: "#", icon: "tryhackme" },
  // TODO: Add your HackTheBox URL
  { label: "Hack The Box", href: "#", icon: "hackthebox" },
];

/** Section anchors used by the navbar smooth-scroll + active highlighting. */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certs", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
] as const;
