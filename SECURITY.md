# Security Policy

## Scope

This project contains regular-expression examples and metadata. Patterns are not a substitute for parsers, validators, authentication, or authorization.

## Reporting a vulnerability

Please do not disclose an exploitable issue in a public issue first. Contact the project maintainer privately through the repository's GitHub security advisory feature after publication, including the affected file, reproduction steps, impact, and a suggested fix if available.

## Regex safety

Some regular expressions can exhibit catastrophic backtracking on adversarial input. Keep inputs bounded, prefer anchored and specific expressions, and use a worker or a regex engine with a timeout when processing untrusted large input. This library does not execute user-supplied expressions.
