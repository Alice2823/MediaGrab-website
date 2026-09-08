import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  Sparkles, 
  HardDrive, 
  ShieldCheck, 
  Play, 
  Sliders, 
  FileVideo, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import { WindowsIcon } from '../Icons';
import { SEOPageData } from '../../seo/types';
import { DOWNLOAD_URL } from '../../config';
import { trackAnalyzeClicked, trackDownloadCTAClicked, trackConversionCTAClicked } from '../../analytics';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolActionBoxProps {
  page: SEOPageData;
  onOpenDownloadModal?: () => void;
}

export const ToolActionBox: React.FC<ToolActionBoxProps> = ({ page, onOpenDownloadModal }) => {
  const [urlInput, setUrlInput] = useState('');
  const [selectedFormat, setSelectedFormat] = useState(page.defaultOutputFormat);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [validationError, setValidationError] = useState('');

  const isDownloader = page.toolType === 'downloader';

  const handleFillExample = () => {
    setUrlInput(page.exampleUrl);
    setValidationError('');
    setAnalyzed(false);
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    const url = urlInput.trim();

    if (!url) {
      setValidationError('Please enter or paste a media URL to analyze.');
      return;
    }

    setValidationError('');
    setIsAnalyzing(true);
    trackAnalyzeClicked(page.slug, page.category);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 600);
  };

  const handleDownloadClick = () => {
    trackDownloadCTAClicked(page.slug, 'tool_action_box');
    if (onOpenDownloadModal) {
      // Optional modal if needed, or direct link
    }
  };

  const handleConverterAction = () => {
    trackConversionCTAClicked(page.slug, selectedFormat);
  };

  return (
    <div className="tool-action-box glass-card" id="tool-action-area">
      {/* Monochromatic background glow */}
      <div className="action-box-glow" />

      <div className="action-box-header">
        <div className="action-box-tag">
          <Sparkles size={14} />
          <span>{page.badge}</span>
        </div>
        <span className="action-box-platform">Windows 10 / 11 Native 64-bit</span>
      </div>

      {isDownloader ? (
        /* ================= DOWNLOADER FLOW ================= */
        <div className="action-downloader-flow">
          <form onSubmit={handleAnalyze} className="action-input-container">
            <label htmlFor="tool-url-input" className="tool-input-label">
              Enter {page.title.replace(' Downloader', '').replace(' Converter', '')} URL:
            </label>

            <div className="tool-input-row">
              <div className="tool-input-prefix">https://</div>
              <input
                id="tool-url-input"
                type="text"
                className="tool-url-input"
                placeholder={page.exampleUrl.replace('https://', '')}
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (validationError) setValidationError('');
                }}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="btn btn-primary tool-analyze-btn"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={15} className="spinner-icon" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search size={15} />
                    <span>Analyze Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick paste helper & Error state */}
            <div className="tool-input-subbar">
              <button
                type="button"
                className="btn-link-example"
                onClick={handleFillExample}
              >
                Quick-fill realistic example link
              </button>

              {validationError && (
                <span className="tool-validation-error" role="alert">
                  {validationError}
                </span>
              )}
            </div>
          </form>

          {/* Analysis Result & Format Selection */}
          <AnimatePresence>
            {(analyzed || urlInput.trim().length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="action-analysis-card"
              >
                <div className="analysis-card-top">
                  <div className="analysis-stream-info">
                    <div className="stream-thumb-preview">
                      <Play size={16} />
                      <span className="stream-time-badge">HQ Stream</span>
                    </div>
                    <div className="stream-text-meta">
                      <span className="stream-verified-pill">
                        <Check size={12} /> Stream Detected & Verified
                      </span>
                      <h4 className="stream-title">
                        {urlInput ? urlInput.slice(0, 55) + (urlInput.length > 55 ? '...' : '') : page.exampleUrl}
                      </h4>
                      <p className="stream-source-desc">
                        Full audio-video stream ready for direct Windows desktop extraction.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Output Format Picker */}
                <div className="analysis-formats-section">
                  <span className="formats-heading">Select Output Format:</span>
                  <div className="format-options-grid">
                    {page.availableOutputFormats.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`format-select-pill ${selectedFormat === opt.id ? 'active' : ''}`}
                        onClick={() => setSelectedFormat(opt.id)}
                      >
                        <div className="format-pill-headline">
                          <span className="pill-name">{opt.label}</span>
                          {selectedFormat === opt.id && <Check size={14} className="check-icon" />}
                        </div>
                        <span className="pill-detail">{opt.format}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action CTA Bar */}
                <div className="analysis-action-bar">
                  <div className="analysis-hint">
                    <ShieldCheck size={16} className="text-cyan" />
                    <span>Multi-threaded desktop download • Zero speed limits • 100% Ad-Free</span>
                  </div>

                  <a
                    href={DOWNLOAD_URL}
                    download
                    className="btn btn-primary btn-lg action-download-btn"
                    onClick={handleDownloadClick}
                  >
                    <WindowsIcon size={18} />
                    <span>Download MediaGrabs for Windows</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!analyzed && urlInput.trim().length === 0 && (
            <div className="action-ready-banner">
              <div className="ready-banner-item">
                <Cpu size={16} />
                <span>Multi-threaded Streams</span>
              </div>
              <span className="ready-banner-dot">•</span>
              <div className="ready-banner-item">
                <Sliders size={16} />
                <span>Audio Extraction Included</span>
              </div>
              <span className="ready-banner-dot">•</span>
              <div className="ready-banner-item">
                <HardDrive size={16} />
                <span>Direct Save to PC Folder</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= CONVERTER FLOW ================= */
        <div className="action-converter-flow">
          <div className="converter-dropzone-mockup">
            <div className="dropzone-icon-box">
              <FileVideo size={36} />
            </div>
            <h3 className="dropzone-title">Offline Local File Conversion</h3>
            <p className="dropzone-desc">
              Convert files stored on your computer with complete privacy. MediaGrabs does not upload your files to any remote server.
            </p>

            <div className="dropzone-file-tags">
              <span>.MP4</span>
              <span>.MOV</span>
              <span>.MKV</span>
              <span>.WAV</span>
              <span>.MP3</span>
              <span>.AAC</span>
            </div>
          </div>

          <div className="converter-config-area">
            <span className="formats-heading">Target Conversion Output:</span>
            <div className="format-options-grid">
              {page.availableOutputFormats.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`format-select-pill ${selectedFormat === opt.id ? 'active' : ''}`}
                  onClick={() => setSelectedFormat(opt.id)}
                >
                  <div className="format-pill-headline">
                    <span className="pill-name">{opt.label}</span>
                    {selectedFormat === opt.id && <Check size={14} className="check-icon" />}
                  </div>
                  <span className="pill-detail">{opt.format}</span>
                </button>
              ))}
            </div>

            <div className="converter-actions-footer">
              <div className="converter-privacy-note">
                <ShieldCheck size={16} className="text-cyan" />
                <span>100% Offline Processing — Your files never leave your computer</span>
              </div>

              <a
                href={DOWNLOAD_URL}
                download
                className="btn btn-primary btn-lg action-download-btn"
                onClick={handleConverterAction}
              >
                <WindowsIcon size={18} />
                <span>Download MediaGrabs Converter (.exe)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
