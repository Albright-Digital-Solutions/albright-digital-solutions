export type QuoteItem = {
  id: string;
  category: string;
  name: string;
  summary: string;
  includes: string[];
  oneTime?: number;
  monthly?: number;
  term?: string;
  note?: string;
};

// Internal estimating rates. Prices are intentionally revealed only after an
// item is selected for a custom quote.
export const quoteCatalog: QuoteItem[] = [
  { id: 'ai-agent-starter', category: 'AI Agents & Automation', name: 'Custom AI Agent — Starter', summary: 'A focused AI assistant for one clear business workflow.', includes: ['Workflow discovery', 'One agent use case', 'Knowledge base setup', 'Testing and handoff documentation'], oneTime: 2495, note: 'Starting estimate. Third-party AI/tool usage fees are paid directly by the client when applicable.' },
  { id: 'ai-agent-ops', category: 'AI Agents & Automation', name: 'Custom AI Agent — Operations', summary: 'A deeper agent build connected to your intake, CRM, inbox, or scheduling workflow.', includes: ['Workflow mapping', 'Custom agent configuration', 'Up to 2 approved integrations', 'Testing, guardrails and launch support'], oneTime: 4995, note: 'Final scope depends on data sources, integrations, volume, and approval requirements.' },
  { id: 'ai-agent-advanced', category: 'AI Agents & Automation', name: 'Custom AI Agent — Advanced System', summary: 'A multi-step agent system for complex follow-up, reporting, or internal automation.', includes: ['Multi-step agent workflow', 'Up to 4 approved integrations', 'Reporting or admin automation', 'Launch support and documentation'], oneTime: 8995, note: 'Complex builds may require a custom technical scope before final pricing.' },
  { id: 'ai-agent-care', category: 'AI Agents & Automation', name: 'AI Agent Monitoring & Improvement', summary: 'Ongoing review, tuning and reporting after launch.', includes: ['Monthly performance review', 'Prompt and workflow tuning', 'Basic knowledge updates', 'Monthly reporting'], monthly: 299, note: 'Requires an active or previously completed AI agent build.' },

  { id: 'web-5', category: 'Websites', name: 'Ownership Website', summary: 'A custom five-page website built in accounts you control.', includes: ['Up to 5 custom pages', 'Mobile-first design', 'Basic SEO and analytics', 'Contact form and launch documentation'], oneTime: 2495 },
  { id: 'web-15', category: 'Websites', name: 'Local Authority Website', summary: 'A researched website structured around your legitimate services and market.', includes: ['Up to 15 researched pages', 'Entity and service architecture', 'Schema and internal linking', 'Conversion tracking'], oneTime: 4495 },
  { id: 'web-30', category: 'Websites', name: 'Core 30 Website', summary: 'A full local-authority website aligned with your Google Business Profile.', includes: ['Up to 30 researched pages', 'Profile, entity and content gap audit', 'Service/category hierarchy', 'Local relevance and conversion framework'], oneTime: 6995 },
  { id: 'web-lease', category: 'Websites', name: 'Core 30 Lease-to-Own', summary: 'Spread the Core 30 investment over twelve months, then take ownership.', includes: ['Core 30 website build', 'Hosting during the term', 'Ongoing maintenance during the term', 'Ownership transfer after 12 successful payments'], oneTime: 995, monthly: 599, term: '12-month agreement' },
  { id: 'web-care', category: 'Websites', name: 'Website Care', summary: 'Hosting, security checks and essential upkeep.', includes: ['Managed hosting', 'SSL and uptime checks', 'Backups and routine maintenance', 'Monthly reporting'], monthly: 99 },
  { id: 'web-care-plus', category: 'Websites', name: 'Website Care Plus', summary: 'Managed care with hands-on content support.', includes: ['Everything in Website Care', 'Up to 60 minutes of updates monthly', 'Performance review', 'Monthly reporting'], monthly: 179 },
  { id: 'web-commerce', category: 'Websites', name: 'Stripe Commerce Website', summary: 'A custom Stripe-enabled online sales experience.', includes: ['Custom commerce design', 'Stripe checkout integration', 'Core product setup', 'Training and documentation'], oneTime: 4495, note: 'Starting estimate; final scope depends on catalog and fulfillment requirements.' },

  { id: 'local-profile', category: 'Google & Local Visibility', name: 'Google Profile Management', summary: 'Ongoing stewardship of one Google Business Profile.', includes: ['Profile optimization', 'Posts, photos and updates', 'Review-response support', 'Monthly reporting'], monthly: 249, note: 'Verification, reinstatement and ranking outcomes cannot be guaranteed.' },
  { id: 'local-growth', category: 'Google & Local Visibility', name: 'Local Growth', summary: 'Profile management plus steady SEO/GEO development.', includes: ['Google Profile Management', 'Local rank tracking', '2 researched pages monthly', 'Monthly performance report'], monthly: 699 },
  { id: 'local-authority', category: 'Google & Local Visibility', name: 'Local Authority', summary: 'A stronger local search and reputation program.', includes: ['Google Profile Management', '4 researched pages monthly', 'Reputation management', 'Rank-map analysis and reporting'], monthly: 1099 },
  { id: 'local-expansion', category: 'Google & Local Visibility', name: 'Market Expansion', summary: 'Advanced geographic and topical market development.', includes: ['Up to 8 researched pages monthly', 'Advanced geographic analysis', 'Profile and reputation management', 'Monthly strategy and reporting'], monthly: 1795 },
  { id: 'local-recovery', category: 'Google & Local Visibility', name: 'Profile Recovery Assistance', summary: 'Hands-on help navigating a suspended or unverified profile.', includes: ['Issue review', 'Documentation checklist', 'Appeal/reinstatement assistance', 'Status communication'], oneTime: 495, note: 'Payment covers our work and advocacy, not a guaranteed decision by Google. Timely client documentation is required.' },

  { id: 'social-scheduler', category: 'Social Media', name: 'Social Scheduler', summary: 'Consistent publishing across Facebook, Instagram, TikTok and YouTube.', includes: ['8 posts monthly', 'Captions and scheduling', 'Client-supplied assets', 'Monthly reporting'], oneTime: 295, monthly: 595 },
  { id: 'social-manager', category: 'Social Media', name: 'Social Manager', summary: 'Publishing, graphics and audience monitoring across four platforms.', includes: ['12 posts monthly', 'Branded graphics', 'Comment monitoring', 'Monthly reporting'], oneTime: 395, monthly: 995 },
  { id: 'social-growth', category: 'Social Media', name: 'Social Growth', summary: 'Full-service content support using footage supplied by your team.', includes: ['20 posts monthly', 'Up to 6 edited short videos', 'Community management', 'Strategy and reporting'], oneTime: 595, monthly: 1795 },

  { id: 'ads-small', category: 'Paid Advertising', name: 'Google Ads — Launch', summary: 'Campaign setup and management for up to $2,500 in monthly ad spend.', includes: ['Campaign setup', 'Conversion tracking', 'Ongoing optimization', 'Monthly reporting'], oneTime: 595, monthly: 595 },
  { id: 'ads-growth', category: 'Paid Advertising', name: 'Google Ads — Growth', summary: 'Management for $2,501–$5,000 in monthly ad spend.', includes: ['Expanded campaign setup', 'Conversion tracking', 'Ongoing optimization', 'Monthly reporting'], oneTime: 795, monthly: 795 },
  { id: 'ads-scale', category: 'Paid Advertising', name: 'Google Ads — Scale', summary: 'Management for $5,001–$10,000 in monthly ad spend.', includes: ['Multi-campaign setup', 'Conversion tracking', 'Ongoing optimization', 'Monthly reporting'], oneTime: 995, monthly: 995 },
  { id: 'ads-platform', category: 'Paid Advertising', name: 'Additional Ad Platform', summary: 'Add Meta or another approved platform to an active ads plan.', includes: ['Platform setup', 'Campaign management', 'Optimization', 'Consolidated reporting'], oneTime: 350, monthly: 350, note: 'Requires an active advertising management plan.' },

  { id: 'email-2', category: 'Content & Communication', name: 'Email Essentials', summary: 'Two managed email campaigns per month.', includes: ['Platform setup and branded template', '2 campaigns monthly', 'Copy and scheduling', 'Monthly reporting'], oneTime: 395, monthly: 395 },
  { id: 'email-4', category: 'Content & Communication', name: 'Email Growth', summary: 'Four managed email campaigns per month.', includes: ['Platform setup and branded template', '4 campaigns monthly', 'Copy and scheduling', 'Monthly reporting'], oneTime: 395, monthly: 695 },
  { id: 'video-4', category: 'Content & Communication', name: 'Short Video Editing — 4 Pack', summary: 'Four edited short-form videos from client-supplied footage.', includes: ['Vertical editing', 'Captions and basic graphics', 'Platform-ready exports', 'One revision round'], oneTime: 395 },
  { id: 'video-8', category: 'Content & Communication', name: 'Short Video Editing — 8 Pack', summary: 'Eight edited short-form videos from client-supplied footage.', includes: ['Vertical editing', 'Captions and basic graphics', 'Platform-ready exports', 'One revision round'], oneTime: 695 },

  { id: 'crm', category: 'Business Systems', name: 'CRM Setup & Integration', summary: 'Configure a third-party CRM around your lead process.', includes: ['Pipeline configuration', 'Basic integration', 'Lead-flow testing', 'Training documentation'], oneTime: 795, note: 'Starting estimate. CRM subscription is purchased and paid directly by the client.' },
  { id: 'domain', category: 'Business Systems', name: 'Domain, DNS & Google Workspace Setup', summary: 'Professional account setup with ownership retained by your business.', includes: ['Domain and DNS configuration', 'Google Workspace connection', 'Email setup assistance', 'Handoff documentation'], oneTime: 295, note: 'Domain and Google Workspace charges are paid directly by the client.' },
  { id: 'landing', category: 'Business Systems', name: 'Lead-Generation Landing Page', summary: 'A focused campaign page designed to turn traffic into inquiries.', includes: ['Custom page design', 'Lead form', 'Conversion tracking', 'Mobile optimization'], oneTime: 795 },
  { id: 'brand', category: 'Business Systems', name: 'Brand Starter Kit', summary: 'A practical visual foundation for a consistent business presence.', includes: ['Logo refinement or starter concept', 'Color and typography system', 'Social/profile assets', 'Basic brand guide'], oneTime: 795 },
];

export const money = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(value);
