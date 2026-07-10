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
  faqs?: { question: string; answer: string }[];
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
    faqs: [
      { question: 'What can a custom AI agent do for my business?', answer: 'A custom AI agent can answer approved customer questions, collect lead details, qualify inquiries, support scheduling, summarize information, draft follow-ups, and help your team manage repetitive administrative work.' },
      { question: 'Will an AI agent replace my staff?', answer: 'No. We design AI agents to support your team, reduce repetitive work, and improve response speed. They include boundaries, escalation paths, and human review points where judgment matters.' },
      { question: 'Can an AI agent connect to my CRM, inbox, or booking system?', answer: 'Often, yes. Integration depends on the tools you use, available APIs, account permissions, and the level of automation approved for the project.' },
      { question: 'How do you keep AI responses accurate?', answer: 'We define approved knowledge sources, response boundaries, escalation rules, test scenarios, and documentation before launch. Ongoing monitoring and tuning can be included after deployment.' },
    ],
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
    faqs: [
      { question: 'Will I own my website?', answer: 'Yes. Our standard approach is to set up the domain, core accounts, and website ownership in your business accounts so you retain control. Lease-to-own options are available when a business needs a lower upfront path.' },
      { question: 'Do you offer ongoing website hosting and management?', answer: 'Yes. Hosting and managed care can include maintenance, security checks, backups, updates, reporting, and approved content changes depending on the plan selected.' },
      { question: 'Can you build lead-generation landing pages?', answer: 'Yes. Lead-generation landing pages are available as part of an active monthly management service or within the initial setup scope of a website project.' },
      { question: 'Do you support online booking or e-commerce?', answer: 'Yes, when it fits the project scope. We support online booking connections and Stripe-based payment or checkout experiences.' },
    ],
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
    faqs: [
      { question: 'Can you guarantee Google Business Profile verification or reinstatement?', answer: 'No. We can guide the process, organize documentation, submit appeals, and fight for the client, but Google controls verification and reinstatement decisions.' },
      { question: 'What does Google Business Profile management include?', answer: 'It can include profile optimization, service updates, posts, photo updates, review-response support, performance reporting, and ongoing recommendations based on profile activity.' },
      { question: 'What is SEO/GEO for a local business?', answer: 'SEO/GEO aligns your website, Google profile, services, reputation, and geographic relevance so search engines and AI answer engines can better understand what your business does and who it serves.' },
      { question: 'Do you guarantee rankings or lead volume?', answer: 'No. Rankings, indexing, verification, reinstatement, and lead volume cannot be guaranteed. Results depend on competition, business legitimacy, account history, content quality, reviews, and timely client information.' },
    ],
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
    faqs: [
      { question: 'Which social media platforms do you manage?', answer: 'We support Facebook, Instagram, TikTok, and YouTube. The exact posting schedule, creative support, and monitoring level depend on the package selected.' },
      { question: 'Do you create the content or just schedule posts?', answer: 'Both options are available. Some packages focus on planning and scheduling client-supplied assets, while higher-support packages can include graphics, captions, community management, and short-form video editing.' },
      { question: 'Do you film or take photos for social media?', answer: 'No. Albright Digital Solutions LLC edits and packages client-supplied photography or footage, but on-location photography and filming are not included by default.' },
      { question: 'Is reporting included with social media management?', answer: 'Yes. Reporting is included so publishing, reach, engagement, audience activity, and lessons from each cycle can be reviewed.' },
    ],
    note: 'Albright Digital Solutions LLC edits client-supplied photography and footage; on-location photography and filming are not included.',
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
    faqs: [
      { question: 'Do you manage Google Ads?', answer: 'Yes. We can set up, manage, track, optimize, and report on Google Ads campaigns, including search campaigns and other approved campaign types when appropriate.' },
      { question: 'Do you mark up or skim advertising spend?', answer: 'No. Clients pay advertising platforms directly. Our management fee is separate from ad spend, and we do not inflate media spend for additional profit.' },
      { question: 'Can you manage ads beyond Google?', answer: 'Yes, when it is a responsible fit. Additional approved platforms such as Meta or YouTube can be layered into an active management plan.' },
      { question: 'Can paid advertising results be guaranteed?', answer: 'No. Advertising results cannot be guaranteed. Performance depends on budget, offer, tracking quality, landing page quality, competition, targeting, and platform behavior.' },
    ],
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
    faqs: [
      { question: 'Do you offer email marketing and newsletters?', answer: 'Yes. We can help with platform setup, branded templates, campaign writing, scheduling, and reporting for managed email marketing programs.' },
      { question: 'Can you write website copy or local content?', answer: 'Yes. We write practical website copy, service-page content, landing-page copy, and researched supporting content around real customer questions and legitimate business operations.' },
      { question: 'Do you provide branding and graphic design?', answer: 'Yes. We offer practical brand systems, graphics, templates, social/profile assets, and starter brand guidance for small businesses.' },
      { question: 'Is creative work measured?', answer: 'Yes. Analytics and reporting are included in managed programs so creative work can be connected to activity, engagement, and business goals.' },
    ],
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
    faqs: [
      { question: 'Do you pay for my CRM, email, domain, or software subscriptions?', answer: 'No. Third-party software, domains, Google Workspace, CRM subscriptions, Stripe fees, and similar costs are paid directly by the client whenever possible.' },
      { question: 'Can you set up a CRM and lead follow-up process?', answer: 'Yes. We can configure a third-party CRM around your pipeline, fields, routing, lead flow, and basic integrations, then provide documentation for your team.' },
      { question: 'Can you set up professional email and DNS?', answer: 'Yes. We can help set up domains, DNS, and Google Workspace email in client-owned accounts with direct client billing.' },
      { question: 'Do you provide training after setup?', answer: 'Yes. Services include practical documentation on how to use the systems. Additional staff technology training can be negotiated when needed.' },
    ],
    note: 'Software subscriptions, domains, Google Workspace, CRM, Stripe processing, and other third-party charges are paid directly by the client.',
  },
];

export const serviceBySlug = (slug: string) => serviceFamilies.find((service) => service.slug === slug);
