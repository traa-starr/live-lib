import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, FileText, Link as LinkIcon, Music, Video } from 'lucide-react';
import Badge from '../ui/Badge';

const typeIcon = (type) => {
  const t = String(type || '').toLowerCase();
  if (t.includes('book')) return BookOpen;
  if (t.includes('video')) return Video;
  if (t.includes('audio') || t.includes('podcast') || t.includes('music')) return Music;
  if (t.includes('article') || t.includes('paper') || t.includes('pdf') || t.includes('essay')) return FileText;
  return LinkIcon;
};

export default function ResourceCard({ resource, onOpen, index = 0, reduceMotion = false }) {
  const Icon = typeIcon(resource?.type);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(resource)}
      className="group rounded-2xl border border-white/10 bg-[var(--panel)] p-4 text-left shadow-lg transition hover:-translate-y-1 hover:border-[var(--accent)]/60 hover:shadow-[0_24px_70px_rgba(51,231,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : index * 0.04 }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-lg border border-white/10 bg-white/5 p-2 text-[var(--accent)]"><Icon size={16} /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{resource.type}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-[var(--text)]">{resource.title}</h3>
          <p className="mt-1 text-xs text-slate-300">{resource.author} {resource.year ? `• ${resource.year}` : ''}</p>
        </div>
        <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-[var(--accent)]" />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">{resource.annotation || 'Open to view resource details.'}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(resource.tags || []).slice(0, 3).map((tag) => <Badge key={`${resource.id}-${tag}`}>{tag}</Badge>)}
      </div>
    </motion.button>
  );
}
