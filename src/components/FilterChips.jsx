import Chip from '../ui/Chip';

function Group({ label, values, active, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        <Chip active={!active} onClick={() => onChange('')}>All</Chip>
        {values.map((value) => (
          <Chip key={value} active={active === value} onClick={() => onChange(value)}>{value}</Chip>
        ))}
      </div>
    </div>
  );
}

export default function FilterChips({ options, filters, onFilterChange }) {
  return (
    <div className="space-y-4">
      <Group label="Topic" values={options.topic} active={filters.topic} onChange={(value) => onFilterChange('topic', value)} />
      <Group label="Type" values={options.type} active={filters.type} onChange={(value) => onFilterChange('type', value)} />
      <Group label="Level" values={options.level} active={filters.level} onChange={(value) => onFilterChange('level', value)} />
      <Group label="Status" values={options.status} active={filters.status} onChange={(value) => onFilterChange('status', value)} />
    </div>
  );
}
