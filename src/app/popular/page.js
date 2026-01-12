import Image from "next/image";
import Link from "next/link";

export default async function Popular() {
    const API_KEY = process.env.TMDB_API_KEY;
    const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
    const URL = "https://api.themoviedb.org/3/movie/popular";
    const res = await fetch(URL, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        });
        
    if (!res.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    const movies_data = await res.json();
    return (
        <div className="min-h-screen">
            <main className="flex min-h-screen w-full flex-col items-center justify-between py-2 px-8 sm:items-start">
                <h1 className="mb-8 text-3xl font-extrabold leading-tight text-blacksm:text-2xl">
                    Popular movies
                </h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-400 mx-auto">
          {movies_data.results.map((movie) => (
            <Link
            key={movie.id}
            href={`/moviepage/${movie.id}`}
            className="block w-full sm:max-w-full md:w-60 lg:w-72 text-sm font-semibold"
          >
            <div className="group w-full aspect-2/3 flex flex-col rounded-xl relative overflow-hidden shadow-gray-400 shadow-md hover:shadow-sm hover:shadow-gray-700 transition-transform duration-600 ease-out">
              <div className="w-full h-72 relative mb-2 flex-1">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/assets/images/no_image.png"
                  }
                  alt={movie.title}
                  className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-20 h-20 bg-gray-600/25 backdrop-blur-sm">
                <div className="w-full h-full p-4 text-white">
                  <p className="text-md font-semibold">{movie.title}</p>
                  <p className="text-sm font-light">
                    Release Date:{" "}
                    {new Date(movie.release_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          ))}
        </div>
            </main>
        </div>
    );
}