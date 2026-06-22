"use client";

import { useEffect, useRef, useState } from "react";
import { personal } from "@/data/personal";
import { skillCategories } from "@/data/skills";
import { socialLinks } from "@/data/contact";

interface Line {
  text: string;
  tone?: "out" | "error" | "success" | "cmd";
}

const PROMPT = "┌──(visitor㉿portfolio)-[~]$";

const HELP = [
  "Available commands:",
  "  help          list all available commands",
  "  whoami        print Tushar's bio",
  "  skills        list all skills",
  "  contact       show email and social links",
  "  clear         clear terminal output",
  "  hire tushar   ???",
];

/**
 * Interactive Kali terminal. Accepts a fixed command set and prints styled
 * output. `hire tushar` is an easter egg that flashes the screen green.
 */
export function InteractiveTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { text: "Type 'help' to get started.", tone: "out" },
  ]);
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function run(raw: string) {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();
    const echo: Line = { text: `${PROMPT} ${cmd}`, tone: "cmd" };

    if (lower === "clear") {
      setHistory([]);
      return;
    }

    let out: Line[] = [];
    switch (lower) {
      case "help":
        out = HELP.map((t) => ({ text: t, tone: "out" }));
        break;
      case "whoami":
        out = [{ text: personal.summary, tone: "out" }];
        break;
      case "skills":
        out = skillCategories.map((c) => ({
          text: `${c.category}: ${c.skills.join(", ")}`,
          tone: "out",
        }));
        break;
      case "contact":
        out = [
          { text: `email: ${personal.email}`, tone: "out" },
          ...socialLinks.map((s) => ({
            text: `${s.label}: ${s.href}`,
            tone: "out" as const,
          })),
        ];
        break;
      case "hire tushar":
        setFlash(true);
        setTimeout(() => setFlash(false), 600);
        out = [
          { text: "> INITIATING HIRE SEQUENCE...", tone: "success" },
          { text: "ACCESS GRANTED ✓", tone: "success" },
        ];
        break;
      case "":
        out = [];
        break;
      default:
        out = [
          { text: `bash: command not found: ${cmd}`, tone: "error" },
        ];
    }

    setHistory((h) => [...h, echo, ...out]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    run(input);
    setInput("");
  }

  const toneClass: Record<NonNullable<Line["tone"]>, string> = {
    out: "text-text-primary",
    error: "text-accent-red",
    success: "text-accent-green",
    cmd: "text-accent-purple",
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`group relative h-full overflow-hidden rounded-lg border border-glow bg-background-secondary shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-accent-purple ${
        flash ? "ring-2 ring-accent-green shadow-glow-green" : ""
      }`}
    >
      <div className="h-px w-full bg-accent-line" />
      <div className="flex items-center gap-2 border-b border-glow bg-black/40 px-3 py-2">
        <span className="h-3 w-3 rounded-full bg-accent-red" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-accent-green" />
        <span className="ml-2 font-mono text-xs text-text-secondary">
          visitor@portfolio: ~
        </span>
      </div>

      {flash && (
        <div className="pointer-events-none absolute inset-0 z-10 animate-pulse bg-accent-green/20" />
      )}

      <div
        ref={scrollRef}
        className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
      >
        {history.map((line, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap break-words ${
              toneClass[line.tone ?? "out"]
            }`}
          >
            {line.text}
          </p>
        ))}

        <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
          <span className="shrink-0 text-accent-purple">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
            className="flex-1 bg-transparent font-mono text-text-primary caret-accent-red outline-none"
          />
        </form>
      </div>
    </div>
  );
}
