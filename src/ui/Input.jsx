import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={clsx(
        'w-full rounded-xl border border-white/10 bg-[var(--panel2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/50',
        className
      )}
      {...props}
    />
  );
});

export default Input;
