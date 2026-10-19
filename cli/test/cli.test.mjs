import { createServer } from 'node:http';
import { mkdtempSync, readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_GITHUB } from '../src/config.js';

const bin = fileURLToPath(new URL('../bin/cmstags.js', import.meta.url));

function run(args, env, cwd) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [bin, ...args], {
      cwd,
      env: { ...process.env, ...env },
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (status) => resolve({ status, stdout, stderr }));
  });
}

function listen(handler) {
  const server = createServer(handler);
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

test('defaults point at ByCMSTags/UIComponents', () => {
  assert.equal(DEFAULT_GITHUB.owner, 'ByCMSTags');
  assert.equal(DEFAULT_GITHUB.repo, 'UIComponents');
  assert.equal(DEFAULT_GITHUB.ref, 'main');
  assert.equal(DEFAULT_GITHUB.path, '');
  const cfg = JSON.parse(readFileSync(new URL('../../cmstags.config.json', import.meta.url), 'utf8'));
  assert.equal(cfg.components.github.owner, 'ByCMSTags');
  assert.equal(cfg.components.github.repo, 'UIComponents');
});

test('install refuses to run without GITHUB_TOKEN', async () => {
  const cwd = mkdtempSync(join(tmpdir(), 'cmstags-'));
  writeFileSync(join(cwd, 'cmstags.config.json'), JSON.stringify({ components: { github: { owner: 'ByCMSTags', repo: 'UIComponents', ref: 'main' } } }));
  const res = await run(['install', 'hero.split'], { GITHUB_TOKEN: '', CMSTAGS_GITHUB_TOKEN: '' }, cwd);
  assert.notEqual(res.status, 0);
  assert.match(res.stderr, /GITHUB_TOKEN/);
  rmSync(cwd, { recursive: true, force: true });
});

test('install downloads only the named folder from ByCMSTags/UIComponents', async () => {
  const hits = [];
  const server = await listen((req, res) => {
    hits.push(req.url);
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/repos/ByCMSTags/UIComponents/contents/hero.split') {
      res.end(JSON.stringify([
        { type: 'file', name: 'component.json', path: 'hero.split/component.json', content: Buffer.from('{"id":"hero.split"}\n').toString('base64') },
        { type: 'file', name: 'template.html', path: 'hero.split/template.html', content: Buffer.from('<section>{{title}}</section>').toString('base64') },
      ]));
      return;
    }
    res.writeHead(404).end(JSON.stringify({ message: 'Not Found' }));
  });
  const port = server.address().port;
  const cwd = mkdtempSync(join(tmpdir(), 'cmstags-'));
  writeFileSync(join(cwd, 'cmstags.config.json'), JSON.stringify({
    components: { github: { owner: 'ByCMSTags', repo: 'UIComponents', ref: 'main' }, installDir: 'site/components' },
  }));
  const res = await run(['install', 'hero.split', '--ref', 'v1.2.0'], {
    GITHUB_TOKEN: 'test-token',
    CMSTAGS_GITHUB_API: `http://127.0.0.1:${port}`,
  }, cwd);
  assert.equal(res.status, 0, res.stderr);
  assert.ok(hits.every((url) => url.includes('/contents/hero.split')));
  assert.equal(hits.some((url) => url.includes('ref=v1.2.0')), true);
  assert.equal(readFileSync(join(cwd, 'site/components/hero.split/template.html'), 'utf8'), '<section>{{title}}</section>');
  rmSync(cwd, { recursive: true, force: true });
  await new Promise((resolve) => server.close(resolve));
});

test('publish does not create the GitHub repository', async () => {
  const posts = [];
  const server = await listen((req, res) => {
    if (req.method === 'POST') posts.push(req.url);
    res.writeHead(404).end(JSON.stringify({ message: 'Not Found' }));
  });
  const port = server.address().port;
  const cwd = mkdtempSync(join(tmpdir(), 'cmstags-'));
  const comp = join(cwd, 'UIComponents/hero.split');
  mkdirSync(comp, { recursive: true });
  writeFileSync(join(comp, 'component.json'), '{"id":"hero.split"}\n');
  writeFileSync(join(cwd, 'cmstags.config.json'), JSON.stringify({
    components: { github: { owner: 'ByCMSTags', repo: 'UIComponents', ref: 'main' } },
  }));
  const res = await run(['publish', 'hero.split'], {
    GITHUB_TOKEN: 'test-token',
    CMSTAGS_GITHUB_API: `http://127.0.0.1:${port}`,
  }, cwd);
  assert.notEqual(res.status, 0);
  assert.match(res.stderr, /does not exist/);
  assert.equal(posts.some((url) => url.includes('/repos') && !url.includes('/git/')), false);
  assert.equal(posts.some((url) => /\/orgs\/|\/user\/repos/.test(url)), false);
  rmSync(cwd, { recursive: true, force: true });
  await new Promise((resolve) => server.close(resolve));
});

test('publish commits only the named component folder', async () => {
  const trees = [];
  const server = await listen(async (req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString() || '{}') : {};
    if (url.pathname === '/repos/ByCMSTags/UIComponents/git/ref/heads/main') {
      res.end(JSON.stringify({ object: { sha: 'commit1' } }));
      return;
    }
    if (url.pathname === '/repos/ByCMSTags/UIComponents/git/commits/commit1') {
      res.end(JSON.stringify({ tree: { sha: 'tree1' } }));
      return;
    }
    if (url.pathname === '/repos/ByCMSTags/UIComponents/git/blobs' && req.method === 'POST') {
      res.end(JSON.stringify({ sha: `blob-${trees.length}` }));
      return;
    }
    if (url.pathname === '/repos/ByCMSTags/UIComponents/git/trees' && req.method === 'POST') {
      trees.push(body);
      res.end(JSON.stringify({ sha: 'tree2' }));
      return;
    }
    if (url.pathname === '/repos/ByCMSTags/UIComponents/git/commits' && req.method === 'POST') {
      res.end(JSON.stringify({ sha: 'commit2' }));
      return;
    }
    if (url.pathname === '/repos/ByCMSTags/UIComponents/git/refs/heads/main' && req.method === 'PATCH') {
      res.end(JSON.stringify({ object: { sha: body.sha } }));
      return;
    }
    res.writeHead(404).end(JSON.stringify({ message: url.pathname }));
  });
  const port = server.address().port;
  const cwd = mkdtempSync(join(tmpdir(), 'cmstags-'));
  mkdirSync(join(cwd, 'UIComponents/hero.split'), { recursive: true });
  mkdirSync(join(cwd, 'UIComponents/hero.cover'), { recursive: true });
  writeFileSync(join(cwd, 'UIComponents/hero.split/template.html'), '<section>{{title}}</section>');
  writeFileSync(join(cwd, 'UIComponents/hero.split/component.json'), '{"id":"hero.split"}');
  writeFileSync(join(cwd, 'UIComponents/hero.cover/component.json'), '{"id":"hero.cover"}');
  writeFileSync(join(cwd, 'cmstags.config.json'), '{"components":{"github":{"owner":"ByCMSTags","repo":"UIComponents","ref":"main"}}}');
  const res = await run(['publish', 'hero.split'], { GITHUB_TOKEN: 'test-token', CMSTAGS_GITHUB_API: `http://127.0.0.1:${port}` }, cwd);
  assert.equal(res.status, 0, res.stderr);
  const paths = trees[0].tree.map((item) => item.path).sort();
  assert.deepEqual(paths, ['hero.split/component.json', 'hero.split/template.html']);
  rmSync(cwd, { recursive: true, force: true });
  await new Promise((resolve) => server.close(resolve));
});
