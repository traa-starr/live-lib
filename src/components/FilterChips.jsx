import Chip from '../ui/Chip';

function Section({ label, items, activeValue, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
      <div className="flex flex-wrap gap-2">
        <Chip active={!activeValue} onClick={() => onChange('')}>All</Chip>
        {items.map((item) => (
          <Chip key={item} active={activeValue === item} onClick={() => onChange(item)}>{item}</Chip>
        ))}
      </div>
    </div>
  );
}

export default function FilterChips({ options, filters, onFilterChange }) {
  return (
    <div className="grid gap-4">
      <Section label="Topic" items={options?.topic ?? []} activeValue={filters?.topic ?? ''} onChange={(value) => onFilterChange('topic', value)} />
      <Section label="Type" items={options?.type ?? []} activeValue={filters?.type ?? ''} onChange={(value) => onFilterChange('type', value)} />
      <Section label="Level" items={options?.level ?? []} activeValue={filters?.level ?? ''} onChange={(value) => onFilterChange('level', value)} />
      <Section label="Status" items={options?.status ?? []} activeValue={filters?.status ?? ''} onChange={(value) => onFilterChange('status', value)} />
    </div>
  );
}
