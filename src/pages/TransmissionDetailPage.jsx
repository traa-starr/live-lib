import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { getTransmissions } from '../lib/transmissions';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const posts = getTransmissions();

export default function TransmissionDetailPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  const index = posts.findIndex((item) => item.slug === slug);
  const previous = posts[index + 1];
  const next = posts[index - 1];
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

  return (
    <article className="space-y-4">
      <div className="sticky top-0 z-10 h-1 w-full rounded-full bg-slate-200 dark:bg-white/10">
        <div className="h-full rounded-full bg-sky-500" style={{ width: `${progress}%` }} />
      </div>
      <Card className="prose prose-slate max-w-none dark:prose-invert">
        <Link to="/transmissions"><Button variant="ghost">Back to archive</Button></Link>
        <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">{post.date}</p>
        <h1>{post.title}</h1>
        <div className="not-prose my-3 flex flex-wrap gap-1">
          {post.tags.map((tag) => <Badge key={`${post.slug}-${tag}`}>{tag}</Badge>)}
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>{previous ? <Link to={`/transmissions/${previous.slug}`}>Previous: {previous.title}</Link> : <span>No previous post</span>}</Card>
        <Card>{next ? <Link to={`/transmissions/${next.slug}`}>Next: {next.title}</Link> : <span>No newer post</span>}</Card>
      </div>
    </article>
  );
}
