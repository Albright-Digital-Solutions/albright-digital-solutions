import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BUSINESS } from './SchemaMarkup';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-auto">
      {/* Top accent line */}
      <div className="line-accent w-full" />

      <div className="relative bg-[var(--color-brand-surface)]/80 py-20">
        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-brand-accent)]/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

            {/* Brand column */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start">
              <Link to="/" className="inline-block mb-6 group self-center -translate-x-4 md:-translate-x-2">
                <img
                  src="/Albright_Digital_Solutions_Logo.png"
                  alt="Albright Digital Solutions Logo"
                  className="w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mb-6 text-center md:text-left">
                {BUSINESS.description}
              </p>
              <div className="space-y-1 text-xs text-zinc-500 text-center md:text-left">
                <p>Texas-based · Remote consultations available</p>
                <p>
                  <a href={`tel:${BUSINESS.phone}`} className="hover:text-[var(--color-brand-accent)] transition-colors">{BUSINESS.phone}</a>
                  {' · '}
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-[var(--color-brand-accent)] transition-colors">{BUSINESS.email}</a>
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="md:col-span-3">
              <h3 className="text-[10px] font-bold text-[var(--color-brand-accent)] uppercase tracking-[0.25em] mb-6">Services</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Custom AI Agents', path: '/services/custom-ai-agents' },
                  { name: 'Web Design & Dev', path: '/services/web-design' },
                  { name: 'Video Editing', path: '/services/video-editing' },
                  { name: 'Graphic Design', path: '/contact' },
                  { name: 'Social Media Management', path: '/quote' },
                  { name: 'Google & Local Visibility', path: '/quote' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-brand-accent)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <h3 className="text-[10px] font-bold text-[var(--color-brand-accent)] uppercase tracking-[0.25em] mb-6">Company</h3>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Build a Quote', path: '/quote' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-brand-accent)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div className="md:col-span-2">
              <h3 className="text-[10px] font-bold text-[var(--color-brand-accent)] uppercase tracking-[0.25em] mb-6">Service Areas</h3>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>Texas</li>
                <li>Remote Clients</li>
                <li>Small Businesses</li>
                <li>Service Businesses</li>
                <li>Startups</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-[var(--color-brand-border)]/50 flex flex-col items-center gap-5">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-brand-border)]/70 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              <span aria-hidden="true" className="text-base leading-none">🇺🇸</span>
              <span>Proudly American Owned</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
            </p>
            <p className="text-xs text-zinc-700">
              Serving businesses across Texas and remote clients nationwide.
            </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
