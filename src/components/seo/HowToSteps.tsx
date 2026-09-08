import React from 'react';
import { StepItem } from '../../seo/types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HowToStepsProps {
  toolName: string;
  steps: StepItem[];
}

export const HowToSteps: React.FC<HowToStepsProps> = ({ toolName, steps }) => {
  return (
    <section className="section-wrapper seo-steps-section" id="how-to-use">
      <div className="container">
        <div className="section-header">
          <span className="section-tag purple">Step-by-Step Instructions</span>
          <h2 className="section-title">How to Use the {toolName}</h2>
          <p className="section-description">
            A clean, 3-step desktop process designed for speed and reliability. No confusing settings or unwanted third-party popups.
          </p>
        </div>

        <div className="seo-steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="seo-step-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <div className="step-badge">
                <span className="step-number-text">{step.number}</span>
              </div>

              <div className="seo-step-body">
                <h3 className="seo-step-title">{step.title}</h3>
                <h4 className="seo-step-subtitle">{step.subtitle}</h4>
                <p className="seo-step-desc">{step.description}</p>
              </div>

              <div className="seo-step-status">
                <CheckCircle2 size={15} className="text-cyan" />
                <span>Verified Step</span>
              </div>

              {index < steps.length - 1 && (
                <div className="seo-step-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
