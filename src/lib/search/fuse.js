import Fuse from 'fuse.js';

const COMMON_OPTIONS = {
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
  threshold: 0.34,
};

export function createResourceFuse(resources) {
  return new Fuse(resources, {
    ...COMMON_OPTIONS,
    keys: [
      { name: 'title', weight: 0.42 },
      { name: 'description', weight: 0.2 },
      { name: 'creator', weight: 0.14 },
      { name: 'tags', weight: 0.12 },
      { name: 'type', weight: 0.06 },
      { name: 'text', weight: 0.06 },
    ],
  });
}

export function createTransmissionFuse(transmissions) {
  return new Fuse(transmissions, {
    ...COMMON_OPTIONS,
    keys: [
      { name: 'title', weight: 0.44 },
      { name: 'summary', weight: 0.2 },
      { name: 'tags', weight: 0.16 },
      { name: 'text', weight: 0.2 },
    ],
  });
}

export function buildCommandDocs(resources, transmissions) {
  return [
    ...resources.map((resource) => ({
      id: `resource:${resource.slug}`,
      kind: 'resource',
      route: '/library',
      title: resource.title,
      subtitle: `${resource.creator || 'Unknown creator'} - ${resource.type || 'resource'}`,
      description: resource.description || '',
      tags: resource.tags || [],
      body: resource.text || '',
      payload: resource,
    })),
    ...transmissions.map((transmission) => ({
      id: `transmission:${transmission.slug}`,
      kind: 'transmission',
      route: `/transmissions/${transmission.slug}`,
      title: transmission.title,
      subtitle: `${transmission.date || 'Undated'} - ${transmission.readingTime || 'Transmission'}`,
      description: transmission.summary || '',
      tags: transmission.tags || [],
      body: transmission.text || '',
      payload: transmission,
    })),
  ];
}

export function createCommandFuse(resources, transmissions) {
  const combined = buildCommandDocs(resources, transmissions);

  return new Fuse(combined, {
    ...COMMON_OPTIONS,
    keys: [
      { name: 'title', weight: 0.44 },
      { name: 'subtitle', weight: 0.1 },
      { name: 'description', weight: 0.2 },
      { name: 'tags', weight: 0.12 },
      { name: 'body', weight: 0.14 },
    ],
  });
}
