# api-ping Roadmap

This roadmap reflects the current repository state after the initial cleanup and JSON response fixes:

- The CLI is a focused TypeScript tool built with `tsup`, `commander`, `@clack/prompts`, and native Node fetch.
- `npm ci`, `npm test`, `npm run build`, `npm audit`, and `npm pack --dry-run` are locally reproducible.
- Regression tests currently cover JSON structured syntax suffixes and falsy JSON response bodies.
- There is no GitHub Actions workflow, release automation, documented exit-code contract, timeout handling, or integration-test coverage for the installed CLI.

## Product Direction

Keep `api-ping` a fast API inspection CLI, not a full `curl` clone. The strongest path is to make the default experience polished for humans while adding enough deterministic behavior for scripts, CI checks, and bug reports.

## Now

1. Add CI gates.
   - Run `npm ci`, `npm test`, `npm run build`, `npm audit`, and `npm pack --dry-run` on pull requests.
   - This protects the install and packaging fixes from regressing.

2. Define CLI exit behavior.
   - Return a non-zero exit code for network/request failures.
   - Add and document an optional `--fail` mode for non-2xx or 4xx/5xx HTTP statuses.
   - Cover network failures and HTTP failures with tests.

3. Add request timeout support.
   - Add `--timeout <ms>` with a sensible default.
   - Use `AbortController` so hung endpoints do not leave the CLI running indefinitely.
   - Show timeout failures distinctly from DNS, TLS, and connection errors.

4. Harden request input parsing.
   - Validate `-H/--header` values and reject malformed headers instead of silently sending empty header values.
   - Normalize HTTP methods and reject empty method values.
   - Validate JSON request bodies when `Content-Type: application/json` is inferred or supplied.

## Next

1. Expand output modes.
   - Add `--raw` for unformatted response bodies.
   - Add `--json` for machine-readable output containing status, duration, headers, body, and error fields.
   - Add `--headers` or `--include-headers` to display response headers already captured by `pingApi`.

2. Separate CLI orchestration from core behavior.
   - Move argument parsing, header parsing, exit-code decisions, and request execution into testable units.
   - Keep `src/index.ts` as a thin executable wrapper.

3. Add CLI integration tests.
   - Run the built `dist/index.js` against a local HTTP server.
   - Cover JSON, text, empty responses, headers, POST body handling, timeout, and failure modes.

4. Improve response parsing resilience.
   - Handle empty JSON responses such as `204 No Content` without converting them into network errors.
   - Report malformed JSON bodies with the original HTTP status and a clear parse error.

## Later

1. Automate releases.
   - Add a release workflow that builds, packs, and publishes with npm provenance.
   - Generate changelog entries from merged PRs or conventional commits.

2. Improve documentation.
   - Document install options, Node version support, exit codes, timeout behavior, output modes, and examples for CI usage.
   - Add examples for POST, headers, raw output, JSON output, and failure handling.

3. Add request ergonomics.
   - Support `--data @file` and stdin request bodies.
   - Consider `--query key=value` for simple query-string construction.
   - Consider `--auth bearer:<token>` only if it stays transparent and avoids storing secrets.

4. Track quality metrics.
   - Keep dependency audit clean.
   - Keep package tarball contents small and intentional.
   - Add tests for each new command-line behavior before expanding the CLI surface.

## Candidate First Issues

- `ci: add pull request verification workflow`
- `fix: return non-zero exit code for request failures`
- `feat: add timeout option with AbortController`
- `fix: validate malformed header arguments`
- `test: add built CLI integration tests with a local HTTP server`
