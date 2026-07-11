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
  alternateName: 'ADS',
  slogan: 'AI automation, websites, and workflow systems for small businesses.',
  url: 'https://www.albrightdigitalsolutions.com',
  email: 'jason@albrightdigitalsolutions.com',
  phone: '512-661-4927',
  address: {
    street: '12705 Saint Mary Dr',
    city: 'Manor',
    state: 'TX',
    postalCode: '78653',
    country: 'US',
    formatted: '12705 Saint Mary Dr, Manor, TX 78653',
  },
  region: 'Texas',
  hours: [
    'Available 24/7',
  ],
  foundingYear: 2023,
  founder: {
    name: 'Jason Albright',
    jobTitle: 'Founder',
    url: 'https://www.albrightdigitalsolutions.com/about',
  },
  description:
    'Albright Digital Solutions is a Texas-based digital agency specializing in AI automation, custom websites, workflow systems, Google Business Profile support, local visibility, content, advertising, and connected business systems for small businesses.',
  sameAs: [
    'https://www.linkedin.com/company/142881663/',
    'https://github.com/Albright-Digital-Solutions',
  ],
  knowsAbout: [
    'AI automation',
    'Custom AI agents',
    'Website design',
    'Workflow automation',
    'Google Business Profile management',
    'Local SEO',
    'CRM setup',
    'Lead capture',
    'Business process improvement',
    'Technical support',
  ],
};

// ─── Reusable Schema Factories ────────────────────────────────────────────

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: BUSINESS.alternateName,
    slogan: BUSINESS.slogan,
    url: BUSINESS.url,
    logo: `${BUSINESS.url}/Albright_Digital_Solutions_Logo.png`,
    image: `${BUSINESS.url}/Albright_Digital_Solutions_Logo.png`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    description: BUSINESS.description,
    foundingDate: `${BUSINESS.foundingYear}`,
    founder: {
      '@type': 'Person',
      '@id': `${BUSINESS.url}/about#jason-albright`,
      name: BUSINESS.founder.name,
      jobTitle: BUSINESS.founder.jobTitle,
      url: BUSINESS.founder.url,
      worksFor: {
        '@id': `${BUSINESS.url}/#organization`,
      },
    },
    knowsAbout: BUSINESS.knowsAbout,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: BUSINESS.sameAs,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address.formatted)}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    areaServed: [
      { '@type': 'State', name: 'Texas' },
      { '@type': 'Country', name: 'United States' },
    ],
    priceRange: '$$',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS.url}/#website`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    publisher: {
      '@id': `${BUSINESS.url}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BUSINESS.url}/about#jason-albright`,
    name: BUSINESS.founder.name,
    jobTitle: BUSINESS.founder.jobTitle,
    url: BUSINESS.founder.url,
    image: `${BUSINESS.url}/jason-albright-founder.jpg`,
    worksFor: {
      '@id': `${BUSINESS.url}/#organization`,
    },
    knowsAbout: BUSINESS.knowsAbout,
  };
}

export function offerCatalogSchema(services: { navName: string; intro: string; slug: string; services: { title: string; description: string }[] }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${BUSINESS.url}/services#core-service-catalog`,
    name: 'Albright Digital Solutions Core Services',
    url: `${BUSINESS.url}/services`,
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.navName,
        description: service.intro,
        url: `${BUSINESS.url}/services/${service.slug}`,
        provider: {
          '@id': `${BUSINESS.url}/#organization`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.navName} service options`,
          itemListElement: service.services.map((item) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: item.title,
              description: item.description,
            },
          })),
        },
      },
    })),
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
      url: BUSINESS.url,
      telephone: BUSINESS.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.state,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
      },
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
