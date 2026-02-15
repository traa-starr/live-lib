import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Compass, Library, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import RouteTransition from '../components/RouteTransition';
import { normalizeResources } from '../lib/resources';
import Button from '../ui/Button';
import Card from '../ui/Card';

const featuredResources = normalizeResources().slice(0, 4);

const steps = [
  { icon: Compass, title: 'Find signal', copy: 'Browse curated shelves and discover one idea worth carrying all week.' },
  { icon: BookOpen, title: 'Read deeply', copy: 'Open source materials, annotations, and references in a clean reading flow.' },
  { icon: Sparkles, title: 'Apply in life', copy: 'Return to transmissions that turn theory into concrete inner practice.' }
];

export default function HomePage({ reduceMotion }) {
  return (
    <RouteTransition reduceMotion={reduceMotion}>
      <div className="space-y-8">
        <Card className="overflow-hidden p-8">
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.26em] text-[var(--muted)]">A calm module for serious builders</motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">Build your inner operating system through the Living Library.</motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 max-w-2xl text-base text-slate-300">A premium reading environment for transmission notes, foundational texts, and practical rituals. Minimal noise. Maximum signal.</motion.p>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-6 flex flex-wrap gap-3">
            <Link to="/library"><Button>Open Library <ArrowRight size={14} /></Button></Link>
            <Link to="/transmissions"><Button variant="secondary">Explore Transmissions</Button></Link>
          </motion.div>
        </Card>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Featured shelves</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {featuredResources.map((resource, index) => (
              <motion.div key={resource.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <Card className="h-full transition hover:-translate-y-1 hover:border-[var(--accent)]/60">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{resource.type}</p>
                  <h3 className="mt-2 text-lg font-semibold">{resource.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{resource.annotation}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Card className="h-full">
                  <Icon className="text-[var(--accent)]" size={18} />
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{step.copy}</p>
                </Card>
              </motion.div>
            );
          })}
        </section>

        <Card className="bg-gradient-to-r from-slate-900/70 to-indigo-950/50 p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Get Right transmission</p>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-100">"Live from the end. Read with devotion. Move with precision. Build what serves life."</p>
          <Link to="/transmissions" className="mt-5 inline-block"><Button variant="ghost"><Library size={14} />Read today&apos;s transmission</Button></Link>
        </Card>
      </div>
    </RouteTransition>
  );
}
