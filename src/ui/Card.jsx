import clsx from 'clsx';

export default function Card({ className, children, ...props }) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-[var(--border)] bg-[var(--panel)]/82 p-5 text-[var(--text)] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
