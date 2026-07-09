import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Workflow, MessageSquare, Cpu, Zap, BarChart3, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SchemaMarkup, { serviceSchema, faqSchema, breadcrumbSchema, BUSINESS } from '../../components/SchemaMarkup';

const SERVICE_NAME = 'AI Agents & Automation';
const SERVICE_URL = `${BUSINESS.url}/services/ai-automation`;

const faqs = [
  { question: 'What is an AI agent and how can it help my local business?', answer: 'An AI agent is specialized software powered by artificial intelligence that autonomously handles tasks like answering customer questions, qualifying leads, scheduling appointments, and processing data. For local businesses, AI agents reduce the need for additional staff, provide 24/7 customer support, and ensure no lead falls through the cracks.' },
  { question: 'How much does a custom AI agent cost?', answer: 'Simple chatbots for website customer support start at $2,500, while complex autonomous agents integrating with CRM, scheduling, and phone systems range from $5,000–$15,000. We provide a free strategy call to assess your needs and deliver a detailed quote.' },
  { question: 'Can AI automation integrate with my existing tools?', answer: 'Yes. We build solutions that integrate with Google Workspace, Microsoft 365, Salesforce, HubSpot, QuickBooks, Slack, and custom databases. Our agents plug into your existing tech stack with minimal disruption.' },
  { question: 'How long does deployment take?', answer: 'Most custom AI agents are deployed within 2–4 weeks. Simple chatbot implementations can be live in 5 business days. We test with real-world scenarios before launch.' },
  { question: 'Is AI automation right for small businesses in Texas?', answer: 'Absolutely. AI automation allows small businesses to deliver enterprise-level customer experiences without a large support team. Texas businesses use our AI agents to automate support, booking, follow-ups, and data entry.' },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[var(--color-brand-border)] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[var(--color-brand-surface)]/50 transition-colors cursor-pointer">
        <h3 className="text-base font-bold text-white leading-snug">{question}</h3>
        <ChevronDown size={20} className={`flex-shrink-0 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function AiAutomation() {
  const schemas = [
    serviceSchema(SERVICE_NAME, 'Custom AI agents and workflow automation for small businesses in Texas and remote clients nationwide.', SERVICE_URL),
    faqSchema(faqs),
    breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'AI Agents & Automation', url: SERVICE_URL }]),
  ];

  return (
    <div className="w-full">
      <SchemaMarkup schema={schemas} />

      {/* Hero */}
      <section className="relative px-4 py-20 sm:py-28 overflow-hidden border-b border-[var(--color-brand-border)]">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-brand-accent)]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-[var(--color-brand-accent)] transition-colors">Home</Link><span>/</span><span className="text-zinc-300">AI Agents &amp; Automation</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">{SERVICE_NAME}</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-8">
            Albright Digital Solutions deploys custom-built AI agents and intelligent automation systems for small businesses in Texas and remote clients nationwide. Our autonomous agents handle customer support, lead qualification, appointment scheduling, and data processing — operating 24/7 so your team can focus on growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">
              Get a Free AI Strategy Call <ArrowRight size={18} />
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-surface)] text-white font-bold rounded-lg border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)] transition-colors">
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Service Deep Dive */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">What We Build</h2>
          <div className="space-y-12">
            {[
              { icon: <MessageSquare size={28} />, title: 'Intelligent Customer Support Agents', text: 'We build AI-powered chat and voice agents that understand your customers\' questions and provide accurate, context-aware responses around the clock. Unlike generic chatbots, our agents are trained on your specific services, pricing, policies, and FAQs — delivering answers that feel personal. For busy local businesses, this means no more missed calls after hours and dramatically improved customer satisfaction.' },
              { icon: <Workflow size={28} />, title: 'Workflow Automation Pipelines', text: 'Manual data entry, repetitive email sequences, and disjointed processes are silent revenue killers. We design end-to-end automation pipelines connecting your CRM, email, scheduling, and accounting software into a seamless system. Our automation solutions have saved Texas businesses an average of 15–25 hours per week in manual labor.' },
              { icon: <Cpu size={28} />, title: 'Lead Qualification & Follow-Up Systems', text: 'Our AI-powered lead qualification systems engage prospects the moment they interact with your business, ask qualifying questions, score intent, and route hot leads to your sales team in real time. Cold leads enter automated nurture sequences so your team can follow up faster and more consistently.' },
              { icon: <BarChart3 size={28} />, title: 'Data Processing & Reporting Agents', text: 'Transform raw data into actionable business intelligence. Our AI agents automatically extract information from invoices, forms, emails, and spreadsheets — then compile clean dashboards and reports. Small business owners gain instant visibility into revenue trends, customer behavior, and operational metrics without hiring a data analyst.' },
            ].map((item) => (
              <div key={item.title} className="grid md:grid-cols-[auto_1fr] gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-accent)]/10 border border-[var(--color-brand-accent)]/20 flex items-center justify-center text-[var(--color-brand-accent)]">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 bg-[var(--color-brand-surface)]/50 border-y border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ val: '24/7', label: 'Agent Availability' }, { val: '85%', label: 'Query Resolution' }, { val: '20+', label: 'Hours Saved/Week' }, { val: '2×', label: 'Close Rate Increase' }].map((s) => (
            <div key={s.label}><div className="text-3xl font-serif font-bold text-[var(--color-brand-accent)] mb-1">{s.val}</div><div className="text-sm text-zinc-400">{s.label}</div></div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-zinc-400 text-center mb-12">Common questions about AI agents and automation for local businesses.</p>
          <div className="space-y-3">{faqs.map((faq) => <FAQItem key={faq.question} {...faq} />)}</div>
        </div>
      </section>

      {/* CTA + NAP */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/50 border-t border-[var(--color-brand-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready to Automate Your Business?</h2>
          <p className="text-zinc-400 mb-4">Contact {BUSINESS.name} for a free AI strategy consultation.</p>
          <p className="text-zinc-500 text-sm mb-8">Texas-based · Remote consultations available · <a href={`tel:${BUSINESS.phone}`} className="text-[var(--color-brand-accent)]">{BUSINESS.phone}</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-accent)] text-zinc-950 font-bold rounded-lg hover:bg-[var(--color-brand-accent-light)] transition-colors">Schedule Free Consultation <ArrowRight size={18} /></Link>
            <Link to="/services/web-design" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-brand-surface)] text-white font-bold rounded-lg border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)] transition-colors">See Web Design Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
