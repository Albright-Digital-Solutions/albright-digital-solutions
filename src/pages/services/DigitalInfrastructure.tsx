import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'Done-For-You Digital Infrastructure';
const SERVICE_URL = `${BUSINESS.url}/services/digital-infrastructure`;

const faqs = [
  { question: 'What do you mean by "I own everything"?', answer: 'Every line of code, every database record, every design asset — it is yours. We hand over all credentials, source files, and documentation. If you ever want to take it to another developer, you can.' },
  { question: 'What about hosting and domain costs?', answer: 'Those are standard costs you would pay regardless (typically $10–20 per month). We set them up under YOUR accounts so you maintain full control.' },
  { question: 'How is this different from Wix or Squarespace?', answer: 'Those platforms rent you a website. If you stop paying, it disappears. We build you a website you own outright, hosted on infrastructure you control.' },
  { question: 'What security standards do you follow?', answer: 'We follow OWASP best practices, implement SSL/TLS encryption, use Content Security Policy headers, sanitize all inputs, and follow the same protocols we use for our financial services clients.' },
  { question: 'How long does a full infrastructure build take?', answer: 'Typically 4–6 weeks from kickoff to launch. We work in phases so you can start using components as they are completed.' },
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

export default function DigitalInfrastructure() {
  const schemas = [
    serviceSchema(SERVICE_NAME, 'Complete done-for-you digital infrastructure for small businesses — website, email, scheduling, payments, and CRM — built with bank-grade security. You own everything. Zero vendor lock-in.', SERVICE_URL),
    faqSchema(faqs),
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Digital Infrastructure', url: SERVICE_URL }]),
  ];

  return (
    <div className="svc-page">
      <SchemaMarkup schema={schemas} />

      {/* ── Hero ── */}
      <section className="svc-hero">
        <div className="svc-container">
          <nav className="svc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Digital Infrastructure</span>
          </nav>
          <div className="svc-eyebrow">Build · Own · Control</div>
          <h1 className="svc-heading">{SERVICE_NAME}</h1>
          <p className="svc-body">
            We build the digital backbone of your business — website, email, scheduling, payments, CRM — and hand you the keys. No monthly dependency. No vendor lock-in. You own everything.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Build Your Digital Foundation <ArrowRight size={18} />
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
          <h2 className="svc-subheading">Your digital presence was not built. It happened.</h2>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            You are paying for five different monthly subscriptions you barely understand. Your nephew built the website two years ago, and now he is away at college. Your business email goes to a Gmail account with the company name misspelled. Sound familiar?
          </p>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            You did not plan it this way. You were busy running your business — answering calls, managing crews, serving customers. The "digital stuff" got handled in whatever way was fastest at the time. A free website builder here. A friend's recommendation there. A payment app someone told you about at a trade show.
          </p>
          <p className="svc-body" style={{ fontWeight: 600, color: '#0f172a' }}>
            Now you have no real digital foundation — just a patchwork of disconnected tools held together with duct tape and hope.
          </p>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="svc-section--alt">
        <div className="svc-container">
          <div className="svc-eyebrow">The Solution</div>
          <h2 className="svc-subheading">A complete digital foundation, built right and handed over.</h2>
          <p className="svc-body" style={{ marginBottom: '2.5rem' }}>
            We build your complete digital infrastructure from scratch. Everything is built on enterprise-grade security standards — the same standards we apply to our banking and financial clients. When we are done, you own it all.
          </p>

          <div className="svc-steps">
            <div className="svc-step">
              <div className="svc-step-num">1</div>
              <div>
                <h3>Professional Website &amp; Online Presence</h3>
                <p>A fast, mobile-first website that represents your business the way it deserves. No page builders. No templates you cannot modify. Custom-built for your business and your customers.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">2</div>
              <div>
                <h3>Business Email &amp; Communications</h3>
                <p>A professional email address at your own domain. We set up your business email, configure it on all your devices, and make sure it works reliably from day one.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">3</div>
              <div>
                <h3>Scheduling, Payments &amp; Customer Database</h3>
                <p>Online booking, payment processing, and a customer database — all connected, all in one place. Your customers can find you, book you, and pay you without a single phone call.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">4</div>
              <div>
                <h3>Enterprise-Grade Security</h3>
                <p>SSL encryption, content security policies, input sanitization, OWASP best practices — because your customers' data deserves the same protection as a bank's.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">5</div>
              <div>
                <h3>Total Ownership — No Strings Attached</h3>
                <p>When the build is done, we hand you every credential, every source file, every piece of documentation. No recurring fees to us. No proprietary platforms. Your business, your data, your property.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Result ── */}
      <section className="svc-section">
        <div className="svc-container">
          <div className="svc-eyebrow">The Result</div>
          <h2 className="svc-subheading">What you walk away with.</h2>
          <div className="svc-stats">
            {[
              { val: 'Bank-Grade', label: 'Security Standards' },
              { val: '100%', label: 'Client Ownership' },
              { val: 'Zero', label: 'Vendor Lock-In' },
              { val: '5 → 1', label: 'Unified Dashboard' },
            ].map((s) => (
              <div key={s.label} className="svc-stat-block">
                <div className="svc-stat">{s.val}</div>
                <div className="svc-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <hr className="svc-divider" />
          <ul className="svc-checklist">
            <li>Every line of code, every database record, every design asset — yours</li>
            <li>Enterprise-grade security applied to every component</li>
            <li>All systems unified into a single dashboard you control</li>
            <li>No recurring fees, no proprietary platforms, no vendor lock-in</li>
            <li>Full documentation and credential handover upon completion</li>
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
          <h2 className="svc-heading">Stop duct-taping your tech together.</h2>
          <p className="svc-body">Let {BUSINESS.name} build it right — and hand you the keys.</p>
          <p className="svc-cta-contact">
            Texas-based · Remote consultations available · <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Build Your Digital Foundation <ArrowRight size={18} />
            </Link>
            <Link to="/services/workflow-audit" className="svc-cta-btn svc-cta-btn--outline">
              See Workflow Audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
