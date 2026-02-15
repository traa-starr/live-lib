import { ArrowRight } from 'lucide-react';
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
        <Card className="p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Living Library</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight">A premium thinking environment for builders who treat learning like operations.</h1>
          <p className="mt-4 max-w-2xl text-slate-200">This is the manifesto surface: fewer tabs, stronger decisions, cleaner signal. Home frames the philosophy; the Library runs the engine.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/library"><Button>Start here <ArrowRight size={15} /></Button></Link>
            <Link to="/about"><Button variant="secondary">What this is</Button></Link>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((resource) => (
            <Card key={resource.slug} className="bg-white/[0.03]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Featured shelf</p>
              <h3 className="mt-2 text-lg font-semibold">{resource.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{resource.description}</p>
              <p className="mt-3 text-xs text-slate-400">{resource.creator} • {resource.year}</p>
            </Card>
          ))}
        </div>

        {latestTransmission && (
          <Card>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Latest transmission</p>
            <h3 className="mt-2 text-2xl font-semibold">{latestTransmission.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{latestTransmission.summary}</p>
            <Link to={`/transmissions/${latestTransmission.slug}`} className="mt-4 inline-flex text-sm text-[var(--accent)]">Read transmission <ArrowRight size={14} className="ml-1" /></Link>
          </Card>
        )}

        <Card>
          <h2 className="text-2xl font-semibold">Manifesto snippet</h2>
          <p className="mt-3 text-slate-200">Knowledge should move. The Living Library is designed as a system: ingest markdown, index meaning, surface the right insight fast, then ship the next action.</p>
        </Card>
      </div>
    </RouteTransition>
  );
}
