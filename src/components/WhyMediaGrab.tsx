import React from 'react';
import { 
  Check, 
  X, 
  Layout, 
  Zap, 
  Sliders, 
  Laptop, 
  Trash2, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyMediaGrab: React.FC = () => {
  const corePillars = [
    {
      title: 'Simple Interface',
      desc: 'Designed with zero clutter. Only the controls you need to inspect, select, and process media.',
      icon: <Layout size={22} />,
    },
    {
      title: 'Fast Workflow',
      desc: 'Paste a link, choose your preferred format, and start saving in seconds without complex navigation.',
      icon: <Zap size={22} />,
    },
    {
      title: 'Desktop Performance',
      desc: 'Uses native Windows multi-threading to download and convert files with maximum efficiency.',
      icon: <Laptop size={22} />,
    },
    {
      title: 'Local Media Conversion',
      desc: 'Includes offline transcoding tools so you can convert local videos and audios without cloud upload.',
      icon: <SlidersHorizontal size={22} />,
    },
    {
      title: 'Clear Download Controls',
      desc: 'Precise format, resolution, and clip boundary controls with transparent progress bars.',
      icon: <Sliders size={22} />,
    },
    {
      title: 'Privacy-Focused Temporary Files',
      desc: 'Temporary stream chunks and demux caches are strictly processed locally and cleaned up after tasks.',
      icon: <Trash2 size={22} />,
    },
    {
      title: 'No Unnecessary Complexity',
      desc: 'No account logins, no recurring subscriptions, and no intrusive notification bells.',
      icon: <ShieldCheck size={22} />,
    },
  ];

  return (
    <section className="section-wrapper why-mediagrab-section" id="why-mediagrab">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Value Proposition</span>
          <h2 className="section-title">Built for simplicity.</h2>
          <p className="section-description">
            Say goodbye to intrusive web tools and bloated bloatware. MediaGrabs provides a focused, clean desktop experience you can rely on.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="why-pillars-grid">
          {corePillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="why-pillar-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <div className="why-pillar-icon-box">{pillar.icon}</div>
              <h3 className="why-pillar-title">{pillar.title}</h3>
              <p className="why-pillar-desc">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Matrix */}
        <motion.div
          className="comparison-box glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="comparison-header">
            <h3 className="comparison-headline">Why choose a dedicated Desktop App?</h3>
            <p className="comparison-sub">A side-by-side look at everyday media tools versus the MediaGrabs desktop utility.</p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature Comparison</th>
                  <th className="competitor-col">Generic Web Sites & Extensions</th>
                  <th className="mediagrab-col">MediaGrabs Desktop</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-cell">User Interface</td>
                  <td className="bad-cell"><X size={16} /> Cluttered with deceptive popups & redirect ads</td>
                  <td className="good-cell"><Check size={16} /> Clean, modern native monochrome interface</td>
                </tr>
                <tr>
                  <td className="feature-cell">Processing Pipeline</td>
                  <td className="bad-cell"><X size={16} /> Queued on slow remote servers with queue limits</td>
                  <td className="good-cell"><Check size={16} /> Direct local processing on your PC hardware</td>
                </tr>
                <tr>
                  <td className="feature-cell">Local Offline File Conversion</td>
                  <td className="bad-cell"><X size={16} /> Rarely available or requires cloud file upload</td>
                  <td className="good-cell"><Check size={16} /> Built-in offline Video → MP3 & Audio converter</td>
                </tr>
                <tr>
                  <td className="feature-cell">Clip / Segment Trimming</td>
                  <td className="bad-cell"><X size={16} /> Usually requires downloading entire video first</td>
                  <td className="good-cell"><Check size={16} /> Select custom start & end timestamps</td>
                </tr>
                <tr>
                  <td className="feature-cell">File Cleanup & Privacy</td>
                  <td className="bad-cell"><X size={16} /> Browsing data tracked by ad networks</td>
                  <td className="good-cell"><Check size={16} /> Temporary files purged automatically on your drive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
