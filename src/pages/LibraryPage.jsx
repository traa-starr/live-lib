import { motion } from 'framer-motion';
import { Search, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HighlightedText from '../components/HighlightedText';
import ResourceCard from '../components/ResourceCard';
import ResourceDetailModal from '../components/ResourceDetailModal';
import Select from '../components/ui/Select';
import RouteTransition from '../components/RouteTransition';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { loadResources } from '../lib/content/loadResources';
import { loadTransmissions } from '../lib/content/loadTransmissions';
import { createResourceFuse, createTransmissionFuse } from '../lib/search/fuse';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

const resources = loadResources();
const transmissions = loadTransmissions();

const resourceFuse = createResourceFuse(resources);
const transmissionFuse = createTransmissionFuse(transmissions);

const typeOptions = [
  { value: 'all', label: 'All types' },
  ...Array.from(new Set(resources.map((item) => item.type).filter(Boolean)))
    .sort()
    .map((item) => ({ value: item, label: item })),
];

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A-Z' },
];

const allTags = [...new Set(resources.flatMap((r) => r.tags || []))].sort();
const allCreators = [...new Set(resources.map((r) => r.creator).filter(Boolean))].sort();

function getRanges(matches = [], field) {
  return matches.filter((match) => match.key === field).flatMap((match) => match.indices);
}

function sortResources(list, sortBy, hasQuery) {
  if (sortBy === 'newest') return [...list].sort((a, b) => (b.item.year || 0) - (a.item.year || 0));
  if (sortBy === 'oldest') return [...list].sort((a, b) => (a.item.year || 0) - (b.item.year || 0));
  if (sortBy === 'az') return [...list].sort((a, b) => a.item.title.localeCompare(b.item.title));
  if (hasQuery) return list;
  return [...list].sort((a, b) => (b.item.featured === true ? 1 : 0) - (a.item.featured === true ? 1 : 0));
}

function sortTransmissions(list, sortBy) {
  if (sortBy === 'oldest') return [...list].sort((a, b) => new Date(a.item.date || 0) - new Date(b.item.date || 0));
  if (sortBy === 'az') return [...list].sort((a, b) => a.item.title.localeCompare(b.item.title));
  return [...list].sort((a, b) => new Date(b.item.date || 0) - new Date(a.item.date || 0));
}

export default function LibraryPage({ reduceMotion }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState('all');
  const [tag, setTag] = useState('all');
  const [creator, setCreator] = useState('all');
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    const slug = searchParams.get('resource');
    if (!slug) return;
    const resource = resources.find((item) => item.slug === slug);
    if (resource) {
      setSelected(resource);
    }
  }, [searchParams]);

  const rawResourceHits = useMemo(() => {
    if (!debouncedQuery) return resources.map((item) => ({ item, score: 1, matches: [] }));
    return resourceFuse.search(debouncedQuery).map((hit) => ({ item: hit.item, score: hit.score || 0, matches: hit.matches || [] }));
  }, [debouncedQuery]);

  const rawTransmissionHits = useMemo(() => {
    if (!debouncedQuery) return transmissions.map((item) => ({ item, score: 1, matches: [] }));
    return transmissionFuse.search(debouncedQuery).map((hit) => ({ item: hit.item, score: hit.score || 0, matches: hit.matches || [] }));
  }, [debouncedQuery]);

  const resourceResults = useMemo(() => {
    const min = yearMin ? Number(yearMin) : -Infinity;
    const max = yearMax ? Number(yearMax) : Infinity;

    const filtered = rawResourceHits.filter(({ item }) => {
      if (type !== 'all' && item.type !== type) return false;
      if (tag !== 'all' && !item.tags?.includes(tag)) return false;
      if (creator !== 'all' && item.creator !== creator) return false;
      const year = item.year || new Date(item.date || 0).getFullYear() || 0;
      if (yearMin && year < min) return false;
      if (yearMax && year > max) return false;
      return true;
    });

    return sortResources(filtered, sortBy, Boolean(debouncedQuery));
  }, [creator, debouncedQuery, rawResourceHits, sortBy, tag, type, yearMax, yearMin]);

  const transmissionResults = useMemo(
    () => sortTransmissions(rawTransmissionHits, sortBy),
    [rawTransmissionHits, sortBy],
  );

  const clearAll = () => {
    setQuery('');
    setType('all');
    setTag('all');
    setCreator('all');
    setYearMin('');
    setYearMax('');
    setSortBy('relevance');
  };

  const openResource = (resource) => {
    setSelected(resource);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('resource', resource.slug);
      return next;
    });
  };

  const closeResource = () => {
    setSelected(null);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('resource');
      return next;
    });
  };

  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <Card className="sticky top-20 z-20 border-[var(--border)] bg-[var(--panel)]/95">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel2)]/45 p-3">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-9"
                placeholder="Search title, description, creator, tags, and content excerpts"
              />
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[repeat(6,minmax(0,1fr))]">
            <Select placeholder="Type" ariaLabel="Type filter" value={type} onChange={setType} items={typeOptions} />
            <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-xl px-3 py-2 text-sm">
              <option value="all">All tags</option>
              {allTags.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={creator} onChange={(e) => setCreator(e.target.value)} className="rounded-xl px-3 py-2 text-sm">
              <option value="all">All creators</option>
              {allCreators.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <Input value={yearMin} onChange={(e) => setYearMin(e.target.value)} placeholder="Year from" />
            <Input value={yearMax} onChange={(e) => setYearMax(e.target.value)} placeholder="Year to" />
            <Select placeholder="Sort by" ariaLabel="Sort order" value={sortBy} onChange={setSortBy} items={sortOptions} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button variant="ghost" onClick={clearAll}>
              <X size={14} />
              Clear all
            </Button>
            <p className="ml-auto inline-flex items-center gap-2 text-xs text-[var(--muted)]">
              <Sparkles size={13} className="text-[var(--accent)]" />
              {resourceResults.length} resources - {transmissionResults.length} transmissions - Cmd/Ctrl+K for command palette
            </p>
          </div>
        </Card>

        <Card className="border-[var(--border)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Resources</p>
          {resourceResults.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
              No resources matched your filters. Clear filters or widen your range.
            </div>
          ) : (
            <motion.div
              className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.04 } } }}
            >
              {resourceResults.map(({ item, matches }, index) => (
                <motion.div key={item.slug} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
                  <ResourceCard
                    resource={item}
                    onOpen={openResource}
                    index={index}
                    reduceMotion={reduceMotion}
                    highlights={{
                      title: getRanges(matches, 'title'),
                      description: getRanges(matches, 'description'),
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>

        <Card className="border-[var(--border)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Transmissions</p>
          {transmissionResults.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
              No transmissions matched this search.
            </div>
          ) : (
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {transmissionResults.map(({ item, matches }) => (
                <Link
                  key={item.slug}
                  to={`/transmissions/${item.slug}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--panel2)]/35 p-4 transition hover:border-[var(--accent)]/60"
                >
                  <p className="text-xs text-[var(--muted)]">{item.date || 'Undated'} - {item.readingTime}</p>
                  <h3 className="mt-2 font-semibold">
                    <HighlightedText text={item.title} ranges={getRanges(matches, 'title')} />
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    <HighlightedText text={item.summary} ranges={getRanges(matches, 'summary')} />
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
      <ResourceDetailModal resource={selected} open={Boolean(selected)} onOpenChange={(open) => !open && closeResource()} />
    </RouteTransition>
  );
}
