import { useState } from 'react';
import LibraryPage from './components/LibraryPage';
import TransmissionPage from './components/TransmissionPage';

export default function App() {
  const [page, setPage] = useState('library');

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Universal Law School</p>
            <h1 className="text-2xl font-bold text-slate-900">Living Library</h1>
          </div>
          <nav className="flex gap-2" aria-label="Primary">
            <button
              onClick={() => setPage('library')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                page === 'library' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Resource Library
            </button>
            <button
              onClick={() => setPage('transmission')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                page === 'transmission' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Transmission
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        {page === 'library' ? <LibraryPage /> : <TransmissionPage />}
      </main>
    </div>
  );
}
