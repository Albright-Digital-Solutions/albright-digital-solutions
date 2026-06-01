import { ArrowRight, ClipboardCheck, Server, GraduationCap, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import SchemaMarkup, { breadcrumbSchema, BUSINESS } from '../components/SchemaMarkup';

const services = [
  {
    icon: <ClipboardCheck size={32} />,
    title: 'The Workflow Audit',
    sub: 'Operational Tune-Up',
    desc: 'We walk through your day-to-day operations, step by step, and identify the bottlenecks, double-entry, and time-sinks that are quietly costing you money. You get a clear, prioritized action plan you can implement immediately.',
    link: '/services/workflow-audit',
    stat: '10+ hrs saved/week',
  },
  {
    icon: <Server size={32} />,
    title: 'Done-For-You Digital Infrastructure',
    sub: 'Build. Own. Control.',
    desc: 'We build the digital backbone of your business — website, email, scheduling, payments, CRM — and hand you the keys. No monthly dependency. No vendor lock-in. You own everything, built to bank-grade security standards.',
    link: '/services/digital-infrastructure',
    stat: '100% client ownership',
  },
  {
    icon: <GraduationCap size={32} />,
    title: 'AI Prompt & Process Training',
    sub: 'Staff Enablement',
    desc: 'AI is only as good as the person giving it instructions. We train your team — hands-on — to speak its language clearly and effectively, so one person can do the work of five. No theory. No lectures. Immediate results.',
    link: '/services/ai-training',
    stat: '5× productivity per employee',
  },
  {
    icon: <Wrench size={32} />,
    title: 'Quarterly Performance Tuning',
    sub: 'Ongoing Maintenance',
    desc: 'Technology does not age well on its own. Every quarter, we review your digital systems, apply security patches, update stale content, and make sure everything keeps working. Think of it as an oil change for your business technology.',
    link: '/services/performance-tuning',
    stat: '99.9% uptime maintained',
  },
];

export default function Services() {
  const schemas = [
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Services', url: `${BUSINESS.url}/services` }]),
  ];

  return (
    <div className="svc-page">
      <SchemaMarkup schema={schemas} />

      {/* ── Hero ── */}
      <section className="svc-hero">
        <div className="svc-container">
          <div className="svc-eyebrow">Our Services</div>
          <h1 className="svc-heading">Professional digital infrastructure for serious businesses.</h1>
          <p className="svc-body">
            {BUSINESS.name} provides practical, results-driven digital services for businesses in {BUSINESS.address.city}, Texas and across Central Texas. No flash. No filler. Just reliable systems that work.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="svc-section">
        <div className="svc-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {services.map((service, i) => (
              <article key={service.title}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '3.5rem 1fr',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="svc-eyebrow">{service.sub}</div>
                    <h2 className="svc-subheading" style={{ marginBottom: '0.75rem' }}>{service.title}</h2>
                    <p className="svc-body" style={{ marginBottom: '1rem' }}>{service.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                      <Link
                        to={service.link}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontWeight: 700,
                          fontSize: '0.9375rem',
                          color: '#1e3a5f',
                          textDecoration: 'none',
                        }}
                      >
                        Learn More <ArrowRight size={16} />
                      </Link>
                      <span style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        {service.stat}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider between services */}
                {i < services.length - 1 && <hr className="svc-divider" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="svc-cta">
        <div className="svc-container">
          <h2 className="svc-heading">Not sure which service you need?</h2>
          <p className="svc-body">
            Start with a conversation. We will listen to where your business is, understand where you want it to go, and recommend the right path forward.
          </p>
          <p className="svc-cta-contact">
            {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip} · <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a>
          </p>
          <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
            Schedule a Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
