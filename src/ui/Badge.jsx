import clsx from 'clsx';

export default function Badge({ children, tone = 'neutral' }) {
  return (
    <span
      className={clsx(
        'rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide',
        tone === 'success' && 'bg-emerald-400/20 text-emerald-200',
        tone === 'info' && 'bg-sky-400/20 text-sky-200',
        tone === 'neutral' && 'bg-white/10 text-slate-200'
      )}
    >
      {children}
    </span>
  );
}
