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
            <main className="flex min-h-screen w-full flex-col items-center justify-between py-2 px-16 sm:items-start">
                <h1 className="mb-8 text-3xl font-extrabold leading-tight text-blacksm:text-2xl">
                    Popular movies
                </h1>
                <div className="w-full flex flex-row flex-wrap gap-5 justify-center lg:justify-start">
                    {movies_data.results.map((movie) => (
                        <Link key={movie.id} href={`/moviepage/${movie.id}`} className="text-sm font-semibold">
                        <div className="group w-56 h-100 md:max-w-52 md:flex-4/12 lg:flex-2/12 rounded relative overflow-hidden shadow-gray-400 shadow-md">
                            <div className="w-full h-72 relative mb-2">
                                <Image
                                    src={`https:${movie.poster_path ? `//image.tmdb.org/t/p/w500${movie.poster_path}` : '/asstes/images/no_image.png'}`}
                                    alt="Weather Icon"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 200px"
                                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 hover:shadow-md hover:shadow-slate-700"
                                />
                            </div>

                            <div className="w-10 h-10 flex flex-col justify-center items-center rounded-4xl p-2 text-white bg-slate-900 border-2 border-orange-500 text-sm absolute top-2 right-2 font-mono font-bold shadow-black shadow-md">
                                {Math.round(movie.vote_average * 10) / 1}%
                            </div>
                            <div className="px-2 mt-5">
                                
                                    {movie.title}
                                
                                <p className="text-sm">Release Date: {new Date(movie.release_date).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric",})}</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}