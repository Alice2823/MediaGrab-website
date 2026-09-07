import React from 'react';
import { MediaGrabLogo, WindowsIcon, GithubIcon } from './Icons';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { APP_CONFIG, DOWNLOAD_URL } from '../config';

interface FooterProps {
  onOpenDownloadModal?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <MediaGrabLogo size={52} showText={true} textSize="2.2rem" />
            <p className="footer-tagline">{APP_CONFIG.name} — {APP_CONFIG.tagline}</p>
            <p className="footer-subtext">
              A high-performance Windows desktop application for permitted media downloads, clip selection, and local file transcoding.
            </p>
            <div className="footer-meta-pill">
              <span className="pulse-dot green" />
              <span>Windows 10 / 11 64-bit Compatible</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How It Works</a>
              </li>
              <li>
                <a href="#supported-media" onClick={(e) => scrollToSection(e, 'supported-media')}>Supported Media</a>
              </li>
              <li>
                <a href="#conversion" onClick={(e) => scrollToSection(e, 'conversion')}>Local Conversion</a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
              </li>
            </ul>
          </div>

          {/* Product & Download */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href={DOWNLOAD_URL}
                  download
                  className="download-link-accent"
                >
                  <WindowsIcon size={14} />
                  <span>Download for Windows</span>
                </a>
              </li>
              <li>
                <a href="#screenshots" onClick={(e) => scrollToSection(e, 'screenshots')}>App Screenshots</a>
              </li>
              <li>
                <a href="#why-mediagrab" onClick={(e) => scrollToSection(e, 'why-mediagrab')}>Why MediaGrab</a>
              </li>
              <li>
                <a
                  href={APP_CONFIG.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex-link"
                >
                  <GithubIcon size={14} />
                  <span>GitHub Repository</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* System Specs */}
          <div className="footer-links-col">
            <h4 className="footer-heading">System Specs</h4>
            <ul className="footer-specs-list">
              <li>Platform: <strong>Windows 10/11 (64-bit)</strong></li>
              <li>Version: <strong>MediaGrab {APP_CONFIG.version}</strong></li>
              <li>Architecture: <strong>x64 / AMD64</strong></li>
              <li>Format: <strong>Installer & Portable</strong></li>
              <li>Telemetry: <strong>Zero Tracking</strong></li>
              <li>License: <strong>Free Desktop Utility</strong></li>
            </ul>
          </div>
        </div>

        {/* Responsible-Use Notice as explicitly requested */}
        <div className="footer-policy-box">
          <div className="policy-inner">
            <ShieldCheck size={18} className="text-cyan flex-shrink-0" />
            <p className="policy-text">
              <strong>Responsible Use Notice:</strong> Download content only when you have permission or the right to do so. MediaGrab does not bypass DRM or access restrictions.
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 MediaGrab. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <span>Built with modern desktop standards</span>
            <span className="dot-divider">•</span>
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="back-to-top-btn">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
