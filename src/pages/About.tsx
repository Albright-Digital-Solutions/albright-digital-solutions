import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Target, Lightbulb } from 'lucide-react';
import SchemaMarkup, { breadcrumbSchema, BUSINESS } from '../components/SchemaMarkup';
import { serviceFamilies } from '../data/serviceFamilies';

export default function About() {
  const schemas = [
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'About Us', url: `${BUSINESS.url}/about` }]),
  ];

  return (
    <div className="w-full">
      <SchemaMarkup schema={schemas} />

      {/* Header */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/30 border-b border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">About {BUSINESS.name}</h1>
          <p className="text-xl text-zinc-400 font-sans">
            A full-service digital partner in {BUSINESS.address.city}, Texas — building websites, improving local visibility, managing Google Business Profiles, supporting social media, running honest ad campaigns, deploying custom AI agents, and connecting the systems small businesses depend on.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-p:text-zinc-300">
            <h2>Our Story</h2>
            <p>
              {BUSINESS.name} was founded in {BUSINESS.foundingYear} by Jason Albright with a clear mission: eliminate the technical and creative friction that holds local businesses back from competing in the digital economy. Based in {BUSINESS.address.city}, Texas, we saw firsthand how small businesses across Round Rock, Cedar Park, Georgetown, and San Marcos were being underserved by template-based agencies that delivered generic websites with zero SEO value.
            </p>
            <p>
              We took a different approach. Every project we take on begins with a strategic foundation — entity-based SEO architecture, structured data markup, and service-area content that actually ranks on Google and gets surfaced by AI answer engines. We don't just build websites that look good; we build digital infrastructure that generates revenue.
            </p>
            <p>
              Today, {BUSINESS.name} serves businesses across Central Texas with a complete digital support model: custom AI agents, websites and managed care, Google Business Profile management, local SEO/GEO strategy, social media management, paid advertising, content and creative support, CRM setup, booking and payment workflows, professional email, DNS, reporting, and emergency recovery assistance. We are a single-source partner — no fragmented vendors, no communication gaps, no excuses.
            </p>

            <div className="my-16 border-l-4 border-[var(--color-brand-accent)] pl-8 py-2">
              <p className="text-2xl font-serif italic text-white mb-0">
                "We don't just write code or design graphics; we execute your vision and make your ideas reality."
              </p>
              <p className="text-sm text-zinc-500 mt-2">— Jason Albright, Founder</p>
            </div>

            <h2>Our Team</h2>
            <p>
              Our team combines deep technical expertise with hands-on creative execution. Jason Albright leads the company as both principal developer and strategic consultant, bringing experience in full-stack web development (Next.js, React, Node.js), AI agent deployment, video post-production, and brand strategy. We maintain a lean, high-output operation that allows us to deliver enterprise-quality work at competitive pricing accessible to small and mid-sized businesses.
            </p>
            <p>
              We also collaborate with a trusted network of specialized contractors across Texas for projects requiring additional bandwidth — including professional videographers, copywriters, and UI/UX designers. This hybrid model ensures every project gets expert-level execution without the overhead of a bloated agency.
            </p>

            <h2>Our Credentials</h2>
          </div>

          {/* Credentials Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-8 rounded-2xl">
              <Award size={28} className="text-[var(--color-brand-accent)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Full-Stack Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Production-grade expertise in Next.js, React, TypeScript, Node.js, and modern CSS frameworks. We build custom solutions — not template sites.</p>
            </div>
            <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-8 rounded-2xl">
              <Lightbulb size={28} className="text-[var(--color-brand-accent)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">AI & Machine Learning</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Specialized in deploying production AI agents using Google Gemini, OpenAI, and custom LLM integrations for business workflow automation.</p>
            </div>
            <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-8 rounded-2xl">
              <Target size={28} className="text-[var(--color-brand-accent)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">SEO-First Architecture</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Entity-based optimization, JSON-LD schema markup, service-area landing pages, and structured data implementation that ranks.</p>
            </div>
            <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-8 rounded-2xl">
              <Users size={28} className="text-[var(--color-brand-accent)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Creative Production</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Professional video editing (4K), motion graphics, brand identity design, and media kit production for startups and established businesses.</p>
            </div>
          </div>

          {/* Full Service Lineup */}
          <div className="space-y-8">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-p:text-zinc-300">
              <h2>What We Help With</h2>
              <p>
                Most small businesses do not need another disconnected vendor. They need a practical partner who can make the website, Google presence, social channels, ads, content, CRM, forms, booking, payments, email, and reporting work together. That is the role we fill.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {serviceFamilies.map((family) => (
                <div key={family.slug} className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-8 rounded-2xl">
                  <p className="text-[var(--color-brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-3">{family.eyebrow}</p>
                  <h3 className="text-xl font-serif font-bold text-white mb-3">{family.navName}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">{family.intro}</p>
                  <ul className="space-y-2">
                    {family.services.map((service) => (
                      <li key={service.title} className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-[var(--color-brand-accent)] mr-2">•</span>
                        <strong className="text-white">{service.title}</strong>
                      </li>
                    ))}
                  </ul>
                  {family.note && <p className="mt-5 text-xs text-zinc-500 leading-relaxed">{family.note}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Who We Serve */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-p:text-zinc-300">
            <h2>Who We Serve</h2>
            <ul>
              <li><strong>Small-to-medium business owners</strong> in Austin, Round Rock, Cedar Park, Georgetown, and San Marcos ready to modernize their digital presence and operations.</li>
              <li><strong>Non-technical founders</strong> who need a reliable, highly-capable technical partner to build and maintain their digital infrastructure.</li>
              <li><strong>Startups</strong> seeking scalable web platforms, AI automation, and compelling pitch materials to secure funding and customers.</li>
              <li><strong>Established companies</strong> looking to automate workflows, upgrade their websites, and produce professional marketing content.</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors"
            >
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
