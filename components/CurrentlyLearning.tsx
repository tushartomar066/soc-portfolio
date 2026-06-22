"use client";

import { TypeAnimation } from "react-type-animation";
import { currentlyLearning } from "@/data/personal";

/**
 * Terminal-style "currently learning" status card. Cycles through the items
 * via react-type-animation, with a pulsing green active-status dot.
 */
export function CurrentlyLearning() {
  // Build the typewriter sequence: each item shown ~3s, then erased.
  const sequence = currentlyLearning.flatMap((item) => [item, 3000]);

  return (
    <div className="mt-6 rounded-lg border border-glow bg-background-secondary p-4 font-mono text-sm">
      <p className="flex items-center gap-2 text-text-secondary">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
        </span>
        <span className="text-accent-red">&gt; CURRENTLY_LOADING:</span>
      </p>
      <p className="mt-2 pl-[18px] text-text-primary">
        <TypeAnimation
          sequence={sequence}
          speed={60}
          repeat={Infinity}
          cursor
          wrapper="span"
        />
      </p>
    </div>
  );
}
