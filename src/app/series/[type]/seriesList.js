"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SeriesList({ type }) {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inFlight = useRef(false);

    const SERIES_TITLES = {
      popular: "Popular Series",
      top_rated: "Top Rated Series",
      airing_today: "Airing Today",
      on_the_air: "Currently Airing Series",
    };

    const fetchPage = useCallback(
      async (p) => {
        if (!type || inFlight.current) return;
        inFlight.current = true;
        if (!type) return;

        setLoading(true);
        setError("");

        try {
          const res = await fetch(`/api/series/${type}?page=${p}`);
          if (!res.ok) throw new Error(`TMDb error ${res.status}`);

          const data = await res.json();

          setSeries((prev) => {
            const next = p === 1 ? data.results : [...prev, ...data.results];
            const seen = new Set();
            return next.filter((item) => item?.id && !seen.has(item.id) && seen.add(item.id));
          });
          setPage(data.page);
          setTotalPages(data.total_pages);
        } catch (e) {
          setError(e?.message ?? "Failed to load series");
        } finally {
          setLoading(false);
          inFlight.current = false;
        }
      }, [type]);

    // Reset + load first page when type changes
    useEffect(() => {
      setSeries([]);
      setPage(1);
      setTotalPages(null);
      setError("");
      fetchPage(1);
    }, [type, fetchPage]);

    const canLoadMore = totalPages === null ? true : page < totalPages;

 return (
    <div className="min-h-screen">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-2 px-8 sm:items-start">
        <h1 className="mb-8 text-3xl font-extrabold leading-tight text-black sm:text-2xl">
          {SERIES_TITLES[type] ?? "Series"}
        </h1>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-400 mx-auto">
          {series.map((s, idx) => (
            <Link
              key={s.id}
              href={`./viewDetails/${s.id}`}
              className="block w-full text-sm font-semibold"
            >
            <div className="group w-full aspect-2/3 flex flex-col rounded-xl relative overflow-hidden shadow-gray-400 shadow-md hover:shadow-sm hover:shadow-gray-700 transition-transform duration-600 ease-out">
              <div className="w-full h-72 relative mb-2 flex-1">
                  <img src={ s.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${s.poster_path}` 
                    : "/assets/images/no_image.png"
                  }
                    alt={series.original_name ?? "Series poster"}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 h-20 bg-gray-600/25 backdrop-blur-sm">
                <div className="w-full h-full p-2 text-white">
                <div className="px-2 pb-3 pt-3">
                  <p className="text-md font-semibold">{s.original_name}</p>
                  <p className="text-sm font-light">
                    First Air Date:{" "}
                    {s.first_air_date
                      ? new Date(s.first_air_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                </div>
              </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full flex justify-center mt-8">
          <button
            type="button"
            disabled={!canLoadMore || loading}
            onClick={() => fetchPage(page + 1)}
            className="px-4 py-2 rounded bg-slate-900 text-white disabled:opacity-50"
          >
            {loading ? "Loading..." : canLoadMore ? "Load more" : "No more pages"}
          </button>
        </div>
      </main>
    </div>
  );
}