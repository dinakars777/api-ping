import assert from 'node:assert/strict';
import test from 'node:test';
import { pingApi } from '../src/core';
import { displayResponse } from '../src/ui';

test('pingApi parses JSON structured syntax suffix responses', async (t) => {
    const originalFetch = globalThis.fetch;

    t.after(() => {
        globalThis.fetch = originalFetch;
    });

    globalThis.fetch = (async () => new Response(
        JSON.stringify({ type: 'https://example.com/problem', title: 'Invalid request' }),
        {
            status: 400,
            statusText: 'Bad Request',
            headers: { 'content-type': 'application/problem+json; charset=utf-8' },
        },
    )) as typeof fetch;

    const response = await pingApi('https://api.example.test/problem');

    assert.equal(response.statusCode, 400);
    assert.equal(response.isJson, true);
    assert.deepEqual(response.data, {
        type: 'https://example.com/problem',
        title: 'Invalid request',
    });
});

test('displayResponse renders falsy JSON payloads as response bodies', () => {
    for (const data of [null, false, 0]) {
        const output = captureConsole(() => displayResponse({
            statusCode: 200,
            statusText: 'OK',
            durationMs: 12,
            headers: {},
            data,
            isJson: true,
        }));

        assert.match(output, new RegExp(String(data)));
        assert.doesNotMatch(output, /Empty Response Body/);
    }
});

function captureConsole(action: () => void): string {
    const logs: string[] = [];
    const originalLog = console.log;
    const originalStdoutWrite = process.stdout.write;

    console.log = (...args: unknown[]) => {
        logs.push(args.map(String).join(' '));
    };

    process.stdout.write = ((chunk: string | Uint8Array) => {
        logs.push(String(chunk));
        return true;
    }) as typeof process.stdout.write;

    try {
        action();
    } finally {
        console.log = originalLog;
        process.stdout.write = originalStdoutWrite;
    }

    return logs.join('\n');
}
