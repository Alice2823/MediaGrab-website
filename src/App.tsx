import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="app-root">
      {/* Sticky/Floating Navigation Bar */}
      <Navbar onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
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
      </main>

      {/* 10. Footer with Legal Notices */}
      <Footer onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />

      {/* Download Configuration & Release Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
};

export default App;
