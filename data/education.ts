/**
 * Education history. Rendered in the About section.
 */

export interface EducationItem {
  degree: string;
  university: string;
  location: string;
  dates: string;
}

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Engineering — Computer Science & Engineering (CSE)",
    university: "Chitkara University",
    location: "Rajpura, Punjab",
    dates: "August 2022 – June 2026 (Completed)",
  },
];
