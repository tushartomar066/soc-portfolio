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
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tushar-singh-tomar-549055265/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/tushartomar066", icon: "github" },
  {
    label: "TryHackMe",
    href: "https://tryhackme.com/p/AnonSeeker?vccr=1",
    icon: "tryhackme",
  },
  {
    label: "Hack The Box",
    href: "https://profile.hackthebox.com/",
    icon: "hackthebox",
  },
];

/** Section anchors used by the navbar smooth-scroll + active highlighting. */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certs", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "CTF", href: "#ctf" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;
