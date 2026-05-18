import { Link } from 'react-router-dom';
import { ArrowRight, Code, Video, Palette, Bot, Star, Shield, Clock, CheckCircle2, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import SchemaMarkup, { localBusinessSchema, BUSINESS } from '../components/SchemaMarkup';

function useCardSpotlight(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll('.card-spotlight');
    const handleMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, [ref]);
}

const services = [
  { icon: <Bot size={28} />, title: 'AI Agents', sub: 'Autonomous Automation', desc: 'Custom AI-powered workflows that handle customer support, lead qualification, and operations 24/7.', link: '/services/ai-automation', tag: 'Most Popular' },
  { icon: <Code size={28} />, title: 'Web Design', sub: 'SEO-First Architecture', desc: 'High-performance websites engineered to rank on Google with entity-based optimization and schema markup.', link: '/services/web-design', tag: 'Core Service' },
  { icon: <Video size={28} />, title: 'Video Editing', sub: 'Cinematic Production', desc: 'Professional post-production for pitches, commercials, social media content, and brand storytelling.', link: '/services/video-editing', tag: 'Creative' },
  { icon: <Palette size={28} />, title: 'Graphic Design', sub: 'Brand Identity', desc: 'Media kits, brand systems, and visual assets that position your business as the market authority.', link: '/contact', tag: 'Creative' },
];

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);
  useCardSpotlight(gridRef);

  return (
    <div className="w-full">
      <SchemaMarkup schema={localBusinessSchema()} />

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background effects — all using box-shadow instead of filter blur */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Ambient glow top-left */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(229,159,43,0.08) 0%, transparent 70%)' }} />
          {/* Ambient glow bottom-right */}
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(179,115,20,0.06) 0%, transparent 70%)' }} />
          {/* Center ambient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,210,117,0.03) 0%, transparent 60%)' }} />
        </div>

        {/* Light beams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="light-beam left-[15%] top-0" />
          <div className="light-beam left-[40%] top-0" style={{ animationDelay: '1.5s', height: '300px' }} />
          <div className="light-beam right-[25%] top-0" style={{ animationDelay: '3s' }} />
          <div className="light-beam right-[8%] top-0" style={{ animationDelay: '4.5s', height: '250px' }} />
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="reveal reveal-delay-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10 border border-[var(--color-brand-accent)]/15 bg-[var(--color-brand-accent)]/[0.04]">
            <Sparkles size={14} className="text-[var(--color-brand-accent)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent-light)]">Austin's Premier Digital Agency</span>
            <Sparkles size={14} className="text-[var(--color-brand-accent)]" />
          </div>

          {/* H1 */}
          <h1 className="reveal reveal-delay-2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tight leading-[0.9] mb-8">
            We Make<br />
            Brands{' '}
            <span className="text-shimmer">Shine</span>
          </h1>

          {/* Sub */}
          <p className="reveal reveal-delay-3 mt-4 text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
            <strong className="text-white font-medium">{BUSINESS.name}</strong> builds world-class websites, deploys intelligent AI agents, and produces premium creative assets for businesses across{' '}
            <span className="text-[var(--color-brand-accent-light)]">Austin, Texas</span>.
          </p>

          {/* CTA */}
          <div className="reveal reveal-delay-4 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="btn-glow px-10 py-5 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-xl text-lg flex items-center gap-3"
            >
              Start Your Project
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/services"
              className="btn-outline-glow px-10 py-5 border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)]/60 text-white font-semibold rounded-xl text-lg flex items-center gap-3 relative"
            >
              Explore Services
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="reveal reveal-delay-6 mt-24 flex flex-col items-center gap-2 text-zinc-600">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[var(--color-brand-accent)]/40 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TRUST BAR — Horizontal Marquee
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-6 border-y border-[var(--color-brand-border)] overflow-hidden bg-[var(--color-brand-surface)]/30">
        <div className="marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="inline-flex items-center gap-12 px-6">
              {[
                { icon: <Star size={14} />, text: '5.0 ★ RATED' },
                { icon: <Shield size={14} />, text: 'AUSTIN, TEXAS' },
                { icon: <Clock size={14} />, text: `EST. ${BUSINESS.foundingYear}` },
                { icon: <CheckCircle2 size={14} />, text: '50+ PROJECTS' },
                { icon: <Zap size={14} />, text: 'SEO-FIRST' },
                { icon: <Bot size={14} />, text: 'AI-POWERED' },
                { icon: <Star size={14} />, text: '5.0 ★ RATED' },
                { icon: <Shield size={14} />, text: 'AUSTIN, TEXAS' },
                { icon: <Clock size={14} />, text: `EST. ${BUSINESS.foundingYear}` },
                { icon: <CheckCircle2 size={14} />, text: '50+ PROJECTS' },
                { icon: <Zap size={14} />, text: 'SEO-FIRST' },
                { icon: <Bot size={14} />, text: 'AI-POWERED' },
              ].map((item, j) => (
                <span key={j} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  <span className="text-[var(--color-brand-accent)]/60">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SERVICE CARDS — Interactive Spotlight Grid
          ════════════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg-dense pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section header */}
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="line-accent-left w-16" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-brand-accent)]">What We Build</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Digital solutions that<br />
              <span className="text-shimmer">drive revenue</span>
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
              Every service is engineered to solve a specific business problem. We don't do templates — we build custom infrastructure that generates measurable results.
            </p>
          </div>

          {/* Cards */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {services.map((service, i) => (
              <Link
                key={service.title}
                to={service.link}
                className={`card-spotlight glass-card rounded-2xl p-8 md:p-10 group relative ${i === 0 ? 'md:row-span-2' : ''}`}
              >
                {/* Tag */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-accent)] bg-[var(--color-brand-accent)]/[0.08] px-3 py-1.5 rounded-full mb-6 border border-[var(--color-brand-accent)]/10">
                  {service.tag}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[var(--color-brand-accent)]/[0.08] border border-[var(--color-brand-accent)]/15 flex items-center justify-center text-[var(--color-brand-accent)] mb-6 group-hover:bg-[var(--color-brand-accent)]/15 group-hover:scale-110 transition-all duration-500">
                  {service.icon}
                </div>

                {/* Text */}
                <h3 className={`font-serif font-bold text-white mb-1 ${i === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{service.title}</h3>
                <p className="text-sm text-[var(--color-brand-accent)]/70 font-medium mb-4">{service.sub}</p>
                <p className={`text-zinc-400 leading-relaxed mb-6 ${i === 0 ? 'text-lg max-w-md' : 'text-sm'}`}>{service.desc}</p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-[var(--color-brand-accent)] text-sm font-bold group-hover:gap-4 transition-all duration-500">
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-tr-2xl" style={{ background: 'linear-gradient(to bottom-left, rgba(229,159,43,0.04), transparent)' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          WHY CHOOSE US
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="line-accent w-full" />

        <div className="px-4 py-28 md:py-36">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-brand-accent)] mb-4 block">Why Us</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                What makes us{' '}
                <span className="text-shimmer">different</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '01', title: 'SEO-First Architecture', desc: 'Every website is engineered from the ground up with entity-based SEO, structured data, and service-area pages that rank — not just look good. Our sites outperform template-based competitors within 90 days.' },
                { num: '02', title: 'AI-Powered Workflows', desc: 'We deploy custom AI agents that handle repetitive tasks — from answering customer inquiries to processing data — so you can focus on growing your business. 24/7 automation, zero downtime.' },
                { num: '03', title: 'Full-Stack Creative', desc: 'Video production, brand identity, media kits — all produced in-house to the highest standard. No fragmented vendor management. One partner, world-class execution across every discipline.' },
              ].map((item) => (
                <div key={item.num} className="glass-card border-gradient rounded-2xl p-8 md:p-10 relative overflow-hidden group">
                  <div className="relative z-10">
                    <span className="stat-number text-5xl md:text-6xl font-serif font-bold block mb-6">{item.num}</span>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA — Full Impact
          ════════════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(229,159,43,0.05) 0%, transparent 60%)' }} aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            Ready to make your<br />
            brand{' '}
            <span className="text-shimmer">unforgettable?</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            Contact {BUSINESS.name} for a free strategy consultation. We'll analyze your digital presence and build a custom roadmap to dominate your market.
          </p>
          <p className="text-zinc-600 text-sm mb-12">
            {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip} · <a href={`tel:${BUSINESS.phone}`} className="text-[var(--color-brand-accent)]/60 hover:text-[var(--color-brand-accent)] transition-colors">{BUSINESS.phone}</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-glow px-10 py-5 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-xl text-lg flex items-center justify-center gap-3"
            >
              Schedule Free Consultation <ArrowRight size={20} />
            </Link>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="btn-outline-glow px-10 py-5 border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)]/60 text-white font-semibold rounded-xl text-lg flex items-center justify-center gap-3 relative"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
          <p className="text-zinc-600 text-xs mt-12">
            Proudly serving Austin, Round Rock, Cedar Park, Georgetown, San Marcos, and all of Central Texas.
          </p>
        </div>
      </section>
    </div>
  );
}
