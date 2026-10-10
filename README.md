# DevToolkit Regex Pattern Library

A standalone, open-source collection of practical JavaScript regular-expression patterns for validation, text processing, networking, dates, identifiers, programming, and common logs.

Each entry includes a stable ID, expression, flags, explanation, positive and negative examples, limitations, and JavaScript compatibility through the native `RegExp` engine.

## Quick start

```js
const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
email.test("dev@example.com"); // true
```

Browse the patterns in [`patterns/patterns.json`](patterns/patterns.json), or test an expression interactively with the [DevToolkit Regex Tester](https://www.devtoolkit.my/tools/regex-tester).

## Categories

| Category | Examples |
| --- | --- |
| Validation | Email, colors, numbers, slugs, phone and ZIP formats |
| Text processing | Whitespace, quoted strings, HTML-like tags, CSV fields |
| Dates and times | ISO dates, 24-hour time, date-time and durations |
| Networking | IPv4, IPv6, hostnames, ports and MAC addresses |
| Programming | JavaScript identifiers, semantic versions, JSON strings, Base64 and logs |
| Identifiers | UUID v4 |

See the JSON file for the complete 32-pattern table and all examples. Patterns are syntax helpers, not universal parsers: limitations are documented per entry.

## Open a pattern in the website tester

The website accepts safely encoded `pattern`, `flags`, and `input` query parameters:

```js
const url = new URL("https://www.devtoolkit.my/tools/regex-tester");
url.searchParams.set("pattern", "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
url.searchParams.set("flags", "");
url.searchParams.set("input", "dev@example.com");
```

The `src/tester-link.mjs` helper creates these links for library entries. The website validates flags, syntax, encoding, input size, and potentially expensive nested quantifier shapes before loading a link.

## Test and validate

Requires Node.js 20 or newer and has no runtime dependencies.

```bash
npm test
npm run validate
```

`npm test` compiles every expression, checks all positive and negative examples, verifies unique IDs, and exercises invalid schema cases.

## Synchronization with DevToolkit

The website's existing pattern module is the integration target. The library's `patterns/patterns.json` is the portable generated data snapshot, and `npm run sync` reads `../devtoolkit/src/lib/regex-patterns.ts` to refresh it from the website source. Run synchronization from this repository, then run the tests. This keeps the 32 existing website patterns aligned without maintaining a second hand-edited catalog.

The website does not link to an unpublished GitHub repository. Once the repository is published, its URL can be added deliberately in a separate change.

## Limitations and security

- Native JavaScript regex behavior varies with supported flags and runtime version.
- Syntax matching does not prove semantic validity, existence, reachability, or uniqueness.
- Do not use the HTML-like tag pattern as an HTML parser.
- Untrusted expressions and input can cause catastrophic backtracking. Bound input sizes, prefer specific expressions, and use a worker or timeout-capable engine for hostile workloads.
- This project never executes pattern text as JavaScript and does not collect test input.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Security reports belong in [SECURITY.md](SECURITY.md). This project follows the expectations in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

MIT. See [LICENSE](LICENSE).
