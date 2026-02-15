import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RouteTransition from '../components/RouteTransition';
import { loadTransmissions } from '../lib/content/loadTransmissions';
import Card from '../ui/Card';

const posts = loadTransmissions();

export default function TransmissionArchivePage({ reduceMotion }) {
  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <Card className="p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Transmission archive</p>
          <h1 className="mt-2 text-3xl font-semibold">Field notes, protocols, and decision memos.</h1>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <Link to={`/transmissions/${post.slug}`}>
                <Card className="h-full transition hover:border-[var(--accent)]/60">
                  <p className="text-xs text-[var(--muted)]">{post.date} - {post.readingTime}</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{post.summary}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </RouteTransition>
  );
}
