import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Table2 } from "lucide-react";
import { loadCsv } from "@/lib/csv";

/**
 * TEMPORARY "Test Data" page.
 *
 * Renders public/data/test-dlp-data.csv as a themed table and offers the
 * original file as a download. This whole feature is meant to be removed
 * later — to fully delete it, remove:
 *   - app/test-data/            (this folder)
 *   - lib/csv.ts                (if not used elsewhere)
 *   - public/data/test-dlp-data.csv
 *   - the "Test Data" entry in data/contact.ts (navLinks)
 */

export const metadata: Metadata = {
  title: "Test Data",
  description: "Sample dataset viewer.",
  robots: { index: false, follow: false }, // keep it out of search engines
};

const CSV_PUBLIC_PATH = "data/test-dlp-data.csv";
const DOWNLOAD_HREF = "/data/test-dlp-data.csv";

export default function TestDataPage() {
  const table = loadCsv(CSV_PUBLIC_PATH);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-24">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-accent-purple hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 font-mono text-sm text-accent-red">// 08. test-data</p>
          <h1 className="font-heading text-4xl font-bold">
            <span className="text-gradient">Test</span> Data
          </h1>
          <p className="mt-3 font-mono text-sm text-text-secondary">
            Sample DLP dataset — for viewing &amp; download. Synthetic data only.
          </p>
        </div>

        <a
          href={DOWNLOAD_HREF}
          download="test-dlp-data.csv"
          className="inline-flex items-center justify-center gap-2 self-start rounded-md border-2 border-accent-purple px-5 py-2.5 font-mono text-sm font-medium text-accent-purple transition-all duration-300 hover:bg-accent-purple hover:text-white hover:shadow-glow-purple sm:self-auto"
        >
          <Download className="h-4 w-4" /> Download CSV
        </a>
      </div>

      {!table ? (
        <p className="mt-12 font-mono text-sm text-accent-red">
          Data file not found.
        </p>
      ) : (
        <>
          {/* meta strip */}
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-glow bg-background-secondary px-3 py-1.5">
              <Table2 className="h-3.5 w-3.5 text-accent-blue" />
              {table.rowCount} rows × {table.colCount} cols
            </span>
          </div>

          {/* themed table inside a Kali-terminal-style frame */}
          <div className="mt-6 overflow-hidden rounded-lg border border-glow bg-background-secondary shadow-card-glow">
            <div className="h-px w-full bg-accent-line" />
            <div className="flex items-center gap-2 border-b border-glow bg-black/40 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-accent-red" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-accent-green" />
              <span className="ml-2 truncate font-mono text-xs text-text-secondary">
                tushar@kali: ~/test-dlp-data.csv
              </span>
            </div>

            <div className="max-h-[70vh] overflow-auto">
              <table className="w-full border-collapse font-mono text-xs">
                <thead className="sticky top-0 z-10 bg-background-primary">
                  <tr>
                    <th className="border-b border-glow px-3 py-2 text-left text-accent-blue">
                      #
                    </th>
                    {table.headers.map((h, i) => (
                      <th
                        key={i}
                        className="whitespace-nowrap border-b border-glow px-3 py-2 text-left text-accent-purple"
                      >
                        {h || <span className="text-text-secondary">—</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, r) => (
                    <tr
                      key={r}
                      className="transition-colors hover:bg-accent-purple/5"
                    >
                      <td className="whitespace-nowrap border-b border-glow/40 px-3 py-1.5 text-text-secondary">
                        {r + 1}
                      </td>
                      {table.headers.map((_, c) => (
                        <td
                          key={c}
                          className="whitespace-nowrap border-b border-glow/40 px-3 py-1.5 text-text-primary"
                        >
                          {row[c] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
