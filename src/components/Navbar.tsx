import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'AI Copywriter', path: '/copywriter' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      scrolled
        ? "bg-[var(--color-brand-dark)]/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[var(--color-brand-border)]/50"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/Albright_Digital_Solutions_Logo.png"
                  alt="Albright Digital Solutions Logo"
                  className="w-24 h-24 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Logo glow */}
                <div className="absolute inset-0 bg-[var(--color-brand-accent)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === link.path
                    ? "text-[var(--color-brand-accent-light)]"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {link.name}
                {/* Active indicator */}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[var(--color-brand-accent)] rounded-full" />
                )}
              </Link>
            ))}

            {/* CTA */}
            <Link
              to="/contact"
              className="ml-4 px-5 py-2.5 text-sm font-bold rounded-lg bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent-light)] border border-[var(--color-brand-accent)]/20 hover:bg-[var(--color-brand-accent)]/20 hover:border-[var(--color-brand-accent)]/40 transition-all duration-300"
            >
              Get Started
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
        "md:hidden fixed inset-0 top-20 z-40 transition-all duration-500",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-[var(--color-brand-dark)]/95 backdrop-blur-xl" />
        <div className="relative z-10 px-6 pt-8 space-y-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300",
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0',
                location.pathname === link.path
                  ? "text-[var(--color-brand-accent-light)] bg-[var(--color-brand-accent)]/[0.06]"
                  : "text-zinc-300 hover:text-white hover:bg-[var(--color-brand-surface)]"
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-6">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-6 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-xl text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
