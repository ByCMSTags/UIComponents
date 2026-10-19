import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { missingRepoMessage } from './github.js';
import { componentPath } from './install.js';

function walk(dir, base = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === '.DS_Store' || name.startsWith('.')) continue;
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) out.push(...walk(abs, base));
    else out.push({ rel: relative(base, abs).split('\\').join('/'), buf: readFileSync(abs) });
  }
  return out;
}

/**
 * Commits one or more component folders to ByCMSTags/UIComponents.
 * Does not create the GitHub repository.
 */
export async function publishComponents({ client, github, folders, message }) {
  const branch = github.ref;
  if (!/^[A-Za-z0-9._/-]+$/.test(branch)) throw new Error(`Refusing to publish to ref "${branch}".`);
  let parent = null;
  let baseTree = null;
  try {
    const ref = await client.get(`/repos/${github.owner}/${github.repo}/git/ref/heads/${branch}`);
    parent = ref.object.sha;
    const commit = await client.get(`/repos/${github.owner}/${github.repo}/git/commits/${parent}`);
    baseTree = commit.tree.sha;
  } catch (err) {
    if (err.status !== 404) throw err;
    try {
      await client.get(`/repos/${github.owner}/${github.repo}`);
    } catch (repoErr) {
      if (repoErr.status === 404) throw new Error(missingRepoMessage(github.owner, github.repo));
      throw repoErr;
    }
  }
  const tree = [];
  for (const folder of folders) {
    const prefix = componentPath(github, folder.id);
    for (const file of walk(folder.dir)) {
      const blob = await client.post(`/repos/${github.owner}/${github.repo}/git/blobs`, {
        content: file.buf.toString('base64'),
        encoding: 'base64',
      });
      tree.push({ path: `${prefix}/${file.rel}`, mode: '100644', type: 'blob', sha: blob.sha });
    }
  }
  if (!tree.length) throw new Error('Nothing to publish.');
  const createdTree = await client.post(`/repos/${github.owner}/${github.repo}/git/trees`, {
    ...(baseTree ? { base_tree: baseTree } : {}),
    tree,
  });
  const commit = await client.post(`/repos/${github.owner}/${github.repo}/git/commits`, {
    message,
    tree: createdTree.sha,
    parents: parent ? [parent] : [],
  });
  if (parent) await client.patch(`/repos/${github.owner}/${github.repo}/git/refs/heads/${branch}`, { sha: commit.sha });
  else await client.post(`/repos/${github.owner}/${github.repo}/git/refs`, { ref: `refs/heads/${branch}`, sha: commit.sha });
  return { commit: commit.sha, files: tree.map((item) => item.path) };
}
