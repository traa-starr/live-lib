import RouteTransition from '../components/RouteTransition';
import Card from '../ui/Card';

export default function AboutPage({ reduceMotion }) {
  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <Card className="max-w-3xl p-8">
        <h2 className="text-2xl font-semibold">About the Living Library</h2>
        <p className="mt-4 text-[var(--muted)]">Living Library combines a premium reading interface with a no-code markdown content pipeline. Add content in `/content`, and the app validates frontmatter, indexes material, and serves searchable shelves and transmissions automatically.</p>
      </Card>
    </RouteTransition>
  );
}
