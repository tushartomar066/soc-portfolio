"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const BANNER = `██████╗  ██████╗  ██████╗ ████████╗
[ROOT ACCESS GRANTED]
Welcome to Tushar's hidden terminal...
Type 'exit' to return to normal mode`;

/**
 * Konami-code easter egg. On ↑↑↓↓←→←→BA: a brief glitch, then a full-screen
 * matrix overlay (katakana + binary rain on canvas, #9d00ff). Closes on the
 * "exit" command or after 8s. All listeners/RAF/timeouts cleaned up.
 */
export function KonamiEgg() {
  const [open, setOpen] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [cmd, setCmd] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);

  // Listen for the sequence.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQUENCE[progress.current];
      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          setGlitch(true);
          setTimeout(() => {
            setGlitch(false);
            setOpen(true);
          }, 300);
        }
      } else {
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Matrix rain + auto-close + command capture while open.
  useEffect(() => {
    if (!open) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const chars =
      "アカサタナハマヤラワン0123456789ｱｲｳｴｵﾊﾋﾌﾍﾎ01".split("");
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / 16);
      drops = new Array(columns).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#9d00ff";
      ctx.font = "15px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const autoClose = setTimeout(() => setOpen(false), 8000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setCmd((c) => {
          if (c.trim().toLowerCase() === "exit") setOpen(false);
          return "";
        });
      } else if (e.key === "Backspace") {
        setCmd((c) => c.slice(0, -1));
      } else if (e.key.length === 1) {
        setCmd((c) => (c + e.key).slice(0, 40));
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(autoClose);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      setCmd("");
    };
  }, [open]);

  return (
    <>
      {glitch && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999] animate-glitch bg-accent-purple/20 mix-blend-screen"
        />
      )}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-accent-purple sm:text-sm">
              {BANNER}
            </pre>
            <p className="mt-8 font-mono text-sm text-accent-green">
              <span className="text-accent-red">visitor@root</span>:~${" "}
              {cmd}
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent-green align-middle" />
            </p>
          </div>
        </div>
      )}
    </>
  );
}
