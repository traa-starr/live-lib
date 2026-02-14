import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={clsx(
        'w-full rounded-xl border border-slate-300 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 dark:border-white/15 dark:bg-white/5 dark:text-slate-100',
        className
      )}
      {...props}
    />
  );
});

export default Input;
