export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-GB&page=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
