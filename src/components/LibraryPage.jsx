import { useMemo, useState } from 'react';
import resources from '../data/resources.json';
import FilterChips from './FilterChips';
import ResourceCard from './ResourceCard';
import ResourceDetailModal from './ResourceDetailModal';
import { buildFilterOptions, matchesFilters, matchesSearch } from './utils';

/**
 * To swap data sources later (for Shopify integration), replace this import with
 * server-side data hydration or a Storefront API call that returns the same shape.
 */
export default function LibraryPage() {
  const [query, setQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [filters, setFilters] = useState({ topic: '', type: '', level: '', status: '' });

  const filterOptions = useMemo(() => buildFilterOptions(resources), []);

  const filteredResources = useMemo(
    () => resources.filter((resource) => matchesSearch(resource, query) && matchesFilters(resource, filters)),
    [query, filters]
  );

  const handleFilterChange = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <label htmlFor="resource-search" className="mb-2 block text-sm font-semibold text-slate-700">
          Search resources
        </label>
        <input
          id="resource-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, author, or annotation"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-300 transition focus:ring"
        />
      </section>

      <FilterChips options={filterOptions} filters={filters} onFilterChange={handleFilterChange} />

      <section>
        <p className="mb-3 text-sm text-slate-500">Showing {filteredResources.length} resource(s)</p>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredResources.map((resource) => (
            <ResourceCard key={`${resource.title}-${resource.author}`} resource={resource} onOpen={setSelectedResource} />
          ))}
        </div>
      </section>

      <ResourceDetailModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
    </div>
  );
}
