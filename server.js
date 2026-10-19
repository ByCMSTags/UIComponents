/**
 * Preview server for this component library. No dependencies.
 * Lists every component folder and serves its files.
 */
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4193);
const host = process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.md': 'text/plain; charset=utf-8',
};

function components() {
  return readdirSync(root)
    .filter((name) => !name.startsWith('.') && existsSync(join(root, name, 'component.json')))
    .sort();
}

function send(res, status, body, type = 'text/html; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  res.end(body);
}

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/healthz') return send(res, 200, JSON.stringify({ ok: true, components: components().length }), 'application/json; charset=utf-8');
  if (url.pathname === '/') {
    const items = components().map((id) => `<li><a href="/${id}/template.html">${id}</a> · <a href="/${id}/component.json">component.json</a></li>`).join('');
    return send(res, 200, `<!doctype html><meta charset="utf-8"><title>UIComponents</title><body style="font-family:system-ui;margin:2rem"><h1>UIComponents</h1><p>${components().length} components. Install one into a website with <code>cmstags install hero.split</code>.</p><ul>${items}</ul></body>`);
  }
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]/, '');
  const path = join(root, rel);
  if (!path.startsWith(root) || !existsSync(path) || !statSync(path).isFile()) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
  const type = TYPES[extname(path)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  createReadStream(path).pipe(res);
});

server.listen(port, host, () => {
  console.log(`UIComponents http://${host}:${port}  (${components().length} components)`);
});
