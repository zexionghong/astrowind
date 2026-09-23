import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = 'https://ipflex.ink';
const outDir = resolve(root, 'public');

const staticPaths = [
  '/',
  '/pricing',
  '/products/static-residential',
  '/products/dynamic-residential',
  '/products/datacenter',
  '/products/ai-accelerator',
  '/scenarios',
  '/resources',
  '/blog',
  '/about',
];

const posts = JSON.parse(readFileSync(resolve(root, 'src/blog-index.json'), 'utf8'));
const cases = [
  'static-residential-proxy-ad-verification',
  'static-residential-proxy-ecommerce',
  'static-residential-proxy-scraping',
  'static-residential-proxy-security',
  'dynamic-residential-proxy-data-collection',
  'dynamic-residential-proxy-crawling',
  'dynamic-residential-proxy-privacy',
  'dynamic-residential-proxy-ad-verification',
  'static-datacenter-proxy-api',
  'static-datacenter-proxy-testing',
  'static-datacenter-proxy-batch-processing',
  'static-datacenter-proxy-cdn',
];

const urls = [
  ...staticPaths.map((path) => ({ loc: url(path), lastmod: '2026-09-23' })),
  ...posts.map((post) => ({ loc: url(`/blog/${post.slug}`), lastmod: post.date })),
  ...cases.map((slug) => ({ loc: url(`/use-case/${slug}`), lastmod: '2026-09-23' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
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

Last-Updated: 2026-09-23
Primary-Domain: ${site}
Sitemap: ${site}/sitemap.xml

## Brand Summary
IPFlex provides enterprise proxy infrastructure for web data collection, ad verification, cross-border operations, and automation workflows.

## Core Pages
${staticPaths.map((path) => `- ${label(path)}: ${url(path)}`).join('\n')}

## Use Cases
${cases.map((slug) => `- ${url(`/use-case/${slug}`)}`).join('\n')}

## Blog
${posts
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => `- ${post.title}: ${url(`/blog/${post.slug}`)}`)
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
console.log(`Generated SEO files with ${urls.length} sitemap URLs`);

function url(path) {
  return path === '/' ? `${site}/` : `${site}${path}`;
}

function label(path) {
  if (path === '/') return 'Home';
  return path
    .split('/')
    .filter(Boolean)
    .join(' / ')
    .replaceAll('-', ' ');
}
