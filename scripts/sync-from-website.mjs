import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const libraryRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const websiteRoot = path.resolve(libraryRoot, "../devtoolkit");
const source = path.join(websiteRoot, "src/lib/regex-patterns.ts");
const destination = path.join(libraryRoot, "patterns/patterns.json");
if (!fs.existsSync(source)) throw new Error(`Website source not found: ${source}`);
const text = fs.readFileSync(source, "utf8");
const match = text.match(/export const REGEX_PATTERNS[^=]*=\s*(\[[\s\S]*?\n\]);/);
if (!match) throw new Error("Could not locate REGEX_PATTERNS in the website source.");
const withoutTypes = match[1].replace(/ as const\b/g, "");
const moduleText = `module.exports = ${withoutTypes};`;
const module = { exports: {} };
new Function("module", moduleText)(module);
fs.writeFileSync(destination, JSON.stringify(module.exports, null, 2) + "\n");
console.log(`Synchronized ${module.exports.length} patterns from ${source}`);
