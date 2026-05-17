import { Code, Video, Palette, Bot, ArrowRight, Database, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/30 border-b border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-zinc-400 font-sans">
            Comprehensive technical and creative solutions designed to scale your business.
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
                Deploy specialized artificial intelligence tailored to your unique workflows. We build autonomous agents capable of handling complex customer support, data processing, and internal operational tasks, reducing overhead and increasing efficiency.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Custom Customer Support Bots</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Workflow Automation Pipelines</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> AI-Powered Copywriting Tools</li>
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                Discuss AI Solutions <ArrowRight size={16} />
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
                We construct high-performance digital infrastructure. From custom marketing sites that convert to robust e-commerce platforms handling thousands of transactions, we engineer solutions that are fast, secure, and infinitely scalable.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Tailored E-Commerce Platforms</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Custom Web Applications</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Secure Data Migration</li>
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                Start a Web Project <ArrowRight size={16} />
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
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Video Editing</h2>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                Command attention with professional video production. We craft compelling visual narratives for investor pitches, brand anthems, and social media campaigns that communicate your value proposition vividly.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Business Pitch Videos</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Commercial Post-Production</li>
                <li className="flex items-center gap-3"><Workflow className="text-[var(--color-brand-accent)]" size={20} /> Social Media Shorts & Reels</li>
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                Request Video Services <ArrowRight size={16} />
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
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Graphic Design</h2>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                Establish a professional, innovative, and highly capable brand identity. We design comprehensive media kits, presentation decks, and visual assets that position you as an authority in your industry.
              </p>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Media Kits for Business Pitches</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Brand Identity Systems</li>
                <li className="flex items-center gap-3"><Database className="text-[var(--color-brand-accent)]" size={20} /> Digital Asset Creation</li>
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-light)] font-bold transition-colors">
                Elevate Your Brand <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
