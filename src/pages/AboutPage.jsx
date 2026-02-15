import RouteTransition from '../components/RouteTransition';
import Card from '../ui/Card';

export default function AboutPage() {
  return (
    <RouteTransition>
      <Card>
        <h2 className="text-xl font-semibold">About</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Living Library is built as a standalone module, ready to be embedded into a Shopify theme app extension.</p>
      </Card>
    </RouteTransition>
  );
}
