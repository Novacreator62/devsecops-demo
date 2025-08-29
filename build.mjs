import fs from 'node:fs';
import path from 'node:path';

const sha = process.env.GITHUB_SHA?.slice(0, 7) || 'local-dev';
const run = process.env.GITHUB_RUN_NUMBER || '0';
const when = new Date().toISOString();

const template = fs.readFileSync('src/index.html', 'utf8');
const html = template
  .replaceAll('{{SHA}}', sha)
  .replaceAll('{{RUN}}', String(run))
  .replaceAll('{{TIME}}', when);

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync(path.join('dist', 'index.html'), html);
console.log('Built dist/index.html');
