import { Helmet } from 'react-helmet-async';

const SITE = 'https://crestify.co';
const DEFAULT_OG = '/og-default.jpg';

export default function SEO({
  title,
  description,
  canonical = '/',
  ogImage = DEFAULT_OG,
  type = 'website',
  noIndex = false,
  schema,
  keywords,
}) {
  const fullTitle = title
    ? `${title} | Crestify`
    : 'Crestify — Product Development Studio for Startups & D2C Brands';
  const url = `${SITE}${canonical}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:type"        content={type} />
      <meta property="og:image"       content={`${SITE}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name"   content="Crestify" />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@crestifyco" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={`${SITE}${ogImage}`} />

      {/* JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

/* ─── Pre-built schemas ─────────────────────────────────────────────────── */

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://crestify.co/#organization',
  name: 'Crestify',
  alternateName: ['Crestify Studio', 'The Kaart Studio', 'Kaart Studio'],
  url: 'https://crestify.co',
  logo: {
    '@type': 'ImageObject',
    url: 'https://crestify.co/logo.png',
  },
  description: 'Crestify (also known as The Kaart Studio) is a full-stack Shopify agency and product development studio for D2C brands. We design, build, and grow high-converting Shopify stores — from first store to Shopify Plus.',
  foundingDate: '2022',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 6 },
  sameAs: [
    'https://kaart.studio',
    'https://www.linkedin.com/company/crestify',
    'https://instagram.com/crestify',
    'https://x.com/crestifyco',
    'https://twitter.com/crestify',
    'https://github.com/sarthackk',
  ],
  areaServed: ['US', 'GB', 'IN', 'AE'],
  serviceType: [
    'Shopify Store Development',
    'Shopify Migration',
    'Ecommerce CRO',
    'Performance Marketing',
    'Email Marketing Automation',
    'Shopify Plus Implementation',
    'SaaS Development',
    'MVP Development',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@crestify.co',
    contactType: 'customer service',
    url: 'https://crestify.co/contact',
    areaServed: ['IN', 'US', 'GB', 'AE'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dehradun',
    addressCountry: 'IN',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://crestify.co/#website',
  name: 'Crestify',
  url: 'https://crestify.co',
  publisher: { '@id': 'https://crestify.co/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://crestify.co/?s={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export function serviceSchema(name, desc, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: 'Crestify',
      url: 'https://crestify.co',
    },
    description: desc,
    url: `https://crestify.co${url}`,
    areaServed: ['IN', 'CA', 'GB', 'US'],
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://crestify.co${item.path}`,
    })),
  };
}
