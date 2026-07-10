import { useMemo, useState } from 'react';
import { Check, ChevronDown, FileText, Plus, Printer, Send, Trash2 } from 'lucide-react';
import SchemaMarkup, { breadcrumbSchema, BUSINESS, faqSchema } from '../components/SchemaMarkup';
import { money, quoteCatalog } from '../data/quoteCatalog';

const quoteDate = new Date();
const validUntil = new Date(quoteDate);
validUntil.setDate(validUntil.getDate() + 30);
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const quoteFaqs = [
  { question: 'Is the custom quote a final contract?', answer: 'No. The quote builder creates a good-faith preliminary estimate to start the conversation. Final pricing is confirmed after scope, accounts, integrations, timelines, and requirements are reviewed.' },
  { question: 'How long is a quote valid?', answer: 'Quotes generated through the site are valid for 30 days. After that, pricing may need to be refreshed based on scope, availability, platform changes, or third-party costs.' },
  { question: 'Are advertising spend and third-party software included?', answer: 'No. Advertising spend, domains, Google Workspace, CRM subscriptions, Stripe fees, AI platform usage, and other third-party costs are excluded and paid directly by the client whenever possible.' },
  { question: 'Can search rankings, Google verification, or advertising results be guaranteed?', answer: 'No. Search rankings, indexing, Google verification, reinstatement, advertising performance, and lead volume cannot be guaranteed. We provide strategy, setup, management, reporting, and guidance, but platforms and market conditions affect outcomes.' },
  { question: 'What happens after I submit a quote request?', answer: 'We review the selected services and business context, then follow up to confirm scope, priorities, dependencies, and next steps before any final agreement is made.' },
];

export default function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>('Websites');
  const [client, setClient] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    industry: '',
    yearsInBusiness: '',
    website: '',
    location: '',
    teamSize: '',
    customerType: '',
    timeline: '',
    budgetRange: '',
    currentSetup: '',
    goals: '',
    notes: '',
  });
  const [submitState, setSubmitState] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const categories = [...new Set(quoteCatalog.map((item) => item.category))];
  const selectedItems = quoteCatalog.filter((item) => selected.includes(item.id));
  const oneTime = useMemo(() => selectedItems.reduce((sum, item) => sum + (item.oneTime || 0), 0), [selectedItems]);
  const monthly = useMemo(() => selectedItems.reduce((sum, item) => sum + (item.monthly || 0), 0), [selectedItems]);
  const quoteNumber = useMemo(() => `ADS-${quoteDate.toISOString().slice(0, 10).replaceAll('-', '')}`, []);

  const toggle = (id: string) => setSelected((current) => current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id]);

  const submitQuote = async () => {
    if (!selectedItems.length) return;
    setSubmitState({ type: 'idle', message: 'Sending your request…' });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteNumber,
          quoteDate: dateFormat.format(quoteDate),
          validUntil: dateFormat.format(validUntil),
          client,
          selectedItems,
          totals: { oneTime, monthly },
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit the quote request right now.');
      }

      setSubmitState({ type: 'success', message: 'Quote request sent. We will review it and follow up shortly.' });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit the quote request right now.',
      });
    }
  };

  return (
    <div className="quote-page">
      <SchemaMarkup schema={[
        breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Build a Quote', url: `${BUSINESS.url}/quote` }]),
        faqSchema(quoteFaqs),
      ]} />
      <section className="quote-hero quote-hero--image">
        <div className="quote-shell">
          <span className="quote-kicker">Build Your Plan</span>
          <h1>Create a custom digital services quote.</h1>
          <p>Choose the services that fit your business, then add a little context so we can turn a loose estimate into a useful next conversation.</p>
        </div>
      </section>

      <section className="quote-layout quote-shell">
        <div className="quote-catalog no-print">
          <div className="quote-intro-card">
            <FileText size={22} />
            <div><strong>Private planning estimate.</strong><p>Pricing appears only after services are added. Ad spend, domains, email, CRM and third-party subscriptions are billed directly to you whenever possible.</p></div>
          </div>
          {categories.map((category) => {
            const items = quoteCatalog.filter((item) => item.category === category);
            const isOpen = openCategory === category;
            return (
              <div className="quote-category" key={category}>
                <button className="quote-category-button" onClick={() => setOpenCategory(isOpen ? null : category)} aria-expanded={isOpen}>
                  <span>{category}</span><ChevronDown className={isOpen ? 'rotate-180' : ''} size={20} />
                </button>
                {isOpen && <div className="quote-options">
                  {items.map((item) => {
                    const active = selected.includes(item.id);
                    return <article className={`quote-option ${active ? 'quote-option--active' : ''}`} key={item.id}>
                      <div className="quote-option-copy">
                        <h3>{item.name}</h3><p>{item.summary}</p>
                        <ul>{item.includes.map((line) => <li key={line}><Check size={14} />{line}</li>)}</ul>
                      </div>
                      <button className="quote-add" onClick={() => toggle(item.id)}>
                        {active ? <><Check size={17} /> Added</> : <><Plus size={17} /> Add to quote</>}
                      </button>
                    </article>;
                  })}
                </div>}
              </div>
            );
          })}
        </div>

        <aside className="quote-paper">
          <div className="quote-paper-head">
            <div><span className="quote-kicker">Prepared by</span><h2>{BUSINESS.name}</h2></div>
            <img src="/Albright_Digital_Solutions_Logo.png" alt="" />
          </div>
          <div className="quote-meta"><span>Estimate {quoteNumber}</span><span>{dateFormat.format(quoteDate)}</span></div>

          <div className="quote-client no-print">
            <div className="quote-form-section quote-form-section--full">
              <span>Contact</span>
              <div className="quote-form-grid">
                <label>Your name<input aria-label="Your name" placeholder="Jane Smith" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} /></label>
                <label>Business name<input aria-label="Business name" placeholder="Smith Family Roofing" value={client.business} onChange={(e) => setClient({ ...client, business: e.target.value })} /></label>
                <label>Email<input aria-label="Email" type="email" placeholder="you@business.com" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} /></label>
                <label>Phone<input aria-label="Phone" type="tel" placeholder="512-555-0123" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} /></label>
              </div>
            </div>

            <div className="quote-form-section quote-form-section--full">
              <span>Business snapshot</span>
              <div className="quote-form-grid">
                <label>What type of business is it?<input aria-label="Business type" placeholder="Roofing, med spa, restaurant, consulting…" value={client.industry} onChange={(e) => setClient({ ...client, industry: e.target.value })} /></label>
                <label>Years in business
                  <select aria-label="Years in business" value={client.yearsInBusiness} onChange={(e) => setClient({ ...client, yearsInBusiness: e.target.value })}>
                    <option value="">Select one</option>
                    <option>Not open yet</option>
                    <option>Less than 1 year</option>
                    <option>1–3 years</option>
                    <option>4–10 years</option>
                    <option>10+ years</option>
                  </select>
                </label>
                <label>Website or Google Profile link<input aria-label="Website or profile link" placeholder="https://..." value={client.website} onChange={(e) => setClient({ ...client, website: e.target.value })} /></label>
                <label>Primary city / service area<input aria-label="Primary service area" placeholder="Texas, online, or the cities you serve…" value={client.location} onChange={(e) => setClient({ ...client, location: e.target.value })} /></label>
                <label>Team size
                  <select aria-label="Team size" value={client.teamSize} onChange={(e) => setClient({ ...client, teamSize: e.target.value })}>
                    <option value="">Select one</option>
                    <option>Solo owner/operator</option>
                    <option>2–5 people</option>
                    <option>6–15 people</option>
                    <option>16–50 people</option>
                    <option>50+ people</option>
                  </select>
                </label>
                <label>Who do you mainly serve?
                  <select aria-label="Customer type" value={client.customerType} onChange={(e) => setClient({ ...client, customerType: e.target.value })}>
                    <option value="">Select one</option>
                    <option>Local consumers / homeowners</option>
                    <option>Other businesses</option>
                    <option>Both consumers and businesses</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label>Ideal timeline
                  <select aria-label="Ideal timeline" value={client.timeline} onChange={(e) => setClient({ ...client, timeline: e.target.value })}>
                    <option value="">Select one</option>
                    <option>ASAP / urgent</option>
                    <option>Within 30 days</option>
                    <option>1–3 months</option>
                    <option>Planning ahead</option>
                  </select>
                </label>
                <label>Monthly budget comfort range
                  <select aria-label="Monthly budget comfort range" value={client.budgetRange} onChange={(e) => setClient({ ...client, budgetRange: e.target.value })}>
                    <option value="">Select one</option>
                    <option>Under $500/month</option>
                    <option>$500–$1,000/month</option>
                    <option>$1,000–$2,500/month</option>
                    <option>$2,500+/month</option>
                    <option>Project-only for now</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="quote-form-section quote-form-section--full">
              <span>Current setup and goals</span>
              <label>What are you using now?<textarea aria-label="Current digital setup" placeholder="Current website, Google profile, social pages, ads, CRM, booking, email list, or anything that already exists…" value={client.currentSetup} onChange={(e) => setClient({ ...client, currentSetup: e.target.value })} /></label>
              <label>What are you trying to improve first?<textarea aria-label="Main goals" placeholder="More calls, better Google presence, cleaner website, social consistency, lead follow-up, booking, AI automation…" value={client.goals} onChange={(e) => setClient({ ...client, goals: e.target.value })} /></label>
            </div>
          </div>
          {(client.name || client.business || client.email || client.phone || client.industry || client.location || client.teamSize) && <div className="quote-client-print print-only">
            <strong>{client.business || client.name}</strong><br />{client.name}{client.business && client.name ? <br /> : null}{client.email}<br />{client.phone}
            <br />{client.industry}{client.yearsInBusiness ? ` · ${client.yearsInBusiness}` : ''}{client.location ? ` · ${client.location}` : ''}{client.teamSize ? ` · ${client.teamSize}` : ''}
          </div>}

          {selectedItems.length === 0 ? <div className="quote-empty"><Plus size={28} /><p>Add services to generate your estimate.</p></div> : <>
            <div className="quote-lines">
              {selectedItems.map((item) => <div className="quote-line" key={item.id}>
                <div><strong>{item.name}</strong><small>{item.term || item.category}</small></div>
                <div className="quote-line-price">
                  {item.oneTime ? <span>{money(item.oneTime)} <small>once</small></span> : null}
                  {item.monthly ? <span>{money(item.monthly)} <small>/ month</small></span> : null}
                </div>
                <button className="no-print" aria-label={`Remove ${item.name}`} onClick={() => toggle(item.id)}><Trash2 size={15} /></button>
                {item.note && <p>{item.note}</p>}
              </div>)}
            </div>
            <div className="quote-totals">
              {oneTime > 0 && <div><span>Estimated project/setup total</span><strong>{money(oneTime)}</strong></div>}
              {monthly > 0 && <div className="quote-monthly"><span>Estimated recurring total</span><strong>{money(monthly)}<small>/month</small></strong></div>}
            </div>
          </>}

          <textarea className="quote-notes no-print" aria-label="Additional notes" placeholder="Anything else we should know? Budget range, competitors you like, problem accounts, existing tools, or special requirements…" value={client.notes} onChange={(e) => setClient({ ...client, notes: e.target.value })} />
          {(client.currentSetup || client.goals || client.notes) && <p className="print-only quote-notes-print"><strong>Business context:</strong> {client.currentSetup} {client.goals} {client.notes}</p>}

          <div className="quote-disclaimer">
            <strong>Estimate valid through {dateFormat.format(validUntil)}.</strong>
            <p>This is a good-faith preliminary estimate valid for 30 days, not a final contract. Final pricing is confirmed after scope and account review. Taxes, advertising spend and third-party fees are excluded. Search rankings, platform verification, reinstatement and advertising results cannot be guaranteed. Recurring services require a three-month initial commitment unless otherwise stated.</p>
          </div>
          <div className="quote-actions no-print">
            <button onClick={submitQuote} disabled={!selectedItems.length || submitState.message === 'Sending your request…'}><Send size={17} /> {submitState.message === 'Sending your request…' ? 'Sending…' : 'Submit request'}</button>
            <button className="quote-print" onClick={() => window.print()} disabled={!selectedItems.length}><Printer size={17} /> Print / Save PDF</button>
          </div>
          {submitState.message && <p className={`quote-submit-message quote-submit-message--${submitState.type}`}>{submitState.message}</p>}
        </aside>
      </section>
      <section className="quote-faqs quote-shell">
        <div className="quote-faqs-head">
          <span className="quote-kicker">Quote Questions</span>
          <h2>What to know before you submit.</h2>
          <p>The quote builder is meant to create a useful starting point, not pressure you into a one-size-fits-all package.</p>
        </div>
        <div className="quote-faq-grid">
          {quoteFaqs.map((faq) => <article key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>)}
        </div>
      </section>
    </div>
  );
}
