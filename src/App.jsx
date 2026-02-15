import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Home, Info, Radio } from 'lucide-react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import TransmissionArchivePage from './pages/TransmissionArchivePage';
import TransmissionDetailPage from './pages/TransmissionDetailPage';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/transmissions', label: 'Transmissions', icon: Radio },
  { to: '/about', label: 'About', icon: Info }
];

function NavItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.to} end={item.end} className="relative rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
      {({ isActive }) => (
        <span className="relative z-10 flex items-center gap-2">
          {isActive && <motion.span layoutId="nav-indicator" className="absolute inset-0 -z-10 rounded-xl bg-white/10" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
          <Icon size={15} />
          <span className="hidden sm:inline">{item.label}</span>
        </span>
      )}
    </NavLink>
  );
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(66,173,255,0.20),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.16),transparent_35%),linear-gradient(180deg,#070b14_0%,#05070c_100%)]" />
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">Living Library</p>
              <p className="text-sm font-semibold">Signal Archive</p>
            </div>
            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {navItems.map((item) => <NavItem key={item.to} item={item} />)}
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <div key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<HomePage reduceMotion={reduceMotion} />} />
                <Route path="/library" element={<LibraryPage reduceMotion={reduceMotion} />} />
                <Route path="/transmissions" element={<TransmissionArchivePage reduceMotion={reduceMotion} />} />
                <Route path="/transmissions/:slug" element={<TransmissionDetailPage reduceMotion={reduceMotion} />} />
                <Route path="/about" element={<AboutPage reduceMotion={reduceMotion} />} />
              </Routes>
            </div>
          </AnimatePresence>
        </main>

        <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur-xl md:hidden">
          {navItems.map((item) => <NavItem key={`m-${item.to}`} item={item} />)}
        </nav>
      </div>
    </MotionConfig>
  );
}
