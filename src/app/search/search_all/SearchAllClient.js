"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchAllClient() {
  const sp = useSearchParams();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(Number(sp.get("page") ?? 1));
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const CATEGORY_ROUTE_MAP = {
    movie: "moviepage",
    tv: "series/viewDetails",
    person: "people/persondetails",
  };

  const category = sp.get("category"); // or sp.get("category")
  const basePath = CATEGORY_ROUTE_MAP[category];

const baseQuery = useMemo(() => {
  const params = new URLSearchParams();

  const category = sp.get("category") ?? "movie"; // movie | tv | person
  params.set("category", category);

  const q = sp.get("q");
  if (q) params.set("q", q);

  const language = sp.get("language");
  if (language) params.set("language", language);

  const includeAdult = sp.get("includeAdult");
  if (includeAdult !== null) params.set("includeAdult", includeAdult);

  return params.toString();
}, [sp]);

  async function fetchPage(p) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/search_all?${baseQuery}&page=${p}`);
      if (!res.ok) throw new Error(`Search API error ${res.status}`);
      const data = await res.json();
      setItems((prev) => (p === 1 ? data.results ?? [] : [...prev, ...(data.results ?? [])]));
      setPage(data.page ?? p);
      setTotalPages(data.totalPages ?? null);
    } catch (e) {
      setError(e?.message ?? "Failed to load results");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseQuery]);

  const canLoadMore = totalPages === null ? true : page < totalPages;

  return (
    <section className="w-10/12 mx-auto max-w-600">
      <h1 className="mb-8 text-3xl font-extrabold leading-tight text-black sm:text-2xl">
        {category.toUpperCase()}
      </h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-auto">
        {items.map((item) => (
          <Link key={`item-${item.id}`} href={`/${basePath}/${item.id}`} className="block w-full text-sm font-semibold">
            {/* your card UI */}
            <div className="group w-full aspect-2/3 flex flex-col rounded-xl relative overflow-hidden shadow-slate-400 hover:shadow-2xl hover:shadow-gray-500">
              <img
                src={
                  item.posterPath
                    ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
                    : "/assets/images/no_image.png"
                }
                alt={item.title || "Untitled"}
                className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gray-600/25 backdrop-blur-sm">
                <div className="w-full h-full p-2">
                  <p className="text-md font-semibold text-white line-clamp-2">
                    {item.title || "Untitled"}
                  </p>
                  {item.releaseDate && (
                    <p className="text-xs text-white mt-1">
                      {new Date(item.releaseDate).toLocaleDateString("en-GB")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="w-full flex justify-center mt-8 mb-20">

        <button
          onClick={() => fetchPage(page + 1)}
          disabled={!canLoadMore || loading}
          className="px-4 py-2 rounded bg-slate-900 text-white disabled:opacity-50 hover:cursor-pointer"
        >
          {loading ? "Loading..." : canLoadMore ? "Load more" : "No more results"}
        </button>
      </div>
    </section>
  );
}
