#!/usr/bin/env node
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { findConfig, installDirOf, requireToken, resolveGithub } from '../src/config.js';
import { createClient } from '../src/github.js';
import { installComponent, listComponents, parseSpec } from '../src/install.js';
import { publishComponents } from '../src/publish.js';

function help() {
  console.log(`cmstags — install components from the private repository ByCMSTags/UIComponents

  cmstags install hero.split
  cmstags install hero.split --ref v1.2.0
  cmstags install hero.split@v1.2.0
  cmstags list
  cmstags publish hero.split
  cmstags publish --all

GITHUB_TOKEN must be set. The repository is not created by this CLI.
Push the UIComponents/ folder first (see UIComponents/README.md).
`);
}

function flag(argv, name) {
  const i = argv.indexOf(name);
  if (i === -1) return null;
  return argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true;
}

async function main(argv) {
  const cmd = argv[0];
  if (!cmd || cmd === '--help' || cmd === '-h') {
    help();
    return;
  }
  const found = findConfig();
  const token = requireToken();
  if (cmd === 'install') {
    const spec = argv.find((a, i) => i > 0 && !a.startsWith('--') && argv[i - 1] !== '--ref' && argv[i - 1] !== '--config');
    if (!spec) throw new Error('Usage: cmstags install hero.split [--ref tag]');
    const parsed = parseSpec(spec);
    const github = resolveGithub(found.config, flag(argv, '--ref') || parsed.ref);
    const client = createClient({ ...github, token });
    const result = await installComponent({
      client,
      github,
      id: parsed.id,
      destDir: installDirOf(found),
      force: argv.includes('--force'),
    });
    console.log(`Installed ${result.id} (${result.ref}) → ${result.target}`);
    console.log(result.files.map((f) => `  ${f}`).join('\n'));
    return;
  }
  if (cmd === 'list') {
    const github = resolveGithub(found.config, typeof flag(argv, '--ref') === 'string' ? flag(argv, '--ref') : null);
    const client = createClient({ ...github, token });
    const rows = await listComponents({ client, github });
    if (!rows.length) console.log('(no components)');
    for (const row of rows) console.log(`${row.id}${row.version ? `\t${row.version}` : ''}`);
    return;
  }
  if (cmd === 'publish') {
    const github = resolveGithub(found.config, typeof flag(argv, '--ref') === 'string' ? flag(argv, '--ref') : null);
    const client = createClient({ ...github, token });
    const source = join(found.dir, 'UIComponents');
    const root = existsSync(source) ? source : installDirOf(found);
    const ids = argv.includes('--all')
      ? readdirSync(root).filter((name) => statSync(join(root, name)).isDirectory() && existsSync(join(root, name, 'component.json')))
      : argv.filter((a, i) => i > 0 && !a.startsWith('--') && argv[i - 1] !== '--ref');
    if (!ids.length) throw new Error('Usage: cmstags publish hero.split');
    const folders = ids.map((id) => {
      const dir = join(root, id);
      if (!existsSync(join(dir, 'component.json'))) throw new Error(`No component folder ${dir}`);
      return { id, dir };
    });
    const result = await publishComponents({
      client,
      github,
      folders,
      message: `Publish ${ids.join(', ')}`,
    });
    console.log(`Published ${result.files.length} files as ${result.commit}`);
    return;
  }
  throw new Error(`Unknown command "${cmd}".`);
}

main(process.argv.slice(2)).catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
