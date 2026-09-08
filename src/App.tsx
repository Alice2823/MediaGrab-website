import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { SupportedMedia } from './components/SupportedMedia';
import { ConversionSection } from './components/ConversionSection';
import { WhyMediaGrab } from './components/WhyMediaGrab';
import { Screenshots } from './components/Screenshots';
import { DownloadCTA } from './components/DownloadCTA';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { SEOPage } from './components/seo/SEOPage';
import { ToolsHub } from './components/seo/ToolsHub';
import { NotFoundPage } from './components/seo/NotFoundPage';
import { getSEOPageBySlug } from './seo/pages';
import { initGA, trackPageView } from './analytics';
import { APP_CONFIG } from './config';

export const normalizePath = (path: string): string => {
  if (!path) return '/';
  const clean = path.split('?')[0].split('#')[0].trim();
  const withoutTrailing = clean.replace(/\/+$/, '');
  return withoutTrailing === '' ? '/' : withoutTrailing.toLowerCase();
};

interface AppProps {
  initialPath?: string;
}

export const App: React.FC<AppProps> = ({ initialPath }) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Determine current path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return normalizePath(initialPath);
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  // Client-side navigation handler
  const handleNavigate = useCallback((href: string) => {
    if (typeof window === 'undefined') return;

    // Handle hash links
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
      return;
    }

    // Handle full path + hash (e.g. /#features)
    if (href.startsWith('/#')) {
      const targetHash = href.replace('/', '');
      if (currentPath !== '/') {
        setCurrentPath('/');
        window.history.pushState(null, '', href);
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', targetHash);
        }
      }
      return;
    }

    const nextPath = normalizePath(href);
    if (nextPath !== currentPath) {
      setCurrentPath(nextPath);
      window.history.pushState(null, '', href);
      trackPageView(href);
      window.scrollTo(0, 0);
    }
  }, [currentPath]);

  // Handle browser back/forward and hash changes
  useEffect(() => {
    initGA();
    trackPageView();

    const handleLocationChange = () => {
      const newPath = normalizePath(window.location.pathname);
      setCurrentPath(newPath);
      trackPageView();
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update canonical and head for homepage
  useEffect(() => {
    if (currentPath === '/') {
      document.title = `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`;
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `${APP_CONFIG.siteUrl}/`);
    }
  }, [currentPath]);

  // Route matching
  const renderMainContent = () => {
    // 1. Homepage
    if (currentPath === '/') {
      return (
        <>
          {/* 1. Hero & Product Preview */}
          <Hero onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />

          {/* 2. Feature Suite */}
          <Features />

          {/* 3. 3-Step Visual Process */}
          <HowItWorks />

          {/* 4. Supported Media Platforms */}
          <SupportedMedia />

          {/* 5. Local Video & Audio Conversion */}
          <ConversionSection />

          {/* 6. Why MediaGrab (Values & Comparison) */}
          <WhyMediaGrab />

          {/* 7. Interactive Desktop Screenshots */}
          <Screenshots />

          {/* 8. Download CTA Section */}
          <DownloadCTA onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />

          {/* 9. FAQ Section */}
          <FAQ />
        </>
      );
    }

    // 2. Central Download Tools Hub
    if (currentPath === '/download-tools') {
      return (
        <ToolsHub
          onNavigate={handleNavigate}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        />
      );
    }

    // 3. Programmatic SEO Landing Pages
    const slug = currentPath.replace(/^\//, '');
    const seoPageData = getSEOPageBySlug(slug);

    if (seoPageData) {
      return (
        <SEOPage
          page={seoPageData}
          onNavigate={handleNavigate}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        />
      );
    }

    // 4. Fallback: 404 Page
    return <NotFoundPage onNavigate={handleNavigate} />;
  };

  return (
    <div className="app-root">
      {/* Sticky/Floating Navigation Bar */}
      <Navbar
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Viewport */}
      <main id="main-content">
        {renderMainContent()}
      </main>

      {/* Footer with Legal Notices & Popular Tools Links */}
      <Footer
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Download Configuration & Release Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
};

export default App;
