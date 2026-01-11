// src/app/search/loading.js

export default function Loading() {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-6">
      <div className="h-6 w-40 bg-slate-200 rounded mb-6 animate-pulse" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-28 bg-slate-200 rounded animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
