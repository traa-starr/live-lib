import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RouteTransition from '../components/RouteTransition';
import { getTransmissions } from '../lib/transmissions';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const posts = getTransmissions();

export default function TransmissionArchivePage({ reduceMotion }) {
  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <Card className="p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Transmission archive</p>
          <h1 className="mt-3 text-3xl font-semibold">Editorial dispatches for daily alignment.</h1>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          {posts.map((post, index) => (
            <motion.div key={post.slug} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Link to={`/transmissions/${post.slug}`}>
                <Card className="h-full transition hover:-translate-y-1 hover:border-[var(--accent)]/60">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{post.date}</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => <Badge key={`${post.slug}-${tag}`} tone="info">{tag}</Badge>)}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </RouteTransition>
  );
}
