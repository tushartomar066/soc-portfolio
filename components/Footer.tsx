import { Shield } from "lucide-react";
import { personal } from "@/data/personal";
import { SocialRow } from "@/components/SocialRow";

export function Footer() {
  const year = "2025"; // static — avoids hydration mismatch; bump as needed

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 font-mono font-bold md:justify-start">
              <Shield className="h-5 w-5 text-neon-green" />
              <span className="text-gradient">{personal.name}</span>
            </div>
            <p className="mt-2 font-mono text-sm text-muted">{personal.tagline}</p>
          </div>

          <SocialRow />
        </div>

        <p className="mt-8 text-center font-mono text-xs text-slate-500">
          © {year} {personal.name}. Built with Next.js, Tailwind & Framer Motion.
        </p>
      </div>
    </footer>
  );
}
