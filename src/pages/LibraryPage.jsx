import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import RouteTransition from '../components/RouteTransition';
import FilterChips from '../components/FilterChips';
import ResourceCard from '../components/ResourceCard';
import ResourceDetailModal from '../components/ResourceDetailModal';
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
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(null);
  const searchRef = useRef(null);

  const debouncedQuery = useDebouncedValue(query);
  const index = useMemo(() => buildResourceIndex(baseResources), []);
  const options = useMemo(() => getResourceFilterOptions(baseResources), []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'Enter' && activeId) {
        const resource = baseResources.find((item) => item.id === activeId);
        if (resource) setSelected(resource);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

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
    if (sortBy === 'impact') sorted.sort((a, b) => (b.impact || 0) - (a.impact || 0));
    if (sortBy === 'random') sorted.sort(() => Math.random() - 0.5);

    return sorted;
  }, [debouncedQuery, filters, sortBy, index]);

  useEffect(() => {
    setActiveId(filtered[0]?.id ?? null);
  }, [filtered]);

  const clear = () => {
    setQuery('');
    setSortBy('newest');
    setFilters({ topic: '', type: '', level: '', status: '' });
  };

  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <Card>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, author, annotation" className="pl-9" />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/5">
              <option value="newest">Newest</option>
              <option value="title">Title A–Z</option>
              <option value="impact">Impact</option>
              <option value="random">Random</option>
            </select>
          </div>
          <p className="mt-2 text-xs text-slate-500">Tip: press / to focus search</p>
        </Card>

        <Card>
          <FilterChips options={options} filters={filters} onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} />
        </Card>

        {filtered.length === 0 ? (
          <Card className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">No results. Try another keyword or clear your filters.</p>
            <Button variant="ghost" className="mt-3" onClick={clear}><X size={15} className="mr-2" />Clear filters</Button>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((resource, idx) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onOpen={setSelected}
                highlighted={activeId === resource.id}
                index={idx}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        )}
      </div>

      <ResourceDetailModal resource={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </RouteTransition>
  );
}
