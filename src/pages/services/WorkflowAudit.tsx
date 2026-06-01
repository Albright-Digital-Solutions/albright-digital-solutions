import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'The Workflow Audit';
const SERVICE_URL = `${BUSINESS.url}/services/workflow-audit`;

const faqs = [
  { question: 'What does a Workflow Audit actually look like?', answer: 'We spend 2–3 hours observing and documenting your current processes. Then we deliver a written report within 5 business days with prioritized recommendations.' },
  { question: 'Do I need to prepare anything?', answer: 'No. We come to you. All we need is access to your team and a willingness to walk us through a normal day.' },
  { question: 'Is this just for tech companies?', answer: 'Not at all. Most of our audit clients are contractors, service businesses, and trades. If you have a phone, a truck, and customers, we can help.' },
  { question: 'What happens after the audit?', answer: 'You get a clear report you can act on yourself, hand to your team, or hire us to implement. There is no obligation.' },
  { question: 'How much does a Workflow Audit cost?', answer: 'Audits start at $1,500. The typical client recoups that investment within the first month from time savings alone.' },
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

export default function WorkflowAudit() {
  const schemas = [
    serviceSchema(SERVICE_NAME, 'Operational workflow audits for small businesses in Austin, Round Rock, Cedar Park, and Central Texas. We identify bottlenecks, double-entry, and time-sinks that are quietly costing you money.', SERVICE_URL),
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
          <div className="svc-eyebrow">Operational Tune-Up</div>
          <h1 className="svc-heading">{SERVICE_NAME}</h1>
          <p className="svc-body">
            We walk through your day-to-day operations, step by step, and identify the bottlenecks, double-entry, and time-sinks that are quietly costing you money.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Schedule Your Workflow Audit <ArrowRight size={18} />
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
          <h2 className="svc-subheading">You know something is off. You just cannot pinpoint what.</h2>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            You are spending hours every week on tasks that should not take hours. Chasing quotes. Re-entering the same data into two or three different systems. Following up on invoices that should have been paid weeks ago. Tracking down job status updates from your crew by text, by phone, by prayer.
          </p>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            You have built a good business. Customers keep coming back. But somewhere between the first phone call and the final payment, things are slipping through the cracks — and it is costing you time, money, and peace of mind.
          </p>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            The frustrating part? You know something is wrong. You can feel it. But when every day is a sprint from job to job, there is no time to stop, step back, and figure out where the real problems are.
          </p>
          <p className="svc-body" style={{ fontWeight: 600, color: '#0f172a' }}>
            That is exactly what the Workflow Audit is for.
          </p>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="svc-section--alt">
        <div className="svc-container">
          <div className="svc-eyebrow">The Solution</div>
          <h2 className="svc-subheading">A clear-eyed look at how your business actually runs.</h2>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            We sit down with you — in person or via Zoom — shadow your daily workflow, and document every step. From the moment a lead comes in to the moment the invoice is paid, we map the whole process.
          </p>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            Then we deliver a clear, prioritized report: what is working, what is not, and exactly what to do about it.
          </p>
          <p className="svc-body" style={{ marginBottom: '2.5rem' }}>
            No jargon. No upsell. Just a straightforward operational tune-up from someone who has been in the trenches with businesses like yours.
          </p>

          <div className="svc-steps">
            <div className="svc-step">
              <div className="svc-step-num">1</div>
              <div>
                <h3>Observe</h3>
                <p>We shadow your operations and interview your team to understand how work really gets done — not how it is supposed to get done.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">2</div>
              <div>
                <h3>Document</h3>
                <p>Every step, handoff, and decision point is mapped and recorded. We find where time disappears and money leaks.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">3</div>
              <div>
                <h3>Deliver</h3>
                <p>You receive a written report with prioritized recommendations — clear actions you can take immediately or hand off to your team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Result ── */}
      <section className="svc-section">
        <div className="svc-container">
          <div className="svc-eyebrow">The Result</div>
          <h2 className="svc-subheading">What our clients walk away with.</h2>
          <div className="svc-stats">
            {[
              { val: '10+', label: 'Hours Saved / Week' },
              { val: '3–5', label: 'Bottlenecks Identified' },
              { val: '30-Day', label: 'Action Plan Delivered' },
              { val: '$15K+', label: 'Annual Savings (Avg.)' },
            ].map((s) => (
              <div key={s.label} className="svc-stat-block">
                <div className="svc-stat">{s.val}</div>
                <div className="svc-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <hr className="svc-divider" />
          <ul className="svc-checklist">
            <li>Identify the exact processes that are silently costing you money</li>
            <li>A prioritized action plan you can implement immediately</li>
            <li>No obligation — the report is yours to act on however you see fit</li>
            <li>Most clients recoup the audit cost within the first month</li>
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
          <h2 className="svc-heading">Stop guessing where the time goes.</h2>
          <p className="svc-body">Let {BUSINESS.name} show you — and give you a plan to fix it.</p>
          <p className="svc-cta-contact">
            {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip} · <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Schedule Your Workflow Audit <ArrowRight size={18} />
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
