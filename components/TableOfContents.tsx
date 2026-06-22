"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

/**
 * Auto-generated TOC for a blog post. Reads h2/h3 (with rehype-slug ids) from
 * the rendered article, smooth-scrolls on click, and highlights the active
 * heading via IntersectionObserver. Sticky sidebar on desktop, collapsible
 * dropdown on mobile.
 *
 * Pass the CSS selector of the article container (default `.prose`).
 */
export function TableOfContents({ selector = ".prose" }: { selector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.querySelector(selector);
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll("h2, h3")
    ) as HTMLElement[];
    const items = nodes
      .filter((n) => n.id)
      .map((n) => ({
        id: n.id,
        text: n.textContent ?? "",
        level: n.tagName === "H2" ? 2 : 3,
      }));
    setHeadings(items);

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    nodes.forEach((n) => n.id && observer.observe(n));
    return () => observer.disconnect();
  }, [selector]);

  if (headings.length === 0) return null;

  function go(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setOpen(false);
    }
  }

  const list = (
    <ul className="space-y-1.5 font-mono text-xs">
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.75rem" : 0 }}>
          <a
            href={`#${h.id}`}
            onClick={(e) => go(e, h.id)}
            className={`block border-l-2 py-0.5 pl-2 transition-colors ${
              activeId === h.id
                ? "border-accent-purple text-accent-purple"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="sticky top-24 hidden max-h-[70vh] overflow-auto rounded-lg border-l-2 border-[rgba(157,0,255,0.25)] bg-background-secondary p-4 lg:block">
        <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text-secondary">
          <List className="h-3.5 w-3.5" /> contents
        </p>
        {list}
      </nav>

      {/* Mobile: collapsible dropdown */}
      <div className="mb-6 rounded-lg border-l-2 border-[rgba(157,0,255,0.25)] bg-background-secondary p-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-widest text-text-secondary"
        >
          <span className="flex items-center gap-1.5">
            <List className="h-3.5 w-3.5" /> contents
          </span>
          <span>{open ? "−" : "+"}</span>
        </button>
        {open && <div className="mt-3">{list}</div>}
      </div>
    </>
  );
}
