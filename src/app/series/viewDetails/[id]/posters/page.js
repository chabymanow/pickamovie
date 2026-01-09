import PostersView from "./PostersView";
import Link from "next/link";

export default async function PostersPage({ params }) {
  const { id } = await params; 

  const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

  const images_res = await fetch(`https://api.themoviedb.org/3/tv/${id}/images`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  const movie = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  if (!images_res.ok) {
    throw new Error(`Failed to fetch movie images. Id: ${id} Status: ${images_res.status}`);
  }

  const movie_images = await images_res.json();
  const movie_data = await movie.json();

  return (
    <div>
      <div className="mt-5 w-full h-16 px-10 bg-cyan-700 flex flex-row justify-between items-center text-white">
            <h1 className="text-3xl font-semibold">{movie_data.original_name}</h1>
          <Link href={`/moviepage/${id}`} className="mr-10 py-2 px-8 rounded-2xl text-md font-light w-fit bg-slate-600 shadow-md shadow-slate-500 hover:bg-slate-400 hover:shadow-sm">
              Back to the movie
          </Link>
      </div>
      <div className="p-10">
        <PostersView posters={movie_images.posters ?? []} />
      </div>
    </div>
  );
}
