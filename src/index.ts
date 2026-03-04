#!/usr/bin/env node

import { Command } from 'commander';
import pc from 'picocolors';
import { pingApi } from './core';
import { showIntro, getSpinner, displayResponse } from './ui';

const program = new Command();

program
    .name('api-ping')
    .description('⚡️ A lightning-fast, beautiful CLI tool to hit API endpoints and format responses.')
    .version('1.0.0')
    .argument('<url>', 'The URL to hit')
    .option('-X, --method <method>', 'HTTP method', 'GET')
    .option('-d, --data <data>', 'Request body data')
    .option('-H, --header <header...>', 'Custom headers (e.g. -H "Authorization: Bearer token")');

program.parse(process.argv);

async function main() {
    const url = program.args[0];
    const options = program.opts();

    if (!url) {
        console.error(pc.red('✖ Error: Please provide a URL to ping.'));
        console.log(pc.dim('Example: npx @dinakars777/api-ping https://jsonplaceholder.typicode.com/todos/1'));
        process.exit(1);
    }

    showIntro();

    const s = getSpinner();

    s.start(`Pinging ${pc.cyan(url)} with ${pc.bold(options.method)} method...`);

    // Parse Headers
    const parsedHeaders: Record<string, string> = {
        'User-Agent': 'api-ping/1.0.0',
        ...(options.data && { 'Content-Type': 'application/json' })
    };

    if (options.header) {
        (options.header as string[]).forEach(h => {
            const [key, ...val] = h.split(':');
            if (key && val) {
                parsedHeaders[key.trim()] = val.join(':').trim();
            }
        });
    }

    const response = await pingApi(url, options.method, parsedHeaders, options.data);

    s.stop('Request complete.');

    displayResponse(response);
}

main().catch((err) => {
    console.error(pc.red('An unexpected error occurred:'), err);
    process.exit(1);
});
