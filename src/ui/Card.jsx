import clsx from 'clsx';

export default function Card({ className, children, ...props }) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
