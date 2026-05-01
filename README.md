# api-ping ⚡️

> Fast CLI to hit API endpoints and format responses.

[![npm version](https://img.shields.io/npm/v/@dinakars777/api-ping?color=CB3837&logo=npm)](https://www.npmjs.com/package/@dinakars777/api-ping)
[![npm downloads](https://img.shields.io/npm/dm/@dinakars777/api-ping?color=CB3837&logo=npm)](https://www.npmjs.com/package/@dinakars777/api-ping)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org)

`api-ping` hits your endpoint and prints syntax-highlighted JSON with timing and status badges. Zero config.

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

- 🚀 Native Node.js fetch
- 🎨 JSON syntax highlighting via `picocolors`
- ⏱️ Request timing (e.g. `24ms`)
- 🚥 Color-coded HTTP status (green 2xx, yellow 3xx, red 4xx/5xx)

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
