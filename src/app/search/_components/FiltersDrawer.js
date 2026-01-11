// src/app/search/_components/FiltersDrawer.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * This drawer edits filter-related query params only.
 * It does NOT fetch data; it only updates the URL.
 *
 * Current params we’ll manage here (expand later):
 * - genre: "28,12"
 * - from: "YYYY-MM-DD"
 * - to: "YYYY-MM-DD"
 * - language: "en-GB"
 *
 * Note: We intentionally keep the first version minimal and stable.
 */

const GENRES = [
  { id: "28", label: "Action" },
  { id: "12", label: "Adventure" },
  { id: "16", label: "Animation" },
  { id: "35", label: "Comedy" },
  { id: "80", label: "Crime" },
  { id: "99", label: "Documentary" },
  { id: "18", label: "Drama" },
  { id: "10751", label: "Family" },
  { id: "14", label: "Fantasy" },
  { id: "36", label: "History" },
  { id: "27", label: "Horror" },
  { id: "10402", label: "Music" },
  { id: "9648", label: "Mystery" },
  { id: "10749", label: "Romance" },
  { id: "878", label: "Sci-Fi" },
  { id: "53", label: "Thriller" },
  { id: "10752", label: "War" },
  { id: "37", label: "Western" },
];

function parseCsvParam(v) {
  if (!v) return [];
  return v.split(",").map((s) => s.trim()).filter(Boolean);
}

export default function FiltersDrawer({ open, onClose }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialGenres = useMemo(() => parseCsvParam(searchParams.get("genre")), [searchParams]);
  const initialFrom = useMemo(() => searchParams.get("from") ?? "", [searchParams]);
  const initialTo = useMemo(() => searchParams.get("to") ?? "", [searchParams]);
  const initialLanguage = useMemo(() => searchParams.get("language") ?? "en-GB", [searchParams]);

  const [genres, setGenres] = useState(initialGenres);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [language, setLanguage] = useState(initialLanguage);

  // When the drawer opens, sync draft state from URL (useful if user changes URL then opens drawer)
  useEffect(() => {
    if (!open) return;
    setGenres(initialGenres);
    setFrom(initialFrom);
    setTo(initialTo);
    setLanguage(initialLanguage);
  }, [open, initialGenres, initialFrom, initialTo, initialLanguage]);

  // ESC closes drawer
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const toggleGenre = (id) => {
    setGenres((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  const clearFiltersOnly = () => {
    setGenres([]);
    setFrom("");
    setTo("");
    setLanguage("en-GB");
  };

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset pagination whenever filters change
    params.set("page", "1");

    if (genres.length === 0) params.delete("genre");
    else params.set("genre", genres.join(","));

    if (!from) params.delete("from");
    else params.set("from", from);

    if (!to) params.delete("to");
    else params.set("to", to);

    if (!language) params.delete("language");
    else params.set("language", language);

    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-400">
          <h2 className="font-semibold">Filters</h2>
          <button onClick={onClose} className="px-3 py-1.5 rounded border hover:bg-slate-50">
            Close
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-160px)]">
          {/* Release Dates */}
          <section>
            <h3 className="text-sm font-semibold mb-3">Release Dates</h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm text-slate-700">
                From
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </label>

              <label className="text-sm text-slate-700">
                To
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </label>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Dates use TMDB’s expected format (YYYY-MM-DD).
            </p>
          </section>

          {/* Genres */}
          <section>
            <h3 className="text-sm font-semibold mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => {
                const active = genres.includes(g.id);
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => toggleGenre(g.id)}
                    className={[
                      "px-3 py-1.5 rounded-full border border-slate-300 text-sm",
                      active ? "bg-slate-700 text-white border-slate-900" : "hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Language */}
          <section>
            <h3 className="text-sm font-semibold mb-3">Language</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            >
              <option value="en-GB">English (UK)</option>
              <option value="en-US">English (US)</option>
              <option value="fr-FR">French</option>
              <option value="es-ES">Spanish</option>
              <option value="de-DE">German</option>
              <option value="it-IT">Italian</option>
            </select>
          </section>
        </div>

        {/* Footer actions */}
        <div className="px-8 pt-8 border-t border-slate-400 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={clearFiltersOnly}
            className="px-4 py-2 rounded-lg border hover:bg-slate-50"
          >
            Clear filters
          </button>

          <button
            type="button"
            onClick={apply}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
          >
            Apply
          </button>
        </div>
      </aside>
    </div>
  );
}
