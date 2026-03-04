#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");
var import_picocolors3 = __toESM(require("picocolors"));

// src/core.ts
var import_picocolors = __toESM(require("picocolors"));
async function pingApi(url, method = "GET", headers = {}, body) {
  const t0 = performance.now();
  try {
    const response = await fetch(url, {
      method,
      headers,
      body
    });
    const t1 = performance.now();
    const durationMs = Math.round(t1 - t0);
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    let data;
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    const resHeaders = {};
    response.headers.forEach((value, key) => {
      resHeaders[key] = value;
    });
    return {
      statusCode: response.status,
      statusText: response.statusText,
      durationMs,
      headers: resHeaders,
      data,
      isJson
    };
  } catch (error) {
    const t1 = performance.now();
    return {
      statusCode: 0,
      statusText: "Network Error",
      durationMs: Math.round(t1 - t0),
      headers: {},
      data: null,
      isJson: false,
      error: error.message
    };
  }
}
function highlightJson(obj, indentLevel = 0) {
  const indent = "  ".repeat(indentLevel);
  const nextIndent = "  ".repeat(indentLevel + 1);
  if (obj === null) return import_picocolors.default.gray("null");
  if (typeof obj === "undefined") return import_picocolors.default.gray("undefined");
  if (typeof obj === "string") return import_picocolors.default.green(`"${obj}"`);
  if (typeof obj === "number") return import_picocolors.default.yellow(obj.toString());
  if (typeof obj === "boolean") return import_picocolors.default.magenta(obj.toString());
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map((item) => `${nextIndent}${highlightJson(item, indentLevel + 1)}`);
    return `[
${items.join(",\n")}
${indent}]`;
  }
  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    if (keys.length === 0) return "{}";
    const items = keys.map((key) => {
      const value = highlightJson(obj[key], indentLevel + 1);
      return `${nextIndent}${import_picocolors.default.cyan(`"${key}"`)}: ${value}`;
    });
    return `{
${items.join(",\n")}
${indent}}`;
  }
  return String(obj);
}

// src/ui.ts
var import_prompts = require("@clack/prompts");
var import_picocolors2 = __toESM(require("picocolors"));
function showIntro() {
  (0, import_prompts.intro)(import_picocolors2.default.bgBlue(import_picocolors2.default.white(" api-ping \u26A1\uFE0F ")));
}
function getSpinner() {
  return (0, import_prompts.spinner)();
}
function getStatusColor(code) {
  if (code >= 200 && code < 300) return import_picocolors2.default.bgGreen(import_picocolors2.default.black(` ${code} `));
  if (code >= 300 && code < 400) return import_picocolors2.default.bgBlue(import_picocolors2.default.white(` ${code} `));
  if (code >= 400 && code < 500) return import_picocolors2.default.bgYellow(import_picocolors2.default.black(` ${code} `));
  return import_picocolors2.default.bgRed(import_picocolors2.default.white(` ${code} `));
}
function getTimingColor(ms) {
  if (ms < 100) return import_picocolors2.default.green(`${ms}ms`);
  if (ms < 500) return import_picocolors2.default.yellow(`${ms}ms`);
  return import_picocolors2.default.red(`${ms}ms`);
}
function displayResponse(res) {
  if (res.error) {
    (0, import_prompts.outro)(import_picocolors2.default.red(`\u2716 Failed to request API: ${res.error}`));
    return;
  }
  const statusBadge = getStatusColor(res.statusCode);
  const timeBadge = getTimingColor(res.durationMs);
  console.log(`
  ${statusBadge} ${import_picocolors2.default.bold(res.statusText)}  \u23F1  ${timeBadge}
`);
  if (res.isJson && res.data) {
    const formattedJson = highlightJson(res.data);
    console.log(formattedJson);
  } else if (res.data) {
    console.log(import_picocolors2.default.gray("Response Text (Not JSON):"));
    console.log(import_picocolors2.default.white(res.data.substring(0, 1e3) + (res.data.length > 1e3 ? "..." : "")));
  } else {
    console.log(import_picocolors2.default.gray("(Empty Response Body)"));
  }
  console.log();
  (0, import_prompts.outro)(import_picocolors2.default.green("\u2714 Done"));
}

// src/index.ts
var program = new import_commander.Command();
program.name("api-ping").description("\u26A1\uFE0F A lightning-fast, beautiful CLI tool to hit API endpoints and format responses.").version("1.0.0").argument("<url>", "The URL to hit").option("-X, --method <method>", "HTTP method", "GET").option("-d, --data <data>", "Request body data").option("-H, --header <header...>", 'Custom headers (e.g. -H "Authorization: Bearer token")');
program.parse(process.argv);
async function main() {
  const url = program.args[0];
  const options = program.opts();
  if (!url) {
    console.error(import_picocolors3.default.red("\u2716 Error: Please provide a URL to ping."));
    console.log(import_picocolors3.default.dim("Example: npx @dinakars777/api-ping https://jsonplaceholder.typicode.com/todos/1"));
    process.exit(1);
  }
  showIntro();
  const s = getSpinner();
  s.start(`Pinging ${import_picocolors3.default.cyan(url)} with ${import_picocolors3.default.bold(options.method)} method...`);
  const parsedHeaders = {
    "User-Agent": "api-ping/1.0.0",
    ...options.data && { "Content-Type": "application/json" }
  };
  if (options.header) {
    options.header.forEach((h) => {
      const [key, ...val] = h.split(":");
      if (key && val) {
        parsedHeaders[key.trim()] = val.join(":").trim();
      }
    });
  }
  const response = await pingApi(url, options.method, parsedHeaders, options.data);
  s.stop("Request complete.");
  displayResponse(response);
}
main().catch((err) => {
  console.error(import_picocolors3.default.red("An unexpected error occurred:"), err);
  process.exit(1);
});
