import { Link } from 'react-router-dom';
import { ArrowRight, Video, Film, Clapperboard, MonitorPlay, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'Video Editing';
const SERVICE_URL = `${BUSINESS.url}/services/video-editing`;

const faqs = [
  { question: 'What types of video editing does Albright Digital Solutions LLC offer?', answer: 'We offer post-production editing for client-supplied footage, including business pitch videos, commercial advertising edits, social media shorts and reels, brand story edits, training and onboarding videos, and event highlight edits. We can handle captions, pacing, color correction, motion graphics, sound cleanup, and platform-ready exports.' },
  { question: 'How much does professional video editing cost?', answer: 'Social media short-form edits (reels, TikToks, YouTube Shorts) start at $250 per video. Full commercial edits and business pitch videos range from $1,000–$5,000 depending on length, complexity, and motion graphics requirements. Volume packages are available for businesses that need consistent monthly content.' },
  { question: 'Do you film video or just edit?', answer: 'Albright Digital Solutions LLC edits client-supplied photography and footage. On-location photography and filming are not included.' },
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
    serviceSchema(SERVICE_NAME, 'Professional video editing and post-production for client-supplied footage from Texas businesses and remote clients nationwide.', SERVICE_URL),
    faqSchema(faqs),
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Video Editing', url: SERVICE_URL }]),
  ];

  return (
    <div className="w-full">
      <SchemaMarkup schema={schemas} />

      {/* Hero */}
      <section className="relative px-4 py-20 sm:py-28 overflow-hidden border-b border-[var(--color-brand-border)]">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-brand-accent)]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-[var(--color-brand-accent)] transition-colors">Home</Link><span>/</span><span className="text-zinc-300">Video Editing</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">{SERVICE_NAME}</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-8">
            {BUSINESS.name} delivers professional video editing and post-production services for client-supplied footage. From pitch videos and commercial advertising edits to social media content and training clips, we turn the media your business already has into platform-ready assets that look cleaner, sharper, and more intentional.
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
              { icon: <Film size={28} />, title: 'Business Pitch & Investor Videos', text: 'We edit supplied clips, screen recordings, photos, and brand assets into polished pitch videos. Edits can include color correction, kinetic typography, data visualization overlays, cleaner pacing, and transitions that help the message feel credible and organized.' },
              { icon: <Clapperboard size={28} />, title: 'Commercial Advertising Edits', text: 'We transform client-supplied footage into sharper advertisements and promotional videos. Post-production can include multi-clip editing, sound cleanup, licensed music integration when approved, motion graphics, and format optimization for web and social channels.' },
              { icon: <MonitorPlay size={28} />, title: 'Social Media Content (Reels, Shorts, TikTok)', text: 'We edit platform-ready reels, YouTube Shorts, and TikTok-style content using footage your team supplies — including hook-first pacing, captions, basic graphics, and platform-specific aspect ratios.' },
              { icon: <Video size={28} />, title: 'Training, Onboarding & Internal Communications', text: 'We edit supplied recordings into structured internal videos with cleaner audio, section breaks, screen recordings, voiceover integration when provided, and simple animated diagrams where useful.' },
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
          {[{ val: '4K', label: 'Export Available' }, { val: '3–5d', label: 'Shorts Turnaround' }, { val: '2', label: 'Revision Rounds' }, { val: 'Client', label: 'Supplied Footage' }].map((s) => (
            <div key={s.label}><div className="text-3xl font-serif font-bold text-[var(--color-brand-accent)] mb-1">{s.val}</div><div className="text-sm text-zinc-400">{s.label}</div></div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-4 text-center">Frequently Asked Questions About Video Editing</h2>
          <p className="text-zinc-400 text-center mb-12">Common questions about professional video editing services.</p>
          <div className="space-y-3">{faqs.map((faq) => <FAQItem key={faq.question} {...faq} />)}</div>
        </div>
      </section>

      {/* CTA + NAP */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/50 border-t border-[var(--color-brand-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready to Elevate Your Video Content?</h2>
          <p className="text-zinc-400 mb-4">Contact {BUSINESS.name} for a free video project consultation.</p>
          <p className="text-zinc-500 text-sm mb-8">Texas-based · Remote consultations available · <a href={`tel:${BUSINESS.phone}`} className="text-[var(--color-brand-accent)]">{BUSINESS.phone}</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">Request a Quote <ArrowRight size={18} /></Link>
            <Link to="/services/ai-automation" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-surface)] text-white font-bold rounded-lg border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)] transition-colors">See AI Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
