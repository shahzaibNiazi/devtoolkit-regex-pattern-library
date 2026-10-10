import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validatePatternCollection } from "./pattern-schema.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const data = JSON.parse(fs.readFileSync(path.join(root, "patterns/patterns.json"), "utf8"));
const errors = validatePatternCollection(data);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Schema valid: ${data.length} patterns`);
