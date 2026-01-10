"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function PopularPeople() {
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inFlight = useRef(false);

    async function fetchPage(p) {
        if (inFlight.current) return;        // hard stop
        inFlight.current = true;
        setLoading(true);
        setError("");

        try {
          const res = await fetch(`/api/people/popular?page=${p}`);
          if (!res.ok) throw new Error(`TMDB error ${res.status}`);
          const data = await res.json();

          setPeople((prev) => {
            // de-dupe by id while merging
            const map = new Map(prev.map((x) => [x.id, x]));
            for (const x of data.results ?? []) map.set(x.id, x);
            return Array.from(map.values());
          });
          setPage(data.page);
          setTotalPages(data.total_pages);
        } catch (e) {
          setError(e?.message ?? "Failed to load movies");
        } finally {
          setLoading(false);
          inFlight.current = false;
        }
    }

      useEffect(() => {
          fetchPage(1);
      }, []);

    const canLoadMore = totalPages === null ? true : page < totalPages;

    return (
        <div className="min-h-screen mb-30">
            <main className="flex min-h-screen w-full flex-col items-center justify-between py-2 px-8 sm:items-start">
                <h1 className="mb-8 text-3xl font-extrabold leading-tight text-blacksm:text-2xl">
                    Popular People
                </h1>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-400 mx-auto">
          {people.map((person) => (
            <Link key={person.id} href={`./persondetails/${person.id}`} className="block w-full sm:max-w-full md:w-60 lg:w-64 text-sm font-semibold" >
            <div className="group w-full h-115 flex flex-col rounded-2xl relative overflow-hidden shadow-gray-400 shadow-md hover:shadow-sm hover:shadow-gray-700 transition-transform duration-600 ease-out">
              <div className="w-full h-72 relative flex-1">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "/assets/images/no_profile.png"
                  }
                  alt={person.original_name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 208px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
          
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%]
                      bg-white/30 backdrop-blur-2xl mask-[linear-gradient(to_top,black_10%,black_30%,transparent_100%)]
                      [-webkit-mask-image:linear-gradient(to_top,black_10%,black_30%,transparent_100%)]" ></div>
              </div>

              <div className="absolute bottom-7 left-3 px-2 py-4 h-14 z-20 text-white">
                <p className="text-lg font-semibold">{person.name}</p>
                <p className="text-sm font-light text-white/80">
                  Original Name: {person.original_name}
                </p>
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