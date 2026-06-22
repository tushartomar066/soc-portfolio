import type { ReactNode } from "react";

interface KaliTerminalProps {
  /** text shown in the title bar next to the traffic-light dots */
  title?: string;
  children: ReactNode;
  className?: string;
  /** extra classes for the body container */
  bodyClassName?: string;
}

/**
 * Reusable Kali-style terminal window: dark title bar with red/yellow/green
 * traffic-light dots, a 1px gradient top edge (#9d00ff → #ff003c), a
 * #0e0018 body, glow border, and a purple glow on hover. Shared by the
 * About bio, Skills cards, and the Contact interactive terminal.
 */
export function KaliTerminal({
  title = "tushar@kali: ~",
  children,
  className = "",
  bodyClassName = "",
}: KaliTerminalProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-glow bg-background-secondary shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-accent-purple hover:shadow-card-glow ${className}`}
    >
      {/* gradient top edge */}
      <div className="h-px w-full bg-accent-line" />

      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-glow bg-black/40 px-3 py-2">
        <span className="h-3 w-3 rounded-full bg-accent-red" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-accent-green" />
        <span className="ml-2 truncate font-mono text-xs text-text-secondary">
          {title}
        </span>
      </div>

      {/* body */}
      <div className={`p-4 font-mono text-sm ${bodyClassName}`}>{children}</div>
    </div>
  );
}
