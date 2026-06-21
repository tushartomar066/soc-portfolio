import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { personal } from "@/data/personal";

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

// Full SEO metadata (App Router). Update personal.url before deploy.
export const metadata: Metadata = {
  metadataBase: new URL(personal.url),
  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s | ${personal.name}`,
  },
  description: personal.description,
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
    title: `${personal.name} — ${personal.role}`,
    description: personal.description,
    siteName: personal.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.description,
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        {/* Global toast portal for the contact form */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0d1526",
              color: "#e2e8f0",
              border: "1px solid #1c2842",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.85rem",
            },
          }}
        />
      </body>
    </html>
  );
}
