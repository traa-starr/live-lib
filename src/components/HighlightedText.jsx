function mergeRanges(ranges) {
  if (!ranges?.length) return [];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i += 1) {
    const [start, end] = sorted[i];
    const prev = merged[merged.length - 1];
    if (start <= prev[1] + 1) {
      prev[1] = Math.max(prev[1], end);
      continue;
    }
    merged.push([start, end]);
  }
  return merged;
}

export default function HighlightedText({ text = '', ranges = [], className = '' }) {
  const value = String(text || '');
  if (!ranges.length) return <span className={className}>{value}</span>;

  const merged = mergeRanges(ranges);
  const chunks = [];
  let cursor = 0;

  merged.forEach(([start, end], idx) => {
    if (start > cursor) {
      chunks.push(
        <span key={`t-${idx}-${cursor}`}>
          {value.slice(cursor, start)}
        </span>
      );
    }
    chunks.push(
      <mark key={`m-${idx}-${start}`} className="rounded bg-[var(--accent)]/25 px-0.5 text-[var(--text)]">
        {value.slice(start, end + 1)}
      </mark>
    );
    cursor = end + 1;
  });

  if (cursor < value.length) {
    chunks.push(<span key={`end-${cursor}`}>{value.slice(cursor)}</span>);
  }

  return <span className={className}>{chunks}</span>;
}
