import clsx from 'clsx';

export default function Badge({ children, tone = 'neutral' }) {
  return (
    <span
      className={clsx(
        'rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide',
        tone === 'success' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
        tone === 'info' && 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200',
        tone === 'neutral' && 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200'
      )}
    >
      {children}
    </span>
  );
}
