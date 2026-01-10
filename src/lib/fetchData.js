export async function fetchMovie(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos,images,reviews,external_ids,recommendations`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch movie. Id: ${id} Status: ${res.status} Body: ${body.slice(0, 200)}`
    );
  }

  return res.json();
}

export async function fetchPerson(id) {
  const url = `https://api.themoviedb.org/3/person/${id}?append_to_response=combined_credits,images,external_ids&language=en-US`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  // Log exactly what’s happening

  if (res.status === 404) return null;

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch person. Id: ${id} Status: ${res.status} Body: ${body.slice(0, 200)}`
    );
  }

  return res.json();
}

export async function fetchSeries(id) {
  const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,videos,images,reviews,external_ids,recommendations`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch series. Id: ${id} Status: ${res.status} Body: ${body.slice(0, 200)}`
    );
  }

  return res.json();
}

export async function fetchSeason(series_id, season_id) {
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_id}?append_to_response=credits,videos,images,reviews,external_ids,recommendations`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch series. Id: ${id} Status: ${res.status} Body: ${body.slice(0, 200)}`
    );
  }

  return res.json();
}