import Link from "next/link";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Terminal className="mb-6 h-12 w-12 text-neon-green" />
      <h1 className="font-mono text-6xl font-bold text-gradient">404</h1>
      <p className="mt-4 font-mono text-sm text-muted">
        $ cat page &mdash; No such file or directory
      </p>
      <Link
        href="/"
        className="btn-neon mt-8 border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-neon-green"
      >
        Return home
      </Link>
    </main>
  );
}
