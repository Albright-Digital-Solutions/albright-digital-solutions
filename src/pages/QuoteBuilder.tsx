import { useMemo, useState } from 'react';
import { Check, ChevronDown, FileText, Mail, Plus, Printer, Trash2 } from 'lucide-react';
import SchemaMarkup, { breadcrumbSchema, BUSINESS } from '../components/SchemaMarkup';
import { money, quoteCatalog } from '../data/quoteCatalog';

const quoteDate = new Date();
const validUntil = new Date(quoteDate);
validUntil.setDate(validUntil.getDate() + 30);
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>('Websites');
  const [client, setClient] = useState({ name: '', business: '', email: '', phone: '', notes: '' });
  const categories = [...new Set(quoteCatalog.map((item) => item.category))];
  const selectedItems = quoteCatalog.filter((item) => selected.includes(item.id));
  const oneTime = useMemo(() => selectedItems.reduce((sum, item) => sum + (item.oneTime || 0), 0), [selectedItems]);
  const monthly = useMemo(() => selectedItems.reduce((sum, item) => sum + (item.monthly || 0), 0), [selectedItems]);
  const quoteNumber = useMemo(() => `ADS-${quoteDate.toISOString().slice(0, 10).replaceAll('-', '')}`, []);

  const toggle = (id: string) => setSelected((current) => current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id]);

  const emailQuote = () => {
    const lines = selectedItems.map((item) => `- ${item.name}${item.oneTime ? ` | ${money(item.oneTime)} one-time` : ''}${item.monthly ? ` | ${money(item.monthly)}/month` : ''}`);
    const body = [
      `Custom quote request ${quoteNumber}`,
      `Name: ${client.name}`,
      `Business: ${client.business}`,
      `Phone: ${client.phone}`,
      '', 'Selected services:', ...lines,
      '', `Estimated one-time total: ${money(oneTime)}`,
      `Estimated monthly total: ${money(monthly)}/month`,
      '', `Project notes: ${client.notes}`,
    ].join('\n');
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Custom quote request — ${client.business || client.name || quoteNumber}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="quote-page">
      <SchemaMarkup schema={breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Build a Quote', url: `${BUSINESS.url}/quote` }])} />
      <section className="quote-hero">
        <div className="quote-shell">
          <span className="quote-kicker">Build Your Plan</span>
          <h1>Create a custom digital services quote.</h1>
          <p>Choose the services that fit your business. Pricing appears only after you add an item to your quote, and we separate project costs from recurring support.</p>
        </div>
      </section>

      <section className="quote-layout quote-shell">
        <div className="quote-catalog no-print">
          <div className="quote-intro-card">
            <FileText size={22} />
            <div><strong>No surprise platform markups.</strong><p>Ad spend, domains, email, CRM and third-party subscriptions are billed directly to you whenever possible.</p></div>
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
            <input aria-label="Your name" placeholder="Your name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
            <input aria-label="Business name" placeholder="Business name" value={client.business} onChange={(e) => setClient({ ...client, business: e.target.value })} />
            <input aria-label="Email" type="email" placeholder="Email address" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
            <input aria-label="Phone" type="tel" placeholder="Phone number" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
          </div>
          {(client.name || client.business || client.email || client.phone) && <div className="quote-client-print print-only">
            <strong>{client.business || client.name}</strong><br />{client.name}{client.business && client.name ? <br /> : null}{client.email}<br />{client.phone}
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

          <textarea className="quote-notes no-print" aria-label="Project notes" placeholder="Tell us about your goals, timeline, locations, or special requirements…" value={client.notes} onChange={(e) => setClient({ ...client, notes: e.target.value })} />
          {client.notes && <p className="print-only quote-notes-print"><strong>Project notes:</strong> {client.notes}</p>}

          <div className="quote-disclaimer">
            <strong>Estimate valid through {dateFormat.format(validUntil)}.</strong>
            <p>This is a good-faith preliminary estimate valid for 30 days, not a final contract. Final pricing is confirmed after scope and account review. Taxes, advertising spend and third-party fees are excluded. Search rankings, platform verification, reinstatement and advertising results cannot be guaranteed. Recurring services require a three-month initial commitment unless otherwise stated.</p>
          </div>
          <div className="quote-actions no-print">
            <button onClick={emailQuote} disabled={!selectedItems.length}><Mail size={17} /> Send for review</button>
            <button className="quote-print" onClick={() => window.print()} disabled={!selectedItems.length}><Printer size={17} /> Print / Save PDF</button>
          </div>
        </aside>
      </section>
    </div>
  );
}
