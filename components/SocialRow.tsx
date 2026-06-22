"use client";

import { useState } from "react";
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

// Per-platform brand hover glow color.
const glowMap: Record<SocialLink["icon"], string> = {
  linkedin: "#0077b5",
  github: "#9d00ff",
  tryhackme: "#ff003c",
  hackthebox: "#9fef00",
  twitter: "#00f5ff",
};

/**
 * Row of social icon buttons. On hover each glows in its platform's brand
 * color. Reused in Contact + Footer.
 */
export function SocialRow() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        const glow = glowMap[link.icon];
        const active = hover === link.label;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={{ y: -4 }}
            onMouseEnter={() => setHover(link.label)}
            onMouseLeave={() => setHover(null)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-glow bg-background-secondary text-text-secondary transition-colors duration-300"
            style={
              active
                ? {
                    color: glow,
                    borderColor: glow,
                    boxShadow: `0 0 6px ${glow}, 0 0 18px ${glow}66`,
                  }
                : undefined
            }
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        );
      })}
    </div>
  );
}
