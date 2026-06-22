/**
 * Diagonal slash divider between sections. `flip` mirrors the slant so
 * consecutive dividers alternate direction. Server-safe (no client hooks).
 */
export function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className="relative h-12 w-full overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
      >
        <polygon
          points={flip ? "0,0 1200,48 1200,0" : "0,48 1200,0 0,0"}
          fill="#0e0018"
          fillOpacity="0.6"
        />
        <line
          x1={flip ? 0 : 0}
          y1={flip ? 0 : 48}
          x2={flip ? 1200 : 1200}
          y2={flip ? 48 : 0}
          stroke="url(#divider-grad)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="divider-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9d00ff" />
            <stop offset="100%" stopColor="#ff003c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
