import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { AppContent } from '../src/App';
import { canonicalUrl, DEFAULT_IMAGE, getSeoForPath, seoRoutes, SITE_NAME, SITE_URL } from '../src/data/seo';

const distDir = path.resolve('dist');
const routes = [...new Set(seoRoutes.map((route) => route.path))];

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function headForRoute(routePath: string) {
  const seo = getSeoForPath(routePath);
  const url = canonicalUrl(seo.path);
  const image = seo.image ?? DEFAULT_IMAGE;

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ].join('\n    ');
}

function renderRoute(template: string, routePath: string) {
  const appHtml = renderToString(
    <MemoryRouter initialEntries={[routePath]}>
      <AppContent />
    </MemoryRouter>,
  );

  const withHead = template
    .replace(/<title>.*?<\/title>/, headForRoute(routePath))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  return withHead;
}

async function writeRoute(routePath: string, html: string) {
  const normalized = routePath === '/' ? '' : routePath.replace(/^\//, '');
  const filePath = routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, normalized, 'index.html');

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, 'utf8');
}

async function writeSitemap() {
  const urls = routes.map((routePath) => `  <url><loc>${canonicalUrl(routePath)}</loc></url>`).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
}

async function writeRobots() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  await writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8');
}

async function main() {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

  for (const routePath of routes) {
    await writeRoute(routePath, renderRoute(template, routePath));
  }

  await writeSitemap();
  await writeRobots();
  console.log(`Prerendered ${routes.length} routes with SEO metadata, sitemap.xml, and robots.txt.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
