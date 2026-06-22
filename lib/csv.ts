/**
 * Minimal server-side CSV loader for the (temporary) Test Data page.
 * Reads a CSV from /public, returns header + rows. Server-only (node:fs).
 *
 * NOTE: This and the /test-data route are temporary viewing scaffolding —
 * safe to delete together (see docs in the page component).
 */

import fs from "node:fs";
import path from "node:path";

export interface CsvTable {
  headers: string[];
  rows: string[][];
  rowCount: number;
  colCount: number;
}

/**
 * Parse a simple comma-separated file. Handles quoted fields containing
 * commas/quotes; trims a trailing empty line. The DLP test file has no
 * quoting, but this stays correct if the file is swapped later.
 */
function parseLine(line: string): string[] {
  const out: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(field);
      field = "";
    } else {
      field += ch;
    }
  }
  out.push(field);
  return out;
}

/** Load + parse a CSV stored under /public (path relative to /public). */
export function loadCsv(publicRelativePath: string): CsvTable | null {
  const fullPath = path.join(process.cwd(), "public", publicRelativePath);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8").replace(/\r\n/g, "\n");
  const lines = raw.split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return null;

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);

  return {
    headers,
    rows,
    rowCount: rows.length,
    colCount: headers.length,
  };
}
