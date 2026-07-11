import { Link } from 'react-router-dom';
import { ArrowRight, Code, Layout, Server, Gauge, ShieldCheck, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'Web Design & Development';
const SERVICE_URL = `${BUSINESS.url}/services/web-design`;

const faqs = [
  { question: 'How much does a custom website cost in Texas?', answer: 'Custom websites from Albright Digital Solutions LLC start at $3,500 for a high-performance marketing site with SEO-first architecture. E-commerce platforms and complex web applications range from $8,000–$25,000 depending on functionality. Every build includes mobile-first design, structured data markup, and a practical page plan based on the services and locations that fit the business.' },
  { question: 'Do you build WordPress websites?', answer: 'We build on the platform that best fits your goals. For maximum SEO control and content management flexibility, WordPress remains a top choice. We also build headless sites using Next.js and React for businesses that need blazing-fast performance and custom functionality. During your free strategy call, we recommend the ideal platform for your specific needs.' },
  { question: 'How long does it take to build a website?', answer: 'A standard marketing website takes 3–4 weeks from kickoff to launch. E-commerce platforms typically take 4–6 weeks. Complex web applications with custom features can take 6–10 weeks. We provide a detailed timeline during the proposal phase so there are no surprises.' },
  { question: 'Will my website rank on Google?', answer: 'No agency can guarantee rankings, indexing, or lead volume. What we can do is build a stronger foundation: clear service architecture, useful copy, structured data, mobile-first design, performance-minded development, and business information that matches your public profiles.' },
  { question: 'Do you provide ongoing maintenance and support?', answer: 'Yes. We offer monthly maintenance plans starting at $150/month that include security updates, performance monitoring, content updates, and priority support. We also provide hosting management for clients who want a fully hands-off experience.' },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[var(--color-brand-border)] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[var(--color-brand-surface)]/50 transition-colors cursor-pointer">
        <h3 className="text-base font-bold text-white leading-snug">{question}</h3>
        <ChevronDown size={20} className={`flex-shrink-0 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function WebDesign() {
  const schemas = [
    serviceSchema(SERVICE_NAME, 'Custom website design and development for Texas businesses and remote clients nationwide. SEO-first architecture, schema markup, and mobile-first design.', SERVICE_URL),
    faqSchema(faqs),
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Web Design & Development', url: SERVICE_URL }]),
  ];

  return (
    <div className="w-full">
      <SchemaMarkup schema={schemas} />

      {/* Hero */}
      <section className="relative px-4 py-20 sm:py-28 overflow-hidden border-b border-[var(--color-brand-border)]">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-brand-accent)]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-[var(--color-brand-accent)] transition-colors">Home</Link><span>/</span><span className="text-zinc-300">Web Design &amp; Development</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">{SERVICE_NAME}</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-8">
            {BUSINESS.name} builds performance-minded, SEO-first websites and web applications for Texas businesses and remote clients nationwide. Every website we build is planned around clear service architecture, structured data markup, mobile-first design, and practical conversion paths — because a beautiful website still needs to explain what the business does and help real customers take action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">
              Get a Free Website Audit <ArrowRight size={18} />
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-surface)] text-white font-bold rounded-lg border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)] transition-colors">
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Service Deep Dive */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Our Web Development Approach</h2>
          <div className="space-y-12">
            {[
              { icon: <Layout size={28} />, title: 'SEO-First Architecture', text: 'We do not bolt SEO onto a finished website. We plan the structure first: clear service pages, useful headings, internal links, local business details, and content that supports the real services the business offers.' },
              { icon: <Code size={28} />, title: 'Custom Development, Not Templates', text: 'We build with modern tools such as React, TypeScript, and production-ready hosting workflows. The goal is a fast, maintainable website that your business can own, update, measure, and grow over time.' },
              { icon: <Server size={28} />, title: 'Structured Data & Schema Markup', text: 'We add JSON-LD structured data where it fits the page: LocalBusiness and Organization details, Service schema, FAQ schema, breadcrumbs, and clear business information that helps search engines understand what the company does and where it operates.' },
              { icon: <Gauge size={28} />, title: 'Mobile-First Performance', text: 'We design for mobile and desktop, optimize images, reduce unnecessary page weight, and watch performance during launch. Faster pages create a better user experience and give search engines fewer technical reasons to hesitate.' },
              { icon: <ShieldCheck size={28} />, title: 'Security & Ownership', text: 'Projects can include HTTPS, security-minded hosting, client-owned domains, DNS documentation, professional email setup, and practical handoff notes so the business is not locked out of its own digital infrastructure.' },
            ].map((item) => (
              <div key={item.title} className="grid md:grid-cols-[auto_1fr] gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-accent)]/10 border border-[var(--color-brand-accent)]/20 flex items-center justify-center text-[var(--color-brand-accent)]">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 bg-[var(--color-brand-surface)]/50 border-y border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ val: 'Fast', label: 'Performance Focus' }, { val: 'Schema', label: 'Structured Data' }, { val: 'Mobile', label: 'Responsive Design' }, { val: '3–4wk', label: 'Typical Site Timeline' }].map((s) => (
            <div key={s.label}><div className="text-3xl font-serif font-bold text-[var(--color-brand-accent)] mb-1">{s.val}</div><div className="text-sm text-zinc-400">{s.label}</div></div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-4 text-center">Frequently Asked Questions About Web Design</h2>
          <p className="text-zinc-400 text-center mb-12">Common questions about custom website development for local businesses.</p>
          <div className="space-y-3">{faqs.map((faq) => <FAQItem key={faq.question} {...faq} />)}</div>
        </div>
      </section>

      {/* CTA + NAP */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/50 border-t border-[var(--color-brand-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready for a Website That Ranks?</h2>
          <p className="text-zinc-400 mb-4">Contact {BUSINESS.name} for a free website audit and strategy consultation.</p>
          <p className="text-zinc-500 text-sm mb-8">Texas-based · Remote consultations available · <a href={`tel:${BUSINESS.phone}`} className="text-[var(--color-brand-accent)]">{BUSINESS.phone}</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">Schedule Free Audit <ArrowRight size={18} /></Link>
            <Link to="/services/video-editing" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-surface)] text-white font-bold rounded-lg border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)] transition-colors">See Video Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
