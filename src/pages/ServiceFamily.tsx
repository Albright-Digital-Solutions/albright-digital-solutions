import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SchemaMarkup, { breadcrumbSchema, BUSINESS, faqSchema, localBusinessSchema, serviceSchema } from '../components/SchemaMarkup';
import { serviceBySlug } from '../data/serviceFamilies';

export default function ServiceFamily() {
  const { slug = '' } = useParams();
  const service = serviceBySlug(slug);
  if (!service) return <Navigate to="/services" replace />;

  const serviceUrl = `${BUSINESS.url}/services/${service.slug}`;
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Services', url: `${BUSINESS.url}/services` }, { name: service.navName, url: serviceUrl }]),
    serviceSchema(service.navName, service.intro, serviceUrl),
    ...(service.faqs?.length ? [faqSchema(service.faqs)] : []),
  ];

  return <div className="family-page">
    <SchemaMarkup schema={schemas} />
    <section className="family-hero">
      <img src={service.image} alt={service.imageAlt} />
      <div className="family-hero-overlay" />
      <div className="family-shell family-hero-content">
        <span>{service.eyebrow}</span>
        <h1>{service.title}</h1>
        <p>{service.intro}</p>
        <Link to="/quote">Build a Custom Quote <ArrowRight size={18} /></Link>
      </div>
    </section>
    <section className="family-section family-shell">
      <div className="family-section-head"><span>What We Can Handle</span><h2>Choose the support your business needs.</h2></div>
      <div className="family-grid">
        {service.services.map((item) => <article key={item.title}><CheckCircle2 size={22} /><h3>{item.title}</h3><p>{item.description}</p></article>)}
      </div>
      {service.note && <div className="family-note"><strong>Important:</strong> {service.note}</div>}
    </section>
    <section className="family-process">
      <div className="family-shell"><div className="family-section-head"><span>How We Work</span><h2>A clear, accountable process.</h2></div>
        <div className="family-process-grid">{service.process.map((step, index) => <article key={step.title}><b>{String(index + 1).padStart(2, '0')}</b><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </div>
    </section>
    {service.faqs?.length ? <section className="family-section family-shell">
      <div className="family-section-head"><span>Frequently Asked Questions</span><h2>Helpful answers before we build your plan.</h2></div>
      <div className="family-faq-grid">
        {service.faqs.map((faq) => <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>)}
      </div>
    </section> : null}
    <section className="family-cta"><div className="family-shell"><span>Build around your priorities</span><h2>Select services. See a private estimate. Start a conversation.</h2><Link to="/quote">Build Your Quote <ArrowRight size={18} /></Link></div></section>
  </div>;
}
