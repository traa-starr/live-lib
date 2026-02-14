export function normalize(value) {
  return String(value ?? '').toLowerCase();
}

export function buildFilterOptions(resources) {
  const topics = new Set();
  const types = new Set();
  const levels = new Set();
  const statuses = new Set();

  resources.forEach((resource) => {
    resource.topicTags?.forEach((tag) => topics.add(tag));
    if (resource.type) types.add(resource.type);
    if (resource.level) levels.add(resource.level);
    if (resource.status) statuses.add(resource.status);
  });

  return {
    topic: Array.from(topics).sort(),
    type: Array.from(types).sort(),
    level: Array.from(levels).sort(),
    status: Array.from(statuses).sort(),
  };
}

export function matchesSearch(resource, query) {
  if (!query) return true;
  const q = normalize(query);
  return [resource.title, resource.author, resource.annotation].some((part) => normalize(part).includes(q));
}

export function matchesFilters(resource, filters) {
  if (filters.topic && !resource.topicTags?.includes(filters.topic)) return false;
  if (filters.type && resource.type !== filters.type) return false;
  if (filters.level && resource.level !== filters.level) return false;
  if (filters.status && resource.status !== filters.status) return false;
  return true;
}
