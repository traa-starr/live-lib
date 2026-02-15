import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import EmbedRenderer from './EmbedRenderer';
import Button from '../ui/Button';

export default function ResourceDetailModal({ resource, open, onOpenChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && resource && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            {resource.cover && (
              <div className="relative -mx-2 -mt-2 mb-6 overflow-hidden rounded-2xl border border-[var(--border)]">
                <img src={resource.cover} alt={resource.title} className="h-56 w-full object-cover sm:h-72" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{resource.type}</p>
                <h3 className="mt-2 text-2xl font-semibold">{resource.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {resource.creator}
                  {resource.year ? ` - ${resource.year}` : ''}
                </p>
              </div>
              <button
                className="rounded-lg border border-[var(--border)] p-2 hover:bg-white/5"
                onClick={() => onOpenChange(false)}
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-[var(--text)]/90">{resource.description}</p>

            {resource.embeds?.length > 0 && (
              <section className="mt-8 space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Related media</p>
                {resource.embeds.map((embed, index) => (
                  <EmbedRenderer key={`${resource.slug}-embed-${index}`} embed={embed} />
                ))}
              </section>
            )}

            <div className="mt-6 flex gap-2">
              <a href={resource.url} target="_blank" rel="noreferrer">
                <Button>
                  <ExternalLink size={14} />
                  Visit resource
                </Button>
              </a>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
