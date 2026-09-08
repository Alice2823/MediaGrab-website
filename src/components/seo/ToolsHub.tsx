import React, { useState, useEffect } from 'react';
import { SEO_PAGES } from '../../seo/pages';
import { Breadcrumbs } from './Breadcrumbs';
import { DownloadCTA } from '../DownloadCTA';
import { APP_CONFIG } from '../../config';
import { trackPageView } from '../../analytics';
import { 
  Search, 
  ArrowRight, 
  Film, 
  Music, 
  Sparkles, 
  RefreshCw,
  BadgeCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolsHubProps {
  onNavigate?: (href: string) => void;
  onOpenDownloadModal?: () => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ onNavigate, onOpenDownloadModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const canonicalUrl = `${APP_CONFIG.siteUrl}/download-tools`;

  useEffect(() => {
    document.title = 'MediaGrabs Tools Directory — Free Download & Conversion Utilities';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Browse all MediaGrabs desktop tools for downloading permitted YouTube, Shorts, and Instagram videos, or converting MP4, MOV, and MP3 files offline.'
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    trackPageView('/download-tools', 'MediaGrabs Tools Directory');
    window.scrollTo(0, 0);
  }, [canonicalUrl]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'youtube', label: 'YouTube Tools' },
    { id: 'instagram', label: 'Instagram Tools' },
    { id: 'conversion', label: 'Converter & Transcoder' },
    { id: 'universal', label: 'Universal Tools' },
  ];

  const filteredTools = SEO_PAGES.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      tool.title.toLowerCase().includes(query) ||
      tool.intro.toLowerCase().includes(query) ||
      tool.supportedFormats.some((f) => f.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'youtube':
        return <Film size={20} className="text-cyan" />;
      case 'instagram':
        return <Sparkles size={20} className="text-pink" />;
      case 'conversion':
        return <RefreshCw size={20} className="text-purple" />;
      default:
        return <Music size={20} className="text-emerald" />;
    }
  };

  const hubSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MediaGrabs Download & Conversion Tools Directory',
    description: 'Complete catalog of free MediaGrabs desktop download and media conversion utilities.',
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SEO_PAGES.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${APP_CONFIG.siteUrl}/${tool.slug}`,
        name: tool.title,
      })),
    },
  };

  return (
    <div className="tools-hub-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />

      {/* Hub Hero */}
      <section className="tools-hub-hero">
        <div className="hero-bg-lights">
          <div className="light-orb orb-primary" />
          <div className="light-orb orb-secondary" />
          <div className="hero-grid-pattern" />
        </div>

        <div className="container">
          <Breadcrumbs items={[{ label: 'Tools' }]} onNavigate={onNavigate} />

          <motion.div
            className="hub-hero-header"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-badge-wrapper">
              <span className="hero-badge">
                <BadgeCheck size={15} className="text-white" />
                <span>MediaGrabs Tool Suite • 100% Free Desktop Utilities</span>
              </span>
            </div>

            <h1 className="hub-headline">Media Download & Conversion Tools</h1>
            <p className="hub-subheadline">
              Access dedicated tools for permitted stream downloads, high-bitrate audio extraction, and 100% private offline video transcoding.
            </p>

            {/* Filter & Search Bar */}
            <div className="hub-controls-bar glass-card">
              <div className="hub-search-box">
                <Search size={18} className="hub-search-icon" />
                <input
                  type="text"
                  className="hub-search-input"
                  placeholder="Search tools by name, platform, or format (e.g. MP4, MP3, Shorts)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search tools"
                />
              </div>

              <div className="hub-category-pills">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`hub-category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Catalog Grid */}
      <section className="section-wrapper tools-catalog-section">
        <div className="container">
          <div className="tools-count-bar">
            <span>Showing <strong>{filteredTools.length}</strong> available tools</span>
          </div>

          <div className="hub-tools-grid">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.slug}
                className="hub-tool-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="hub-card-top">
                  <div className="hub-tool-icon-wrap">{getCategoryIcon(tool.category)}</div>
                  <span className="hub-tool-badge">{tool.badge}</span>
                </div>

                <div className="hub-card-body">
                  <h2 className="hub-tool-title">
                    <a
                      href={`/${tool.slug}`}
                      onClick={(e) => handleClick(e, `/${tool.slug}`)}
                      className="title-link"
                    >
                      {tool.title}
                    </a>
                  </h2>
                  <p className="hub-tool-desc">{tool.intro}</p>

                  <div className="hub-tool-formats">
                    <span className="formats-tag-label">Formats:</span>
                    <div className="formats-pills-list">
                      {tool.supportedFormats.slice(0, 3).map((fmt, i) => (
                        <span key={i} className="mini-fmt-pill">
                          {fmt.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hub-card-footer">
                  <a
                    href={`/${tool.slug}`}
                    onClick={(e) => handleClick(e, `/${tool.slug}`)}
                    className="hub-tool-action-btn"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="hub-no-results glass-card">
              <h3>No matching tools found</h3>
              <p>Try searching for a different format, video platform, or reset your filters.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Global Windows CTA */}
      <DownloadCTA onOpenDownloadModal={onOpenDownloadModal} />
    </div>
  );
};
