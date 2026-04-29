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
  name: 'Crestify',
  url: 'https://crestify.co',
  logo: 'https://crestify.co/logo.png',
  sameAs: [
    'https://x.com/crestifyco',
    'https://github.com/sarthackk',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@crestify.co',
    contactType: 'customer service',
    areaServed: ['IN', 'CA', 'GB', 'US'],
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
  name: 'Crestify',
  url: 'https://crestify.co',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://crestify.co/work?q={search_term_string}',
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
