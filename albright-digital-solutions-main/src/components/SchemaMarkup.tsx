import { useEffect } from 'react';

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects JSON-LD structured data into the document <head>.
 * Accepts a single schema object or an array of schema objects.
 * Automatically cleans up on unmount to prevent duplicate schema tags.
 */
export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  useEffect(() => {
    const schemas = Array.isArray(schema) ? schema : [schema];
    const scriptElements: HTMLScriptElement[] = [];

    schemas.forEach((s) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    return () => {
      scriptElements.forEach((el) => {
        if (document.head.contains(el)) {
          document.head.removeChild(el);
        }
      });
    };
  }, [schema]);

  return null;
}

// ─── Shared Business Constants ────────────────────────────────────────────
export const BUSINESS = {
  name: 'Albright Digital Solutions',
  legalName: 'Albright Digital Solutions LLC',
  url: 'https://albrightdigitalsolutions.com',
  email: 'jason@founditmarketing.com',
  phone: '+1-985-351-0299',
  address: {
    street: '100 Congress Ave',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    country: 'US',
  },
  geo: {
    lat: 30.2672,
    lng: -97.7431,
  },
  hours: [
    'Mo-Fr 08:00-18:00',
    'Sa 09:00-14:00',
  ],
  foundingYear: 2023,
  description:
    'Albright Digital Solutions is a full-service digital agency in Austin, Texas, specializing in AI automation, custom website design and development, professional video editing, and graphic design for local businesses and startups.',
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      { '@type': 'City', name: 'Austin', containedInPlace: { '@type': 'State', name: 'Texas' } },
      { '@type': 'City', name: 'Round Rock', containedInPlace: { '@type': 'State', name: 'Texas' } },
      { '@type': 'City', name: 'Cedar Park', containedInPlace: { '@type': 'State', name: 'Texas' } },
      { '@type': 'City', name: 'Georgetown', containedInPlace: { '@type': 'State', name: 'Texas' } },
      { '@type': 'City', name: 'San Marcos', containedInPlace: { '@type': 'State', name: 'Texas' } },
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
