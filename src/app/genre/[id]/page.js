import ByGenreClient from "./ByGenreClient";

export default async function Page({ params }) {
  const { id } = await params; // params is a Promise in your setup
    const genre_res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en'", {
      headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
      },
      });
      
  if (!genre_res.ok) {
      throw new Error("Failed to fetch genre list");
  }

  const genre_list = await genre_res.json();
  const genre = genre_list.genres.find(g => { return g.id === Number(id)});

  return <ByGenreClient genreId={id} genreName={genre.name}/>;
}