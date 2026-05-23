import { intro, outro, spinner } from '@clack/prompts';
import pc from 'picocolors';
import { PingResponse, highlightJson } from './core';

export function showIntro() {
    intro(pc.bgBlue(pc.white(' api-ping ⚡️ ')));
}

export function getSpinner() {
    return spinner();
}

function getStatusColor(code: number) {
    if (code >= 200 && code < 300) return pc.bgGreen(pc.black(` ${code} `));
    if (code >= 300 && code < 400) return pc.bgBlue(pc.white(` ${code} `));
    if (code >= 400 && code < 500) return pc.bgYellow(pc.black(` ${code} `));
    return pc.bgRed(pc.white(` ${code} `));
}

function getTimingColor(ms: number) {
    if (ms < 100) return pc.green(`${ms}ms`);
    if (ms < 500) return pc.yellow(`${ms}ms`);
    return pc.red(`${ms}ms`);
}

export function displayResponse(res: PingResponse) {
    if (res.error) {
        outro(pc.red(`✖ Failed to request API: ${res.error}`));
        return;
    }

    const statusBadge = getStatusColor(res.statusCode);
    const timeBadge = getTimingColor(res.durationMs);

    console.log(`\n  ${statusBadge} ${pc.bold(res.statusText)}  ⏱  ${timeBadge}\n`);

    if (res.isJson && hasResponseBody(res)) {
        const formattedJson = highlightJson(res.data);
        console.log(formattedJson);
    } else if (hasResponseBody(res)) {
        const text = String(res.data);
        console.log(pc.gray('Response Text (Not JSON):'));
        console.log(pc.white(text.substring(0, 1000) + (text.length > 1000 ? '...' : '')));
    } else {
        console.log(pc.gray('(Empty Response Body)'));
    }

    console.log();
    outro(pc.green('✔ Done'));
}

function hasResponseBody(res: PingResponse): boolean {
    if (typeof res.data === 'undefined') return false;
    if (res.isJson) return true;

    return res.data !== null && res.data !== '';
}
