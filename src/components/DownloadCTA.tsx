import React from 'react';
import { WindowsIcon } from './Icons';
import { CheckCircle2, ShieldCheck, AlertCircle, Cpu } from 'lucide-react';
import { APP_CONFIG, DOWNLOAD_URL } from '../config';
import { motion } from 'framer-motion';

interface DownloadCTAProps {
  onOpenDownloadModal?: () => void;
}

export const DownloadCTA: React.FC<DownloadCTAProps> = ({ onOpenDownloadModal }) => {
  const isConfigured = APP_CONFIG.isDownloadConfigured();

  return (
    <section className="section-wrapper download-section" id="download">
      <div className="container">
        <motion.div
          className="download-cta-card glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Ambient Monochromatic Glows */}
          <div className="cta-glow-blue" />
          <div className="cta-glow-purple" />
          <div className="download-cta-content">
            {/* Status Pill */}
            <div className="cta-badge">
              <span className="pulse-dot" />
              <span>Windows 10 & 11 Ready • MediaGrab v1.0.10</span>
            </div>

            <h2 className="cta-title">Ready to try MediaGrab?</h2>
            <p className="cta-description">
              Download MediaGrab for Windows and enjoy a simple desktop media workflow.
            </p>

            {/* Main Action Button */}
            <div className="cta-action-area">
              <a
                href={DOWNLOAD_URL}
                download
                className="btn btn-primary btn-lg cta-primary-btn"
              >
                <WindowsIcon size={20} />
                <span>Download for Windows</span>
              </a>

              {!isConfigured && onOpenDownloadModal && (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={onOpenDownloadModal}
                >
                  <AlertCircle size={18} />
                  <span>Release Setup Notice</span>
                </button>
              )}
            </div>

            <div className="cta-sub-meta">
              <span>Windows • Desktop Application</span>
              <span className="meta-separator">•</span>
              <span>MediaGrab {APP_CONFIG.version} (64-bit)</span>
              <span className="meta-separator">•</span>
              <span>Free Utility</span>
            </div>

            {/* Development State Notice if placeholder is active */}
            {!isConfigured && (
              <div className="dev-url-notice">
                <AlertCircle size={16} />
                <span>
                  <strong>Configuration Info:</strong> Download URL is currently set to placeholder <code>REPLACE_WITH_GITHUB_RELEASE_URL</code>. Update <code>src/config.ts</code> with your release URL when published.
                </span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="cta-trust-grid">
              <div className="trust-cell">
                <CheckCircle2 size={16} />
                <span>No Ads or Adware</span>
              </div>
              <div className="trust-cell">
                <ShieldCheck size={16} />
                <span>Privacy Conscious</span>
              </div>
              <div className="trust-cell">
                <Cpu size={16} />
                <span>Hardware Accelerated</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
