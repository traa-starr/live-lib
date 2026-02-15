import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

function SelectItem({ value, label }) {
  return (
    <SelectPrimitive.Item
      value={value}
      className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm text-[var(--text)] outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-[var(--panel2)] data-[highlighted]:text-[var(--text)]"
    >
      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex items-center text-[var(--accent)]">
        <Check size={14} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export default function Select({ placeholder, items, value, onChange, ariaLabel }) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        aria-label={ariaLabel || placeholder}
        className="inline-flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--panel2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm transition hover:border-[var(--accent)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60"
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-[var(--muted)]">
          <ChevronDown size={16} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          forceMount
          position="popper"
          sideOffset={8}
          className="ll-select-content z-[60] w-[--radix-select-trigger-width] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <SelectPrimitive.Viewport className="max-h-72">
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value} label={item.label} />
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
