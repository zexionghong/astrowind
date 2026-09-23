import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
loadEnv(resolve(root, '.env'));

const site = (process.env.VITE_SITE_URL || 'https://ipflex.ink').replace(/\/+$/, '');
const outDir = resolve(root, 'public');
const today = new Date().toISOString().slice(0, 10);

const routeSource = readFileSync(resolve(root, 'src/routes.ts'), 'utf8');
const useCaseSource = readFileSync(resolve(root, 'src/use-cases.ts'), 'utf8');
const posts = JSON.parse(readFileSync(resolve(root, 'src/blog-index.json'), 'utf8'));

const staticPaths = [...routeSource.matchAll(/:\s*'(\/[^']*)'/g)]
  .map((match) => match[1])
  .filter((path, index, all) => all.indexOf(path) === index && path !== '/register');
const caseSlugs = [...useCaseSource.matchAll(/'([a-z0-9-]+)'/g)]
  .map((match) => match[1])
  .filter((slug, index, all) => all.indexOf(slug) === index && slug.includes('-proxy-'));

const urls = [
  ...staticPaths.map((path) => ({ loc: absolute(path), lastmod: today })),
  ...posts.map((post) => ({ loc: absolute(`/blog/${post.slug}`), lastmod: post.date })),
  ...caseSlugs.map((slug) => ({ loc: absolute(`/use-case/${slug}`), lastmod: today })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

Sitemap: ${site}/sitemap.xml
`;

const llms = `# IPFlex

Last-Updated: ${today}
Primary-Domain: ${site}
Sitemap: ${site}/sitemap.xml

## Brand Summary
IPFlex provides enterprise proxy infrastructure for web data collection, ad verification, cross-border operations, and automation workflows.

## Core Pages
${staticPaths.map((path) => `- ${absolute(path)}`).join('\n')}

## Use Cases
${caseSlugs.map((slug) => `- ${absolute(`/use-case/${slug}`)}`).join('\n')}

## Blog
${posts
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => `- ${post.title}: ${absolute(`/blog/${post.slug}`)}`)
  .join('\n')}

## Contact
- Support: mailto:support@ipflex.ink
- Business: mailto:business@ipflex.ink
- Help center: https://docs.ipflex.ink/
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap);
writeFileSync(resolve(outDir, 'robots.txt'), robots);
writeFileSync(resolve(outDir, 'llms.txt'), llms);
console.log(`Generated SEO files for ${site} with ${urls.length} sitemap URLs`);

function absolute(path) {
  return path === '/' ? `${site}/` : `${site}${path}`;
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function loadEnv(file) {
  const text = readFileSync(file, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}
