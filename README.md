# api-ping ⚡️

> A lightning-fast, beautiful CLI tool to hit API endpoints and format responses.

Stop reading massive, uncolored, deeply nested JSON blocks from `curl`. `api-ping` instantly hits your target API and prints out a beautifully syntax-highlighted, indented response body, along with accurate response timings and color-coded status badges.

## Features
- 🚀 **Instant**: Uses native Node.js fetching for zero-overhead networking.
- 🎨 **Beautiful Output**: Recursively formats and syntax-highlights JSON using `picocolors`.
- ⏱️ **Network Timing**: Measures high-resolution request duration (e.g. `24ms`).
- 🚥 **Status Badges**: Clean, color-coded HTTP status badges (Green 200, Red 404, etc.).

## Usage
Simply run it anywhere via `npx`:

```bash
npx @dinakars777/api-ping https://jsonplaceholder.typicode.com/todos/1
```

### Options
- Make a POST request with a body:
```bash
npx @dinakars777/api-ping https://api.example.com/data -X POST -d '{"name":"api-ping"}'
```

- Pass custom Headers:
```bash
npx @dinakars777/api-ping https://api.example.com/protected -H "Authorization: Bearer my-token"
```

## License
MIT
