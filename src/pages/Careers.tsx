import { ArrowRight, BadgeDollarSign, CheckCircle2, Clock, Handshake, Shield } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import SchemaMarkup, { breadcrumbSchema, BUSINESS } from '../components/SchemaMarkup';

export default function Careers() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityState: '',
    salesExperience: '',
    whySales: '',
    message: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState({ type: 'idle', message: 'Sending your application…' });

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (resume) payload.append('resume', resume);

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your application right now.');
      }

      setSubmitState({ type: 'success', message: 'Application sent. We will review it and follow up if there is a fit.' });
      setForm({
        fullName: '',
        email: '',
        phone: '',
        cityState: '',
        salesExperience: '',
        whySales: '',
        message: '',
      });
      setResume(null);
      const fileInput = document.getElementById('career-resume') as HTMLInputElement | null;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your application right now.',
      });
    }
  };

  return (
    <div className="careers-page">
      <SchemaMarkup schema={breadcrumbSchema([
        { name: 'Home', url: BUSINESS.url },
        { name: 'Careers', url: `${BUSINESS.url}/careers` },
      ])} />

      <section className="careers-hero">
        <div className="family-shell careers-hero-content">
          <span>Careers</span>
          <h1>Help small businesses find the right digital path forward.</h1>
          <p>
            Albright Digital Solutions LLC is building a practical sales team for websites, custom AI agents, Google visibility, social media, advertising, and connected business systems.
          </p>
          <a href="#career-application">Apply for Sales <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="careers-openings family-shell">
        <div className="family-section-head">
          <span>Current Opening</span>
          <h2>Sales Representative</h2>
        </div>

        <article className="career-card">
          <div className="career-card-main">
            <div className="career-kicker">100% Commission · Contractor-style sales role</div>
            <h3>Sales Representative</h3>
            <p>
              This role is for a self-driven salesperson who can talk with small business owners, identify digital gaps, and bring qualified clients into the Albright Digital Solutions LLC quote and agreement process.
            </p>
            <div className="career-tags">
              <span>Remote-friendly</span>
              <span>Small business focus</span>
              <span>Digital services</span>
              <span>Commission only</span>
            </div>
          </div>

          <aside className="career-comp">
            <BadgeDollarSign size={32} />
            <strong>20%</strong>
            <span>of the package the client signs up for</span>
          </aside>
        </article>

        <div className="career-grid">
          {[
            { icon: <Handshake />, title: 'Compensation', text: 'Sales is currently 100% commission. The available commission is 20% of the package the client signs up for.' },
            { icon: <Clock />, title: 'Recurring payout window', text: 'For a 12-month lease-to-own website or monthly subscription, commission can pay out for up to 12 months while the client remains active and paying.' },
            { icon: <CheckCircle2 />, title: 'What you sell', text: 'Websites, custom AI agents, Google Profile & SEO/GEO, social media, paid advertising, content/creative, and business systems.' },
            { icon: <Shield />, title: 'Sales standard', text: 'No fake guarantees. No pressure games. Sell by clarity: business problem, recommended package, cost, scope, contract, and next step.' },
          ].map((item) => (
            <div key={item.title} className="career-info-card">
              <i>{item.icon}</i>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="career-note">
          <strong>Important:</strong> Commission terms, payout timing, eligibility, and sales process requirements must be confirmed in writing before any sales activity begins.
        </div>
      </section>

      <section className="family-cta">
        <div className="family-shell">
          <span>Ready to talk?</span>
          <h2>If you can sell honestly, listen well, and follow the ADS process, let’s start the conversation.</h2>
          <a href="#career-application">Apply for Sales <ArrowRight size={18} /></a>
        </div>
      </section>

      <section id="career-application" className="career-application-section">
        <div className="family-shell career-application-grid">
          <div>
            <span className="career-kicker">Sales Application</span>
            <h2>Apply for the commission sales role.</h2>
            <p>
              Use this form for sales applicants only. Attach a resume if you have one, and focus your answers on sales experience, local business relationships, and why you can represent Albright Digital Solutions LLC honestly.
            </p>
            <div className="career-application-note">
              Resume uploads accept PDF, DOC, DOCX, TXT, or RTF files up to 5 MB.
            </div>
          </div>

          <form className="career-form" onSubmit={handleSubmit}>
            <div className="career-form-grid">
              <label>
                Full name
                <input required value={form.fullName} onChange={(event) => updateForm('fullName', event.target.value)} placeholder="Your full name" />
              </label>
              <label>
                Email
                <input required type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="you@email.com" />
              </label>
              <label>
                Phone
                <input type="tel" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} placeholder="512-555-0123" />
              </label>
              <label>
                City / State
                <input value={form.cityState} onChange={(event) => updateForm('cityState', event.target.value)} placeholder="Manor, TX" />
              </label>
            </div>

            <label>
              Sales experience
              <textarea value={form.salesExperience} onChange={(event) => updateForm('salesExperience', event.target.value)} placeholder="Tell us about your sales background, industries sold into, relationship network, or relevant experience." />
            </label>

            <label>
              Why are you interested in selling for ADS?
              <textarea required value={form.whySales} onChange={(event) => updateForm('whySales', event.target.value)} placeholder="What makes you a fit for a 100% commission sales role representing small-business digital services?" />
            </label>

            <label>
              Additional message
              <textarea value={form.message} onChange={(event) => updateForm('message', event.target.value)} placeholder="Anything else we should know?" />
            </label>

            <label>
              Resume upload
              <input
                id="career-resume"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/rtf,text/rtf"
                onChange={(event) => setResume(event.target.files?.[0] || null)}
              />
            </label>

            <button type="submit" disabled={submitState.message === 'Sending your application…'}>
              {submitState.message === 'Sending your application…' ? 'Sending…' : 'Submit Sales Application'} <ArrowRight size={18} />
            </button>

            {submitState.message && (
              <p className={`quote-submit-message quote-submit-message--${submitState.type}`}>
                {submitState.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
