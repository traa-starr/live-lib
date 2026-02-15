import MiniSearch from '../lib/search/MiniSearch';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import ResourceDetailModal from '../components/ResourceDetailModal';
import RouteTransition from '../components/RouteTransition';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { loadResources } from '../lib/content/loadResources';
import { loadTransmissions } from '../lib/content/loadTransmissions';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

const resources = loadResources();
const transmissions = loadTransmissions();

const resourceIndex = new MiniSearch({ idField: 'id', fields: ['title', 'description', 'creator', 'tags', 'type', 'year'], storeFields: ['id'] });
resourceIndex.addAll(resources.map((item) => ({ ...item, id: `resource:${item.slug}` })));

const transmissionIndex = new MiniSearch({ idField: 'id', fields: ['title', 'summary', 'text'], storeFields: ['id'] });
transmissionIndex.addAll(transmissions.map((item) => ({ ...item, id: `transmission:${item.slug}` })));

const allTags = [...new Set(resources.flatMap((r) => r.tags))].sort();
const allCreators = [...new Set(resources.map((r) => r.creator))].sort();

export default function LibraryPage({ reduceMotion }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState('all');
  const [tag, setTag] = useState('all');
  const [creator, setCreator] = useState('all');
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const searchRef = useRef(null);
  const debouncedQuery = useDebouncedValue(query, 220);

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const resourceResults = useMemo(() => {
    const ids = debouncedQuery
      ? new Set(resourceIndex.search(debouncedQuery).map((item) => item.id.replace('resource:', '')))
      : new Set(resources.map((r) => r.slug));

    const min = yearMin ? Number(yearMin) : -Infinity;
    const max = yearMax ? Number(yearMax) : Infinity;

    const list = resources.filter((resource) => {
      if (!ids.has(resource.slug)) return false;
      if (type !== 'all' && resource.type !== type) return false;
      if (tag !== 'all' && !resource.tags.includes(tag)) return false;
      if (creator !== 'all' && resource.creator !== creator) return false;
      if (resource.year < min || resource.year > max) return false;
      return true;
    });

    if (sortBy === 'newest') return [...list].sort((a, b) => b.year - a.year);
    if (sortBy === 'oldest') return [...list].sort((a, b) => a.year - b.year);
    if (sortBy === 'az') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [creator, debouncedQuery, sortBy, tag, type, yearMax, yearMin]);

  const transmissionResults = useMemo(() => {
    const list = debouncedQuery
      ? transmissionIndex.search(debouncedQuery).map((hit) => transmissions.find((t) => `transmission:${t.slug}` === hit.id)).filter(Boolean)
      : transmissions;

    if (sortBy === 'oldest') return [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === 'az') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [debouncedQuery, sortBy]);

  const clearAll = () => {
    setQuery('');
    setType('all');
    setTag('all');
    setCreator('all');
    setYearMin('');
    setYearMax('');
    setSortBy('relevance');
  };

  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <Card className="sticky top-20 z-20">
          <div className="grid gap-3 lg:grid-cols-[2fr_repeat(4,minmax(0,1fr))]">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search resources + transmissions" />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-white/10 bg-[var(--panel2)] px-3 py-2 text-sm">
              <option value="all">All types</option>
              {['book', 'article', 'video', 'podcast', 'tool'].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-xl border border-white/10 bg-[var(--panel2)] px-3 py-2 text-sm">
              <option value="all">All tags</option>
              {allTags.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={creator} onChange={(e) => setCreator(e.target.value)} className="rounded-xl border border-white/10 bg-[var(--panel2)] px-3 py-2 text-sm">
              <option value="all">All creators</option>
              {allCreators.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border border-white/10 bg-[var(--panel2)] px-3 py-2 text-sm">
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Input value={yearMin} onChange={(e) => setYearMin(e.target.value)} placeholder="Year from" className="max-w-32" />
            <Input value={yearMax} onChange={(e) => setYearMax(e.target.value)} placeholder="Year to" className="max-w-32" />
            <Button variant="ghost" onClick={clearAll}><X size={14} />Clear all</Button>
            <p className="ml-auto text-xs text-[var(--muted)]">{resourceResults.length} resources • {transmissionResults.length} transmissions • ⌘/Ctrl+K focus</p>
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Resources</p>
          {resourceResults.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-dashed border-white/20 p-8 text-center text-sm text-slate-300">No resources matched your filters. Clear filters or widen the year range.</div>
          ) : (
            <motion.div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.04 } } }}>
              {resourceResults.map((resource, index) => (
                <motion.div key={resource.slug} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
                  <ResourceCard resource={resource} onOpen={setSelected} index={index} reduceMotion={reduceMotion} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Transmissions</p>
          {transmissionResults.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-dashed border-white/20 p-8 text-center text-sm text-slate-300">No transmissions matched this search yet.</div>
          ) : (
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {transmissionResults.map((item) => (
                <Link key={item.slug} to={`/transmissions/${item.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[var(--accent)]/60">
                  <p className="text-xs text-[var(--muted)]">{item.date} • {item.readingTime}</p>
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
      <ResourceDetailModal resource={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </RouteTransition>
  );
}
