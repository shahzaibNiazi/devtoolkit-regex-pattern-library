export function buildTesterUrl(pattern, base = "https://www.devtoolkit.my/tools/regex-tester") {
  const url = new URL(base);
  url.searchParams.set("pattern", pattern.pattern);
  url.searchParams.set("flags", pattern.flags);
  url.searchParams.set("input", pattern.matchingInput);
  return url.toString();
}
