# api-ping ⚡️

> A lightning-fast, beautiful CLI tool to hit API endpoints and format responses.

[![npm version](https://img.shields.io/npm/v/@dinakars777/api-ping?color=CB3837&logo=npm)](https://www.npmjs.com/package/@dinakars777/api-ping)
[![npm downloads](https://img.shields.io/npm/dm/@dinakars777/api-ping?color=CB3837&logo=npm)](https://www.npmjs.com/package/@dinakars777/api-ping)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org)

Stop squinting at massive, uncolored JSON blobs from `curl`. `api-ping` hits your endpoint and prints a beautifully syntax-highlighted, indented response with timing and color-coded status badges — zero config, zero install.

---

## Usage

Run instantly via `npx` — no install needed:

```bash
npx @dinakars777/api-ping https://jsonplaceholder.typicode.com/todos/1
```

---

## Options

| Flag | Description | Example |
|---|---|---|
| `-X <method>` | HTTP method (default: GET) | `-X POST` |
| `-d <body>` | Request body (JSON string) | `-d '{"name":"test"}'` |
| `-H <header>` | Custom header | `-H "Authorization: Bearer token"` |

### POST request with body
```bash
npx @dinakars777/api-ping https://api.example.com/data -X POST -d '{"name":"api-ping"}'
```

### Custom headers
```bash
npx @dinakars777/api-ping https://api.example.com/protected -H "Authorization: Bearer my-token"
```

---

## Features

- 🚀 zero-overhead networking via native Node.js fetch
- 🎨 recursive JSON syntax highlighting via `picocolors`
- ⏱️ high-resolution request timing (e.g. `24ms`)
- 🚥 color-coded HTTP status badges (green 2xx, yellow 3xx, red 4xx/5xx)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| TypeScript | Source language |
| `tsup` | Build & bundle |
| `commander` | CLI argument parsing |
| `picocolors` | Terminal color output |
| `@clack/prompts` | Interactive prompts |

---

## License

MIT
