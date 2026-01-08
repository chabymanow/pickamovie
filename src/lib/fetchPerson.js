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
  console.log("TMDB person fetch:", { id, status: res.status, ok: res.ok, url });

  if (res.status === 404) return null;

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch person. Id: ${id} Status: ${res.status} Body: ${body.slice(0, 200)}`
    );
  }

  return res.json();
}