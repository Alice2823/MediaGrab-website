import React from 'react';
import { WindowsIcon } from './Icons';
import { ArrowDown, BadgeCheck, Layout, Shield, Cpu, Zap } from 'lucide-react';
import { ProductPreview } from './ProductPreview';
import { DOWNLOAD_URL } from '../config';
import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  onOpenDownloadModal?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const handleScrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="hero-section" id="hero">
      {/* Monochrome Ambient Light Background */}
      <div className="hero-bg-lights">
        <div className="light-orb orb-primary" />
        <div className="light-orb orb-secondary" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-header-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust / Badge */}
          <motion.div variants={itemVariants} className="hero-badge-wrapper">
            <span className="hero-badge">
              <BadgeCheck size={15} className="text-white" />
              <span>MediaGrabs v1.0.10 • Official Windows Release</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="hero-headline">
            Download. Convert.{' '}
            <span className="gradient-text">Enjoy.</span>
          </motion.h1>

          {/* Supporting Headline */}
          <motion.p variants={itemVariants} className="hero-subheadline">
            Your simple, powerful desktop media downloader and converter.
          </motion.p>

          {/* Description */}
          <motion.p variants={itemVariants} className="hero-description">
            MediaGrabs lets you download permitted media and convert video and audio files with a fast, clean and easy-to-use desktop experience.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="hero-cta-group">
            <a
              href={DOWNLOAD_URL}
              download
              className="btn btn-primary btn-lg hero-btn-primary"
            >
              <WindowsIcon size={19} />
              <span>Download for Windows</span>
            </a>

            <a
              href="#features"
              className="btn btn-secondary btn-lg"
              onClick={handleScrollToFeatures}
            >
              <span>Explore Features</span>
              <ArrowDown size={17} />
            </a>
          </motion.div>

          {/* Trust / Status Line */}
          <motion.div variants={itemVariants} className="hero-trust-line">
            <div className="trust-item">
              <Cpu size={14} />
              <span>Windows Desktop App</span>
            </div>
            <span className="trust-dot">•</span>
            <div className="trust-item">
              <Zap size={14} />
              <span>Fast & Efficient</span>
            </div>
            <span className="trust-dot">•</span>
            <div className="trust-item">
              <Layout size={14} />
              <span>Minimal Black & White UI</span>
            </div>
            <span className="trust-dot">•</span>
            <div className="trust-item">
              <Shield size={14} />
              <span>Privacy Focused</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Product Mockup Representation */}
        <motion.div
          className="hero-mockup-wrapper"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
        >
          <ProductPreview />
        </motion.div>
      </div>
    </section>
  );
};
