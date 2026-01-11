// src/app/search/error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-6">
      <h2 className="text-xl font-semibold mb-2">
        Something went wrong
      </h2>

      <p className="text-slate-600 mb-4">
        We couldn’t load search results. Please try again.
      </p>

      <button
        onClick={reset}
        className="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-700"
      >
        Retry
      </button>
    </section>
  );
}
