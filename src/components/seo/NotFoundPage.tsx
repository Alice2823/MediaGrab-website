import React, { useEffect } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { SEO_PAGES } from '../../seo/pages';
import { trackPageView } from '../../analytics';
import { AlertCircle, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotFoundPageProps {
  onNavigate?: (href: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Page Not Found (404) — MediaGrabs';
    trackPageView('/404', '404 - Page Not Found');
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const suggestedTools = SEO_PAGES.slice(0, 4);

  return (
    <div className="not-found-page">
      <section className="not-found-hero">
        <div className="hero-bg-lights">
          <div className="light-orb orb-primary" />
          <div className="light-orb orb-secondary" />
          <div className="hero-grid-pattern" />
        </div>

        <div className="container">
          <Breadcrumbs items={[{ label: '404 Not Found' }]} onNavigate={onNavigate} />

          <motion.div
            className="not-found-card glass-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="not-found-badge">
              <AlertCircle size={18} className="text-cyan" />
              <span>404 Error • Resource Unavailable</span>
            </div>

            <h1 className="not-found-title">Page Not Found</h1>
            <p className="not-found-text">
              The page or tool URL you requested does not exist or has been moved. You can return to the MediaGrabs homepage or browse our complete suite of download and conversion tools below.
            </p>

            <div className="not-found-actions">
              <a
                href="/"
                onClick={(e) => handleClick(e, '/')}
                className="btn btn-primary btn-lg"
              >
                <Home size={18} />
                <span>Return to Homepage</span>
              </a>

              <a
                href="/download-tools"
                onClick={(e) => handleClick(e, '/download-tools')}
                className="btn btn-secondary btn-lg"
              >
                <LayoutGrid size={18} />
                <span>Browse All Tools Directory</span>
              </a>
            </div>

            {/* Suggested Popular Tools */}
            <div className="not-found-suggestions">
              <h2 className="suggestions-heading">Popular MediaGrabs Tools:</h2>
              <div className="suggestions-grid">
                {suggestedTools.map((tool) => (
                  <a
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    onClick={(e) => handleClick(e, `/${tool.slug}`)}
                    className="suggestion-card"
                  >
                    <div className="suggestion-info">
                      <span className="suggestion-name">{tool.title}</span>
                      <span className="suggestion-badge">{tool.badge}</span>
                    </div>
                    <ArrowRight size={14} className="suggestion-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
