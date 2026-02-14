export default function ResourceDetailModal({ resource, onClose }) {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{resource.title}</h2>
            <p className="text-sm text-slate-600">
              {resource.author}
              {resource.year ? ` (${resource.year})` : ''}
            </p>
          </div>
          <button className="rounded-md border border-slate-300 px-2.5 py-1 text-sm" onClick={onClose}>
            Close
          </button>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-semibold text-slate-700">Type</dt>
            <dd className="capitalize text-slate-600">{resource.type}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Level</dt>
            <dd className="capitalize text-slate-600">{resource.level}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Status</dt>
            <dd className="capitalize text-slate-600">{resource.status}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Topics</dt>
            <dd className="text-slate-600">{resource.topicTags.join(', ')}</dd>
          </div>
        </dl>

        <section className="mt-5 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Full annotation</h3>
          <p className="text-sm leading-relaxed text-slate-700">{resource.annotation}</p>
          <h3 className="pt-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Citation</h3>
          <p className="text-sm italic text-slate-700">{resource.citation}</p>
        </section>
      </div>
    </div>
  );
}
