// src/app/search/_components/FiltersBar.js
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltersDrawer from "./FiltersDrawer";

function getParam(searchParams, key, fallback = "") {
  const v = searchParams.get(key);
  return v === null ? fallback : v;
}

export default function FiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current URL state (source of truth)
  const currentQ = useMemo(() => getParam(searchParams, "q", ""), [searchParams]);
  const currentType = useMemo(() => getParam(searchParams, "type", "multi"), [searchParams]);

  // Controlled input state (draft)
  const [q, setQ] = useState(currentQ);
  const [type, setType] = useState(currentType);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const nextQ = q.trim();
    const params = new URLSearchParams(searchParams.toString());

    // Always set type (multi/movie/tv)
    params.set("type", type);

    // Reset pagination on new searches
    params.set("page", "1");

    if (!nextQ) {
      params.delete("q");
    } else {
      params.set("q", nextQ);
    }

    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  };

  const clearAll = () => {
    router.push("/search");
  };

  return (
    <div className="mb-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {/* Row 1: query + actions */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search movies, series, or people..."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Search query"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              Filters
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
            >
              Search
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Row 2: Show Me (Everything/Movie/Series) */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="type"
              value="multi"
              checked={type === "multi"}
              onChange={() => setType("multi")}
            />
            <span className="text-sm">Everything</span>
          </label>

          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="type"
              value="movie"
              checked={type === "movie"}
              onChange={() => setType("movie")}
            />
            <span className="text-sm">Movies</span>
          </label>

          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="type"
              value="tv"
              checked={type === "tv"}
              onChange={() => setType("tv")}
            />
            <span className="text-sm">Series</span>
          </label>

          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="type"
              value="person"
              checked={type === "person"}
              onChange={() => setType("person")}
            />
            <span className="text-sm">Person</span>
          </label>
        </div>
      </form>

      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
