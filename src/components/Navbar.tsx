import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Copywriter', path: '/copywriter' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-dark/90 backdrop-blur-md border-b border-[var(--color-brand-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Albright Logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none tracking-wide text-white">ALBRIGHT</span>
                <span className="text-[0.6rem] font-sans tracking-[0.2em] uppercase text-zinc-400 mt-1">Digital Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-white",
                  location.pathname === link.path 
                    ? "text-[var(--color-brand-accent)] bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)]" 
                    : "text-zinc-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "text-[var(--color-brand-accent)] bg-[var(--color-brand-dark)] border border-[var(--color-brand-border)]"
                    : "text-zinc-300 hover:text-white hover:bg-[var(--color-brand-dark)]/50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
