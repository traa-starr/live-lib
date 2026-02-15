import clsx from 'clsx';

export default function Chip({ active, children, ...props }) {
  return (
    <button
      className={clsx(
        'rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        active
          ? 'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]'
          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:bg-white/10'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
