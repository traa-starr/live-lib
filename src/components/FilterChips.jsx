import React from 'react';
import Chip from '../ui/Chip';

function Section({ label, items, activeValue, onChange }) {
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip active={!activeValue} onClick={() => onChange('')}>
          All
        </Chip>

        {hasItems ? (
          items.map((item) => (
            <Chip
              key={item}
              active={activeValue === item}
              onClick={() => onChange(item)}
            >
              {item}
            </Chip>
          ))
        ) : (
          <span className="text-sm text-slate-400">No options yet</span>
        )}
      </div>
    </div>
  );
}

export default function FilterChips({ options, filters, onFilterChange }) {
  const topics = options?.topics ?? [];
  const types = options?.types ?? [];
  const levels = options?.levels ?? [];
  const statuses = options?.statuses ?? [];

  return (
    <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <Section
        label="Topic"
        items={topics}
        activeValue={filters?.topic ?? ''}
        onChange={(value) => onFilterChange?.('topic', value)}
      />
      <Section
        label="Type"
        items={types}
        activeValue={filters?.type ?? ''}
        onChange={(value) => onFilterChange?.('type', value)}
      />
      <Section
        label="Level"
        items={levels}
        activeValue={filters?.level ?? ''}
        onChange={(value) => onFilterChange?.('level', value)}
      />
      <Section
        label="Status"
        items={statuses}
        activeValue={filters?.status ?? ''}
        onChange={(value) => onFilterChange?.('status', value)}
      />
    </div>
  );
}
