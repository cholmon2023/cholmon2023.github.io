const fs = require('fs');
const path = require('path');

const root = __dirname;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.') || name === 'node_modules') continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (full.includes('partials')) continue;
      walk(full, files);
    } else if (name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function navScript(relDir) {
  const depth = relDir ? relDir.split(/[/\\]/).filter(Boolean).length : 0;
  const prefix = depth ? '../'.repeat(depth) : '';
  return `  <div id="site-nav"></div>\n  <script src="${prefix}js/nav.js"></script>`;
}

const navBlockRe = /<div class="nav">[\s\S]*?<\/div>\s*\n\s*<\/div>/;

let updated = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('<div class="nav">')) continue;
  if (html.includes('id="site-nav"')) continue;

  const rel = path.relative(root, path.dirname(file));
  const relDir = rel === '.' ? '' : rel;
  const replacement = navScript(relDir);

  const next = html.replace(navBlockRe, replacement);
  if (next === html) {
    console.log('No match:', path.relative(root, file));
    continue;
  }

  // Remove optional <!-- NAV --> comment before placeholder
  const cleaned = next.replace(/\s*<!-- NAV -->\s*\n(?=\s*<div id="site-nav")/, '\n');
  fs.writeFileSync(file, cleaned, 'utf8');
  updated++;
  console.log('Updated:', path.relative(root, file));
}

console.log('Done:', updated, 'files');
