export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  const { type } = await params; // in your setup params may be a Promise

  const allowed = new Set(["popular", "top_rated", "on_the_air", "airing_today"]);
  if (!allowed.has(type)) {
    return Response.json({ error: "Invalid type" }, { status: 400 });
  }

  const url = `https://api.themoviedb.org/3/tv/${type}?language=en-GB&page=${page}`;
  console.log(url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    // optional: you can cache for a short time
    // next: { revalidate: 60 },
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
