import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

/** Defaults match the company's private component repository. Folders sit at the repo root. */
export const DEFAULT_GITHUB = {
  owner: 'ByCMSTags',
  repo: 'UIComponents',
  ref: 'main',
  path: '',
};

export function findConfig(start = process.cwd()) {
  let dir = resolve(start);
  for (;;) {
    const file = join(dir, 'cmstags.config.json');
    if (existsSync(file)) return { file, dir, config: JSON.parse(readFileSync(file, 'utf8')) };
    const parent = dirname(dir);
    if (parent === dir) return { file: null, dir: resolve(start), config: {} };
    dir = parent;
  }
}

export function resolveGithub(config, refOverride) {
  const g = config?.components?.github ?? {};
  return {
    owner: g.owner || DEFAULT_GITHUB.owner,
    repo: g.repo || DEFAULT_GITHUB.repo,
    ref: refOverride || g.ref || DEFAULT_GITHUB.ref,
    path: String(g.path ?? DEFAULT_GITHUB.path).replace(/^\/+|\/+$/g, ''),
    api: (process.env.CMSTAGS_GITHUB_API || 'https://api.github.com').replace(/\/$/, ''),
  };
}

export function installDirOf(found) {
  const rel = found.config?.components?.installDir || 'CmsTagsWebsiteNew/components';
  return resolve(found.dir, rel);
}

export function requireToken() {
  const value = process.env.GITHUB_TOKEN || process.env.CMSTAGS_GITHUB_TOKEN || '';
  if (!value) {
    throw new Error('Set GITHUB_TOKEN to a token that can read the private repository ByCMSTags/UIComponents (repo scope, or fine-grained Contents access).');
  }
  return value;
}
