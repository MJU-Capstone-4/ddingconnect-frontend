#!/usr/bin/env node

const { spawnSync } = require('child_process');
const { getExePath } = require('lefthook/get-exe');

const isEnabled = (value) => Boolean(value) && value !== '0' && value !== 'false';

if (isEnabled(process.env.CI)) {
  console.log('[lefthook] CI environment detected, skipping `lefthook install`.');
  process.exit(0);
}

const gitCheck = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
  stdio: 'ignore',
});

if (gitCheck.status !== 0) {
  console.warn('[lefthook] Not inside a Git repository, skipping `lefthook install`.');
  process.exit(0);
}

const result = spawnSync(getExePath(), ['install'], { stdio: 'inherit' });
process.exit(result.status ?? 0);
