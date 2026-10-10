import assert from "node:assert/strict";
import test from "node:test";
import patterns from "../patterns/patterns.json" with { type: "json" };
import { validatePatternCollection } from "../scripts/pattern-schema.mjs";
import { buildTesterUrl } from "../src/tester-link.mjs";

test("the library has valid schema and unique IDs", () => {
  assert.deepEqual(validatePatternCollection(patterns), []);
  assert.equal(new Set(patterns.map((pattern) => pattern.id)).size, patterns.length);
});

test("every expression compiles and positive/negative examples behave as documented", () => {
  for (const pattern of patterns) {
    const positive = new RegExp(pattern.pattern, pattern.flags);
    assert.equal(positive.test(pattern.matchingInput), true, `${pattern.id}: positive example did not match`);
    const negative = new RegExp(pattern.pattern, pattern.flags.replaceAll("g", "").replaceAll("y", ""));
    assert.equal(negative.test(pattern.nonMatchingInput), false, `${pattern.id}: negative example matched`);
  }
});

test("invalid schemas are rejected", () => {
  assert.match(validatePatternCollection([{ ...patterns[0], id: patterns[1].id }, patterns[1]]).join("\n"), /duplicate id/);
  assert.match(validatePatternCollection([{ ...patterns[0], flags: "gg" }]).join("\n"), /invalid or duplicate flag/);
  assert.match(validatePatternCollection([{ ...patterns[0], pattern: "[" }]).join("\n"), /Invalid regular expression/);
  assert.match(validatePatternCollection([{ ...patterns[0], title: "" }]).join("\n"), /title must be/);
});

test("tester links safely encode a pattern and its positive example", () => {
  const url = new URL(buildTesterUrl(patterns[0]));
  assert.equal(url.pathname, "/tools/regex-tester");
  assert.equal(url.searchParams.get("pattern"), patterns[0].pattern);
  assert.equal(url.searchParams.get("flags"), patterns[0].flags);
  assert.equal(url.searchParams.get("input"), patterns[0].matchingInput);
});
