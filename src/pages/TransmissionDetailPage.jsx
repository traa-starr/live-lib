import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import EmbedRenderer from '../components/EmbedRenderer';
import RouteTransition from '../components/RouteTransition';
import { loadTransmissions } from '../lib/content/loadTransmissions';
import Button from '../ui/Button';
import Card from '../ui/Card';

const posts = loadTransmissions();

export default function TransmissionDetailPage({ reduceMotion }) {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  const [progress, setProgress] = useState(0);

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

  if (!post) return <Card>Transmission not found.</Card>;

  const heroEmbed = post.video ? { type: 'youtube', url: post.video, title: 'Video transmission' } : post.audio ? { type: 'audio', url: post.audio, title: 'Audio transmission' } : null;

  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <div className="sticky top-0 z-30 h-1 w-full overflow-hidden rounded-full bg-[var(--panel2)]">
          <div className="h-full bg-[var(--accent)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
          <Card className="p-8">
            <Link to="/transmissions"><Button variant="ghost">Back to archive</Button></Link>
            <p className="mt-4 text-xs text-[var(--muted)]">{post.date} - {post.readingTime}</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight">{post.title}</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">{post.summary}</p>

            {heroEmbed && <div className="mt-6"><EmbedRenderer embed={heroEmbed} /></div>}

            <article className="prose prose-invert mt-6 max-w-none text-[var(--text)] [&>h2]:mt-8 [&>h2]:text-2xl [&>h3]:mt-6 [&>h3]:text-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </article>

            {post.embeds?.length > 0 && (
              <section className="mt-8 space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Related media</p>
                {post.embeds.map((embed, idx) => <EmbedRenderer key={`${post.slug}-${idx}`} embed={embed} />)}
              </section>
            )}
          </Card>

          {post.headings.length > 0 && (
            <Card className="h-fit lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">On this page</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {post.headings.map((heading) => (
                  <li key={`${heading.depth}-${heading.text}`} className={heading.depth === 3 ? 'pl-3' : ''}>{heading.text}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </RouteTransition>
  );
}
