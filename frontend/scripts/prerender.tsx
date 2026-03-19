import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { buildHeadMarkup } from '../src/Seo';
import { COURIER_PAGE_META, COURIER_SCHEMA_FAQS, HOME_PAGE_META, HOME_SCHEMA_FAQS, SITE_URL, STATIC_PAGES } from '../src/seo-content';
import { BLOG_ARTICLES, BLOG_INDEX_META } from '../src/blog-content';

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');
const buildDate = new Date().toISOString().slice(0, 10);

const routes = [
  HOME_PAGE_META.canonicalPath,
  BLOG_INDEX_META.canonicalPath,
  ...STATIC_PAGES.map((page) => page.meta.canonicalPath),
  ...BLOG_ARTICLES.map((article) => article.meta.canonicalPath),
  ...Object.values(COURIER_PAGE_META).map((page) => page.canonicalPath),
];

function routeToOutputPath(route: string): string {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }

  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function buildSitemap(): string {
  const urls = routes
    .map((route) => {
      const location = route === '/' ? SITE_URL : `${SITE_URL}${route}`;
      const lastModified = getLastModifiedForRoute(route);
      return `<url><loc>${location}</loc><lastmod>${lastModified}</lastmod></url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

function getLastModifiedForRoute(route: string): string {
  if (route === '/' || route === BLOG_INDEX_META.canonicalPath) {
    return buildDate;
  }

  const staticPage = STATIC_PAGES.find((page) => page.meta.canonicalPath === route);
  if (staticPage) {
    return buildDate;
  }

  const blogArticle = BLOG_ARTICLES.find((article) => article.meta.canonicalPath === route);
  if (blogArticle) {
    return blogArticle.updatedAt;
  }

  const courierPage = Object.values(COURIER_PAGE_META).find((page) => page.canonicalPath === route);
  if (courierPage) {
    return buildDate;
  }

  return buildDate;
}

function buildRouteHead(route: string): string {
  if (route === '/') {
    return buildHeadMarkup(HOME_PAGE_META, 'Home', HOME_SCHEMA_FAQS);
  }

  if (route === BLOG_INDEX_META.canonicalPath) {
    return buildHeadMarkup(BLOG_INDEX_META, 'Blog');
  }

  const staticPage = STATIC_PAGES.find((page) => page.meta.canonicalPath === route);
  if (staticPage) {
    return buildHeadMarkup(staticPage.meta, staticPage.pageName, staticPage.faqs || []);
  }

  const blogArticle = BLOG_ARTICLES.find((article) => article.meta.canonicalPath === route);
  if (blogArticle) {
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blogArticle.title,
      description: blogArticle.description,
      url: `${SITE_URL}${blogArticle.meta.canonicalPath}`,
      mainEntityOfPage: `${SITE_URL}${blogArticle.meta.canonicalPath}`,
      datePublished: blogArticle.publishedAt,
      dateModified: blogArticle.updatedAt,
      author: {
        '@type': 'Person',
        name: blogArticle.authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: 'PakTrack',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/websitelogo.png`,
        },
      },
      keywords: [blogArticle.primaryKeyword, ...blogArticle.secondaryKeywords].join(', '),
    };

    return buildHeadMarkup(blogArticle.meta, blogArticle.title, blogArticle.faqs, [blogSchema]);
  }

  const pageEntry = Object.entries(COURIER_PAGE_META).find(([, page]) => page.canonicalPath === route);
  const pageMeta = pageEntry?.[1];
  if (!pageMeta) {
    return buildHeadMarkup(HOME_PAGE_META, 'Home', HOME_SCHEMA_FAQS);
  }

  const pageName = pageMeta.title.replace(/\s+\|\s+.*$/, '');
  const faqKey = pageEntry?.[0];
  const faqs = faqKey ? COURIER_SCHEMA_FAQS[faqKey] || [] : [];
  return buildHeadMarkup(pageMeta, pageName, faqs);
}

async function prerender(): Promise<void> {
  const template = await fs.readFile(templatePath, 'utf8');

  for (const route of routes) {
    const appHtml = renderToString(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
    );
    const head = buildRouteHead(route);

    const html = template
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace('</head>', `${head}</head>`);

    const outputPath = routeToOutputPath(route);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html, 'utf8');
  }

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8');
  await fs.writeFile(
    path.join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    'utf8',
  );
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
