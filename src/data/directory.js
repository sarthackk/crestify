/* ─── SaaS Directory ─────────────────────────────────────────────────────── */

export const CATEGORIES = [
  'All', 'AI', 'Productivity', 'Marketing', 'Dev Tools',
  'Analytics', 'Design', 'Finance', 'HR & Hiring',
];

export const TOOLS = [
  {
    slug: 'mockzy',
    name: 'Mockzy',
    tagline: 'Smartphone photo in. Photorealistic ad-grade imagery out.',
    description: 'AI creative studio for D2C brands. Upload a product photo and get professional mockups, lifestyle images, and video content — no designer, no prompts.',
    category: 'AI',
    pricing: 'Freemium',
    url: 'https://mockzy.app',
    founder: 'Sarthak Tiwari',
    twitter: 'nosarthack',
    featured: true,
    status: 'live',
  },
  {
    slug: 'distrute',
    name: 'Distrute',
    tagline: 'Distribution OS for SaaS founders.',
    description: 'Run influencer campaigns built specifically for software products. Pairs SaaS founders with relevant creators and automates campaign workflows.',
    category: 'Marketing',
    pricing: 'Freemium',
    url: 'https://distrute.vercel.app',
    founder: 'Sarthak Tiwari',
    twitter: 'nosarthack',
    featured: true,
    status: 'alpha',
  },
  {
    slug: 'sked',
    name: 'Sked',
    tagline: 'Scheduling infrastructure for teams and creators.',
    description: 'Book, manage, and automate time without the back-and-forth. Built for teams, coaches, and creators who need clean scheduling workflows.',
    category: 'Productivity',
    pricing: 'Freemium',
    url: 'https://sked.club',
    founder: 'Sarthak Tiwari',
    twitter: 'nosarthack',
    featured: false,
    status: 'soon',
  },
];

export const PRICING_COLORS = {
  Free:     { bg: 'rgba(13,155,106,0.12)', color: '#0d9b6a', border: '#0d9b6a33' },
  Freemium: { bg: 'rgba(255,77,31,0.10)',  color: '#ff4d1f', border: '#ff4d1f33' },
  Paid:     { bg: 'rgba(108,71,255,0.10)', color: '#6c47ff', border: '#6c47ff33' },
};

export const STATUS_LABELS = {
  live:  { label: 'Live',        color: '#0d9b6a' },
  alpha: { label: 'Alpha',       color: '#6c47ff' },
  beta:  { label: 'Beta',        color: '#f5a623' },
  soon:  { label: 'Coming soon', color: 'var(--ink-4)' },
};
