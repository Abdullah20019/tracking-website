import React from 'react';
import { FaqItem, PageMeta, SITE_URL } from './seo-content';

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const GOOGLE_SITE_VERIFICATION = viteEnv?.VITE_GOOGLE_SITE_VERIFICATION || process.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const GA_MEASUREMENT_ID = viteEnv?.VITE_GA_MEASUREMENT_ID || process.env.VITE_GA_MEASUREMENT_ID || '';

type SeoProps = {
  meta: PageMeta;
  pageName: string;
  faqs?: FaqItem[];
  extraSchemas?: object[];
};

function buildAbsoluteUrl(path: string): string {
  if (!path || path === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSchemas(pageName: string, canonicalUrl: string, faqs: FaqItem[]) {
  const isHomePage = canonicalUrl === SITE_URL;
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PakTrack',
      url: SITE_URL,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PakTrack',
      url: SITE_URL,
      logo: `${SITE_URL}/websitelogo.png`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageName,
      url: canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'PakTrack',
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: isHomePage
        ? [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: pageName,
              item: canonicalUrl,
            },
          ],
    },
  ];

  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  return schemas;
}

export function buildHeadMarkup(meta: PageMeta, pageName: string, faqs: FaqItem[] = [], extraSchemas: object[] = []): string {
  const canonicalUrl = buildAbsoluteUrl(meta.canonicalPath);
  const schemas = [...buildSchemas(pageName, canonicalUrl, faqs), ...extraSchemas];

  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    `<meta name="keywords" content="${escapeHtml(meta.keywords.join(', '))}">`,
    `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="PakTrack">`,
    `<meta property="og:locale" content="en_PK">`,
    `<meta property="og:title" content="${escapeHtml(meta.ogTitle)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.ogDescription)}">`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:image" content="${escapeHtml(`${SITE_URL}/websitelogo.png`)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(meta.ogTitle)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.ogDescription)}">`,
    `<meta name="twitter:image" content="${escapeHtml(`${SITE_URL}/websitelogo.png`)}">`,
    ...(GOOGLE_SITE_VERIFICATION
      ? [`<meta name="google-site-verification" content="${escapeHtml(GOOGLE_SITE_VERIFICATION)}">`]
      : []),
    ...(GA_MEASUREMENT_ID
      ? [
          `<script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(GA_MEASUREMENT_ID)}"></script>`,
          `<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${escapeHtml(GA_MEASUREMENT_ID)}', { page_path: window.location.pathname });</script>`,
        ]
      : []),
    ...schemas.map(
      (schema, index) =>
        `<script type="application/ld+json" data-seo-schema="${index}">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
    ),
  ];

  return tags.join('');
}

export function Seo({ meta, pageName, faqs = [], extraSchemas = [] }: SeoProps) {
  React.useEffect(() => {
    const canonicalUrl = buildAbsoluteUrl(meta.canonicalPath);
    document.title = meta.title;

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value);
      });
    };

    const upsertLink = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value);
      });
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: meta.keywords.join(', ') });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
    if (GOOGLE_SITE_VERIFICATION) {
      upsertMeta('meta[name="google-site-verification"]', {
        name: 'google-site-verification',
        content: GOOGLE_SITE_VERIFICATION,
      });
    }
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'PakTrack' });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_PK' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.ogTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.ogDescription });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: `${SITE_URL}/websitelogo.png` });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.ogTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.ogDescription });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: `${SITE_URL}/websitelogo.png` });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    document.head.querySelectorAll('script[data-seo-schema]').forEach((element) => element.remove());
    [...buildSchemas(pageName, canonicalUrl, faqs), ...extraSchemas].forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoSchema = String(index);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [extraSchemas, faqs, meta, pageName]);

  return null;
}
