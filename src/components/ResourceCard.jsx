import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

export default function ResourceCard({ resource, onOpen, highlighted, index, reduceMotion }) {
  return (
    <motion.button
      onClick={() => onOpen(resource)}
      className={`w-full rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        highlighted
          ? 'border-sky-400 bg-sky-50/90 dark:border-sky-400 dark:bg-sky-400/10'
          : 'border-slate-200/80 bg-white/90 dark:border-white/10 dark:bg-white/5'
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.18, delay: index * 0.03 }}
      whileHover={reduceMotion ? {} : { y: -3, boxShadow: '0 18px 34px rgba(15,23,42,0.12)' }}
      whileTap={reduceMotion ? {} : { scale: 0.995 }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">{resource.title}</h3>
        <div className="flex gap-1">
          <Badge tone="info">{resource.level}</Badge>
          <Badge>{resource.status}</Badge>
        </div>
      </div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{resource.author}{resource.year ? ` · ${resource.year}` : ''}</p>
      <p className="mt-3 max-h-16 overflow-hidden text-sm text-slate-700 dark:text-slate-200">{resource.annotation}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {resource.tags.slice(0, 3).map((tag) => (
          <Badge key={`${resource.id}-${tag}`} tone="success">{tag}</Badge>
        ))}
      </div>
    </motion.button>
  );
}
