import React from 'react';
import { 
  HardDrive, 
  Zap,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ConversionSection: React.FC = () => {
  return (
    <section className="section-wrapper conversion-section" id="conversion">
      <div className="container">
        <div className="conversion-layout">
          {/* Text Column */}
          <div className="conversion-text-column">
            <span className="section-tag">Built-in Local Tools</span>
            <h2 className="section-title">Local Video & Audio Conversion</h2>
            <p className="section-description">
              MediaGrab also includes local media conversion tools so you can process files already stored on your computer.
            </p>

            <div className="conversion-benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <HardDrive size={20} />
                </div>
                <div>
                  <h4 className="benefit-title">100% Offline Processing</h4>
                  <p className="benefit-desc">
                    No uploading private or large files to remote servers. All demuxing and transcoding runs straight on your PC's hardware.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="benefit-title">Video → MP3 Audio Extraction</h4>
                  <p className="benefit-desc">
                    Turn video recordings, webinars, or music clips into crystal-clear 320 kbps MP3 files with customizable sample rates and presets.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Sliders size={20} />
                </div>
                <div>
                  <h4 className="benefit-title">Integrated Audio Trimmer</h4>
                  <p className="benefit-desc">
                    Includes an optional audio trim toggle so you can cut intros, outros, or snippets during conversion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real Application Screenshot Frame with Interactive Accents */}
          <div className="conversion-visual-column">
            <motion.div
              className="conversion-window-frame glass-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="window-titlebar">
                <div className="window-title-left">
                  <img
                    src="/logo-mark.png"
                    alt="MediaGrab"
                    style={{ width: 18, height: 18, objectFit: 'contain', display: 'block' }}
                  />
                  <span className="window-title-text">MediaGrab — Convert Video to Audio</span>
                </div>
                <div className="window-controls">
                  <span className="control-btn minimize" />
                  <span className="control-btn maximize" />
                  <span className="control-btn close" />
                </div>
              </div>

              <div className="conversion-img-wrapper">
                <img
                  src="/screenshots/app-converter.png"
                  alt="MediaGrab Convert Video to Audio Interface"
                  className="conversion-real-screenshot"
                  loading="lazy"
                />
                <div className="conversion-overlay-tag">
                  <CheckCircle2 size={15} />
                  <span>Actual MediaGrab Offline Transcoder</span>
                </div>
              </div>

              <div className="conversion-specs-strip">
                <div className="spec-item">
                  <span className="spec-label">Output Bitrate:</span>
                  <span className="spec-val">Up to 320 kbps</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Quality Presets:</span>
                  <span className="spec-val">Best, High, Balanced</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Destination:</span>
                  <span className="spec-val">Direct PC Folder</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
