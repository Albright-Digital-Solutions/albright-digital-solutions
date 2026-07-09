import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Star, Shield, Clock, CheckCircle2, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SchemaMarkup, { localBusinessSchema, BUSINESS } from '../components/SchemaMarkup';
import LionZoomTransition from '../components/LionZoomTransition';
import { serviceFamilies } from '../data/serviceFamilies';

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

/**
 * HeroSection — Fades in from pure white to create a seamless
 * transition from the Pilgrim's Progress whiteout.
 */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [fadeProgress, setFadeProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) { ticking = false; return; }
        const rect = el.getBoundingClientRect();
        // 1 when section top is at viewport bottom, 0 when at viewport top
        const p = Math.max(0, Math.min(1, rect.top / window.innerHeight));
        setFadeProgress(p);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whiteOverlayOpacity = fadeProgress;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-black"
    >
      {/* ── White-to-transparent overlay (seamless handoff) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: '#fff',
          opacity: whiteOverlayOpacity,
          zIndex: 20,
        }}
      />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(229,159,43,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(179,115,20,0.06) 0%, transparent 70%)' }} />
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
        <div className="reveal reveal-delay-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-[var(--color-brand-accent)]/15 bg-[var(--color-brand-accent)]/[0.04]">
          <Sparkles size={14} className="text-[var(--color-brand-accent)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent-light)]">Texas-Based Digital Partner</span>
          <Sparkles size={14} className="text-[var(--color-brand-accent)]" />
        </div>

        {/* Brand name */}
        <p className="reveal reveal-delay-2 mb-9 font-serif italic text-3xl sm:text-4xl md:text-5xl tracking-[0.04em] text-[var(--color-brand-accent-light)] text-glow">
          {BUSINESS.name}
        </p>

        {/* H1 */}
        <h1 className="reveal reveal-delay-3 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tight leading-[0.9] mb-8">
          We Make<br />{' '}
          Brands{' '}
          <span className="text-shimmer">Memorable</span>
        </h1>

        {/* Sub */}
        <p className="reveal reveal-delay-4 mt-4 text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
          <strong className="text-white font-medium">{BUSINESS.name}</strong> builds high-performing websites and manages the search, social, advertising, and business systems that help small businesses grow across{' '}
          <span className="text-[var(--color-brand-accent-light)]">Texas and beyond</span>.
        </p>

        {/* CTA */}
        <div className="reveal reveal-delay-5 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/quote"
            className="btn-glow px-10 py-5 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-xl text-lg flex items-center gap-3"
          >
            Build a Custom Quote
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
      </div>
    </section>
  );
}

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);
  useCardSpotlight(gridRef);

  return (
    <div className="w-full">
      <SchemaMarkup schema={localBusinessSchema()} />

      {/* ════════════════════════════════════════════════════════════
          CINEMATIC INTRO — Automatically zooms through the gate once per session
          ════════════════════════════════════════════════════════════ */}
      <LionZoomTransition />

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION — starts white, fades into view for seamless transition
          ════════════════════════════════════════════════════════════ */}
      <HeroSection />


      {/* ════════════════════════════════════════════════════════════
          TRUST BAR — Horizontal Marquee
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-6 border-y border-[var(--color-brand-border)] overflow-hidden bg-[var(--color-brand-surface)]/30">
        <div className="marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="inline-flex items-center gap-12 px-6">
              {[
                { icon: <Star size={14} />, text: '5.0 ★ RATED' },
                { icon: <Shield size={14} />, text: 'TEXAS-BASED' },
                { icon: <Clock size={14} />, text: `EST. ${BUSINESS.foundingYear}` },
                { icon: <CheckCircle2 size={14} />, text: '50+ PROJECTS' },
                { icon: <Zap size={14} />, text: 'SEO-FIRST' },
                { icon: <Bot size={14} />, text: 'AI-POWERED' },
                { icon: <Star size={14} />, text: '5.0 ★ RATED' },
                { icon: <Shield size={14} />, text: 'TEXAS-BASED' },
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
            {serviceFamilies.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="card-spotlight glass-card rounded-2xl group relative overflow-hidden"
              >
                <div className="aspect-[16/8] overflow-hidden border-b border-[var(--color-brand-border)]">
                  <img src={service.image} alt={service.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-7 md:p-8">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-accent)] mb-4">{service.eyebrow}</span>
                  <h3 className="font-serif font-bold text-white mb-3 text-2xl">{service.navName}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-5 text-sm">{service.intro}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.services.slice(0, 4).map((item) => <span key={item.title} className="text-[10px] text-zinc-400 border border-[var(--color-brand-border)] rounded-full px-2.5 py-1">{item.title}</span>)}
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-brand-accent)] text-sm font-bold group-hover:gap-4 transition-all duration-500">Explore Service <ArrowRight size={16} /></div>
                </div>
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
            Texas-based · Remote consultations available · <a href={`tel:${BUSINESS.phone}`} className="text-[var(--color-brand-accent)]/60 hover:text-[var(--color-brand-accent)] transition-colors">{BUSINESS.phone}</a>
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
            Proudly serving businesses across Texas and remote clients nationwide.
          </p>
        </div>
      </section>
    </div>
  );
}
