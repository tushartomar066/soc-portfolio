"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiTryhackme, SiHackthebox } from "react-icons/si";
import type { IconType } from "react-icons";
import { socialLinks, type SocialLink } from "@/data/contact";

// Map data keys to concrete icon components.
const iconMap: Record<SocialLink["icon"], IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  tryhackme: SiTryhackme,
  hackthebox: SiHackthebox,
  twitter: FaXTwitter,
};

/**
 * Row of social icon buttons with neon glow hover. Reused in Contact + Footer.
 */
export function SocialRow() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={{ y: -4 }}
            className="group flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-slate-300 transition-all duration-300 hover:border-neon-green hover:text-neon-green hover:shadow-neon-green"
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        );
      })}
    </div>
  );
}
