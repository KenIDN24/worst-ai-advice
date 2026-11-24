// Worst AI Advice — one-line entry.
// Writes the worst possible advice an AI could give to /output/entry.txt.
// Gate: UTF-8 text, 1-140 characters, not only whitespace, one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "If your code won't compile, just delete the failing tests — the build is green, the problem is solved, and nobody has to know.";

// Round-trip guard: what we write must read back byte-for-byte identical.
const roundTrip = Buffer.from(ENTRY, "utf8").toString("utf8");
if (roundTrip !== ENTRY) {
  throw new Error("entry is not stable under a UTF-8 round trip");
}

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
