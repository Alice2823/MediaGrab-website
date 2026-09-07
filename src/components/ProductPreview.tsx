import React, { useState } from 'react';
import { 
  Download, 
  Sparkles, 
  Check, 
  Play, 
  Film, 
  Music, 
  Scissors, 
  RefreshCw, 
  ShieldCheck,
  FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PreviewMode = 'screenshot-trimmer' | 'screenshot-converter' | 'interactive';

export const ProductPreview: React.FC = () => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('screenshot-trimmer');
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [isSimulatingDownload, setIsSimulatingDownload] = useState(false);
  const [progress, setProgress] = useState(74);

  const simulateAction = () => {
    if (isSimulatingDownload) return;
    setIsSimulatingDownload(true);
    setProgress(15);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSimulatingDownload(false), 1500);
          return 100;
        }
        return prev + 17;
      });
    }, 280);
  };

  return (
    <div className="product-preview-shell">
      {/* Ambient background glow behind mockup */}
      <div className="mockup-glow mockup-glow-blue" />
      <div className="mockup-glow mockup-glow-purple" />

      {/* Mode Switcher Tabs above or in titlebar */}
      <div className="mockup-mode-switcher">
        <button
          className={`mode-tab-btn ${previewMode === 'screenshot-trimmer' ? 'active' : ''}`}
          onClick={() => setPreviewMode('screenshot-trimmer')}
        >
          <Scissors size={14} />
          <span>Clip Trimmer (Real App)</span>
        </button>
        <button
          className={`mode-tab-btn ${previewMode === 'screenshot-converter' ? 'active' : ''}`}
          onClick={() => setPreviewMode('screenshot-converter')}
        >
          <RefreshCw size={14} />
          <span>Local Converter (Real App)</span>
        </button>
        <button
          className={`mode-tab-btn ${previewMode === 'interactive' ? 'active' : ''}`}
          onClick={() => setPreviewMode('interactive')}
        >
          <Sparkles size={14} />
          <span>Live Interactive Sandbox</span>
        </button>
      </div>

      {/* Desktop Window Frame */}
      <div className="desktop-window">
        {/* Window Titlebar */}
        <div className="window-titlebar">
          <div className="window-title-left">
            <div className="app-title-badge">
              <img
                src="/logo-mark.png"
                alt="MediaGrab"
                style={{ width: 18, height: 18, objectFit: 'contain', display: 'block' }}
              />
              <span className="window-title-text">
                MediaGrab Desktop — Download. Convert. Enjoy.
              </span>
            </div>
            <span className="window-status-pill">Windows Native 64-bit</span>
          </div>

          <div className="window-controls">
            <span className="control-btn minimize" title="Minimize" />
            <span className="control-btn maximize" title="Maximize" />
            <span className="control-btn close" title="Close" />
          </div>
        </div>

        {/* Window Body Container */}
        <div className="window-body-container">
          <AnimatePresence mode="wait">
            {previewMode === 'screenshot-trimmer' && (
              <motion.div
                key="trimmer-shot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="screenshot-window-inner"
              >
                <img
                  src="/screenshots/app-trimmer.png"
                  alt="MediaGrab Desktop Clip Trimmer UI"
                  className="mockup-real-img"
                  loading="eager"
                />
                <div className="mockup-img-badge">
                  <span className="pulse-dot green" />
                  <span>Real Windows Desktop Build</span>
                </div>
              </motion.div>
            )}

            {previewMode === 'screenshot-converter' && (
              <motion.div
                key="converter-shot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="screenshot-window-inner"
              >
                <img
                  src="/screenshots/app-converter.png"
                  alt="MediaGrab Desktop Video to Audio Transcoder"
                  className="mockup-real-img"
                  loading="eager"
                />
                <div className="mockup-img-badge">
                  <span className="pulse-dot green" />
                  <span>Real Windows Desktop Build</span>
                </div>
              </motion.div>
            )}

            {previewMode === 'interactive' && (
              <motion.div
                key="interactive-sandbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="window-body"
              >
                {/* Mockup Sidebar */}
                <aside className="mockup-sidebar">
                  <div className="sidebar-group">
                    <span className="sidebar-heading">MAIN</span>
                    <button className="sidebar-item active">
                      <Film size={16} />
                      <span>Downloader</span>
                    </button>
                    <button className="sidebar-item">
                      <RefreshCw size={16} />
                      <span>Video → Audio</span>
                    </button>
                    <button className="sidebar-item">
                      <Music size={16} />
                      <span>Audio Converter</span>
                    </button>
                  </div>

                  <div className="sidebar-group">
                    <span className="sidebar-heading">TOOLS</span>
                    <button className="sidebar-item">
                      <FolderOpen size={16} />
                      <span>History</span>
                    </button>
                  </div>

                  <div className="sidebar-footer-badge">
                    <ShieldCheck size={14} className="text-cyan" />
                    <span>Zero Cloud Telemetry</span>
                  </div>
                </aside>

                {/* Mockup Main Workspace */}
                <main className="mockup-content">
                  {/* Input URL Bar */}
                  <div className="mockup-input-section">
                    <label htmlFor="url-input" className="input-label">Media URL</label>
                    <div className="mockup-input-wrapper">
                      <div className="url-protocol-tag">https://</div>
                      <input
                        id="url-input"
                        type="text"
                        readOnly
                        value="youtu.be/isytKyPaM8M?si=ARIX3vZtH9mbE-mh9"
                        className="mockup-url-field"
                      />
                      <button className="btn-analyze" onClick={simulateAction}>
                        <Sparkles size={15} />
                        <span>Analyze Link</span>
                      </button>
                    </div>
                  </div>

                  {/* Media Metadata Card */}
                  <div className="mockup-media-card">
                    <div className="media-thumbnail-wrapper">
                      <div className="media-thumbnail-placeholder">
                        <div className="thumb-gradient" />
                        <div className="play-icon-overlay">
                          <Play size={20} fill="#ffffff" stroke="#ffffff" />
                        </div>
                        <span className="duration-pill">03:41</span>
                        <span className="res-tag">1080p FHD</span>
                      </div>
                    </div>

                    <div className="media-meta-details">
                      <div className="media-header-info">
                        <span className="source-tag">YouTube • High Quality</span>
                        <h4 className="media-title">Main Tera Ho Gaya | Lyrical Video | Karneast</h4>
                        <p className="media-uploader">Karneast Official • 1080p Audio-Sync</p>
                      </div>

                      {/* Quality / Format Selection */}
                      <div className="format-selection-group">
                        <div className="format-group-header">
                          <span className="format-label">Select Output Format:</span>
                          <span className="format-note">Direct Stream Extraction</span>
                        </div>

                        <div className="format-options-row">
                          {[
                            { id: '1080p', label: 'Video (MP4)', format: 'Best Available • Full HD', size: '48 MB' },
                            { id: 'mp3', label: 'MP3 Audio', format: '320 kbps • HQ Stream', size: '8.6 MB' },
                            { id: 'clip', label: 'Selected Part', format: '00:00 → 03:41', size: 'Custom' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              className={`format-pill ${selectedQuality === opt.id ? 'active' : ''}`}
                              onClick={() => setSelectedQuality(opt.id)}
                            >
                              <div className="format-pill-top">
                                <span className="format-pill-name">{opt.label}</span>
                                {selectedQuality === opt.id && <Check size={13} className="check-icon" />}
                              </div>
                              <span className="format-pill-meta">{opt.format} • {opt.size}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Progress & Action Bar */}
                      <div className="mockup-action-bar">
                        <div className="progress-info-container">
                          <div className="progress-labels">
                            <span className="progress-status-text">
                              {isSimulatingDownload && progress < 100
                                ? `Downloading stream... ${progress}%`
                                : progress === 100
                                ? 'Download Complete ✓ Saved to Downloads\\MediaGrab'
                                : 'Stream verified • Ready to process'}
                            </span>
                            <span className="progress-speed">
                              {progress === 100 ? '48 MB Total' : '18.4 MB/s • Fast Speed'}
                            </span>
                          </div>

                          <div className="progress-track">
                            <motion.div
                              className="progress-fill"
                              initial={{ width: '0%' }}
                              animate={{ width: isSimulatingDownload || progress === 100 ? `${progress}%` : '74%' }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        <button
                          className="btn btn-primary download-action-btn"
                          onClick={simulateAction}
                          disabled={isSimulatingDownload && progress < 100}
                        >
                          <Download size={16} />
                          <span>{progress === 100 ? 'Saved to PC' : 'Download Video'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </main>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
