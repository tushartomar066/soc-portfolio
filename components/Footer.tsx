import { personal } from "@/data/personal";
import { SocialRow } from "@/components/SocialRow";

export function Footer() {
  const year = "2025"; // static — avoids hydration mismatch; bump as needed

  return (
    <footer className="border-t border-glow bg-background-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-1 font-heading text-lg font-bold md:justify-start">
              <span className="text-accent-red">&gt;_</span>
              <span className="text-text-primary">{personal.name}</span>
            </div>
            <p className="mt-2 font-mono text-sm text-text-secondary">
              {personal.tagline}
            </p>
          </div>

          <SocialRow />
        </div>

        <p className="mt-8 text-center font-mono text-xs text-text-secondary">
          © {year} {personal.name}. Built with Next.js, Tailwind & Framer Motion.
        </p>
      </div>
    </footer>
  );
}
