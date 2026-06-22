import Link from "next/link";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Terminal className="mb-6 h-12 w-12 text-accent-purple" />
      <h1 className="font-heading text-6xl font-bold text-gradient">404</h1>
      <p className="mt-4 font-mono text-sm text-text-secondary">
        $ cat page &mdash; No such file or directory
      </p>
      <Link
        href="/"
        className="btn-neon mt-8 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white hover:shadow-glow-purple"
      >
        Return home
      </Link>
    </main>
  );
}
