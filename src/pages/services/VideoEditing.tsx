import { Link } from 'react-router-dom';
import { ArrowRight, Video, Film, Clapperboard, MonitorPlay, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'Video Editing & Production in Austin, Texas';
const SERVICE_URL = `${BUSINESS.url}/services/video-editing`;

const faqs = [
  { question: 'What types of video editing does Albright Digital Solutions offer?', answer: 'We offer complete post-production services including business pitch videos, commercial advertising edits, social media shorts and reels, brand story documentaries, training and onboarding videos, and event highlight reels. We handle color grading, motion graphics, sound design, and final mastering for all formats.' },
  { question: 'How much does professional video editing cost?', answer: 'Social media short-form edits (reels, TikToks, YouTube Shorts) start at $250 per video. Full commercial edits and business pitch videos range from $1,000–$5,000 depending on length, complexity, and motion graphics requirements. Volume packages are available for businesses that need consistent monthly content.' },
  { question: 'Do you film video or just edit?', answer: 'Our core specialty is post-production editing, but we partner with trusted videographers across Texas for businesses that need full-service production from filming to final delivery. We manage the entire process so you have a single point of contact.' },
  { question: 'What is the turnaround time for video editing?', answer: 'Social media shorts are typically delivered within 3–5 business days. Full commercial edits take 1–2 weeks. Rush delivery is available for time-sensitive projects at an additional fee. All projects include two rounds of revisions.' },
  { question: 'Can you create motion graphics and animated content?', answer: 'Yes. We create custom motion graphics including animated logos, kinetic typography, data visualizations, explainer animations, and lower thirds. Motion graphics are especially effective for business pitch decks and social media content that needs to stand out in crowded feeds.' },
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

export default function VideoEditing() {
  const schemas = [
    serviceSchema(SERVICE_NAME, 'Professional video editing and production for businesses in Austin, Round Rock, Cedar Park, and Central Texas.', SERVICE_URL),
    faqSchema(faqs),
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Video Editing & Production', url: SERVICE_URL }]),
  ];

  return (
    <div className="w-full">
      <SchemaMarkup schema={schemas} />

      {/* Hero */}
      <section className="relative px-4 py-20 sm:py-28 overflow-hidden border-b border-[var(--color-brand-border)]">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-brand-accent)]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-[var(--color-brand-accent)] transition-colors">Home</Link><span>/</span><span className="text-zinc-300">Video Editing &amp; Production</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">{SERVICE_NAME}</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-8">
            {BUSINESS.name} delivers professional video editing and post-production services for businesses in Austin, Round Rock, Cedar Park, Georgetown, and across Central Texas. From investor pitch videos and commercial advertising to social media content and brand documentaries, we craft visual narratives that command attention, communicate value, and drive measurable engagement across every platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">
              Request a Quote <ArrowRight size={18} />
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
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Video Services We Deliver</h2>
          <div className="space-y-12">
            {[
              { icon: <Film size={28} />, title: 'Business Pitch & Investor Videos', text: 'First impressions define funding outcomes. We produce polished, narrative-driven pitch videos that distill your value proposition into a compelling visual story. Our edits include professional color grading, kinetic typography, data visualization overlays, and cinematic transitions that position your startup or small business as credible, innovative, and investable. Businesses across Central Texas trust us to produce the videos that secure partnerships and capital.' },
              { icon: <Clapperboard size={28} />, title: 'Commercial Advertising & Brand Films', text: 'We transform raw footage into broadcast-quality advertisements and brand films. Our post-production pipeline includes multi-camera editing, sound design, music licensing and integration, motion graphics, and format optimization for TV, YouTube pre-roll, Facebook, and Instagram. Texas businesses that invest in professional video advertising see significantly higher engagement rates compared to static image campaigns.' },
              { icon: <MonitorPlay size={28} />, title: 'Social Media Content (Reels, Shorts, TikTok)', text: 'Short-form video dominates social media algorithms. We produce scroll-stopping reels, YouTube Shorts, and TikTok content designed for maximum engagement — including hook-first editing, trending format adaptation, captions, and platform-specific aspect ratio optimization. Our monthly content packages help Austin and Central Texas businesses maintain a consistent, professional social media presence without the burden of in-house production.' },
              { icon: <Video size={28} />, title: 'Training, Onboarding & Internal Communications', text: 'Reduce onboarding time and improve knowledge retention with professionally edited training videos. We produce structured instructional content with chapter markers, screen recordings, voiceover integration, and animated diagrams. These assets scale your team training without requiring senior staff to repeat the same information to every new hire.' },
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
          {[{ val: '4K', label: 'Resolution Standard' }, { val: '3–5d', label: 'Shorts Turnaround' }, { val: '2', label: 'Revision Rounds' }, { val: '100+', label: 'Videos Delivered' }].map((s) => (
            <div key={s.label}><div className="text-3xl font-serif font-bold text-[var(--color-brand-accent)] mb-1">{s.val}</div><div className="text-sm text-zinc-400">{s.label}</div></div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-4 text-center">Frequently Asked Questions About Video Production in {BUSINESS.address.city}</h2>
          <p className="text-zinc-400 text-center mb-12">Common questions about professional video editing services.</p>
          <div className="space-y-3">{faqs.map((faq) => <FAQItem key={faq.question} {...faq} />)}</div>
        </div>
      </section>

      {/* CTA + NAP */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/50 border-t border-[var(--color-brand-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready to Elevate Your Video Content?</h2>
          <p className="text-zinc-400 mb-4">Contact {BUSINESS.name} for a free video project consultation.</p>
          <p className="text-zinc-500 text-sm mb-8">{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip} · <a href={`tel:${BUSINESS.phone}`} className="text-[var(--color-brand-accent)]">{BUSINESS.phone}</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">Request a Quote <ArrowRight size={18} /></Link>
            <Link to="/services/ai-automation" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-surface)] text-white font-bold rounded-lg border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)] transition-colors">See AI Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
