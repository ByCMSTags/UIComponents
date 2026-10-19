import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { missingRepoMessage } from './github.js';

const ID = /^[a-z][a-z0-9-]*\.[a-z0-9][a-z0-9-]*$/;

export function parseSpec(raw) {
  const at = raw.lastIndexOf('@');
  if (at > 0) return { id: raw.slice(0, at), ref: raw.slice(at + 1) || null };
  return { id: raw, ref: null };
}

export function componentPath(github, id) {
  return github.path ? `${github.path}/${id}` : id;
}

function decodeContent(item) {
  if (!item?.content) return null;
  return Buffer.from(String(item.content).replace(/\s/g, ''), 'base64');
}

async function fileBytes(client, github, item) {
  const inline = decodeContent(item);
  if (inline) return inline;
  if (item.download_url) {
    const res = await fetch(item.download_url, { headers: client.headers });
    if (!res.ok) throw new Error(`Could not download ${item.path}`);
    return Buffer.from(await res.arrayBuffer());
  }
  const again = await client.get(`/repos/${github.owner}/${github.repo}/contents/${item.path}?ref=${encodeURIComponent(github.ref)}`);
  const body = decodeContent(again);
  if (!body) throw new Error(`GitHub returned no content for ${item.path}`);
  return body;
}

/** Files that belong to one component folder. Nothing else in the repository is requested. */
async function collect(client, github, apiPath) {
  const data = await client.get(`/repos/${github.owner}/${github.repo}/contents/${apiPath}?ref=${encodeURIComponent(github.ref)}`);
  if (!Array.isArray(data)) throw new Error(`${apiPath} is not a component folder`);
  const files = [];
  for (const item of data) {
    if (item.type === 'dir') {
      files.push(...(await collect(client, github, item.path)));
    } else if (item.type === 'file') {
      const prefix = `${apiPath}/`;
      const rel = String(item.path).startsWith(prefix) ? item.path.slice(prefix.length) : item.name;
      files.push({ rel, buf: await fileBytes(client, github, item) });
    }
  }
  return files;
}

export async function installComponent({ client, github, id, destDir, force = false }) {
  if (!ID.test(id)) throw new Error(`Unknown component id "${id}". Use a name like hero.split.`);
  const apiPath = componentPath(github, id);
  let files;
  try {
    files = await collect(client, github, apiPath);
  } catch (err) {
    if (err.status === 404) throw new Error(`${missingRepoMessage(github.owner, github.repo)} Or the folder ${id} is not in ${github.ref}.`);
    throw err;
  }
  if (!files.some((f) => f.rel === 'component.json' || f.rel.endsWith('/component.json'))) {
    throw new Error(`${id} has no component.json.`);
  }
  const target = join(destDir, id);
  if (existsSync(target) && !force) throw new Error(`${target} already exists. Pass --force to replace it.`);
  for (const file of files) {
    const out = join(target, file.rel);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, file.buf);
  }
  return { id, ref: github.ref, target, files: files.map((f) => f.rel) };
}

export async function listComponents({ client, github }) {
  const registryUrl = `/repos/${github.owner}/${github.repo}/contents/registry.json?ref=${encodeURIComponent(github.ref)}`;
  try {
    const file = await client.get(registryUrl);
    const body = decodeContent(file);
    if (body) {
      const json = JSON.parse(body.toString('utf8'));
      if (Array.isArray(json.components)) return json.components;
    }
  } catch (err) {
    if (err.status !== 404) throw err;
  }
  const root = github.path ? `/${github.path}` : '';
  let listing;
  try {
    listing = await client.get(`/repos/${github.owner}/${github.repo}/contents${root}?ref=${encodeURIComponent(github.ref)}`);
  } catch (err) {
    if (err.status === 404) throw new Error(missingRepoMessage(github.owner, github.repo));
    throw err;
  }
  if (!Array.isArray(listing)) return [];
  return listing.filter((item) => item.type === 'dir' && ID.test(item.name)).map((item) => ({ id: item.name }));
}
