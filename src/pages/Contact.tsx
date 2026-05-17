import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/30 border-b border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-zinc-400 font-sans">
            Ready to upgrade your digital infrastructure? Let's talk.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-8">Get in Touch</h2>
            <p className="text-zinc-400 mb-12 text-lg">
              Whether you need to automate workflows with AI, build a custom platform, or upgrade your creative assets, our team is ready to execute your vision.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-brand-surface)] p-3 rounded-lg border border-[var(--color-brand-border)] text-[var(--color-brand-accent)]">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Email</h3>
                  <p className="text-zinc-400">hello@albrightdigital.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-brand-surface)] p-3 rounded-lg border border-[var(--color-brand-border)] text-[var(--color-brand-accent)]">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Phone</h3>
                  <p className="text-zinc-400">+1 (800) 555-0199</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-brand-surface)] p-3 rounded-lg border border-[var(--color-brand-border)] text-[var(--color-brand-accent)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Office</h3>
                  <p className="text-zinc-400">
                    100 Innovation Drive<br />
                    Suite 400<br />
                    San Francisco, CA 94111
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--color-brand-surface)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-zinc-400 mb-2">Interested Service</label>
                <select 
                  id="service" 
                  className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors appearance-none"
                >
                  <option>AI Agents & Automation</option>
                  <option>Website Design & Dev</option>
                  <option>Video Editing</option>
                  <option>Graphic Design</option>
                  <option>Other / Multiple</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Project Details</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-light)] text-zinc-950 font-bold py-4 px-6 rounded-lg transition-colors"
              >
                Submit Request <Send size={18} />
              </button>
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
}
