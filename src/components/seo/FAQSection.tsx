import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { FAQItem } from '../../seo/types';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQSectionProps {
  toolName: string;
  faqs: FAQItem[];
  responsibleNotice?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  toolName,
  faqs,
  responsibleNotice,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate valid JSON-LD FAQPage schema for this visible set of questions and answers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section-wrapper seo-faq-section" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        <div className="section-header">
          <span className="section-tag">Frequently Asked Questions</span>
          <h2 className="section-title">{toolName} FAQs</h2>
          <p className="section-description">
            Quick answers about format support, downloading rules, system compatibility, and quality settings.
          </p>
        </div>

        <div className="faq-accordion-list" role="region" aria-label={`${toolName} FAQs`}>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const headingId = `seo-faq-heading-${index}`;
            const panelId = `seo-faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
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
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="faq-answer-collapse"
                    >
                      <div className="faq-answer-body">
                        <p className="faq-answer-text">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {responsibleNotice && (
          <div className="seo-policy-banner glass-card">
            <ShieldCheck size={18} className="text-cyan flex-shrink-0" />
            <p className="seo-policy-text">
              <strong>Responsible Use Notice:</strong> {responsibleNotice}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
