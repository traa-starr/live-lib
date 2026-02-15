export default function AppShell({ nav, renderNavItem, children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#0a0d14] dark:text-slate-50">
      <div className="fixed inset-0 -z-10 opacity-60">
        <div className="absolute left-1/2 top-[-180px] h-[460px] w-[780px] -translate-x-1/2 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-400/10" />
        <div className="absolute bottom-[-200px] right-[-120px] h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-400/10" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-2xl dark:shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Universal Law School</p>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Living Library</h1>
            </div>
            <nav className="flex flex-wrap items-center gap-1" aria-label="Primary">
              {nav.map(renderNavItem)}
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
