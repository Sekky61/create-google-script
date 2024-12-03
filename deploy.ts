#!/usr/bin/env bun

import { $ } from "bun";
import { bundle } from "./bundle";
import { parseArgs } from "node:util";

type Params = {
    clasp_json_path: string;
    clasp_cmd: string;
    description: string;
};

function clasp(p: Params) {
    // Uses raw to avoid escaping
    return { raw: `${p.clasp_cmd} -P ${p.clasp_json_path}`};
}

async function createVersion(p: Params) {
    const versionOutput = await $`${clasp(p)} version "${p.description}"`;
    const buffer = versionOutput.stdout.toString();
    // Output looks like: `Created version 7.`
    const matches = buffer.match(/Created version (\d+)\./);
    if (!matches) {
        throw new Error(`Could not parse version from output: ${buffer}`);
    }
    const version = matches[1];
    return version;
}

async function deployVersion(
    p: Params,
    version: string,
    description = "auto deployment",
) {
    await $`${clasp(p)} deploy -V ${version} -d "${description}"`;
}

async function pushCode(p: Params) {
    await $`${clasp(p)} push`;
}

function log(message: unknown) {
    let msg: unknown = message;
    if (typeof message === "object") {
        msg = JSON.stringify(message);
    }
    console.log(`[deploy] ${msg}`);
}

(async () => {
    // Args
    const { values, positionals } = parseArgs({
        args: Bun.argv,
        options: {
            "project-path": {
                type: "string",
            },
            "clasp-cmd": {
                type: "string",
            },
            description: {
                type: "string",
            },
        },
        strict: true,
        allowPositionals: true,
    });
    const clasp_json_path = values["project-path"] ?? ".clasp.json";
    const clasp_cmd = values["clasp-cmd"] ?? "./node_modules/.bin/clasp";
    const description = values.description ?? "auto-deployed";
    const params: Params = {
        clasp_json_path,
        clasp_cmd,
        description,
    };
    log(params);

    log("bundling...");
    await bundle();
    log("bundled");
    log("pushing changes...");
    await pushCode(params);
    log("pushed changes");
    const version = await createVersion(params);
    log(`created version "${version}"`);
    log(`deploying version "${version}"...`);
    await deployVersion(params, version, description);
    log(`deployed version "${version}"`);
})();
