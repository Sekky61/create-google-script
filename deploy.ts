#!/usr/bin/env bun

import { $ } from "bun";
import {bundle} from "./bundle";

const claspCmd = "./node_modules/.bin/clasp"; // local clasp path

async function createVersion(description = "auto-deployed version") {
  const versionOutput = await $`${claspCmd} version "${description}"`;
  const buffer = versionOutput.stdout.toString();
  // Output looks like: `Created version 7.`
  const version = buffer.match(/Created version (\d+)\./)[1];
  return version;
}

async function deployVersion(version, description = "auto deployment") {
  await $`${claspCmd} deploy -V ${version} -d "${description}"`;
}

async function pushCode() {
  await $`${claspCmd} push`;
}

function log(message: string) {
  console.log(`[deploy] ${message}`);
}

(async () => {
  const description = process.argv[2] || "auto-deployed";
  log(`bundling...`);
  await bundle();
  log(`bundled`);
  log(`pushing changes...`);
  await pushCode();
  log(`pushed changes`);
  const version = await createVersion(description);
  log(`created version "${version}"`);
  log(`deploying version "${version}"...`);
  await deployVersion(version, description);
  log(`deployed version "${version}"`);
})();
