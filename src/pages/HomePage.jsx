import { Link } from 'react-router-dom';
import RouteTransition from '../components/RouteTransition';
import { getTransmissions } from '../lib/transmissions';
import { normalizeResources } from '../lib/resources';
import Card from '../ui/Card';
import Button from '../ui/Button';

const featuredTransmission = getTransmissions()[0];
const featuredResources = normalizeResources().slice(0, 3);

export default function HomePage({ reduceMotion }) {
  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-4">
        <Card>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Start Here</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">A calm archive for serious legal study.</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">Read a transmission, then trace its references in the library.</p>
          <div className="mt-4 flex gap-2">
            <Link to="/transmissions"><Button>Open transmissions</Button></Link>
            <Link to="/library"><Button variant="secondary">Browse library</Button></Link>
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Featured Transmission</p>
          <h3 className="mt-1 text-lg font-semibold">{featuredTransmission.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{featuredTransmission.date}</p>
          <Link to={`/transmissions/${featuredTransmission.slug}`} className="mt-3 inline-block text-sm font-medium text-sky-600 hover:underline">Read now</Link>
        </Card>

        <div className="grid gap-3 sm:grid-cols-3">
          {featuredResources.map((resource) => (
            <Card key={resource.id}>
              <h4 className="font-semibold">{resource.title}</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{resource.author}</p>
            </Card>
          ))}
        </div>
      </div>
    </RouteTransition>
  );
}
