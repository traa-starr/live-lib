import clsx from 'clsx';

export default function Button({ className, variant = 'primary', children, type = 'button', ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300',
        variant === 'secondary' && 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20',
        variant === 'ghost' && 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10',
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
