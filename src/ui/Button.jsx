import clsx from 'clsx';

const variants = {
  primary: 'bg-[var(--accent)] text-slate-950 hover:brightness-110',
  secondary: 'bg-white/10 text-slate-100 border border-white/15 hover:bg-white/15',
  ghost: 'text-slate-200 hover:bg-white/10 border border-transparent hover:border-white/10'
};

export default function Button({ className, variant = 'primary', children, type = 'button', ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
