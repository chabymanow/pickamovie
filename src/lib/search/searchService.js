// src/lib/search/searchService.js

import { fetchTmdb } from "@/lib/http/fetchTmdb";
import { SEARCH_TYPES } from "./searchTypes";
import { mapTmdbResults } from "./mapTmdbResults";

function getSearchPath(type) {
  switch (type) {
    case SEARCH_TYPES.MOVIE:
      return "/search/movie";
    case SEARCH_TYPES.TV:
      return "/search/tv";
    case SEARCH_TYPES.PERSON:
      return "/search/person";
    case SEARCH_TYPES.MULTI:
    default:
      return "/search/multi";
  }
}

function hasActiveFilters({ genre, from, to }) {
  return (Array.isArray(genre) && genre.length > 0) || !!from || !!to;
}

function dateInRange(dateStr, from, to) {
  if (!dateStr) return false; // if filtering by date, items without dates should not pass
  // ISO date compares lexicographically correctly (YYYY-MM-DD)
  if (from && dateStr < from) return false;
  if (to && dateStr > to) return false;
  return true;
}

/**
 * Genre AND logic:
 * - resultGenres must contain every selected genre id
 */
function matchesGenreAnd(resultGenreIds, selectedGenreStrings) {
  if (!selectedGenreStrings || selectedGenreStrings.length === 0) return true;
  if (!Array.isArray(resultGenreIds) || resultGenreIds.length === 0) return false;

  const set = new Set(resultGenreIds.map((n) => String(n)));
  return selectedGenreStrings.every((g) => set.has(String(g)));
}

function postFilterResults(items, { genre, from, to, type }) {
  const filtersOn = hasActiveFilters({ genre, from, to });

  return items.filter((r) => {
    const mediaType = r.media_type;

    // If filters are active and we are in multi mode, we cannot meaningfully filter people.
    // So we exclude person results when genre/date filters exist.
    if (filtersOn && type === SEARCH_TYPES.MULTI && mediaType === "person") return false;

    // Apply genre filter only to movie/tv
    if (genre?.length) {
      if (mediaType !== "movie" && mediaType !== "tv") return false;
      if (!matchesGenreAnd(r.genre_ids, genre)) return false;
    }

    // Apply date filter only to movie/tv
    if (from || to) {
      if (mediaType === "movie") {
        if (!dateInRange(r.release_date, from, to)) return false;
      } else if (mediaType === "tv") {
        if (!dateInRange(r.first_air_date, from, to)) return false;
      } else {
        return false;
      }
    }

    return true;
  });
}

async function discoverMovies({ page, language, includeAdult, genre, from, to }, revalidate) {
  return fetchTmdb("/discover/movie", {
    revalidate,
    params: {
      page,
      language,
      include_adult: includeAdult,
      // TMDB Discover: comma-separated with_genres is AND :contentReference[oaicite:3]{index=3}
      with_genres: genre?.length ? genre.join(",") : undefined,
      // Movie release date filters :contentReference[oaicite:4]{index=4}
      "primary_release_date.gte": from || undefined,
      "primary_release_date.lte": to || undefined,
      sort_by: "popularity.desc",
    },
  });
}

async function discoverTv({ page, language, includeAdult, genre, from, to }, revalidate) {
  return fetchTmdb("/discover/tv", {
    revalidate,
    params: {
      page,
      language,
      include_adult: includeAdult,
      with_genres: genre?.length ? genre.join(",") : undefined,
      // TV first air date filters :contentReference[oaicite:5]{index=5}
      "first_air_date.gte": from || undefined,
      "first_air_date.lte": to || undefined,
      sort_by: "popularity.desc",
    },
  });
}

function injectMediaType(raw, mediaType) {
  if (!raw || !Array.isArray(raw.results)) return raw;
  return {
    ...raw,
    results: raw.results.map((r) => ({ ...r, media_type: mediaType })),
  };
}

/**
 * Performs a TMDB search with short revalidation.
 *
 * Behaviour:
 * - If q exists: use /search/* and post-filter (genre AND + date range).
 * - If q is empty but filters exist: use /discover/movie|tv and merge if needed.
 * - If q empty and no filters: return empty (no browse mode yet).
 */
export async function searchTmdb(input, options = {}) {
  const revalidate = options.revalidate ?? 60;

  const { q, type, page, includeAdult, language, genre, from, to } = input;
  const filtersOn = hasActiveFilters({ genre, from, to });

  // 1) Text search path (q exists): use Search endpoints, then post-filter server-side.
    if (q) {
    const raw = await fetchTmdb(getSearchPath(type), {
        revalidate,
        params: {
        query: q,
        page,
        include_adult: includeAdult,
        language,
        },
    });

    // No filters: return raw TMDB pagination + totals (do NOT overwrite totals)
    if (!filtersOn) {
        return mapTmdbResults(raw, type ?? "multi");
    }

    // Filters ON: Apply filters server-side (Search endpoints do not support discover-style filters)
    const filteredResults = postFilterResults(raw?.results ?? [], { genre, from, to, type });

    // For filtered search, totals from TMDB are no longer valid.
    // We return filtered page results and a "best effort" total for this page.
    // Later, "load more" (or multi-page fill) can improve this.
    return mapTmdbResults({
        ...raw,
        results: filteredResults,
        total_results: filteredResults.length,
        // total_pages remains from TMDB search; it is not accurate under filtering, but acceptable for now.
    });
    }

  // 2) No q: if filters exist, use Discover endpoints (native filtering)
  if (filtersOn) {
    if (type === SEARCH_TYPES.MOVIE) {
      const rawMovie = await discoverMovies({ page, language, includeAdult, genre, from, to }, revalidate);
      return mapTmdbResults(injectMediaType(rawMovie, "movie"));
    }

    if (type === SEARCH_TYPES.TV) {
      const rawTv = await discoverTv({ page, language, includeAdult, genre, from, to }, revalidate);
      return mapTmdbResults(injectMediaType(rawTv, "tv"));
    }

    // type === multi: discover both and merge
    const [rawMovie, rawTv] = await Promise.all([
      discoverMovies({ page, language, includeAdult, genre, from, to }, revalidate),
      discoverTv({ page, language, includeAdult, genre, from, to }, revalidate),
    ]);

    const movie = injectMediaType(rawMovie, "movie");
    const tv = injectMediaType(rawTv, "tv");

    const merged = [...(movie.results ?? []), ...(tv.results ?? [])].sort(
      (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
    );

    // Note: merged totals are approximate; TMDB returns totals per endpoint.
    return mapTmdbResults({
      page,
      total_pages: Math.max(movie.total_pages ?? 1, tv.total_pages ?? 1),
      total_results: (movie.total_results ?? 0) + (tv.total_results ?? 0),
      results: merged,
    });
  }

  // 3) No q and no filters: return empty (you can later add a "Trending" or "Popular" browse mode)
  return {
    page: 1,
    totalPages: 1,
    totalResults: 0,
    results: [],
  };
}
