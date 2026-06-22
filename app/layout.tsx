import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { personal } from "@/data/personal";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

// Fonts loaded via next/font and exposed as CSS variables to Tailwind.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Client-only decorative overlays — disable SSR to avoid window/canvas errors.
const BootSequence = dynamic(
  () => import("@/components/BootSequence").then((m) => m.BootSequence),
  { ssr: false }
);
const KonamiEgg = dynamic(
  () => import("@/components/KonamiEgg").then((m) => m.KonamiEgg),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("@/components/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false }
);

// Full SEO metadata (App Router). Update personal.url before deploy.
export const metadata: Metadata = {
  metadataBase: new URL(personal.url),
  title: {
    default: "Tushar Singh Tomar | SOC Analyst",
    template: `%s | ${personal.name}`,
  },
  description:
    "SOC Analyst specializing in threat detection, incident response, cloud security, and blue team operations.",
  keywords: [
    "SOC Analyst",
    "Cybersecurity",
    "Cloud Security",
    "Threat Hunting",
    "Incident Response",
    "Blue Team",
    "SIEM",
    "Splunk",
    "Wiz",
    "Microsoft Defender",
    "Cortex XDR",
    personal.name,
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personal.url,
    title: "Tushar Singh Tomar | SOC Analyst",
    description:
      "SOC Analyst specializing in threat detection, incident response, cloud security, and blue team operations.",
    siteName: personal.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Singh Tomar | SOC Analyst",
    description:
      "SOC Analyst specializing in threat detection, incident response, cloud security, and blue team operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <BootSequence />
        <ScrollProgress />
        <KonamiEgg />

        <SmoothScroll>{children}</SmoothScroll>

        {/* global grain/noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Global toast portal for the contact form */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0e0018",
              color: "#e8e8f0",
              border: "1px solid rgba(157,0,255,0.4)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.85rem",
            },
          }}
        />
      </body>
    </html>
  );
}
