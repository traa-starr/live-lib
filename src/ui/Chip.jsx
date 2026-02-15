import clsx from 'clsx';

export default function Chip({ active, children, ...props }) {
  return (
    <button
      className={clsx(
        'rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
        active
          ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900'
          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:border-white/20 dark:bg-white/5 dark:text-slate-200'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
