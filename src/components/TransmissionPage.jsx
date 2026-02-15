import { useMemo } from 'react';
import { marked } from 'marked';

// Add .md files in /src/content/transmissions to publish new posts.
const transmissionModules = import.meta.glob('../content/transmissions/*.md', {
  as: 'raw',
  eager: true,
});

function parseFrontmatter(rawMarkdown) {
  const match = rawMarkdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: rawMarkdown };
  }

  const [, frontmatterBlock, body] = match;
  const meta = {};

  frontmatterBlock.split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (!key) return;

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

function buildPosts() {
  return Object.entries(transmissionModules)
    .map(([filepath, content]) => {
      const { meta, body } = parseFrontmatter(content);
      return {
        id: filepath,
        date: meta.date,
        title: meta.title,
        tags: meta.tags ?? [],
        bodyHtml: marked.parse(body),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function TransmissionPage() {
  const posts = useMemo(() => buildPosts(), []);

  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Transmission</h2>
        <p className="text-sm text-slate-600">
          Markdown-powered dispatches for the Living Library. Add files to{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">src/content/transmissions/</code> to publish.
        </p>
      </header>

      {posts.map((post) => (
        <article key={post.id} className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">{post.date}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{post.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={`${post.id}-${tag}`} className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="prose prose-slate mt-4 max-w-none prose-p:text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        </article>
      ))}
    </section>
  );
}
