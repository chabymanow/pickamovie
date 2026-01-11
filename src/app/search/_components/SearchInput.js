// src/app/search/_components/SearchInput.js
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQ = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
  const initialType = useMemo(() => searchParams.get("type") ?? "multi", [searchParams]);

  const [q, setQ] = useState(initialQ);
  const [type, setType] = useState(initialType);

  const onSubmit = (e) => {
    e.preventDefault();

    const nextQ = q.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (!nextQ) {
      // If empty, go back to /search with no params
      router.push("/search");
      return;
    }

    params.set("q", nextQ);
    params.set("type", type);
    params.set("page", "1"); // reset pagination on new search

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col md:flex-row gap-3 mb-6">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies, TV series, or people..."
        className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-slate-400"
        aria-label="Search query"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
        aria-label="Search type"
      >
        <option value="multi">All</option>
        <option value="movie">Movies</option>
        <option value="tv">TV</option>
        <option value="person">People</option>
      </select>

      <button
        type="submit"
        className="px-5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
      >
        Search
      </button>
    </form>
  );
}
