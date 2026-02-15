import clsx from 'clsx';

const variants = {
  primary: 'bg-[var(--accent)] text-[#07101b] hover:brightness-110',
  secondary: 'bg-[var(--panel2)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--panel2)]/90',
  ghost: 'text-[var(--text)]/90 hover:bg-[var(--panel2)] border border-transparent hover:border-[var(--border)]'
};

export default function Button({ className, variant = 'primary', children, type = 'button', ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070f] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
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
