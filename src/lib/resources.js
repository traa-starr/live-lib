import source from '../data/resources.json';

export function normalizeResources(raw = source) {
  return raw.map((item, index) => ({
    id: item.id || `${item.title}-${index}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: item.title,
    author: item.author,
    year: item.year,
    type: item.type || 'paper',
    tags: item.tags || item.topicTags || [],
    level: item.level || 'beginner',
    status: item.status || 'established',
    annotation: item.annotation || '',
    citation: item.citation || `${item.author}. ${item.title}.`,
    url: item.url || '#',
    impact: item.impact || 0,
  }));
}

export function buildResourceIndex(resources) {
  return resources.map((resource) => ({
    id: resource.id,
    blob: [resource.title, resource.author, resource.annotation, resource.tags.join(' ')].join(' ').toLowerCase(),
  }));
}

export function getResourceFilterOptions(resources) {
  const fromSet = (fn) => [...new Set(resources.flatMap(fn))].filter(Boolean).sort();
  return {
    topic: fromSet((r) => r.tags),
    type: fromSet((r) => [r.type]),
    level: fromSet((r) => [r.level]),
    status: fromSet((r) => [r.status]),
  };
}
