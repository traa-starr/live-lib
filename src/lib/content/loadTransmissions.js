import { parseFrontmatter } from './frontmatter';
import { validateTransmission } from './validators';
import { estimateReadingTime, extractHeadings, markdownToPlain } from './utils';

const modules = import.meta.glob('../../../content/transmissions/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function loadTransmissions() {
  return Object.entries(modules)
    .map(([filePath, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const parsed = validateTransmission(data, filePath);
      const body = content.trim();
      return {
        ...parsed,
        body,
        text: markdownToPlain(body),
        readingTime: estimateReadingTime(body),
        headings: extractHeadings(body),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
