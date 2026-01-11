export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.trim();
  const page = searchParams.get("page") ?? "1";
  const language = searchParams.get("language") ?? "en-GB";
  const includeAdult = searchParams.get("includeAdult") ?? "false";

  const category = searchParams.get("category") ?? "movie"; // movie | tv | person

  const tmdbPath =
    category === "movie" ? "movie" :
    category === "tv" ? "tv" :
    category === "person" ? "person" :
    null;

  if (!tmdbPath) {
    return Response.json(
      { error: "Invalid category. Use movie|tv|person." },
      { status: 400 }
    );
  }

  let url;

  if (q) {
    const tmdbParams = new URLSearchParams({
      query: q,
      page,
      language,
      include_adult: includeAdult,
    });

    // ✅ use tmdbPath instead of hard-coded "movie"
    url = `https://api.themoviedb.org/3/search/${tmdbPath}?${tmdbParams.toString()}`;
  } else {
    // Fallback should depend on category too
    const tmdbParams = new URLSearchParams({ page, language });

    if (category === "movie") {
      url = `https://api.themoviedb.org/3/movie/popular?${tmdbParams.toString()}`;
    } else if (category === "tv") {
      url = `https://api.themoviedb.org/3/tv/popular?${tmdbParams.toString()}`;
    } else {
      // TMDb doesn't have "popular people" exactly like movie/tv popular,
      // but it does have /person/popular.
      url = `https://api.themoviedb.org/3/person/popular?${tmdbParams.toString()}`;
    }
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();

  const results = (data.results ?? []).map((r) => {
    if (category === "movie") {
      return {
        id: r.id,
        mediaType: "movie",
        title: r.title ?? r.original_title ?? "",
        posterPath: r.poster_path ?? null,
        releaseDate: r.release_date ?? null,
      };
    }

    if (category === "tv") {
      return {
        id: r.id,
        mediaType: "tv",
        title: r.name ?? r.original_name ?? "",
        posterPath: r.poster_path ?? null,
        releaseDate: r.first_air_date ?? null,
      };
    }

    // person
    return {
      id: r.id,
      mediaType: "person",
      title: r.name ?? "",
      posterPath: r.profile_path ?? null,
      releaseDate: null,
    };
  });

  return Response.json(
    {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results,
    },
    { status: res.status }
  );
}
