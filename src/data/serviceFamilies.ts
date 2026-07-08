export type ServiceFamily = {
  slug: string;
  navName: string;
  title: string;
  eyebrow: string;
  intro: string;
  image: string;
  imageAlt: string;
  services: { title: string; description: string }[];
  process: { title: string; description: string }[];
  note?: string;
};

export const serviceFamilies: ServiceFamily[] = [
  {
    slug: 'custom-ai-agents', navName: 'Custom AI Agents', title: 'Custom-built AI agents for the work your team should not have to repeat.', eyebrow: 'AI Agents & Automation', image: '/service-custom-ai-agent.png', imageAlt: 'Premium dark AI agent workspace with gold automation core connected to CRM, inbox, calendar, and reporting systems',
    intro: 'We design practical AI agents around your real business process—customer questions, lead qualification, intake, follow-up, scheduling, reporting, and internal task support.',
    services: [
      { title: 'Customer Support Agents', description: 'Website or internal assistants trained on your services, FAQs, policies, pricing guidance, and approved response boundaries.' },
      { title: 'Lead Intake & Qualification', description: 'Agents that collect the right information, ask follow-up questions, score urgency, and route opportunities to your team.' },
      { title: 'Scheduling & Follow-Up Support', description: 'Automated appointment requests, reminders, next-step messages, and handoffs connected to your existing workflow.' },
      { title: 'CRM & Inbox Automation', description: 'AI-assisted sorting, drafting, summarizing, tagging, and follow-up workflows connected to approved third-party systems.' },
      { title: 'Reporting & Admin Agents', description: 'Agents that summarize forms, emails, spreadsheets, campaign data, or routine business information into useful reports.' },
      { title: 'Training, Testing & Guardrails', description: 'Prompt design, workflow documentation, human review points, escalation rules, and launch testing before customers depend on it.' },
    ],
    process: [{ title: 'Workflow Discovery', description: 'We identify the repetitive work, customer moments, tools, risk points, and success criteria.' }, { title: 'Agent Design', description: 'We map the agent’s role, data sources, integrations, approvals, and clear boundaries.' }, { title: 'Build & Test', description: 'We configure the agent, test realistic scenarios, refine responses, and validate handoffs.' }, { title: 'Launch & Improve', description: 'We deploy carefully, monitor performance, document usage, and improve based on real activity.' }],
    note: 'AI agents support your team; they do not replace legal, medical, financial, or other licensed professional judgment. Third-party software and AI platform usage fees are paid directly by the client when applicable.',
  },
  {
    slug: 'websites', navName: 'Websites & Care', title: 'Websites built for ownership, visibility, and growth.', eyebrow: 'Web Design & Management', image: '/service-websites.png', imageAlt: 'Dark premium web design studio with responsive website layouts and a brass key representing client ownership',
    intro: 'Choose a focused ownership website, a search-led local authority build, or a managed lease-to-own path. Your domain and core accounts stay in your name.',
    services: [
      { title: 'Ownership Websites', description: 'Custom, mobile-first business websites with analytics, conversion points, documentation, and a clean handoff.' },
      { title: 'Local Authority & Core 30', description: 'Research-led sites structured around legitimate categories, services, customer questions, and the communities you actually serve.' },
      { title: 'Lease-to-Own', description: 'A twelve-month path for businesses that need a strong site now and want ownership after completing the agreement.' },
      { title: 'Hosting & Managed Care', description: 'Reliable hosting, security checks, backups, reporting, maintenance, and optional content updates.' },
      { title: 'Stripe Commerce & Booking', description: 'Stripe-based checkout, lead-generation landing pages, forms, booking connections, and conversion tracking.' },
      { title: 'Accessibility & Copywriting', description: 'Clearer content, practical accessibility improvements, and pages designed to help real customers take action.' },
    ],
    process: [{ title: 'Discovery', description: 'We define customers, goals, services, ownership, and technical requirements.' }, { title: 'Architecture', description: 'We map pages, conversion paths, local visibility needs, and integrations.' }, { title: 'Build & Review', description: 'We design, develop, test, and refine the experience with your feedback.' }, { title: 'Launch & Handoff', description: 'We connect your accounts, document the system, and establish reporting or managed care.' }],
  },
  {
    slug: 'local-visibility', navName: 'Google Profile & SEO/GEO', title: 'Make your local presence tell one consistent story.', eyebrow: 'Google Profile · SEO · GEO', image: '/service-local-visibility.png', imageAlt: 'Dark city map with gold location markers and local search analytics',
    intro: 'We manage the relationship between your Google Business Profile, website, reputation, services, and geography—then report what is changing and where opportunity remains.',
    services: [
      { title: 'Google Business Profile Management', description: 'Optimization, service updates, posts, photos, review-response support, and performance reporting.' },
      { title: 'Verification & Recovery Guidance', description: 'Hands-on documentation, appeal, and reinstatement support while Google retains final decision-making authority.' },
      { title: 'Local SEO & GEO', description: 'Entity, category, competitor, website-gap, topical, and geographic research aligned to genuine business operations.' },
      { title: 'Review & Reputation Management', description: 'Ethical review workflows and responses within each platform’s rules—never fake reviews or prohibited incentives.' },
      { title: 'Directory Cleanup', description: 'Where appropriate, we identify and correct important business listing inconsistencies beyond Google.' },
      { title: 'Rank Maps & Reporting', description: 'Monthly visibility tracking and plain-language reporting that connects activity to measurable movement.' },
    ],
    process: [{ title: 'Audit', description: 'We review the profile, website, categories, services, reputation, competitors, and existing visibility.' }, { title: 'Align', description: 'We correct legitimate gaps and synchronize the website and profile hierarchy.' }, { title: 'Build Relevance', description: 'We add useful service, topical, and geographic content with human review.' }, { title: 'Measure & Refine', description: 'We track visibility, inquiries, reviews, and next-best opportunities.' }],
    note: 'Google verification, reinstatement, indexing, ranking, and lead volume cannot be guaranteed. Success depends on truthful business information and timely client documentation.',
  },
  {
    slug: 'social-media', navName: 'Social Media', title: 'A social presence your business can actually sustain.', eyebrow: 'Facebook · Instagram · TikTok · YouTube', image: '/service-social-media.png', imageAlt: 'Premium dark content-planning studio with devices, calendar, and video-editing tools',
    intro: 'Select the support level that fits your team—from reliable scheduling to graphics, community management, and polished short-form editing.',
    services: [
      { title: 'Content Planning & Scheduling', description: 'A practical monthly calendar and consistent publishing across your selected accounts.' },
      { title: 'Captions & Graphic Content', description: 'On-brand writing and visual assets designed around your business priorities.' },
      { title: 'Short-Form Video Editing', description: 'Platform-ready edits for Reels, TikTok, Shorts, and Facebook using footage supplied by your team.' },
      { title: 'Community Management', description: 'Monitoring and agreed-upon responses for comments, tags, and routine audience interactions.' },
      { title: 'Account Optimization', description: 'Profile cleanup, brand consistency, linking, and practical publishing setup.' },
      { title: 'Monthly Reporting', description: 'Clear reporting on publishing, reach, engagement, audience, and content lessons.' },
    ],
    process: [{ title: 'Set the Voice', description: 'We learn your audience, priorities, boundaries, offers, and brand voice.' }, { title: 'Plan', description: 'We create a realistic calendar and identify what your team needs to supply.' }, { title: 'Create & Approve', description: 'We prepare content for review according to your selected support level.' }, { title: 'Publish & Learn', description: 'We schedule, monitor, report, and improve the next cycle.' }],
    note: 'Albright edits client-supplied photography and footage; on-location photography and filming are not included.',
  },
  {
    slug: 'paid-advertising', navName: 'Paid Advertising', title: 'Paid advertising without hidden incentives.', eyebrow: 'Google Ads & Approved Platforms', image: '/service-paid-advertising.png', imageAlt: 'Dark professional advertising analytics workspace with warm gold performance graphics',
    intro: 'We set up, track, manage, and report on advertising while you pay the platform directly. We never inflate or skim ad spend for additional profit.',
    services: [
      { title: 'Google Search Ads', description: 'Intent-focused campaigns built around valuable searches, clear conversion actions, and disciplined exclusions.' },
      { title: 'Display & Remarketing', description: 'Audience and creative campaigns designed to reinforce awareness and reconnect with visitors.' },
      { title: 'Performance Max & Shopping', description: 'Campaign and feed support when the business, data, catalog, and budget are a responsible fit.' },
      { title: 'YouTube Advertising', description: 'Video campaign setup and optimization using approved client creative.' },
      { title: 'Meta & Additional Platforms', description: 'Additional approved advertising channels can be layered into an active management plan.' },
      { title: 'Conversion Tracking & Reporting', description: 'Tracking, optimization, and reporting focused on meaningful business actions rather than vanity metrics.' },
    ],
    process: [{ title: 'Readiness Review', description: 'We review the offer, landing experience, tracking, geography, budget, and economics.' }, { title: 'Build', description: 'We create account structure, targeting, creative requirements, and conversion measurement.' }, { title: 'Launch Carefully', description: 'We validate billing and tracking, then launch with controlled budgets.' }, { title: 'Optimize & Report', description: 'We refine search terms, audiences, creative, bids, and landing-page opportunities.' }],
    note: 'Advertising results are not guaranteed. Ad spend is separate from management fees and is paid directly by the client to each advertising platform.',
  },
  {
    slug: 'content-creative', navName: 'Content & Creative', title: 'Useful content, polished for every customer touchpoint.', eyebrow: 'Email · Copy · Brand · Video', image: '/service-content.png', imageAlt: 'Dark premium content studio with video editing, brand layouts, and creative tools',
    intro: 'Keep your message consistent across email, web, social, and campaign materials without building an in-house creative department.',
    services: [
      { title: 'Email Marketing & Newsletters', description: 'Platform setup, branded templates, campaign writing, scheduling, and reporting.' },
      { title: 'Website Copywriting', description: 'Clear, customer-centered service and landing-page copy designed for action and search understanding.' },
      { title: 'Topical & Local Content', description: 'Researched supporting content built around real questions and genuine operating areas.' },
      { title: 'Branding & Graphic Design', description: 'Practical visual systems, graphics, templates, and starter brand guidance.' },
      { title: 'Short-Form Video Editing', description: 'Captions, pacing, graphics, and exports for footage your business supplies.' },
      { title: 'Analytics & Reporting', description: 'Measurement is included in managed programs so creative work remains accountable.' },
    ],
    process: [{ title: 'Brief', description: 'We establish audience, voice, objective, source material, and approval needs.' }, { title: 'Create', description: 'We research, write, design, or edit the agreed deliverables.' }, { title: 'Review', description: 'Your team checks factual accuracy, brand fit, and required approvals.' }, { title: 'Publish & Measure', description: 'We deploy through the agreed channels and report what we learn.' }],
  },
  {
    slug: 'business-systems', navName: 'Business Systems', title: 'Connect the systems behind the customer experience.', eyebrow: 'CRM · Booking · Payments · Email', image: '/service-business-systems.png', imageAlt: 'Connected dark business workflow showing inquiry, scheduling, forms, payment, email, and reporting',
    intro: 'We configure practical third-party tools in accounts your business controls, connect the workflow, test it, document it, and teach you how to use it.',
    services: [
      { title: 'CRM Setup & Lead Follow-Up', description: 'Pipeline, fields, lead routing, and basic integrations in a client-paid third-party CRM.' },
      { title: 'Online Booking', description: 'Scheduling connections, confirmation flows, and website integration.' },
      { title: 'Stripe Payments & Commerce', description: 'Stripe-based checkout and payment experiences configured around the agreed scope.' },
      { title: 'Forms & Digital Workflows', description: 'Customer forms, estimates, intake, and handoff workflows with practical documentation.' },
      { title: 'Domain, DNS & Professional Email', description: 'Domain setup, DNS configuration, and Google Workspace email using client-owned accounts and direct billing.' },
      { title: 'Emergency Recovery & Training', description: 'Website/account recovery assistance and negotiated staff technology training when needed.' },
    ],
    process: [{ title: 'Map the Workflow', description: 'We document what happens from first inquiry through delivery and follow-up.' }, { title: 'Select & Configure', description: 'We help select appropriate tools and configure them in your accounts.' }, { title: 'Connect & Test', description: 'We integrate the agreed steps and test real-world scenarios.' }, { title: 'Document & Handoff', description: 'Your team receives practical instructions and ownership of the finished system.' }],
    note: 'Software subscriptions, domains, Google Workspace, CRM, Stripe processing, and other third-party charges are paid directly by the client.',
  },
];

export const serviceBySlug = (slug: string) => serviceFamilies.find((service) => service.slug === slug);
