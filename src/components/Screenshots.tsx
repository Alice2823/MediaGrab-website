import React, { useState } from 'react';
import { 
  Film, 
  Scissors, 
  RefreshCw, 
  CheckCircle2, 
  Maximize2, 
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreenshotData {
  id: string;
  tabLabel: string;
  title: string;
  badge: string;
  description: string;
  imageSrc: string;
  aspectRatio?: string;
  highlights: string[];
}

export const Screenshots: React.FC = () => {
  const screenshots: ScreenshotData[] = [
    {
      id: 'clip-selection',
      tabLabel: 'Clip Trimmer',
      title: 'Precision Clip Selection & Trimmer',
      badge: 'Interactive Trimmer',
      description: 'Select start and end timestamps with timeline slider controls. Preview selection before downloading only the exact segment you need.',
      imageSrc: '/screenshots/app-trimmer.png',
      highlights: ['Timeline Range Slider', 'Millisecond Start/End Timestamps', 'Selection Preview Player', 'Fast Segment Demux'],
    },
    {
      id: 'converter',
      tabLabel: 'Video → Audio',
      title: 'Built-in Local Video to Audio Transcoder',
      badge: 'Offline Converter',
      description: 'Convert videos already on your PC into studio-grade MP3 (up to 320 kbps), customize bitrate, sample rate, and adjust audio trim without uploading files to the cloud.',
      imageSrc: '/screenshots/app-converter.png',
      highlights: ['320 kbps Studio MP3', 'Quality Presets (Best/High/Small)', 'Zero Cloud Upload', 'Local File Exporter'],
    },
    {
      id: 'complete',
      tabLabel: 'Download Manager',
      title: 'Download Complete & File Manager',
      badge: 'Task Complete',
      description: 'Clean progress tracker with 100% completion verification, instant 1-click "Open File", and "Open Folder" direct desktop integration.',
      imageSrc: '/screenshots/app-complete.png',
      highlights: ['100% Verified File Save', 'Direct Open File Button', 'Open Containing Folder', 'Clean Stream Purge'],
    },
    {
      id: 'home',
      tabLabel: 'Clean Home View',
      title: 'Distraction-Free Home Interface',
      badge: 'Desktop Native',
      description: 'Minimalist, dark-themed starting screen. Paste YouTube videos, Shorts, or Instagram Reels with instant link validation.',
      imageSrc: '/screenshots/app-home.png',
      highlights: ['Instant Link Detection', 'Zero Bloat or Popups', 'One-Click Paste Button', 'Quick Navigation Tabs'],
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(screenshots[0].id);
  const [lightboxImage, setLightboxImage] = useState<ScreenshotData | null>(null);

  const currentScreenshot = screenshots.find((s) => s.id === activeTab) || screenshots[0];

  return (
    <section className="section-wrapper screenshots-section" id="screenshots">
      <div className="container">
        <div className="section-header">
          <span className="section-tag purple">Actual Application Interface</span>
          <h2 className="section-title">Designed for Everyday Productivity</h2>
          <p className="section-description">
            Explore authentic screenshots of the MediaGrabs Windows desktop application. Clean, responsive, and crafted with attention to every detail.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="screenshots-nav" role="tablist">
          {screenshots.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeTab === s.id}
              className={`screenshot-tab-btn ${activeTab === s.id ? 'active' : ''}`}
              onClick={() => setActiveTab(s.id)}
            >
              {s.id === 'clip-selection' && <Scissors size={16} />}
              {s.id === 'converter' && <RefreshCw size={16} />}
              {s.id === 'complete' && <CheckCircle2 size={16} />}
              {s.id === 'home' && <Film size={16} />}
              <span className="tab-text">{s.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Main Screenshot Showcase */}
        <div className="screenshot-display-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreenshot.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="desktop-screenshot-frame glass-card"
            >
              {/* Desktop Window Titlebar */}
              <div className="screenshot-window-bar">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="/logo-mark.png" alt="" style={{ width: 16, height: 16, objectFit: 'contain' }} />
                  <span className="window-title-caption">
                    MediaGrabs • {currentScreenshot.title}
                  </span>
                </div>
                <div className="window-bar-actions">
                  <span className="window-pill-tag">{currentScreenshot.badge}</span>
                  <button
                    className="zoom-btn"
                    onClick={() => setLightboxImage(currentScreenshot)}
                    title="Expand Screenshot Fullscreen"
                    aria-label="Expand Screenshot"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Real Screenshot Image Container */}
              <div
                className="screenshot-image-container"
                onClick={() => setLightboxImage(currentScreenshot)}
                title="Click to view full size"
              >
                <img
                  src={currentScreenshot.imageSrc}
                  alt={`MediaGrabs Screenshot - ${currentScreenshot.title}`}
                  className="real-screenshot-img"
                  loading="lazy"
                />
                <div className="screenshot-hover-overlay">
                  <div className="hover-badge">
                    <Maximize2 size={16} />
                    <span>Click to Expand Fullscreen</span>
                  </div>
                </div>
              </div>

              {/* Caption & Highlights Footer */}
              <div className="screenshot-footer-info">
                <div className="info-text-side">
                  <h3 className="info-title">{currentScreenshot.title}</h3>
                  <p className="info-description">{currentScreenshot.description}</p>
                </div>

                <div className="info-highlights-tags">
                  {currentScreenshot.highlights.map((h, i) => (
                    <span key={i} className="highlight-pill">
                      <span className="pulse-dot green" style={{ width: 6, height: 6 }} />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Selector Grid */}
        <div className="screenshot-cards-row">
          {screenshots.map((s) => (
            <button
              key={s.id}
              className={`screenshot-mini-card ${activeTab === s.id ? 'active' : ''}`}
              onClick={() => setActiveTab(s.id)}
            >
              <div className="mini-thumb-preview">
                <img src={s.imageSrc} alt={s.tabLabel} loading="lazy" />
              </div>
              <div className="mini-text">
                <span className="mini-title">{s.tabLabel}</span>
                <span className="mini-desc">{s.badge}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Full-Size Screenshot Inspection */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="lightbox-overlay"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="lightbox-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-header">
                <div className="lightbox-title-wrap">
                  <span className="lightbox-title">{lightboxImage.title}</span>
                  <span className="lightbox-badge">{lightboxImage.badge}</span>
                </div>
                <button
                  className="lightbox-close"
                  onClick={() => setLightboxImage(null)}
                  aria-label="Close Preview"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="lightbox-img-wrap">
                <img
                  src={lightboxImage.imageSrc}
                  alt={lightboxImage.title}
                  className="lightbox-full-img"
                />
              </div>

              <div className="lightbox-footer">
                <p>{lightboxImage.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
