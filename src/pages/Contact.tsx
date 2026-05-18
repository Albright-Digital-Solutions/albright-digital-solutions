import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import SchemaMarkup, { breadcrumbSchema, BUSINESS } from '../components/SchemaMarkup';

export default function Contact() {
  const schemas = [
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Contact', url: `${BUSINESS.url}/contact` }]),
  ];

  return (
    <div className="w-full">
      <SchemaMarkup schema={schemas} />

      {/* Header */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/30 border-b border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Contact {BUSINESS.name}</h1>
          <p className="text-xl text-zinc-400 font-sans">
            Ready to upgrade your digital infrastructure? Reach out for a free strategy consultation — no obligation, no sales pressure.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Contact Info with Real NAP */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-8">Get in Touch</h2>
            <p className="text-zinc-400 mb-12 text-lg">
              Whether you need AI automation, a custom website, professional video editing, or brand design — our team in {BUSINESS.address.city}, Texas is ready to execute your vision.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-brand-surface)] p-3 rounded-lg border border-[var(--color-brand-border)] text-[var(--color-brand-accent)]">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Email</h3>
                  <a href={`mailto:${BUSINESS.email}`} className="text-zinc-400 hover:text-[var(--color-brand-accent)] transition-colors">{BUSINESS.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-brand-surface)] p-3 rounded-lg border border-[var(--color-brand-border)] text-[var(--color-brand-accent)]">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Phone</h3>
                  <a href={`tel:${BUSINESS.phone}`} className="text-zinc-400 hover:text-[var(--color-brand-accent)] transition-colors">{BUSINESS.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-brand-surface)] p-3 rounded-lg border border-[var(--color-brand-border)] text-[var(--color-brand-accent)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Office</h3>
                  <p className="text-zinc-400">
                    {BUSINESS.address.street}<br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-brand-surface)] p-3 rounded-lg border border-[var(--color-brand-border)] text-[var(--color-brand-accent)]">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Business Hours</h3>
                  <p className="text-zinc-400">
                    Monday – Friday: 8:00 AM – 6:00 PM<br />
                    Saturday: 9:00 AM – 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Service Area Signal */}
            <div className="mt-12 bg-[var(--color-brand-surface)]/50 border border-[var(--color-brand-border)] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Service Areas</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We serve businesses in Austin, Round Rock, Cedar Park, Georgetown, San Marcos, Pflugerville, Leander, Kyle, Dripping Springs, and all of Central Texas. Remote services available nationwide.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--color-brand-surface)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-firstName" className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                  <input
                    type="text"
                    id="contact-firstName"
                    className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-lastName" className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="contact-lastName"
                    className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-zinc-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="contact-phone"
                  className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-sm font-medium text-zinc-400 mb-2">Interested Service</label>
                <select
                  id="contact-service"
                  className="w-full bg-[var(--color-brand-dark)] text-white border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors appearance-none"
                >
                  <option>AI Agents & Automation</option>
                  <option>Website Design & Development</option>
                  <option>Video Editing & Production</option>
                  <option>Graphic Design & Branding</option>
                  <option>Multiple Services / Full Package</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-400 mb-2">Project Details</label>
                <textarea
                  id="contact-message"
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
