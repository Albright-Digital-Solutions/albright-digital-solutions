import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'Quarterly Performance Tuning';
const SERVICE_URL = `${BUSINESS.url}/services/performance-tuning`;

const faqs = [
  { question: 'What does a quarterly review include?', answer: 'Security patches, performance optimization, content updates, form and integration testing, SEO health check, mobile responsiveness audit, and a written report with recommendations for the next quarter.' },
  { question: 'Can I cancel anytime?', answer: 'Yes. There is no long-term contract. We work on a quarterly basis. If you are happy with the results, we continue. If not, we part ways professionally with no hard feelings.' },
  { question: 'What if something breaks between quarters?', answer: 'Emergency support is included. If your site goes down or a critical system fails, we respond within 4 business hours. You are never left waiting for the next scheduled review.' },
  { question: 'Do you also update content?', answer: 'Yes. Each quarter includes up to 2 hours of content updates — new services, team changes, seasonal promotions, updated pricing, whatever your business needs to stay current.' },
  { question: 'How much does Quarterly Performance Tuning cost?', answer: 'Plans start at $750 per quarter. Given that a single website failure can cost thousands in lost business, it is the most cost-effective insurance policy you can buy for your digital infrastructure.' },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="svc-faq-item">
      <button onClick={() => setOpen(!open)} className="svc-faq-trigger">
        <h3>{question}</h3>
        <ChevronDown size={20} className={`svc-faq-icon ${open ? 'svc-faq-icon--open' : ''}`} />
      </button>
      <div className={`svc-faq-body ${open ? 'svc-faq-body--open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function PerformanceTuning() {
  const schemas = [
    serviceSchema(SERVICE_NAME, 'Quarterly digital infrastructure reviews, security patching, performance optimization, and content updates for businesses in Texas and remote clients nationwide.', SERVICE_URL),
    faqSchema(faqs),
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: SERVICE_NAME, url: SERVICE_URL }]),
  ];

  return (
    <div className="svc-page">
      <SchemaMarkup schema={schemas} />

      {/* ── Hero ── */}
      <section className="svc-hero">
        <div className="svc-container">
          <nav className="svc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>{SERVICE_NAME}</span>
          </nav>
          <div className="svc-eyebrow">Ongoing Maintenance &amp; Support</div>
          <h1 className="svc-heading">{SERVICE_NAME}</h1>
          <p className="svc-body">
            Technology does not age well on its own. Every quarter, we review your digital systems, update what needs updating, fix what is drifting, and make sure your infrastructure evolves as your business grows.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Start Quarterly Tuning <ArrowRight size={18} />
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="svc-cta-btn svc-cta-btn--outline">
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="svc-section">
        <div className="svc-container">
          <div className="svc-eyebrow">The Problem</div>
          <h2 className="svc-subheading">You built it. Then you forgot about it.</h2>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            You invested in a website. You set up your systems. You launched and moved on. That was two years ago.
          </p>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            Now the website has outdated service descriptions. The contact form stopped working three months ago and nobody noticed. Your SSL certificate expired — and Google is warning visitors your site is not secure. The scheduling system stopped syncing with your calendar. Your online reviews page links to a dead URL.
          </p>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            Your digital presence is slowly deteriorating because nobody is maintaining it.
          </p>
          <p className="svc-body" style={{ fontWeight: 600, color: '#0f172a' }}>
            It is like buying a truck and never changing the oil. Eventually, it stops running.
          </p>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="svc-section--alt">
        <div className="svc-container">
          <div className="svc-eyebrow">The Solution</div>
          <h2 className="svc-subheading">An oil change for your business technology.</h2>
          <p className="svc-body" style={{ marginBottom: '2.5rem' }}>
            Every quarter, we perform a comprehensive review of your entire digital infrastructure. We fix issues before they become problems. We update content that has gone stale. We tune performance so your site stays fast. And we provide a clear report of everything we did and everything we recommend for the next quarter.
          </p>

          <div className="svc-steps">
            <div className="svc-step">
              <div className="svc-step-num">1</div>
              <div>
                <h3>Security &amp; Performance Audit</h3>
                <p>We check for vulnerabilities, apply security patches, test page load speeds, and ensure your SSL certificates and DNS records are current. The same standards we apply to our financial services clients.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">2</div>
              <div>
                <h3>Functionality Testing</h3>
                <p>Every form, every link, every integration gets tested. Contact forms, scheduling widgets, payment processing, email notifications — if it touches a customer, we verify it works.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">3</div>
              <div>
                <h3>Content &amp; SEO Refresh</h3>
                <p>We update outdated information, refresh seasonal content, check your Google Business listing, review search rankings, and ensure your mobile experience is flawless.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">4</div>
              <div>
                <h3>Written Report &amp; Recommendations</h3>
                <p>You receive a clear, plain-English report of everything we found, everything we fixed, and our recommendations for the next quarter. No surprises. Full transparency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Result ── */}
      <section className="svc-section">
        <div className="svc-container">
          <div className="svc-eyebrow">The Result</div>
          <h2 className="svc-subheading">Systems that grow with your business.</h2>
          <div className="svc-stats">
            {[
              { val: '4×', label: 'Per Year' },
              { val: '99.9%', label: 'Uptime Maintained' },
              { val: 'Zero', label: 'Surprise Failures' },
              { val: 'Evolving', label: 'Systems' },
            ].map((s) => (
              <div key={s.label} className="svc-stat-block">
                <div className="svc-stat">{s.val}</div>
                <div className="svc-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <hr className="svc-divider" />
          <ul className="svc-checklist">
            <li>Preventive maintenance catches problems before your customers do</li>
            <li>Regular updates keep your content accurate and your rankings strong</li>
            <li>Emergency support included — you are never left waiting</li>
            <li>Quarterly reports give you full visibility into your digital health</li>
            <li>Your technology evolves as your business adds services and grows</li>
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="svc-section--alt">
        <div className="svc-container">
          <h2 className="svc-subheading" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
          {faqs.map((faq) => <FAQItem key={faq.question} {...faq} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="svc-cta">
        <div className="svc-container">
          <h2 className="svc-heading">Stop letting your technology deteriorate.</h2>
          <p className="svc-body">Regular, predictable maintenance keeps your systems sharp, your data secure, and your business running without interruption.</p>
          <p className="svc-cta-contact">
            Texas-based · Remote consultations available · <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Start Quarterly Tuning <ArrowRight size={18} />
            </Link>
            <Link to="/services/digital-infrastructure" className="svc-cta-btn svc-cta-btn--outline">
              See Infrastructure Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
