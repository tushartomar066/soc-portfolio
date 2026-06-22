"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scroll";

const LINES = [
  "[  OK  ] Starting TUSHAR_PORTFOLIO.service...",
  "[  OK  ] Loading threat detection modules...",
  "[  OK  ] Initializing SOC dashboard...",
  "[  OK  ] Mounting Blue Team operations...",
  "[  OK  ] All systems operational.",
  ">_ Launching portfolio...",
];

const STEP_MS = 400;
const HOLD_MS = 600;

/**
 * Full-screen Kali-style boot overlay. Types the boot lines 400ms apart,
 * holds 600ms, then fades out. Plays once per browser session
 * (sessionStorage). Sits above everything at z-9999.
 */
export function BootSequence() {
  const [shown, setShown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("boot_played")) return;
    sessionStorage.setItem("boot_played", "1");
    setShown(true);

    const reduced = prefersReducedMotion();
    const finish = () => {
      setFading(true);
      timers.current.push(setTimeout(() => setShown(false), 600));
    };

    if (reduced) {
      // Show all lines instantly, then fade.
      setVisibleCount(LINES.length);
      timers.current.push(setTimeout(finish, HOLD_MS));
      return cleanup;
    }

    LINES.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setVisibleCount(i + 1), STEP_MS * (i + 1))
      );
    });
    timers.current.push(
      setTimeout(finish, STEP_MS * LINES.length + HOLD_MS)
    );

    return cleanup;
    function cleanup() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    }
  }, []);

  if (!shown) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col justify-center bg-black px-6 font-mono text-sm leading-relaxed text-accent-green transition-opacity duration-500 sm:px-16 sm:text-base"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="mx-auto w-full max-w-2xl">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <p key={i} className="whitespace-pre-wrap">
            {line}
          </p>
        ))}
        {visibleCount > 0 && (
          <span className="inline-block h-4 w-2 animate-blink bg-accent-green align-middle" />
        )}
      </div>
    </div>
  );
}
