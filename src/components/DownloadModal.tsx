import React from 'react';
import { APP_CONFIG, DOWNLOAD_URL } from '../config';
import { X, ExternalLink, Code2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WindowsIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const isConfigured = APP_CONFIG.isDownloadConfigured();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-badge">
                <span className="pulse-dot" />
                <span>{isConfigured ? 'Ready for Download' : 'Release Configuration State'}</span>
              </div>
              <button onClick={onClose} className="modal-close" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-icon-wrapper">
                <div className="modal-app-icon" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  <img
                    src="/logo-mark.png"
                    alt="MediaGrabs Logo"
                    style={{
                      width: 58,
                      height: 58,
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 16px rgba(255, 255, 255, 0.25))'
                    }}
                  />
                </div>
                <div>
                  <h3 id="modal-title" className="modal-title">{APP_CONFIG.name} for Windows</h3>
                  <p className="modal-subtitle">{APP_CONFIG.targetPlatform} • MediaGrabs {APP_CONFIG.version}</p>
                </div>
              </div>

              {!isConfigured ? (
                <div className="dev-state-box">
                  <div className="dev-state-header">
                    <AlertCircle size={18} />
                    <span>Download URL Setup Required</span>
                  </div>
                  <p className="dev-state-text">
                    This marketing site is ready. To connect your live Windows installer, open <code>src/config.ts</code> and replace the placeholder with your GitHub Release <code>.exe</code> asset URL:
                  </p>
                  <div className="code-snippet">
                    <Code2 size={15} />
                    <code>const DOWNLOAD_URL = "{DOWNLOAD_URL}";</code>
                  </div>
                  <div className="dev-state-tips">
                    <p className="tip-title">What happens when configured?</p>
                    <p className="tip-desc">Visitors will instantly download your official MediaGrabs installer directly from your GitHub Release.</p>
                  </div>
                </div>
              ) : (
                <div className="ready-state-box">
                  <div className="ready-header">
                    <CheckCircle2 size={20} />
                    <span>Official Release Verified</span>
                  </div>
                  <p className="ready-text">
                    Your download will begin automatically. Make sure you run the setup file on Windows 10 or 11.
                  </p>
                </div>
              )}

              <div className="modal-actions">
                {isConfigured ? (
                  <a
                    href={DOWNLOAD_URL}
                    download
                    className="btn btn-primary btn-lg full-width"
                  >
                    <WindowsIcon size={18} />
                    <span>Download MediaGrabs Installer (.exe)</span>
                  </a>
                ) : (
                  <a
                    href={APP_CONFIG.githubRepoUrl}
                    className="btn btn-primary btn-lg full-width"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Visit GitHub Releases</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                <button onClick={onClose} className="btn btn-secondary full-width">
                  Close
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <span>Windows 10 / 11 64-bit • Safe & Privacy-Focused • Free</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
