import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { serviceFamilies } from '../data/serviceFamilies';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); setServicesOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      scrolled || isOpen
        ? "bg-[var(--color-brand-dark)] shadow-lg shadow-black/20 border-b border-[var(--color-brand-border)]/70"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-[10px]">
        <div className="flex justify-between h-[146px] items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/Albright_Digital_Solutions_Logo.png"
                  alt="Albright Digital Solutions Logo"
                  className="w-36 h-36 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Logo glow */}
                <div className="absolute inset-0 bg-[var(--color-brand-accent)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => link.name === 'Services' ? (
              <div key={link.name} className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <Link to={link.path} className={cn("relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1", location.pathname.startsWith('/services') ? "text-[var(--color-brand-accent-light)]" : "text-zinc-400 hover:text-white")}>
                  Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </Link>
                <div className={cn("absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[580px] transition-all duration-200", servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2")}>
                  <div className="rounded-2xl border border-[var(--color-brand-border)] bg-[#0d0c0b]/95 backdrop-blur-xl p-3 shadow-2xl shadow-black/60 grid grid-cols-2 gap-1">
                    {serviceFamilies.map((service) => <Link key={service.slug} to={`/services/${service.slug}`} className="rounded-xl p-3 hover:bg-[var(--color-brand-accent)]/[0.08] transition-colors group/item">
                      <strong className="block text-sm text-zinc-200 group-hover/item:text-[var(--color-brand-accent-light)]">{service.navName}</strong>
                      <span className="block text-[11px] leading-relaxed text-zinc-500 mt-1">{service.eyebrow}</span>
                    </Link>)}
                    <Link to="/services" className="col-span-2 border-t border-[var(--color-brand-border)] mt-2 pt-3 px-3 pb-1 text-xs font-bold text-[var(--color-brand-accent)] flex items-center justify-between">View all services <span>→</span></Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={link.name} to={link.path} className={cn("relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300", location.pathname === link.path ? "text-[var(--color-brand-accent-light)]" : "text-zinc-400 hover:text-white")}>
                {link.name}
                {location.pathname === link.path && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[var(--color-brand-accent)] rounded-full" />}
              </Link>
            ))}

            {/* CTA */}
            <Link
              to="/quote"
              className="ml-4 px-5 py-2.5 text-sm font-bold rounded-lg bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent-light)] border border-[var(--color-brand-accent)]/20 hover:bg-[var(--color-brand-accent)]/20 hover:border-[var(--color-brand-accent)]/40 transition-all duration-300"
            >
              <FileText size={15} className="inline mr-2" /> Build a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav — full screen overlay */}
      <div className={cn(
        "md:hidden fixed left-0 right-0 top-[146px] bottom-0 z-40 transition-all duration-500",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-[#0A0A09]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(229,159,43,0.08),rgba(10,10,9,0)_38%)]" />
        <div className="relative z-10 h-full overflow-y-auto px-6 pt-8 pb-10 space-y-2 border-t border-[var(--color-brand-border)]/80 shadow-2xl shadow-black">
          {navLinks.map((link, i) => (
            <div key={link.name}>
              {link.name === 'Services' ? <>
                <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium text-zinc-100 bg-[#141311] border border-[var(--color-brand-border)]/80 shadow-lg shadow-black/30">
                  Services <ChevronDown size={18} className={servicesOpen ? 'rotate-180' : ''} />
                </button>
                {servicesOpen && <div className="mt-2 rounded-xl border border-[var(--color-brand-border)]/80 bg-[#100f0e] p-3 grid gap-1 shadow-xl shadow-black/40">
                  <Link to="/services" className="px-3 py-2 text-sm font-semibold text-[var(--color-brand-accent)]">All Services</Link>
                  {serviceFamilies.map((service) => <Link key={service.slug} to={`/services/${service.slug}`} className="px-3 py-2 text-sm text-zinc-200 hover:text-white hover:bg-[var(--color-brand-accent)]/10 rounded-lg">{service.navName}</Link>)}
                </div>}
              </> : <Link to={link.path} onClick={() => setIsOpen(false)} className={cn("block px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 border shadow-lg shadow-black/20", isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0', location.pathname === link.path ? "text-[var(--color-brand-accent-light)] bg-[var(--color-brand-accent)]/[0.12] border-[var(--color-brand-accent)]/25" : "text-zinc-100 bg-[#141311] border-[var(--color-brand-border)]/80 hover:text-white hover:bg-[#1b1916]")} style={{ transitionDelay: `${i * 50}ms` }}>{link.name}</Link>}
            </div>
          ))}

          <div className="pt-6">
            <Link
              to="/quote"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-6 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-xl text-lg"
            >
              Build a Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
