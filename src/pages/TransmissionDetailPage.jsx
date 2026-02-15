import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import RouteTransition from '../components/RouteTransition';
import { getTransmissions } from '../lib/transmissions';
import Button from '../ui/Button';
import Card from '../ui/Card';

const posts = getTransmissions();

function extractHeadings(body) {
  return body
    .split('\n')
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, '').trim());
}

export default function TransmissionDetailPage({ reduceMotion }) {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  const [progress, setProgress] = useState(0);

  const headings = useMemo(() => (post ? extractHeadings(post.body) : []), [post]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : Math.min(100, (scrollTop / max) * 100));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!post) {
    return <Card>Transmission not found.</Card>;
  }

  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <div className="sticky top-0 z-30 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-[var(--accent)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
          <Card className="p-8">
            <Link to="/transmissions"><Button variant="ghost">Back to archive</Button></Link>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{post.date}</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight">{post.title}</h1>
            <article className="mt-6 space-y-4 text-base leading-8 text-slate-200 [&>blockquote]:border-l-2 [&>blockquote]:border-[var(--accent)] [&>blockquote]:pl-4 [&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-semibold">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </article>
          </Card>

          {headings.length > 0 && (
            <Card className="h-fit lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">On this page</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {headings.map((heading) => (
                  <li key={heading}>{heading}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </RouteTransition>
  );
}
