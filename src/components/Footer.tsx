import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-surface)] border-t border-[var(--color-brand-border)] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Albright Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none tracking-wide text-white">ALBRIGHT</span>
                <span className="text-[0.6rem] font-sans tracking-[0.2em] uppercase text-zinc-400 mt-1">Digital Solutions</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm">
              Lighting the path for your business with comprehensive digital infrastructure and creative assets.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link to="/services" className="hover:text-[var(--color-brand-accent)] transition-colors">AI Agents</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-brand-accent)] transition-colors">Website Design</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-brand-accent)] transition-colors">Video Editing</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-brand-accent)] transition-colors">Graphic Design</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link to="/about" className="hover:text-[var(--color-brand-accent)] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-brand-accent)] transition-colors">Contact</Link></li>
              <li><Link to="/copywriter" className="hover:text-[var(--color-brand-accent)] transition-colors">AI Copywriter (Beta)</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--color-brand-border)] mt-12 pt-8 text-center text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Albright Digital Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
