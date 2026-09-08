import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');
const publicDir = path.resolve(rootDir, 'public');

async function runPrerender() {
  console.log('\n🚀 Starting static prerendering for MediaGrabs SEO system...\n');

  // 1. Build SSR server bundle
  console.log('📦 Building SSR entry bundle...');
  await build({
    root: rootDir,
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: 'entry-server.js',
        },
      },
    },
  });

  // 2. Load the built server module
  const serverEntryUrl = pathToFileURL(path.resolve(distSsrDir, 'entry-server.js')).href;
  const { render, SEO_PAGES, APP_CONFIG } = await import(serverEntryUrl);

  const siteUrl = APP_CONFIG.siteUrl.replace(/\/+$/, '');
  const templateHtml = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

  // Helper to replace or inject tags in <head>
  const injectHeadTags = (html, tags) => {
    let modified = html;

    // Replace <title>
    if (tags.title) {
      modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${tags.title}</title>`);
    }

    // Replace or insert meta description
    if (tags.description) {
      if (/<meta\s+name=["']description["'][^>]*>/i.test(modified)) {
        modified = modified.replace(
          /<meta\s+name=["']description["'][^>]*>/i,
          `<meta name="description" content="${escapeHtml(tags.description)}" />`
        );
      } else {
        modified = modified.replace('</head>', `  <meta name="description" content="${escapeHtml(tags.description)}" />\n</head>`);
      }
    }

    // Replace or insert canonical link
    if (tags.canonical) {
      if (/<link\s+rel=["']canonical["'][^>]*>/i.test(modified)) {
        modified = modified.replace(
          /<link\s+rel=["']canonical["'][^>]*>/i,
          `<link rel="canonical" href="${tags.canonical}" />`
        );
      } else {
        modified = modified.replace('</head>', `  <link rel="canonical" href="${tags.canonical}" />\n</head>`);
      }
    }

    // Replace existing OG tags
    if (tags.ogTitle) {
      if (/<meta\s+property=["']og:title["'][^>]*>/i.test(modified)) {
        modified = modified.replace(
          /<meta\s+property=["']og:title["'][^>]*>/i,
          `<meta property="og:title" content="${escapeHtml(tags.ogTitle)}" />`
        );
      } else {
        modified = modified.replace('</head>', `  <meta property="og:title" content="${escapeHtml(tags.ogTitle)}" />\n</head>`);
      }
    }

    if (tags.ogDescription) {
      if (/<meta\s+property=["']og:description["'][^>]*>/i.test(modified)) {
        modified = modified.replace(
          /<meta\s+property=["']og:description["'][^>]*>/i,
          `<meta property="og:description" content="${escapeHtml(tags.ogDescription)}" />`
        );
      } else {
        modified = modified.replace('</head>', `  <meta property="og:description" content="${escapeHtml(tags.ogDescription)}" />\n</head>`);
      }
    }

    if (tags.canonical) {
      if (/<meta\s+property=["']og:url["'][^>]*>/i.test(modified)) {
        modified = modified.replace(
          /<meta\s+property=["']og:url["'][^>]*>/i,
          `<meta property="og:url" content="${tags.canonical}" />`
        );
      } else {
        modified = modified.replace('</head>', `  <meta property="og:url" content="${tags.canonical}" />\n</head>`);
      }
    }

    // Replace existing Twitter tags
    if (tags.twitterTitle) {
      if (/<meta\s+name=["']twitter:title["'][^>]*>/i.test(modified)) {
        modified = modified.replace(
          /<meta\s+name=["']twitter:title["'][^>]*>/i,
          `<meta name="twitter:title" content="${escapeHtml(tags.twitterTitle)}" />`
        );
      } else {
        modified = modified.replace('</head>', `  <meta name="twitter:title" content="${escapeHtml(tags.twitterTitle)}" />\n</head>`);
      }
    }

    if (tags.twitterDescription) {
      if (/<meta\s+name=["']twitter:description["'][^>]*>/i.test(modified)) {
        modified = modified.replace(
          /<meta\s+name=["']twitter:description["'][^>]*>/i,
          `<meta name="twitter:description" content="${escapeHtml(tags.twitterDescription)}" />`
        );
      } else {
        modified = modified.replace('</head>', `  <meta name="twitter:description" content="${escapeHtml(tags.twitterDescription)}" />\n</head>`);
      }
    }

    // Insert JSON-LD schema
    if (tags.schema) {
      const schemaTag = `  <script type="application/ld+json">\n${JSON.stringify(tags.schema, null, 2)}\n  </script>\n</head>`;
      modified = modified.replace('</head>', schemaTag);
    }

    return modified;
  };

  const escapeHtml = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const renderedRoutes = [];

  // 3. Prerender Homepage (/)
  console.log('Rendering: / (Homepage)');
  const homeAppHtml = render('/');
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: APP_CONFIG.name,
    url: `${siteUrl}/`,
    description: APP_CONFIG.subHeadline,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/download-tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  let homeFinalHtml = templateHtml.replace('<div id="root"></div>', `<div id="root">${homeAppHtml}</div>`);
  homeFinalHtml = injectHeadTags(homeFinalHtml, {
    title: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    description: 'MediaGrabs is a modern, simple Windows desktop media downloader and converter for permitted media. Fast, privacy-focused, and native desktop performance.',
    canonical: `${siteUrl}/`,
    ogTitle: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    ogDescription: 'A simple, powerful desktop media downloader and converter for Windows. Download permitted media and convert video and audio files with ease.',
    twitterTitle: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    twitterDescription: 'A simple, powerful desktop media downloader and converter for Windows.',
    schema: homeSchema,
  });
  fs.writeFileSync(path.resolve(distDir, 'index.html'), homeFinalHtml, 'utf-8');
  renderedRoutes.push('/');

  // 4. Prerender Tools Hub (/download-tools)
  console.log('Rendering: /download-tools (Tools Directory)');
  const hubAppHtml = render('/download-tools');
  const hubSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MediaGrabs Download & Conversion Tools Directory',
    description: 'Browse all MediaGrabs desktop tools for downloading permitted media and converting video and audio files.',
    url: `${siteUrl}/download-tools`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SEO_PAGES.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/${tool.slug}`,
        name: tool.title,
      })),
    },
  };

  let hubFinalHtml = templateHtml.replace('<div id="root"></div>', `<div id="root">${hubAppHtml}</div>`);
  hubFinalHtml = injectHeadTags(hubFinalHtml, {
    title: 'MediaGrabs Tools Directory — Free Download & Conversion Utilities',
    description: 'Browse all MediaGrabs desktop tools for downloading permitted YouTube, Shorts, and Instagram videos, or converting MP4, MOV, and MP3 files offline.',
    canonical: `${siteUrl}/download-tools`,
    ogTitle: 'MediaGrabs Tools Directory — Free Media Download & Conversion Utilities',
    ogDescription: 'Complete suite of free desktop tools for permitted media downloads, stream extraction, and offline transcoding.',
    twitterTitle: 'MediaGrabs Tools Directory',
    twitterDescription: 'Browse all MediaGrabs desktop tools for video downloading and local format conversion.',
    schema: hubSchema,
  });

  const hubDir = path.resolve(distDir, 'download-tools');
  if (!fs.existsSync(hubDir)) fs.mkdirSync(hubDir, { recursive: true });
  fs.writeFileSync(path.resolve(hubDir, 'index.html'), hubFinalHtml, 'utf-8');
  fs.writeFileSync(path.resolve(distDir, 'download-tools.html'), hubFinalHtml, 'utf-8');
  renderedRoutes.push('/download-tools');

  // 5. Prerender Each Programmatic SEO Landing Page
  for (const page of SEO_PAGES) {
    const route = `/${page.slug}`;
    console.log(`Rendering: ${route} (${page.title})`);

    const pageAppHtml = render(route);
    const pageCanonical = `${siteUrl}/${page.slug}`;

    const pageSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageCanonical}#webpage`,
          url: pageCanonical,
          name: page.title,
          headline: page.h1,
          description: page.metaDescription,
          isPartOf: {
            '@type': 'WebSite',
            name: APP_CONFIG.name,
            url: `${siteUrl}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageCanonical}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${siteUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Tools',
              item: `${siteUrl}/download-tools`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: page.title,
              item: pageCanonical,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageCanonical}#faq`,
          mainEntity: page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    };

    let pageFinalHtml = templateHtml.replace('<div id="root"></div>', `<div id="root">${pageAppHtml}</div>`);
    pageFinalHtml = injectHeadTags(pageFinalHtml, {
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: pageCanonical,
      ogTitle: page.metaTitle,
      ogDescription: page.metaDescription,
      twitterTitle: page.metaTitle,
      twitterDescription: page.metaDescription,
      schema: pageSchema,
    });

    const pageDir = path.resolve(distDir, page.slug);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.resolve(pageDir, 'index.html'), pageFinalHtml, 'utf-8');
    fs.writeFileSync(path.resolve(distDir, `${page.slug}.html`), pageFinalHtml, 'utf-8');
    renderedRoutes.push(route);
  }

  // 6. Prerender 404 Page (dist/404.html)
  console.log('Rendering: /404 (Not Found Page)');
  const notFoundAppHtml = render('/404');
  let notFoundFinalHtml = templateHtml.replace('<div id="root"></div>', `<div id="root">${notFoundAppHtml}</div>`);
  notFoundFinalHtml = injectHeadTags(notFoundFinalHtml, {
    title: 'Page Not Found (404) — MediaGrabs',
    description: 'The requested MediaGrabs page was not found.',
  });
  fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundFinalHtml, 'utf-8');

  // 7. Generate Programmatic Sitemap (sitemap.xml)
  console.log('\n🗺️ Generating sitemap.xml...');
  const today = new Date().toISOString().split('T')[0];

  const sitemapUrls = [
    {
      loc: `${siteUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: `${siteUrl}/download-tools`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
    },
    ...SEO_PAGES.map((p) => ({
      loc: `${siteUrl}/${p.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: p.category === 'youtube' || p.category === 'universal' ? '0.85' : '0.80',
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  // 8. Generate robots.txt
  console.log('🤖 Generating robots.txt...');
  const robotsTxt = `# MediaGrabs Production robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /private/

Sitemap: ${siteUrl}/sitemap.xml
`;

  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8');

  // 9. Clean up temporary SSR folder
  console.log('🧹 Cleaning up dist-ssr artifacts...');
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  }

  console.log(`\n✨ Static prerender complete! Generated ${renderedRoutes.length} crawlable static HTML routes + 404.html.`);
}

runPrerender().catch((err) => {
  console.error('\n❌ Prerender failed:', err);
  process.exit(1);
});
