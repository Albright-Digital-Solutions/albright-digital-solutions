import { Code, Video, Palette, Bot, ArrowRight, Database, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import SchemaMarkup, { breadcrumbSchema, BUSINESS } from '../components/SchemaMarkup';

export default function Services() {
  const schemas = [
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Services', url: `${BUSINESS.url}/services` }]),
  ];

  return (
    <div className="w-full">
      <SchemaMarkup schema={schemas} />

      {/* Header */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/30 border-b border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Digital Services in {BUSINESS.address.city}, Texas</h1>
          <p className="text-xl text-zinc-400 font-sans">
            Comprehensive technical and creative solutions designed to scale your business. Each service is built on SEO-first architecture with entity-based optimization.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto space-y-24">

          {/* AI Agents */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[var(--color-brand-surface)] p-12 rounded-3xl border border-[var(--color-brand-border)] flex justify-center items-center h-full min-h-[300px]">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-brand-accent)]/20 blur-[50px] rounded-full"></div>
                <Bot size={120} className="text-[var(--color-brand-accent)] relative z-10" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-6">AI Agents & Automation</h2>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                Deploy specialized artificial intelligence tailored to your unique workflows. We build autonomous agents capable of handling complex customer support, data processing, lead qualification, and internal operational tasks — reducing overhead and increasing efficiency for businesses across {BUSINESS.address.city} and Central Texas.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Custom Customer Support Bots</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Workflow Automation Pipelines</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Lead Qualification Systems</li>
              </ul>
              <Link to="/services/ai-automation" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                View Full AI Service Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Web Design & Dev */}
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-1 md:order-2 bg-[var(--color-brand-surface)] p-12 rounded-3xl border border-[var(--color-brand-border)] flex justify-center items-center h-full min-h-[300px]">
               <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-brand-accent)]/20 blur-[50px] rounded-full"></div>
                <Code size={120} className="text-[var(--color-brand-accent)] relative z-10" />
              </div>
            </div>
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Web Design & Development</h2>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                We construct high-performance digital infrastructure with SEO-first architecture. From custom marketing sites that convert to robust e-commerce platforms, we engineer solutions that are fast, secure, and built to rank on Google from day one.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> SEO-First Custom Websites</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> E-Commerce Platforms</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Schema Markup & Structured Data</li>
              </ul>
              <Link to="/services/web-design" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                View Full Web Design Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Video Editing */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[var(--color-brand-surface)] p-12 rounded-3xl border border-[var(--color-brand-border)] flex justify-center items-center h-full min-h-[300px]">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-brand-accent)]/20 blur-[50px] rounded-full"></div>
                <Video size={120} className="text-[var(--color-brand-accent)] relative z-10" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Video Editing & Production</h2>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                Command attention with professional video production. We craft compelling visual narratives for investor pitches, brand anthems, social media campaigns, and training content that communicate your value proposition with cinematic quality.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Business Pitch Videos</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Commercial Post-Production</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Social Media Shorts & Reels</li>
              </ul>
              <Link to="/services/video-editing" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                View Full Video Service Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Graphic Design */}
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-1 md:order-2 bg-[var(--color-brand-surface)] p-12 rounded-3xl border border-[var(--color-brand-border)] flex justify-center items-center h-full min-h-[300px]">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-brand-accent)]/20 blur-[50px] rounded-full"></div>
                <Palette size={120} className="text-[var(--color-brand-accent)] relative z-10" />
              </div>
            </div>
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Graphic Design & Branding</h2>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                Establish a professional, innovative brand identity. We design comprehensive media kits, presentation decks, logo systems, and visual assets that position you as the authority in your industry across Central Texas.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Media Kits for Business Pitches</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Brand Identity Systems</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Digital Asset Creation</li>
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                Discuss Your Project <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
