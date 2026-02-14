import clsx from 'clsx';

export default function Card({ className, children, ...props }) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-xl dark:shadow-black/20',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
