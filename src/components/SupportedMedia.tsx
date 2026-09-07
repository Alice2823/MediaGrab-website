import React from 'react';
import { Film, CheckCircle, Info } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './Icons';
import { motion } from 'framer-motion';

export const SupportedMedia: React.FC = () => {
  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      type: 'Standard Videos & Streams',
      description: 'Download permitted long-form content, educational videos, and tutorials in high-definition resolutions.',
      icon: <YoutubeIcon size={32} />,
      tag: 'Full HD & 4K',
      formats: ['MP4 Video (up to 1080p / 60fps)', 'MP3 Audio (up to 320 kbps)', 'Custom Segment Trimming'],
      status: 'Verified Supported',
    },
    {
      id: 'youtube-shorts',
      name: 'YouTube Shorts',
      type: 'Short-Form Vertical Videos',
      description: 'Quickly capture portrait-format Shorts clips with sound and high resolution for offline viewing.',
      icon: <Film size={32} />,
      tag: 'Vertical 1080p',
      formats: ['Vertical 9:16 Video', 'High-Fidelity Audio', 'Instant 1-Click Processing'],
      status: 'Verified Supported',
    },
    {
      id: 'instagram-reels',
      name: 'Instagram Reels',
      type: 'Public Reels & Clips',
      description: 'Download permitted public Instagram Reels directly to your hard drive with crystal-clear audio playback.',
      icon: <InstagramIcon size={32} />,
      tag: 'Public Reels',
      formats: ['Direct Reel Video', 'Audio Track Extraction', 'Clean Local File Export'],
      status: 'Verified Supported',
    },
  ];

  return (
    <section className="section-wrapper" id="supported-media">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Platform Compatibility</span>
          <h2 className="section-title">Supported Media Sources</h2>
          <p className="section-description">
            MediaGrab is tailored specifically for primary video and short-form platforms, providing reliable parsing and optimal quality.
          </p>
        </div>

        <div className="supported-grid">
          {platforms.map((p, index) => (
            <motion.div
              key={p.id}
              className="platform-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="platform-card-header">
                <div className="platform-icon-box">{p.icon}</div>
                <div className="platform-status-badge">
                  <span className="platform-status-dot" />
                  <span>{p.status}</span>
                </div>
              </div>

              <div className="platform-card-body">
                <div className="platform-title-row">
                  <h3 className="platform-name">{p.name}</h3>
                  <span className="platform-type-tag">{p.tag}</span>
                </div>
                <p className="platform-type-sub">{p.type}</p>
                <p className="platform-desc">{p.description}</p>

                <div className="platform-formats-list">
                  <span className="formats-label">Supported Outputs:</span>
                  <ul>
                    {p.formats.map((fmt, i) => (
                      <li key={i}>
                        <CheckCircle size={14} />
                        <span>{fmt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer / Note */}
        <motion.div
          className="platform-disclaimer-box"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="disclaimer-inner">
            <Info size={18} className="flex-shrink-0" />
            <p className="disclaimer-text">
              <strong>Notice:</strong> Support may vary depending on platform availability, content permissions and access restrictions. MediaGrab processes only accessible media and adheres to strict local execution principles.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
