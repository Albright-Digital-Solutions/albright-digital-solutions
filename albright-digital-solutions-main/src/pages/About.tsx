import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Target, Lightbulb } from 'lucide-react';
import SchemaMarkup, { breadcrumbSchema, BUSINESS } from '../components/SchemaMarkup';

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
            A full-service digital agency in {BUSINESS.address.city}, Texas — building high-performance websites, deploying AI automation, and producing premium creative assets for businesses across Central Texas.
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
              Today, {BUSINESS.name} serves businesses across Central Texas with four core services: AI agents and workflow automation, custom website design and development, professional video editing and production, and brand identity graphic design. We are a single-source partner — no fragmented vendors, no communication gaps, no excuses.
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
