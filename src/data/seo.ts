import { serviceFamilies } from './serviceFamilies';

export const SITE_URL = 'https://www.albrightdigitalsolutions.com';
export const SITE_NAME = 'Albright Digital Solutions';
export const DEFAULT_IMAGE = `${SITE_URL}/Albright_Digital_Solutions_Logo.png`;

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  image?: string;
};

const coreRoutes: SeoEntry[] = [
  {
    path: '/',
    title: 'Albright Digital Solutions | Texas-Based Digital Partner',
    description: 'Texas-based digital partner for websites, Google Business Profile management, local visibility, social media, advertising, custom AI agents, and business systems.',
  },
  {
    path: '/about',
    title: 'About Albright Digital Solutions | Texas-Based Digital Agency',
    description: 'Learn how Albright Digital Solutions LLC helps small businesses modernize websites, local visibility, social media, advertising, automation, CRM, and reporting.',
  },
  {
    path: '/services',
    title: 'Digital Services | Albright Digital Solutions',
    description: 'Explore website design, Google profile management, SEO/GEO, social media, advertising, content, CRM, AI agents, and business system services.',
  },
  {
    path: '/contact',
    title: 'Contact Albright Digital Solutions',
    description: 'Contact Albright Digital Solutions LLC to discuss websites, AI agents, Google visibility, social media, advertising, CRM, and digital business systems.',
  },
  {
    path: '/business-profile',
    title: 'Business Information | Albright Digital Solutions LLC',
    description: 'Official business information for Albright Digital Solutions LLC, including address, phone, email, hours, service area, founder, and core digital services.',
  },
  {
    path: '/careers',
    title: 'Careers | Albright Digital Solutions',
    description: 'Explore available roles at Albright Digital Solutions LLC, including the current 100% commission sales opportunity.',
  },
  {
    path: '/quote',
    title: 'Build a Custom Quote | Albright Digital Solutions',
    description: 'Build a private custom quote for websites, Google Business Profile management, local visibility, social media, advertising, AI agents, and business systems.',
  },
  {
    path: '/services/ai-automation',
    title: 'AI Agents & Automation | Albright Digital Solutions',
    description: 'Custom AI agents and workflow automation for lead intake, customer support, scheduling, follow-up, reporting, and repetitive business processes.',
  },
  {
    path: '/services/web-design',
    title: 'Web Design & Development | Albright Digital Solutions',
    description: 'Custom website design and development with SEO-first architecture, mobile-first performance, structured data, analytics, and conversion-focused pages.',
  },
  {
    path: '/services/video-editing',
    title: 'Video Editing | Albright Digital Solutions',
    description: 'Professional video editing and post-production for client-supplied short-form videos, business pitch videos, commercials, training content, and brand story assets.',
  },
  {
    path: '/services/workflow-audit',
    title: 'Workflow Audit | Albright Digital Solutions',
    description: 'Operational workflow audits that identify bottlenecks, duplicate work, missed follow-ups, manual data entry, and opportunities to save time.',
  },
  {
    path: '/services/digital-infrastructure',
    title: 'Digital Infrastructure Setup | Albright Digital Solutions',
    description: 'Done-for-you setup for websites, professional email, domains, DNS, CRM, booking, payments, forms, and connected business systems.',
  },
  {
    path: '/services/ai-training',
    title: 'AI Prompt & Process Training | Albright Digital Solutions',
    description: 'Hands-on AI training for small business teams, including practical prompt playbooks, workflow examples, and role-specific process support.',
  },
  {
    path: '/services/performance-tuning',
    title: 'Quarterly Performance Tuning | Albright Digital Solutions',
    description: 'Quarterly website and digital system maintenance, security checks, content updates, performance tuning, reporting, and emergency support.',
  },
];

const familyRoutes: SeoEntry[] = serviceFamilies.map((service) => ({
  path: `/services/${service.slug}`,
  title: `${service.navName} | Albright Digital Solutions`,
  description: service.intro,
  image: `${SITE_URL}${service.image}`,
}));

export const seoRoutes: SeoEntry[] = [...coreRoutes, ...familyRoutes];

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function getSeoForPath(pathname: string) {
  const path = normalizePath(pathname);
  return seoRoutes.find((route) => route.path === path) ?? seoRoutes[0];
}

export function canonicalUrl(pathname: string) {
  const path = normalizePath(pathname);
  return `${SITE_URL}${path === '/' ? '' : path}`;
}
