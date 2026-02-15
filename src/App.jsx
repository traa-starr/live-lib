import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import { Home, Library, Info, Radio } from 'lucide-react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import LibraryPage from './components/LibraryPage';
import TransmissionPage from './components/TransmissionPage';
import AboutPage from './components/AboutPage';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/transmission', label: 'Transmission', icon: Radio },
  { to: '/about', label: 'About', icon: Info }
];

function Shell({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true" />
          <div className="brand-text">
            <p className="brand-kicker">Live Library</p>
            <h1 className="brand-title">Transmission & Archive</h1>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </header>

      <main className="main">{children}</main>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
      <AnimatePresence mode="wait" initial={false}>
        <div key={location.pathname} className="route-stage">
          <Shell>
            <Routes location={location}>
              <Route path="/" element={<LibraryPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/transmission" element={<TransmissionPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Shell>
        </div>
      </AnimatePresence>
    </MotionConfig>
  );
}
