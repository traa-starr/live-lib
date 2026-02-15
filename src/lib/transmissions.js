const transmissionModules = import.meta.glob('../content/transmissions/*.md', { query: '?raw', import: 'default', eager: true }
);

const slugify = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const [, fm, body] = match;
  const meta = {};
  fm.split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (!key) return;
    const value = rest.join(':').trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key.trim()] = value
        .slice(1, -1)
        .split(',')
        .map((token) => token.trim())
        .filter(Boolean);
      return;
    }
    meta[key.trim()] = value;
  });
  return { meta, body };
}

function inferTitle(filename, body) {
  const h1 = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (h1) return h1;
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '').replace(/-/g, ' ');
}

function inferTags(meta, body) {
  if (Array.isArray(meta.tags)) return meta.tags;
  const line = body.match(/^Tags:\s*(.+)$/im)?.[1];
  return line ? line.split(',').map((tag) => tag.trim()) : [];
}

export function getTransmissions() {
  return Object.entries(transmissionModules)
    .map(([path, raw]) => {
      const filename = path.split('/').pop();
      const { meta, body } = parseFrontmatter(raw);
      const date = meta.date || filename.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '1970-01-01';
      const title = meta.title || inferTitle(filename, body);
      return {
        slug: meta.slug || slugify(filename.replace(/\.md$/, '')),
        date,
        title,
        tags: inferTags(meta, body),
        body,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function buildTransmissionIndex(posts) {
  return posts.map((post) => ({
    slug: post.slug,
    blob: [post.title, post.tags.join(' '), post.body].join(' ').toLowerCase(),
  }));
}
