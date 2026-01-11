export function mapTmdbResults(raw, endpointType = "multi") {
  const results = Array.isArray(raw?.results) ? raw.results : [];

  const injectType =
    endpointType === "movie" || endpointType === "tv" || endpointType === "person"
      ? endpointType
      : undefined;

      console.log(results)
  return {
    page: raw?.page ?? 1,
    totalPages: raw?.total_pages ?? 1,
    totalResults: raw?.total_results ?? results.length,
    results: results.map((r) => ({
      id: r.id,
      mediaType: r.media_type ?? injectType, // <-- FIX
      title: r.title ?? r.name ?? "",
      originalTitle: r.original_title ?? r.original_name ?? "",
      name: r.name ?? "",
      overview: r.overview ?? "",
      posterPath: r.poster_path ?? null,
      backdropPath: r.backdrop_path ?? null,
      profile_path: r.profile_path ?? null,
      known_for_department: r.known_for_department ?? null,
      know_for: r.know_for ?? null,
      releaseDate: r.release_date ?? r.first_air_date ?? null,
      voteAverage: typeof r.vote_average === "number" ? r.vote_average : null,
      popularity: typeof r.popularity === "number" ? r.popularity : null,
      genreIds: Array.isArray(r.genre_ids) ? r.genre_ids : [],
    })),
  };
}
