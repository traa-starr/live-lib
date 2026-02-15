import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ResourceCard({ resource, onOpen, index = 0, reduceMotion = false }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(resource)}
      className="group rounded-2xl border border-white/10 bg-[var(--panel)] p-4 text-left transition hover:border-[var(--accent)]/50 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : index * 0.03 }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{resource.type}</p>
      <h3 className="mt-2 text-lg font-semibold">{resource.title}</h3>
      <p className="mt-1 text-xs text-slate-300">{resource.creator} • {resource.year}</p>
      <p className="mt-3 line-clamp-3 text-sm text-slate-200">{resource.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={`${resource.slug}-${tag}`} className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-slate-200">{tag}</span>
          ))}
        </div>
        <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-[var(--accent)]" />
      </div>
    </motion.button>
  );
}
