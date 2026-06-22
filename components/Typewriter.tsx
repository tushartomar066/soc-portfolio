"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  /** phrases cycled through, typed then deleted */
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

/**
 * Terminal-style typewriter that types each word, pauses, deletes, and
 * advances to the next — looping forever. Used in the hero.
 */
export function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseMs = 1400,
}: TypewriterProps) {
  const [index, setIndex] = useState(0); // which word
  const [text, setText] = useState(""); // current visible text
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    // Decide the next tick's delay + action.
    let delay = deleting ? deletingSpeed : typingSpeed;

    if (!deleting && text === current) {
      // finished typing — pause before deleting
      delay = pauseMs;
    } else if (deleting && text === "") {
      // finished deleting — move to next word
      delay = 300;
    }

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className="font-mono text-accent-blue">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-accent-red align-middle text-transparent">
        |
      </span>
    </span>
  );
}
