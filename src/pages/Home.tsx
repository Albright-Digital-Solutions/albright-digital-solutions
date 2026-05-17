import { Link } from 'react-router-dom';
import { ArrowRight, Code, Video, Palette, Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-brand-accent)]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight mb-6 leading-tight">
            Lighting the path for your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-accent-light)] to-[var(--color-brand-accent-dark)]">
              Digital Infrastructure
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Albright Digital Solutions is your comprehensive partner for custom web development, specialized AI automation, and high-impact creative support.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/services" 
              className="px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors flex items-center gap-2"
            >
              Explore Services
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-[var(--color-brand-surface)] text-white font-bold rounded-lg hover:bg-[var(--color-brand-border)] border border-[var(--color-brand-border)] transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="px-4 py-24 bg-[var(--color-brand-surface)]/50 border-y border-[var(--color-brand-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Everything You Need to Scale</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">From robust technical platforms to compelling creative assets, we build the foundation for your business growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Bot size={32} />}
              title="AI Agents"
              description="Custom automated solutions and autonomous agents to streamine operations and support."
            />
            <ServiceCard 
              icon={<Code size={32} />}
              title="Website Design"
              description="Tailored digital platforms, e-commerce, and high-performance technical architecture."
            />
            <ServiceCard 
              icon={<Video size={32} />}
              title="Video Editing"
              description="Professional video post-production for pitches, social media, and marketing."
            />
            <ServiceCard 
              icon={<Palette size={32} />}
              title="Graphic Design"
              description="Impactful media kits, branding materials, and aesthetic assets that convert."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[var(--color-brand-dark)] border border-[var(--color-brand-border)] p-8 rounded-2xl hover:border-[var(--color-brand-accent)]/50 transition-colors group">
      <div className="text-[var(--color-brand-accent)] mb-6 group-hover:scale-110 transition-transform origin-left">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
