import RouteTransition from '../components/RouteTransition';
import Card from '../ui/Card';

export default function AboutPage({ reduceMotion }) {
  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <Card className="max-w-3xl p-8">
        <h2 className="text-2xl font-semibold">About the Living Library</h2>
        <p className="mt-4 text-slate-300">This module is designed as a calm, premium study surface: focused typography, consistent dark glass theming, and motion that respects reduced-motion settings. Use it as a standalone app now, then swap data providers later.</p>
      </Card>
    </RouteTransition>
  );
}
