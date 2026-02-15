import { AnimatePresence, motion } from 'framer-motion';
import { Command, FileText, Library, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HighlightedText from './HighlightedText';
import { loadResources } from '../lib/content/loadResources';
import { loadTransmissions } from '../lib/content/loadTransmissions';
import { buildCommandDocs, createCommandFuse } from '../lib/search/fuse';

const resources = loadResources();
const transmissions = loadTransmissions();
const commandDocs = buildCommandDocs(resources, transmissions);
const commandFuse = createCommandFuse(resources, transmissions);

function getTitleRanges(matches = []) {
  return matches.filter((match) => match.key === 'title').flatMap((match) => match.indices);
}

export default function CommandPalette() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const results = useMemo(() => {
    if (!query.trim()) return commandDocs.slice(0, 10).map((item) => ({ item, matches: [] }));
    return commandFuse.search(query).slice(0, 10).map((hit) => ({ item: hit.item, matches: hit.matches || [] }));
  }, [query]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(0, results.length - 1)));
  }, [results.length]);

  const selectResult = (result) => {
    if (!result) return;
    if (result.item.kind === 'resource') {
      navigate(`/library?resource=${result.item.payload.slug}`);
      return;
    }
    navigate(result.item.route);
  };

  const onPaletteKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % Math.max(1, results.length));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      selectResult(results[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/60 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:mt-16"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onPaletteKeyDown}
          >
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
              <Search size={16} className="text-[var(--muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search resources and transmissions..."
                className="w-full border-0 bg-transparent px-0 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              />
              <kbd className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--panel2)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                <Command size={11} />
                K
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2" role="listbox" aria-label="Search results">
              {results.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--muted)]">
                  No results for that query.
                </div>
              ) : (
                results.map((result, index) => {
                  const active = index === activeIndex;
                  return (
                    <button
                      key={result.item.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectResult(result)}
                      className={`mb-1 w-full rounded-xl border px-3 py-3 text-left transition ${
                        active
                          ? 'border-[var(--accent)]/50 bg-[var(--panel2)]'
                          : 'border-transparent hover:border-[var(--border)] hover:bg-[var(--panel2)]/55'
                      }`}
                    >
                      <p className="text-sm font-medium text-[var(--text)]">
                        <HighlightedText text={result.item.title} ranges={getTitleRanges(result.matches)} />
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                        {result.item.kind === 'resource' ? <Library size={12} /> : <FileText size={12} />}
                        {result.item.subtitle}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
