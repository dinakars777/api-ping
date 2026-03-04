import pc from 'picocolors';

export interface PingResponse {
    statusCode: number;
    statusText: string;
    durationMs: number;
    headers: Record<string, string>;
    data: any;
    isJson: boolean;
    error?: string;
}

export async function pingApi(
    url: string,
    method: string = 'GET',
    headers: Record<string, string> = {},
    body?: string
): Promise<PingResponse> {
    const t0 = performance.now();

    try {
        const response = await fetch(url, {
            method,
            headers,
            body,
        });

        const t1 = performance.now();
        const durationMs = Math.round(t1 - t0);

        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');

        let data;
        if (isJson) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Convert Headers object to a simple Record for easier display
        const resHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
            resHeaders[key] = value;
        });

        return {
            statusCode: response.status,
            statusText: response.statusText,
            durationMs,
            headers: resHeaders,
            data,
            isJson,
        };
    } catch (error: any) {
        const t1 = performance.now();
        return {
            statusCode: 0,
            statusText: 'Network Error',
            durationMs: Math.round(t1 - t0),
            headers: {},
            data: null,
            isJson: false,
            error: error.message,
        };
    }
}

/**
 * Recursively formats and syntax-highlights a JSON object into a terminal string.
 */
export function highlightJson(obj: any, indentLevel = 0): string {
    const indent = '  '.repeat(indentLevel);
    const nextIndent = '  '.repeat(indentLevel + 1);

    if (obj === null) return pc.gray('null');
    if (typeof obj === 'undefined') return pc.gray('undefined');
    if (typeof obj === 'string') return pc.green(`"${obj}"`);
    if (typeof obj === 'number') return pc.yellow(obj.toString());
    if (typeof obj === 'boolean') return pc.magenta(obj.toString());

    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';

        const items = obj.map(item => `${nextIndent}${highlightJson(item, indentLevel + 1)}`);
        return `[\n${items.join(',\n')}\n${indent}]`;
    }

    if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';

        const items = keys.map(key => {
            const value = highlightJson(obj[key], indentLevel + 1);
            return `${nextIndent}${pc.cyan(`"${key}"`)}: ${value}`;
        });
        return `{\n${items.join(',\n')}\n${indent}}`;
    }

    return String(obj);
}
