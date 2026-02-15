export function estimateReadingTime(markdown = '') {
  const text = markdown.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}

export function extractHeadings(markdown = '') {
  return markdown
    .split('\n')
    .map((line) => line.match(/^(##|###)\s+(.+)$/))
    .filter(Boolean)
    .map(([, depth, text]) => ({ depth: depth.length, text: text.trim() }));
}

export function markdownToPlain(markdown = '') {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
