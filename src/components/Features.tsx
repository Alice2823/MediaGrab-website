import React from 'react';
import { 
  Film, 
  Music, 
  Scissors, 
  Zap, 
  RefreshCw, 
  Headphones, 
  ShieldCheck, 
  Monitor,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
}

export const Features: React.FC = () => {
  const features: FeatureItem[] = [
    {
      id: 'video-downloader',
      icon: <Film size={24} />,
      tag: 'Core Engine',
      title: 'Video Downloader',
      description: 'Download permitted videos in supported resolutions with native desktop stability.',
    },
    {
      id: 'mp3-audio',
      icon: <Music size={24} />,
      tag: 'Audio Extraction',
      title: 'MP3 Audio',
      description: 'Extract high-quality audio streams directly from supported media with custom bitrates.',
    },
    {
      id: 'clip-selection',
      icon: <Scissors size={24} />,
      tag: 'Precision',
      title: 'Clip Selection',
      description: 'Select and download only the part you need with exact start and end timestamps.',
    },
    {
      id: 'fast-processing',
      icon: <Zap size={24} />,
      tag: 'Performance',
      title: 'Fast Processing',
      description: 'Designed for quick and efficient media processing utilizing your PC hardware.',
    },
    {
      id: 'video-conversion',
      icon: <RefreshCw size={24} />,
      tag: 'Local Tools',
      title: 'Video Conversion',
      description: 'Convert video files on your computer into portable audio and lightweight video formats.',
    },
    {
      id: 'audio-conversion',
      icon: <Headphones size={24} />,
      tag: 'Transcoder',
      title: 'Audio Conversion',
      description: 'Convert and process supported audio files with clean output parameters.',
    },
    {
      id: 'privacy-focused',
      icon: <ShieldCheck size={24} />,
      tag: 'Zero Telemetry',
      title: 'Privacy Focused',
      description: 'Temporary processing files are handled with privacy and automatic local cleanup in mind.',
    },
    {
      id: 'desktop-experience',
      icon: <Monitor size={24} />,
      tag: 'Windows Native',
      title: 'Desktop Experience',
      description: 'Native Windows application designed for a smooth, distraction-free desktop workflow.',
    },
  ];

  return (
    <section className="section-wrapper" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Feature Suite</span>
          <h2 className="section-title">Engineered for Media Enthusiasts</h2>
          <p className="section-description">
            Everything you need to capture permitted media, extract studio-grade audio, and convert files locally on your PC.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="feature-card glass-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <div className="feature-card-inner">
                <div className="feature-top">
                  <div className="feature-icon-box">
                    {feature.icon}
                  </div>
                  <span className="feature-tag-pill">{feature.tag}</span>
                </div>

                <div className="feature-body">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>

                <div className="feature-footer">
                  <span className="feature-highlight-link">
                    <span>Desktop Optimized</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
