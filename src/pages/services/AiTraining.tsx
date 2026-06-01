import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'AI Prompt & Process Training';
const SERVICE_URL = `${BUSINESS.url}/services/ai-training`;

const faqs = [
  { question: 'Do my employees need to be tech-savvy?', answer: 'No. We have trained roofing crews, plumbing dispatchers, and front-desk staff who had never used AI before. If they can text on a phone, they can learn this.' },
  { question: 'What AI tools do you train on?', answer: 'We focus on the tools that matter for your business: ChatGPT, Google Gemini, and industry-specific AI applications. We match the tool to the task.' },
  { question: 'How long is the training?', answer: 'Standard training is a 2-hour hands-on session. We also offer half-day deep dives for teams that want to go further.' },
  { question: 'Do you provide materials afterward?', answer: 'Yes. Every participant gets a custom "prompt playbook" specific to their role, plus a quick-reference card they can keep at their desk.' },
  { question: 'What is the ROI on AI training?', answer: 'Our average client reports saving 8–12 hours per employee per week within 30 days of training. At $25/hour labor cost, that is $800–1,200 per month per employee.' },
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

export default function AiTraining() {
  const schemas = [
    serviceSchema(SERVICE_NAME, 'Hands-on AI prompt and process training for small business teams in Austin, Texas. We teach your staff to use AI tools effectively so one person can do the work of five.', SERVICE_URL),
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
            <Link to="/">Home</Link><span>/</span><span>AI Prompt &amp; Process Training</span>
          </nav>
          <div className="svc-eyebrow">Staff Training &amp; Enablement</div>
          <h1 className="svc-heading">{SERVICE_NAME}</h1>
          <p className="svc-body">
            AI is only as good as the person giving it instructions. We train your team to speak its language — clearly, directly, and effectively — so one person can do the work of five.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Schedule Team Training <ArrowRight size={18} />
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
          <h2 className="svc-subheading">The most powerful business tool in a generation — sitting unused.</h2>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            You have heard AI can save you time and money. Maybe you tried ChatGPT a couple of times, got weird results, and gave up. You are not alone — that is the experience most business owners describe to us.
          </p>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            Meanwhile, your staff is afraid of it, confused by it, or using it to write emails that sound like they were written by a robot. The result? The most powerful productivity tool in a generation is sitting on the table, untouched.
          </p>
          <p className="svc-body" style={{ fontWeight: 600, color: '#0f172a' }}>
            It is not a technology problem. It is a training problem. Most people just need someone to show them.
          </p>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="svc-section--alt">
        <div className="svc-container">
          <div className="svc-eyebrow">The Solution</div>
          <h2 className="svc-subheading">Think of it like dog training.</h2>
          <p className="svc-body" style={{ marginBottom: '1.5rem' }}>
            A well-trained dog responds to clear, direct commands. AI works the same way. Vague instructions get vague results. Specific commands get specific, useful output.
          </p>
          <p className="svc-body" style={{ marginBottom: '2.5rem' }}>
            We come to your office — or do it over Zoom — and train your team hands-on to use AI tools effectively for their specific job functions. No theory. No lectures. Just practical, immediate skill-building your team can use the next morning.
          </p>

          <div className="svc-steps">
            <div className="svc-step">
              <div className="svc-step-num">1</div>
              <div>
                <h3>Estimators</h3>
                <p>Learn to generate accurate quotes in minutes instead of hours, using AI to pull material costs, format proposals, and draft scope-of-work documents.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">2</div>
              <div>
                <h3>Office Managers</h3>
                <p>Learn to draft professional correspondence instantly — customer follow-ups, vendor communications, and internal memos that sound like them, not a machine.</p>
              </div>
            </div>
            <div className="svc-step">
              <div className="svc-step-num">3</div>
              <div>
                <h3>Crew Leaders</h3>
                <p>Learn to create daily job reports from a simple voice memo. Talk into your phone on the drive home, and the report writes itself.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Result ── */}
      <section className="svc-section">
        <div className="svc-container">
          <div className="svc-eyebrow">The Result</div>
          <h2 className="svc-subheading">Skills your team uses the same day.</h2>
          <div className="svc-stats">
            {[
              { val: '5×', label: 'Productivity' },
              { val: '2-Hour', label: 'Sessions' },
              { val: 'Same-Day', label: 'Results' },
              { val: 'Custom', label: 'Playbooks' },
            ].map((s) => (
              <div key={s.label} className="svc-stat-block">
                <div className="svc-stat">{s.val}</div>
                <div className="svc-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <hr className="svc-divider" />
          <ul className="svc-checklist">
            <li>Every participant gets a custom prompt playbook for their specific role</li>
            <li>Quick-reference cards your team can keep at their desk</li>
            <li>Practical skills they can use the morning after training</li>
            <li>Average savings of 8–12 hours per employee per week within 30 days</li>
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
          <h2 className="svc-heading">Ready to make your team 5× more productive?</h2>
          <p className="svc-body">Contact {BUSINESS.name} to schedule a hands-on AI training session for your staff.</p>
          <p className="svc-cta-contact">
            {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip} · <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Schedule Team Training <ArrowRight size={18} />
            </Link>
            <Link to="/services/performance-tuning" className="svc-cta-btn svc-cta-btn--outline">
              See Performance Tuning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
