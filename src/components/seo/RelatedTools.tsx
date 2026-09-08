import React from 'react';
import { SEOPageData } from '../../seo/types';
import { ArrowRight, Sparkles, Film, Music, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface RelatedToolsProps {
  relatedPages: SEOPageData[];
  onNavigate?: (href: string) => void;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ relatedPages, onNavigate }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'youtube':
        return <Film size={18} className="text-cyan" />;
      case 'instagram':
        return <Sparkles size={18} className="text-pink" />;
      case 'conversion':
        return <RefreshCw size={18} className="text-purple" />;
      default:
        return <Music size={18} className="text-emerald" />;
    }
  };

  return (
    <section className="section-wrapper seo-related-section" id="related-tools">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Internal Ecosystem</span>
          <h2 className="section-title">Related MediaGrabs Tools</h2>
          <p className="section-description">
            Explore companion tools for format conversion, stream extraction, and short-form video downloads.
          </p>
        </div>

        <div className="related-tools-grid">
          {relatedPages.map((tool, index) => (
            <motion.div
              key={tool.slug}
              className="related-tool-card glass-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="related-card-header">
                <div className="related-icon-box">{getCategoryIcon(tool.category)}</div>
                <span className="related-badge">{tool.badge}</span>
              </div>

              <div className="related-card-body">
                <h3 className="related-title">{tool.title}</h3>
                <p className="related-desc">{tool.intro.slice(0, 115)}...</p>
              </div>

              <div className="related-card-footer">
                <a
                  href={`/${tool.slug}`}
                  onClick={(e) => handleClick(e, `/${tool.slug}`)}
                  className="related-action-link"
                >
                  <span>Launch Tool</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="related-tools-hub-link">
          <a
            href="/download-tools"
            onClick={(e) => handleClick(e, '/download-tools')}
            className="btn btn-secondary btn-lg"
          >
            <span>Explore All MediaGrabs Tools & Directory</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
