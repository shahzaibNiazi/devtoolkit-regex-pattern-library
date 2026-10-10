export const CATEGORIES = new Set(["Validation", "Text processing", "Dates and times", "Networking", "Programming", "Identifiers"]);
export const ALLOWED_FLAGS = new Set(["d", "g", "i", "m", "s", "u", "v", "y"]);
export const REQUIRED_FIELDS = ["id", "title", "category", "pattern", "flags", "explanation", "matchingInput", "nonMatchingInput", "limitations"];

export function validatePatternCollection(data) {
  const errors = [];
  if (!Array.isArray(data)) return ["pattern data must be an array"];
  const ids = new Set();
  for (const [index, item] of data.entries()) {
    if (!item || typeof item !== "object") { errors.push(`pattern ${index}: must be an object`); continue; }
    for (const key of REQUIRED_FIELDS) if (typeof item[key] !== "string" || (key !== "flags" && !item[key].trim())) errors.push(`pattern ${index}: ${key} must be a non-empty string`);
    if (ids.has(item.id)) errors.push(`duplicate id: ${item.id}`); ids.add(item.id);
    if (!CATEGORIES.has(item.category)) errors.push(`${item.id}: unknown category`);
    if (typeof item.flags === "string" && ([...item.flags].some((flag) => !ALLOWED_FLAGS.has(flag)) || new Set(item.flags).size !== item.flags.length)) errors.push(`${item.id}: invalid or duplicate flag`);
    try { new RegExp(item.pattern, item.flags); } catch (error) { errors.push(`${item.id}: ${error.message}`); }
  }
  if (data.length < 30) errors.push("at least 30 patterns are required");
  return errors;
}
