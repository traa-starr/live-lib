import clsx from 'clsx';

export default function Chip({ active, children, ...props }) {
  return (
    <button
      className={clsx(
        'rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070f]',
        active
          ? 'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]'
          : 'border-[var(--border)] bg-[var(--panel2)]/65 text-[var(--muted)] hover:border-[var(--accent)]/40 hover:bg-[var(--panel2)]'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
