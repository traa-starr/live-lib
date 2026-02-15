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
    .sort((a, b) => {
      const featuredScore = (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0);
      if (featuredScore !== 0) return featuredScore;
      const yearScore = (b.year || 0) - (a.year || 0);
      if (yearScore !== 0) return yearScore;
      return a.title.localeCompare(b.title);
    });
}
