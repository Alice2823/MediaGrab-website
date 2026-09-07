import React from 'react';
import { Clipboard, Sliders, HardDriveDownload, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Paste',
      subtitle: 'Paste the media URL into MediaGrab.',
      detail: 'Copy any supported video or audio link and paste it into the analyzer bar. MediaGrab quickly reads the stream metadata.',
      icon: <Clipboard size={24} className="text-cyan" />,
      screenshot: '/screenshots/app-home.png',
      caption: 'Instant Link Detection',
    },
    {
      number: '02',
      title: 'Choose',
      subtitle: 'Select video/audio format and quality.',
      detail: 'Pick your preferred output resolution (up to 4K / 1080p 60fps), extract pristine 320kbps MP3 audio, or trim the clip.',
      icon: <Sliders size={24} className="text-purple" />,
      screenshot: '/screenshots/app-trimmer.png',
      caption: 'Format & Clip Selection',
    },
    {
      number: '03',
      title: 'Download',
      subtitle: 'Download the permitted media to your computer.',
      detail: 'Click download and let MediaGrab save the processed media straight to your local Downloads or chosen folder.',
      icon: <HardDriveDownload size={24} className="text-emerald" />,
      screenshot: '/screenshots/app-complete.png',
      caption: '100% Direct Save to PC',
    },
  ];

  return (
    <section className="section-wrapper how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-tag purple">Simple Workflow</span>
          <h2 className="section-title">How It Works in 3 Quick Steps</h2>
          <p className="section-description">
            No convoluted settings, no suspicious popups. Just a straightforward desktop workflow designed to save you time.
          </p>
        </div>

        <div className="steps-container">
          <div className="steps-connector-line" aria-hidden="true" />

          <div className="steps-grid">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="step-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.15 }}
              >
                <div className="step-card-header">
                  <div className="step-badge">
                    <span className="step-number-text">{step.number}</span>
                  </div>
                  <div className="step-icon-wrapper">{step.icon}</div>
                </div>

                <div className="step-card-body">
                  <h3 className="step-title">{step.title}</h3>
                  <h4 className="step-subtitle">{step.subtitle}</h4>
                  <p className="step-detail">{step.detail}</p>
                </div>

                <div className="step-card-visual step-screenshot-visual">
                  <div className="step-visual-bar">
                    <div className="step-ui-bar">
                      <span className="step-ui-dot red" />
                      <span className="step-ui-dot yellow" />
                      <span className="step-ui-dot green" />
                    </div>
                    <span className="step-visual-caption">{step.caption}</span>
                  </div>
                  <div className="step-img-crop">
                    <img
                      src={step.screenshot}
                      alt={`MediaGrab Step ${step.number} - ${step.title}`}
                      loading="lazy"
                    />
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="step-arrow-mobile" aria-hidden="true">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
