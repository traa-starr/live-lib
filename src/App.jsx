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
  );
}
