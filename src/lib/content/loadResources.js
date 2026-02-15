import { parseFrontmatter } from './frontmatter';
import { validateResource } from './validators';
import { markdownToPlain } from './utils';

const modules = import.meta.glob('../../../content/resources/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function loadResources() {
  return Object.entries(modules)
    .map(([filePath, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const parsed = validateResource(data, filePath);
      return {
        ...parsed,
        body: content.trim(),
        text: markdownToPlain(content),
      };
    })
    .sort((a, b) => (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0) || b.year - a.year);
}
