import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

export default function ResourceDetailModal({ resource, onClose }) {
  if (!resource) return null;

  const tags = Array.isArray(resource.tags) ? resource.tags : [];
  const meta = [
    resource.type ? { label: 'Type', value: resource.type } : null,
    resource.source ? { label: 'Source', value: resource.source } : null,
    resource.author ? { label: 'Author', value: resource.author } : null,
    resource.year ? { label: 'Year', value: String(resource.year) } : null
  ].filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        <motion.div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          aria-label={resource.title || 'Resource details'}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <header className="modal-header">
            <div className="modal-title-wrap">
              <p className="modal-kicker">{resource.category || 'Resource'}</p>
              <h3 className="modal-title">{resource.title}</h3>
            </div>

            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </header>

          {resource.description ? <p className="modal-description">{resource.description}</p> : null}

          {meta.length ? (
            <div className="modal-meta">
              {meta.map((item) => (
                <div key={item.label} className="meta-row">
                  <span className="meta-label">{item.label}</span>
                  <span className="meta-value">{item.value}</span>
                </div>
              ))}
            </div>
          ) : null}

          {tags.length ? (
            <div className="modal-tags">
              {tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          <footer className="modal-footer">
            {resource.url ? (
              <a className="primary-btn" href={resource.url} target="_blank" rel="noreferrer">
                <span>Open source</span>
                <ExternalLink size={16} />
              </a>
            ) : (
              <button className="primary-btn" onClick={onClose}>
                Close
              </button>
            )}
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
