import React from 'react';
import { ShieldCheck, Film, Music, Cpu } from 'lucide-react';
import { HighlightItem } from '../../seo/types';
import { motion } from 'framer-motion';

interface SupportedFormatsProps {
  toolName: string;
  platforms: string[];
  formats: string[];
  highlights: HighlightItem[];
}

export const SupportedFormats: React.FC<SupportedFormatsProps> = ({
  toolName,
  platforms,
  formats,
  highlights,
}) => {
  return (
    <section className="section-wrapper seo-formats-section" id="supported-specifications">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Specifications & Compatibility</span>
          <h2 className="section-title">Supported Formats & Capabilities</h2>
          <p className="section-description">
            MediaGrabs is tailored to process verified media sources and formats for {toolName} with high precision.
          </p>
        </div>

        <div className="formats-dual-grid">
          {/* Formats & Platforms Card */}
          <div className="formats-spec-card glass-card">
            <div className="spec-card-header">
              <Film size={20} className="text-cyan" />
              <h3 className="spec-card-title">Supported Media Sources</h3>
            </div>
            <ul className="spec-card-list">
              {platforms.map((plat, idx) => (
                <li key={idx} className="spec-list-item">
                  <span className="spec-check-dot">✓</span>
                  <span>{plat}</span>
                </li>
              ))}
            </ul>

            <div className="spec-card-divider" />

            <div className="spec-card-header">
              <Music size={20} className="text-purple" />
              <h3 className="spec-card-title">Supported Output Formats</h3>
            </div>
            <div className="spec-pills-wrap">
              {formats.map((fmt, idx) => (
                <span key={idx} className="spec-pill-badge">
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div className="formats-highlights-container">
            {highlights.map((hl, idx) => (
              <motion.div
                key={idx}
                className="highlight-mini-card glass-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="highlight-icon-wrap">
                  {idx % 2 === 0 ? <Cpu size={18} /> : <ShieldCheck size={18} />}
                </div>
                <div>
                  <h4 className="highlight-title">{hl.title}</h4>
                  <p className="highlight-desc">{hl.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
