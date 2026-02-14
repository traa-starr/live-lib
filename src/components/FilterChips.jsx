 codex/create-living-library-module-with-react-93kurp
import Chip from '../ui/Chip';

function Group({ label, values, active, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        <Chip active={!active} onClick={() => onChange('')}>All</Chip>
        {values.map((value) => (
          <Chip key={value} active={active === value} onClick={() => onChange(value)}>{value}</Chip>

function FilterGroup({ label, values, activeValue, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
            !activeValue
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
          }`}
          onClick={() => onChange('')}
        >
          All
        </button>
        {values.map((value) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize ${
              activeValue === value
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
            }`}
          >
            {value}
          </button>
 main
        ))}
      </div>
    </div>
  );
}

export default function FilterChips({ options, filters, onFilterChange }) {
  return (
 codex/create-living-library-module-with-react-93kurp
    <div className="space-y-4">
      <Group label="Topic" values={options.topic} active={filters.topic} onChange={(value) => onFilterChange('topic', value)} />
      <Group label="Type" values={options.type} active={filters.type} onChange={(value) => onFilterChange('type', value)} />
      <Group label="Level" values={options.level} active={filters.level} onChange={(value) => onFilterChange('level', value)} />
      <Group label="Status" values={options.status} active={filters.status} onChange={(value) => onFilterChange('status', value)} />
    </div>

    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
      <FilterGroup label="Topic" values={options.topic} activeValue={filters.topic} onChange={(value) => onFilterChange('topic', value)} />
      <FilterGroup label="Type" values={options.type} activeValue={filters.type} onChange={(value) => onFilterChange('type', value)} />
      <FilterGroup label="Level" values={options.level} activeValue={filters.level} onChange={(value) => onFilterChange('level', value)} />
      <FilterGroup label="Status" values={options.status} activeValue={filters.status} onChange={(value) => onFilterChange('status', value)} />
    </section>
 main
  );
}
