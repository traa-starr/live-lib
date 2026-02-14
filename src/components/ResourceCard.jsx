export default function ResourceCard({ resource, onOpen }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <button className="w-full text-left" onClick={() => onOpen(resource)}>
        <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
        <p className="mt-1 text-sm text-slate-700">
          {resource.author}
          {resource.year ? ` (${resource.year})` : ''}
        </p>
        <p className="mt-3 text-sm text-slate-600">{resource.annotation}</p>
        <p className="mt-4 text-xs italic text-slate-500">{resource.citation}</p>
      </button>
    </article>
  );
}
