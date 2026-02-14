import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import RouteTransition from '../components/RouteTransition';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { buildTransmissionIndex, getTransmissions } from '../lib/transmissions';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Badge from '../ui/Badge';

const posts = getTransmissions();

function groupByMonth(items) {
  return items.reduce((acc, post) => {
    const key = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    acc[key] ??= [];
    acc[key].push(post);
    return acc;
  }, {});
}

export default function TransmissionArchivePage({ reduceMotion }) {
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query);
  const index = useMemo(() => buildTransmissionIndex(posts), []);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return posts;
    const matches = new Set(index.filter((item) => item.blob.includes(q)).map((item) => item.slug));
    return posts.filter((post) => matches.has(post.slug));
  }, [debounced, index]);

  const grouped = useMemo(() => groupByMonth(filtered), [filtered]);
  const featured = posts[0];

  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit lg:sticky lg:top-6">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transmissions" />
          <div className="mt-4 space-y-4">
            {Object.entries(grouped).map(([month, monthPosts]) => (
              <div key={month}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{month}</p>
                <div className="mt-2 space-y-1">
                  {monthPosts.map((post) => (
                    <Link key={post.slug} to={`/transmissions/${post.slug}`} className="block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10">
                      {post.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-3">
          <Card>
            <p className="text-xs uppercase tracking-wider text-slate-500">Featured transmission</p>
            <Link to={`/transmissions/${featured.slug}`} className="mt-1 block text-lg font-semibold hover:underline">{featured.title}</Link>
            <p className="text-sm text-slate-600 dark:text-slate-300">{featured.date}</p>
          </Card>
          {filtered.map((post) => (
            <Card key={post.slug}>
              <p className="text-xs uppercase tracking-widest text-slate-500">{post.date}</p>
              <Link to={`/transmissions/${post.slug}`} className="mt-1 block text-lg font-semibold hover:underline">
                {post.title}
              </Link>
              <div className="mt-2 flex flex-wrap gap-1">
                {post.tags.map((tag) => <Badge key={`${post.slug}-${tag}`} tone="success">{tag}</Badge>)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </RouteTransition>
  );
}
