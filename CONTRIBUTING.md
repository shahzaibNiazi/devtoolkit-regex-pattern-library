# Contributing

Thanks for helping improve the DevToolkit Regex Pattern Library.

## Before opening a pull request

1. Add or update pattern data in `patterns/patterns.json`.
2. Keep IDs stable and unique.
3. Include positive and negative examples and honest limitations.
4. Run `npm test` and `npm run validate` with Node.js 20 or newer.
5. Keep expressions compatible with the JavaScript `RegExp` engine.

Avoid claiming RFC-complete or semantic validation when a pattern only checks syntax. Explain compatibility and edge cases in the pattern metadata.
