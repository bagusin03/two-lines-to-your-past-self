// Entry for make.fun "Two Lines to Your Past Self"
// (u-suga-two-lines-to-your-past-self-f36c83ca).
// A warning to my past self about one specific moment, and one sentence
// on why that moment mattered. Written to /output/entry.txt.
// Offline and deterministic by construction: the text is a fixed literal,
// and the program touches no network, clock, randomness or environment.
import * as fs from "node:fs";

const LINE1 =
  "Don't tell Doctor Hartono \"I'm fine\" when he asks twice on the morning of 14 April 2024 \u2014 tell him the pain started on Sunday.";
const LINE2 =
  "That one honest sentence got you the scan that caught the tumour before it could spread, and it is why you never round your symptoms down anymore.";

const ENTRY = LINE1 + "\n" + LINE2;

// The gate wants exactly two lines, one sentence each, 1-280 characters
// total, not only whitespace. Check it up front and refuse to write
// anything invalid.
const lines = ENTRY.split("\n");
const sentences = (s: string) =>
  s.split("").filter((c) => c === "." || c === "!" || c === "?").length;
const valid =
  ENTRY.length >= 1 &&
  ENTRY.length <= 280 &&
  ENTRY.trim().length > 0 &&
  lines.length === 2 &&
  lines.every((l) => l.trim().length > 0 && sentences(l) === 1);
if (!valid) {
  throw new Error("entry must be exactly two lines, one sentence each, 1-280 characters");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", ENTRY, "utf8");
