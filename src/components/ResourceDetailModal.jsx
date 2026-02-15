import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import Button from '../ui/Button';

export default function ResourceDetailModal({ resource, open, onOpenChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && resource && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}
        >
          <motion.div
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[var(--panel)] p-6 text-[var(--text)] shadow-2xl"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={resource.title}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{resource.type}</p>
                <h3 className="mt-2 text-2xl font-semibold">{resource.title}</h3>
              </div>
              <button className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10" onClick={() => onOpenChange(false)}>
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-200">{resource.annotation}</p>
            <p className="mt-3 text-sm text-slate-300">{resource.citation}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href={resource.url} target="_blank" rel="noreferrer"><Button><ExternalLink size={14} />Open source link</Button></a>
              <a href={resource.url} target="_blank" rel="noreferrer"><Button variant="secondary">Open in new tab</Button></a>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
