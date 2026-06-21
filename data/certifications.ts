/**
 * Certifications shown as flip cards.
 *
 * TODO: Add Tushar's certifications here.
 * Replace the placeholder entries below with real certs — fill in `name`,
 * `issuer`, `year`, the `verifyUrl` credential link, and a short `blurb`.
 */

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  /** verification link placeholder */
  verifyUrl: string;
  /** short blurb shown on the back of the flip card */
  blurb: string;
}

export const certifications: Certification[] = [
  // TODO: Add Tushar's certifications here
  {
    name: "Certification Name",
    issuer: "Issuing Body",
    year: "20XX",
    verifyUrl: "#",
    blurb: "Short description of what this certification validates.",
  },
];
