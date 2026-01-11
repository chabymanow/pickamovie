import FiltersBar from "./_components/FiltersBar";
import { parseSearchParams } from "@/lib/search/parseSearchParams";
import { searchTmdb } from "@/lib/search/searchService";
import Link from "next/link";
import MovieList from "./_components/MovieList";
import SeriesList from "./_components/SeriesList";
import PersonList from "./_components/PersonList";

export const metadata = {
  title: "Search",
};

export default async function SearchPage({ searchParams }) {
  // Next.js (newer versions): searchParams is async
  const resolvedSearchParams = await searchParams;

  const parsed = parseSearchParams(resolvedSearchParams);

  const data = await searchTmdb(parsed, {
    revalidate: 60, // short revalidation strategy
  });
  const movies = (data?.results ?? []).filter(m => m.mediaType === "movie");
  const series = (data?.results ?? []).filter(m => m.mediaType === "tv");
  const people = (data?.results ?? []).filter(m => m.mediaType === "person");
  console.log(people)

  const qs = new URLSearchParams(
    Object.entries(resolvedSearchParams ?? {})
  ).toString();

  return (
    <section className="w-11/12 max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Search</h1>

      <FiltersBar />

      {!parsed.q && (
        <p className="text-slate-600">
          Use the search box above, or open Filters to browse.
        </p>
      )}

      {parsed.q && data.results.length === 0 && (
        <p className="text-slate-600">
          No results found for <strong>{parsed.q}</strong>
        </p>
      )}

      {data.results.length > 0 && (
        <>
          <p className="text-sm text-slate-500 mb-4">
            {data.totalResults} results • Page {data.page} of {data.totalPages}
          </p>

        {movies.length !== 0 ? (
          <>
          <MovieList movie_list={movies} />
          <hr className="w-full bg-slate-500 border-slate-500 my-5" />
          </>
        ):null}

        {series.length !== 0 ? (
          <>
            <SeriesList series_list={series} />
            <hr className="w-full bg-slate-500 border-slate-500 my-5" />
                    </>
        ):null}

        {people.length !== 0 ? (
          <>
            <PersonList person_list={people} />
          </>
        ):null}
        </>
      )}
    </section>
  );
}
