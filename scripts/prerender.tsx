import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { AppContent } from '../src/App';
import { canonicalUrl, DEFAULT_IMAGE, getSeoForPath, seoRoutes, SITE_NAME, SITE_URL } from '../src/data/seo';
import { serviceFamilies } from '../src/data/serviceFamilies';

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

async function writeLlmsTxt() {
  const serviceSections = serviceFamilies.map((service) => [
    `## ${service.navName}`,
    '',
    service.intro,
    '',
    `URL: ${canonicalUrl(`/services/${service.slug}`)}`,
    '',
    'Services:',
    ...service.services.map((item) => `- ${item.title}: ${item.description}`),
    ...(service.note ? ['', `Important note: ${service.note}`] : []),
  ].join('\n')).join('\n\n');

  const llms = `# ${SITE_NAME}\n\n` +
    `> Texas-based digital partner helping small businesses with websites, Google Business Profile management, local visibility, social media, paid advertising, custom AI agents, creative content, CRM setup, booking, payments, professional email, analytics, reporting, and connected business systems.\n\n` +
    `Website: ${SITE_URL}\n` +
    `Contact: jason@albrightdigitalsolutions.com\n` +
    `Phone: 512-661-4927\n` +
    `Address: 12705 Saint Mary Dr, Manor, TX 78653\n` +
    `Hours: Available 24/7\n` +
    `Service area: Texas-based; remote consultations available for clients nationwide.\n` +
    `Ownership: Proudly American owned.\n\n` +
    `## Key URLs\n\n` +
    routes.map((routePath) => `- ${getSeoForPath(routePath).title}: ${canonicalUrl(routePath)}`).join('\n') +
    `\n\n${serviceSections}\n\n` +
    `## Policies and positioning\n\n` +
    `- Google verification, reinstatement, indexing, ranking, advertising results, and lead volume cannot be guaranteed.\n` +
    `- Advertising spend, domains, Google Workspace, CRM subscriptions, AI platform usage, Stripe processing, and third-party software fees are paid directly by the client whenever possible.\n` +
    `- Albright Digital Solutions LLC edits client-supplied photos and footage; on-location photography and filming are not included by default.\n` +
    `- Reporting is included in managed programs so work can be measured and improved.\n`;

  await writeFile(path.join(distDir, 'llms.txt'), llms, 'utf8');
}

async function main() {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

  for (const routePath of routes) {
    await writeRoute(routePath, renderRoute(template, routePath));
  }

  await writeSitemap();
  await writeRobots();
  await writeLlmsTxt();
  console.log(`Prerendered ${routes.length} routes with SEO metadata, sitemap.xml, robots.txt, and llms.txt.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
