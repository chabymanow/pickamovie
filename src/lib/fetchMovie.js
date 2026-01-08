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
