import React, { useState, useEffect } from 'react';
import { MediaGrabLogo, WindowsIcon } from './Icons';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { DOWNLOAD_URL, APP_CONFIG } from '../config';

interface NavbarProps {
  onOpenDownloadModal?: () => void;
  onNavigate?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tools', href: '/download-tools' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Supported Media', href: '#supported-media' },
    { label: 'Conversion', href: '#conversion' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith('/')) {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(href);
      }
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      // If not on homepage, first navigate home, then scroll
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        if (onNavigate) {
          onNavigate('/' + href);
        } else {
          window.location.href = '/' + href;
        }
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/');
    }
  };

  return (
    <header
      className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar-container">
        <a
          href="/"
          onClick={handleLogoClick}
          className="navbar-logo"
          aria-label="MediaGrabs Home"
        >
          <MediaGrabLogo size={46} showText={true} />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-links-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${link.href === '/download-tools' ? 'nav-link-tools' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="navbar-cta-group">
          <a
            href={DOWNLOAD_URL}
            download
            className="btn btn-primary nav-download-btn"
          >
            <WindowsIcon size={16} />
            <span>Download for Windows</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-inner">
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} className="text-muted" />
                </a>
              ))}
            </nav>

            <div className="mobile-drawer-cta">
              <a
                href={DOWNLOAD_URL}
                download
                className="btn btn-primary btn-lg full-width"
                onClick={() => setMobileMenuOpen(false)}
              >
                <WindowsIcon size={18} />
                <span>Download for Windows</span>
              </a>
              <p className="mobile-cta-note">Windows 10 / 11 64-bit • MediaGrabs {APP_CONFIG.version} • Free Utility</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
