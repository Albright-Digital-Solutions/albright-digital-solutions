interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renders JSON-LD structured data.
 * Accepts a single schema object or an array of schema objects.
 */
export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

// ─── Shared Business Constants ────────────────────────────────────────────
export const BUSINESS = {
  name: 'Albright Digital Solutions',
  legalName: 'Albright Digital Solutions LLC',
  url: 'https://albrightdigitalsolutions.com',
  email: 'jason@albrightdigitalsolutions.com',
  phone: '512-661-4927',
  region: 'Texas',
  hours: [
    'Mo-Fr 08:00-18:00',
    'Sa 09:00-14:00',
  ],
  foundingYear: 2023,
  description:
    'Albright Digital Solutions is a Texas-based digital agency specializing in custom-built AI agents, AI automation, custom website design and development, local visibility, social media, advertising, video editing, and graphic design for small businesses and startups.',
  sameAs: [
    'https://github.com/Albright-Digital-Solutions',
  ],
};

// ─── Reusable Schema Factories ────────────────────────────────────────────

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    description: BUSINESS.description,
    foundingDate: `${BUSINESS.foundingYear}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: BUSINESS.sameAs,
    areaServed: [
      { '@type': 'State', name: 'Texas' },
      { '@type': 'Country', name: 'United States' },
    ],
    priceRange: '$$',
  };
}

export function serviceSchema(serviceName: string, serviceDescription: string, serviceUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${BUSINESS.url}/#organization`,
      name: BUSINESS.name,
    },
    areaServed: {
      '@type': 'State',
      name: 'Texas',
    },
    serviceType: serviceName,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
