import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SchemaMarkup, { breadcrumbSchema, BUSINESS, localBusinessSchema, offerCatalogSchema, websiteSchema } from '../components/SchemaMarkup';
import { serviceFamilies } from '../data/serviceFamilies';

const details = [
  { label: 'Legal business name', value: BUSINESS.legalName },
  { label: 'Public business name', value: BUSINESS.name },
  { label: 'Address', value: BUSINESS.address.formatted },
  { label: 'Phone', value: BUSINESS.phone, href: `tel:${BUSINESS.phone}` },
  { label: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
  { label: 'Website', value: BUSINESS.url.replace('https://', ''), href: BUSINESS.url },
  { label: 'Hours', value: 'Available 24/7' },
  { label: 'Service area', value: 'Texas-based; remote consultations available nationwide' },
  { label: 'Founder', value: BUSINESS.founder.name },
];

export default function BusinessProfile() {
  const schemas = [
    localBusinessSchema(),
    websiteSchema(),
    offerCatalogSchema(serviceFamilies),
    breadcrumbSchema([
      { name: 'Home', url: BUSINESS.url },
      { name: 'Business Information', url: `${BUSINESS.url}/business-profile` },
    ]),
  ];

  return (
    <div className="w-full bg-[var(--color-brand-dark)]">
      <SchemaMarkup schema={schemas} />
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/30 border-b border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-brand-accent)] mb-4">Business Information</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{BUSINESS.name}</h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Official business details for {BUSINESS.legalName}, a Texas-based digital agency helping small businesses with AI automation, websites, workflow systems, Google Business Profile support, local visibility, and connected business operations.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-2xl p-8 h-fit">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Verified Details</h2>
            <dl className="space-y-5">
              {details.map((item) => (
                <div key={item.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-accent)] mb-1">{item.label}</dt>
                  <dd className="text-zinc-300">
                    {item.href ? (
                      <a href={item.href} className="hover:text-[var(--color-brand-accent)] transition-colors">{item.value}</a>
                    ) : item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Core Services</h2>
              <p className="text-zinc-400 leading-relaxed">
                These service categories match the way {BUSINESS.name} describes its work across the website and public business profiles.
              </p>
            </div>
            <div className="grid gap-4">
              {serviceFamilies.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)]/70 rounded-2xl p-6 transition-colors hover:border-[var(--color-brand-accent)]/50"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 text-[var(--color-brand-accent)] shrink-0" size={20} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-accent)] mb-2">{service.eyebrow}</p>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-brand-accent-light)] transition-colors">{service.navName}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{service.intro}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto border border-[var(--color-brand-border)] bg-black/30 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-brand-accent)] mb-3">Need help?</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Start with a custom quote or contact Jason directly.</h2>
          </div>
          <Link to="/quote" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">
            Build a Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
