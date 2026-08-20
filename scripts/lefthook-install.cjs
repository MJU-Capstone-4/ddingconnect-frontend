#!/usr/bin/env node

// Runs `lefthook install` for local development only.
//
// Vercel/CI build containers don't include a `.git` directory, so
// `lefthook install` fails there with "fatal: not a git repository" and
// used to abort `pnpm install` entirely (prepare script exits non-zero).
// Git hooks are useless in those environments anyway, so we skip
// installation there and only install hooks for local developers.

const { spawnSync } = require('child_process');
const { getExePath } = require('lefthook/get-exe');

// Same truthy check lefthook's own postinstall.js uses, so this matches
// Vercel's `CI=1` and GitHub Actions' `CI=true` alike.
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
