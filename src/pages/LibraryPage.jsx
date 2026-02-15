import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import FilterChips from '../components/FilterChips';
import ResourceCard from '../components/ResourceCard';
import ResourceDetailModal from '../components/ResourceDetailModal';
import RouteTransition from '../components/RouteTransition';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { buildResourceIndex, getResourceFilterOptions, normalizeResources } from '../lib/resources';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

const baseResources = normalizeResources();

export default function LibraryPage({ reduceMotion }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ topic: '', type: '', level: '', status: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [selected, setSelected] = useState(null);
  const searchRef = useRef(null);

  const debouncedQuery = useDebouncedValue(query);
  const index = useMemo(() => buildResourceIndex(baseResources), []);
  const options = useMemo(() => getResourceFilterOptions(baseResources), []);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const searchMatches = new Set(q ? index.filter((item) => item.blob.includes(q)).map((item) => item.id) : index.map((item) => item.id));

    const list = baseResources.filter((resource) => {
      if (!searchMatches.has(resource.id)) return false;
      if (filters.topic && !resource.tags.includes(filters.topic)) return false;
      if (filters.type && filters.type !== resource.type) return false;
      if (filters.level && filters.level !== resource.level) return false;
      if (filters.status && filters.status !== resource.status) return false;
      return true;
    });

    const sorted = [...list];
    if (sortBy === 'newest') sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    if (sortBy === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'type') sorted.sort((a, b) => a.type.localeCompare(b.type));
    return sorted;
  }, [debouncedQuery, filters, sortBy, index]);

  const clear = () => {
    setQuery('');
    setSortBy('newest');
    setFilters({ topic: '', type: '', level: '', status: '' });
    searchRef.current?.focus();
  };

  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <Card className="sticky top-20 z-20">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author, annotation" className="pl-9" />
            </div>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-xl border border-white/10 bg-[var(--panel2)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
              <option value="newest">Recent</option>
              <option value="title">Title</option>
              <option value="type">Type</option>
            </select>
            <Button variant="ghost" onClick={clear}><X size={15} />Reset</Button>
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">{filtered.length} resources • press / to focus search</p>
        </Card>

        <Card>
          <FilterChips options={options} filters={filters} onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} />
        </Card>

        <motion.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.05 } } }}>
          {filtered.map((resource, idx) => (
            <motion.div key={resource.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              <ResourceCard resource={resource} onOpen={setSelected} index={idx} reduceMotion={reduceMotion} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ResourceDetailModal resource={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </RouteTransition>
  );
}
