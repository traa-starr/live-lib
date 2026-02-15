import { ArrowRight, Command, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import RouteTransition from '../components/RouteTransition';
import { loadResources } from '../lib/content/loadResources';
import { loadTransmissions } from '../lib/content/loadTransmissions';
import Button from '../ui/Button';
import Card from '../ui/Card';

const featured = loadResources().filter((item) => item.featured).slice(0, 3);
const latestTransmission = loadTransmissions()[0];

export default function HomePage({ reduceMotion }) {
  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-5">
        <Card className="relative overflow-hidden border-[var(--border)] p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(88,230,255,0.18),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(88,230,255,0.08),transparent_45%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Living Library</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
              A premium operating surface for learning, synthesis, and execution.
            </h1>
            <p className="mt-4 max-w-2xl text-[var(--muted)]">
              Home is where the philosophy lives. Library is where retrieval happens at speed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/library">
                <Button>
                  Open Library
                  <ArrowRight size={15} />
                </Button>
              </Link>
              <Link to="/transmissions">
                <Button variant="secondary">Read Transmissions</Button>
              </Link>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--muted)]">
              <Command size={12} />
              Cmd/Ctrl+K opens global command palette
            </p>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((resource) => (
            <Card key={resource.slug} className="border-[var(--border)] bg-[var(--panel2)]/35">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                <Sparkles size={12} className="text-[var(--accent)]" />
                Featured
              </p>
              <h3 className="mt-2 text-lg font-semibold">{resource.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{resource.description}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">
                {resource.creator}
                {resource.year ? ` - ${resource.year}` : ''}
              </p>
            </Card>
          ))}
        </div>

        {latestTransmission && (
          <Card className="border-[var(--border)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Latest transmission</p>
            <h3 className="mt-2 text-2xl font-semibold">{latestTransmission.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{latestTransmission.summary}</p>
            <Link to={`/transmissions/${latestTransmission.slug}`} className="mt-4 inline-flex text-sm text-[var(--accent)]">
              Read transmission
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </Card>
        )}
      </div>
    </RouteTransition>
  );
}
