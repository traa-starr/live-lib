import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, FileText, Link as LinkIcon, Music, Video } from 'lucide-react';

const typeIcon = (type) => {
  const t = String(type || '').toLowerCase();
  if (t.includes('book')) return BookOpen;
  if (t.includes('video')) return Video;
  if (t.includes('audio') || t.includes('podcast') || t.includes('music')) return Music;
  if (t.includes('article') || t.includes('paper') || t.includes('pdf')) return FileText;
  return LinkIcon;
};

export default function ResourceCard({ resource, onOpen }) {
  const Icon = typeIcon(resource?.type);
  const tags = Array.isArray(resource?.tags) ? resource.tags : [];
  const safeTags = tags.slice(0, 3);

  return (
    <motion.article
      className="resource-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <button className="resource-card__btn" onClick={() => onOpen?.(resource)} type="button">
        <div className="resource-card__top">
          <div className="resource-card__icon">
            <Icon size={18} />
          </div>
          <div className="resource-card__meta">
            <p className="resource-card__kicker">{resource?.category || 'Resource'}</p>
            <h3 className="resource-card__title">{resource?.title || 'Untitled'}</h3>
          </div>
          <div className="resource-card__chev" aria-hidden="true">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {resource?.description ? (
          <p className="resource-card__desc">{resource.description}</p>
        ) : (
          <p className="resource-card__desc resource-card__desc--muted">Open to view details.</p>
        )}

        <div className="resource-card__bottom">
          <div className="resource-card__tags">
            {safeTags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <p className="resource-card__source">
            {resource?.source ? resource.source : resource?.author ? resource.author : ''}
          </p>
        </div>
      </button>
    </motion.article>
  );
}
