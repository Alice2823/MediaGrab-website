import React, { useEffect } from 'react';
import { SEOPageData } from '../../seo/types';
import { getRelatedPages } from '../../seo/pages';
import { Breadcrumbs } from './Breadcrumbs';
import { ToolActionBox } from './ToolActionBox';
import { HowToSteps } from './HowToSteps';
import { SupportedFormats } from './SupportedFormats';
import { FAQSection } from './FAQSection';
import { RelatedTools } from './RelatedTools';
import { DownloadCTA } from '../DownloadCTA';
import { APP_CONFIG, DOWNLOAD_URL } from '../../config';
import { trackSEOLandingPageView } from '../../analytics';
import { BadgeCheck, Cpu, HardDrive, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface SEOPageProps {
  page: SEOPageData;
  onNavigate?: (href: string) => void;
  onOpenDownloadModal?: () => void;
}

export const SEOPage: React.FC<SEOPageProps> = ({
  page,
  onNavigate,
  onOpenDownloadModal,
}) => {
  const canonicalUrl = `${APP_CONFIG.siteUrl}/${page.slug}`;
  const relatedPages = getRelatedPages(page.relatedPages);

  // Synchronize document head tags dynamically in the browser
  useEffect(() => {
    document.title = page.metaTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', page.metaDescription);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Track SEO landing page view
    trackSEOLandingPageView(page.slug, page.title);

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [page, canonicalUrl]);

  // Structured Data: WebPage & SoftwareApplication
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    headline: page.h1,
    description: page.metaDescription,
    url: canonicalUrl,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: APP_CONFIG.name,
      url: `${APP_CONFIG.siteUrl}/`,
    },
    publisher: {
      '@type': 'SoftwareApplication',
      name: APP_CONFIG.name,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: APP_CONFIG.targetPlatform,
      downloadUrl: DOWNLOAD_URL,
      softwareVersion: APP_CONFIG.version,
    },
  };

  return (
    <div className="seo-landing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Page Hero Area */}
      <section className="seo-hero-section">
        <div className="hero-bg-lights">
          <div className="light-orb orb-primary" />
          <div className="light-orb orb-secondary" />
          <div className="hero-grid-pattern" />
        </div>

        <div className="container seo-hero-container">
          {/* Breadcrumb Trail */}
          <Breadcrumbs
            items={[
              { label: 'Tools', href: '/download-tools' },
              { label: page.title },
            ]}
            onNavigate={onNavigate}
          />

          <motion.div
            className="seo-hero-header"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Trust Pill */}
            <div className="hero-badge-wrapper">
              <span className="hero-badge">
                <BadgeCheck size={15} className="text-white" />
                <span>MediaGrabs Official Windows Tool • {page.badge}</span>
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="seo-hero-headline">{page.h1}</h1>

            {/* Intro Paragraph */}
            <p className="seo-hero-intro">{page.intro}</p>

            {/* Trust Points */}
            <div className="hero-trust-line seo-trust-line">
              <div className="trust-item">
                <Cpu size={14} />
                <span>Windows Native 64-bit</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <HardDrive size={14} />
                <span>Direct PC Storage</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <Shield size={14} />
                <span>Zero Ads or Telemetry</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Tool Action Area */}
          <motion.div
            className="seo-action-wrapper"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <ToolActionBox page={page} onOpenDownloadModal={onOpenDownloadModal} />
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Instructions */}
      <HowToSteps toolName={page.title} steps={page.steps} />

      {/* Formats & Compatibility Specifications */}
      <SupportedFormats
        toolName={page.title}
        platforms={page.supportedPlatforms}
        formats={page.supportedFormats}
        highlights={page.highlights}
      />

      {/* Frequently Asked Questions */}
      <FAQSection
        toolName={page.title}
        faqs={page.faqs}
        responsibleNotice={page.responsibleUse}
      />

      {/* Programmatic Internal Links / Related Tools */}
      {relatedPages.length > 0 && (
        <RelatedTools relatedPages={relatedPages} onNavigate={onNavigate} />
      )}

      {/* Global Windows App Download CTA */}
      <DownloadCTA onOpenDownloadModal={onOpenDownloadModal} />
    </div>
  );
};
