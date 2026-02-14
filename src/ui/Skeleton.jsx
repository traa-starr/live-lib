export default function Skeleton({ className = 'h-4 w-full' }) {
  return <div className={`animate-pulse rounded-lg bg-slate-300/50 dark:bg-white/10 ${className}`} />;
}
