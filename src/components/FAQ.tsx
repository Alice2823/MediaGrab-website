import React, { useState } from 'react';
import { ChevronDown, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
  isImportant?: boolean;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: 'What is MediaGrabs?',
      answer:
        'MediaGrabs is a modern desktop application for Windows designed for downloading permitted online media and performing local video and audio conversions with a clean, high-performance interface.',
    },
    {
      question: 'Is MediaGrabs free?',
      answer:
        'Yes, MediaGrabs is a free desktop utility without hidden paywalls, intrusive pop-up ads, or mandatory subscriptions.',
    },
    {
      question: 'Which platforms does MediaGrabs support?',
      answer:
        'MediaGrabs officially supports YouTube, YouTube Shorts, and Instagram Reels for accessible, public media. Compatibility depends on content permissions, stream availability, and platform access terms.',
    },
    {
      question: 'Is MediaGrabs available for Windows?',
      answer:
        'Yes. MediaGrabs is built specifically as a native desktop application for 64-bit Windows 10 and Windows 11, delivering efficient multi-threaded performance and seamless local file access.',
    },
    {
      question: 'Can I convert video to MP3?',
      answer:
        'Yes! You can either extract MP3 audio directly when downloading supported media or use MediaGrabs’s built-in local converter to transcode video and audio files already saved on your computer into high-quality MP3 (up to 320 kbps), WAV, or AAC.',
    },
    {
      question: 'Can I download only a selected part of a video?',
      answer:
        'Yes. MediaGrabs includes a Clip Selection feature that lets you specify exact start and end timestamps so you only download the relevant segment without needing to save the entire video.',
    },
    {
      question: 'Does MediaGrabs bypass DRM or access restrictions?',
      answer:
        'No. MediaGrabs does not bypass DRM, authentication, CAPTCHA challenges or access restrictions. Use MediaGrabs only for content you have permission or the legal right to download.',
      isImportant: true,
    },
  ];

  return (
    <section className="section-wrapper faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Common Questions</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Find quick answers about MediaGrabs features, system requirements, format support, and usage policies.
          </p>
        </div>

        <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions Accordion">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`faq-item glass-card ${isOpen ? 'open' : ''} ${item.isImportant ? 'item-notice' : ''}`}
              >
                <button
                  id={headingId}
                  className="faq-trigger"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <div className={`faq-chevron-box ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="faq-answer-collapse"
                    >
                      <div className="faq-answer-body">
                        {item.isImportant && (
                          <div className="faq-policy-badge">
                            <ShieldAlert size={16} className="text-cyan" />
                            <span>Compliance & Usage Policy</span>
                          </div>
                        )}
                        <p className="faq-answer-text">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
