import { ArrowRight, Bot, ClipboardCheck, GraduationCap, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import SchemaMarkup, { breadcrumbSchema, BUSINESS, offerCatalogSchema } from '../components/SchemaMarkup';
import { serviceFamilies } from '../data/serviceFamilies';

const advisory = [
  { icon: <ClipboardCheck />, title: 'Workflow Audit', desc: 'Find bottlenecks, duplicate work, and costly gaps—then leave with a prioritized action plan.', path: '/services/workflow-audit' },
  { icon: <Bot />, title: 'AI Automation', desc: 'Practical agents and automations built around specific, repeatable business work.', path: '/services/ai-automation' },
  { icon: <GraduationCap />, title: 'AI & Staff Training', desc: 'Hands-on enablement for teams that need confidence using new technology.', path: '/services/ai-training' },
  { icon: <Wrench />, title: 'Performance Tuning', desc: 'Quarterly maintenance, security, content, and system health reviews.', path: '/services/performance-tuning' },
];

export default function Services() {
  return <div className="services-dark">
    <SchemaMarkup schema={[
      breadcrumbSchema([{ name: 'Home', url: BUSINESS.url }, { name: 'Services', url: `${BUSINESS.url}/services` }]),
      offerCatalogSchema(serviceFamilies),
    ]} />
    <section className="services-dark-hero services-dark-hero--image"><div className="family-shell"><span>Our Services</span><h1>One digital partner. A system built around your business.</h1><p>Choose a focused project or an ongoing partnership across custom AI agents, websites, local visibility, social media, advertising, content, and connected operations.</p><Link to="/quote">Build a Custom Quote <ArrowRight size={18} /></Link></div></section>
    <section className="family-shell services-family-list">
      {serviceFamilies.map((service, index) => <Link to={`/services/${service.slug}`} className="services-family-row" key={service.slug}>
        <img src={service.image} alt={service.imageAlt} />
        <div><span>{String(index + 1).padStart(2, '0')} · {service.eyebrow}</span><h2>{service.navName}</h2><p>{service.intro}</p><b>Explore service <ArrowRight size={16} /></b></div>
      </Link>)}
    </section>
    <section className="services-advisory"><div className="family-shell"><div className="family-section-head"><span>Specialized Support</span><h2>Audits, automation, training, and maintenance.</h2></div><div className="services-advisory-grid">{advisory.map((item) => <Link to={item.path} key={item.title}><i>{item.icon}</i><h3>{item.title}</h3><p>{item.desc}</p><b>Learn more <ArrowRight size={15} /></b></Link>)}</div></div></section>
    <section className="family-cta"><div className="family-shell"><span>Not sure where to begin?</span><h2>Select what looks useful and generate a private, itemized estimate.</h2><Link to="/quote">Build Your Quote <ArrowRight size={18} /></Link></div></section>
  </div>;
}
