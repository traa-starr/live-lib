 codex/create-living-library-module-with-react-93kurp
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import { Home, Library, Info, Radio } from 'lucide-react';
import { useLocation, NavLink, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import TransmissionArchivePage from './pages/TransmissionArchivePage';
import TransmissionDetailPage from './pages/TransmissionDetailPage';
import AboutPage from './pages/AboutPage';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/transmissions', label: 'Transmissions', icon: Radio },
  { to: '/about', label: 'About', icon: Info },
];

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <AppShell nav={navItems} renderNavItem={(item) => <NavigationItem key={item.to} item={item} />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage reduceMotion={reduceMotion} />} />
            <Route path="/library" element={<LibraryPage reduceMotion={reduceMotion} />} />
            <Route path="/transmissions" element={<TransmissionArchivePage reduceMotion={reduceMotion} />} />
            <Route path="/transmissions/:slug" element={<TransmissionDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AnimatePresence>
      </AppShell>
    </MotionConfig>
  );
}

function NavigationItem({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
          isActive
            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
            : 'text-slate-700 hover:bg-slate-200/70 dark:text-slate-200 dark:hover:bg-white/10'
        }`
      }
    >
      <Icon size={16} />
      <span>{item.label}</span>
    </NavLink>

import { useState } from 'react';
import LibraryPage from './components/LibraryPage';
import TransmissionPage from './components/TransmissionPage';

export default function App() {
  const [page, setPage] = useState('library');

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Universal Law School</p>
            <h1 className="text-2xl font-bold text-slate-900">Living Library</h1>
          </div>
          <nav className="flex gap-2" aria-label="Primary">
            <button
              onClick={() => setPage('library')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                page === 'library' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Resource Library
            </button>
            <button
              onClick={() => setPage('transmission')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                page === 'transmission' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Transmission
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        {page === 'library' ? <LibraryPage /> : <TransmissionPage />}
      </main>
    </div>
 main
  );
}
