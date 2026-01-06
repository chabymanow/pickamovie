import Image from "next/image";
import HomeHeader from "./homeComponents/HomeHeader";
import Link from "next/link";

export default async function Home() {
  const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
  const res = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
      },
      });
      
  if (!res.ok) {
      throw new Error("Failed to fetch discover movies");
  }

  const popular_res = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'", {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
      },
      });
      
  if (!popular_res.ok) {
      throw new Error("Failed to fetch popular movies");
  }
   

  const movies_data = await res.json();
  const header_movie = movies_data.results.slice(0, 1);
  const popular_data = await popular_res.json();

  return (
      <main className="flex flex-col items-start justify-start min-h-screen w-screen sm:items-start bg-myWhite">
        <HomeHeader movie_discover={header_movie} />
        <section className="w-screen mt-2 p-10 bg-myWhite text-center">
          
            <span className="block text-lg md:text-2xl lg:text-3xl font-bold mb-3">Choosing a movie shouldn’t feel like work.</span>
            <p className="text-md md:text-2xl lg:text-3xl">
              No algorithms pushing you around — just movies, clearly presented, so you can choose and press play.
            </p>
            <p className="text-sm lg:text-lg max-w-3xl mx-auto mt-5">
              This catalogue is here to make picking something to watch quick and easy, without endless scrolling or confusing recommendations.
              It uses movie data from 
              <a className="underline font-bold text-slate-800 mx-2" href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a>
              and keeps things simple, so you can focus on discovering a good film and getting straight to watching it.
            </p>
          
          
          <div className="w-12/12 md:w-8/12 mx-auto flex flex-row justify-around items-center flex-wrap gap-15 lg:gap-10 mt-20">
            <div className="relative w-full lg:w-96 h-52 p-6 rounded-2xl border border-blue-500 rounded-base text-white flex flex-col justify-center items-center shadow-lg shadow-slate-600 bg-linear-to-b from-slate-500 to-slate-800">
                <div className="absolute -top-10 w-18 h-18 bg-slate-100 border border-slate-700 rounded-full flex flex-row justify-center items-center shadow-md shadow-slate-700">
                  <img src="/assets/images/database.svg" alt="Calendar" className="w-15 h-15" />
                </div>
                <h5 className="mt-2 mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Data source: TMDB</h5>
                <p>Millions of movies, TV shows and people to discover. Explore now.</p>
                <a className="w-fit h-fit px-4 py-2 bg-blue-600 rounded-full font-bold text-slate-300 mt-5 cursor-pointer" href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database</a>
            </div>

            <div className="relative w-full lg:w-96 h-52 p-6 rounded-2xl border border-blue-500 rounded-base text-white flex flex-col justify-center items-center shadow-lg shadow-slate-600 bg-linear-to-b from-slate-500 to-slate-800">
                <div className="absolute -top-10 w-18 h-18 bg-slate-100 border border-slate-700 rounded-full flex flex-row justify-center items-center shadow-md shadow-slate-700">
                  <img src="/assets/images/movie-ticket.svg" alt="Calendar" className="w-12 h-12" />
                </div>
                <h5 className="mt-2 mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">TMDB is a widely used</h5>
                <p>Community-driven movie and TV database used by many apps and services.</p>
            </div>

            <div className="relative w-full lg:w-96 h-52 p-6 rounded-2xl border border-blue-500 rounded-base text-white flex flex-col justify-center items-center shadow-lg shadow-slate-600 bg-linear-to-b from-slate-500 to-slate-800">
                <div className="absolute -top-10 w-18 h-18 bg-slate-100 border border-slate-700 rounded-full flex flex-row justify-center items-center shadow-md shadow-slate-700">
                  <img src="/assets/images/movie.svg" alt="Calendar" className="w-15 h-15" />
                </div>
                <h5 className="mt-2 mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">No movie here!</h5>
                <p>This site does not host or stream movies — it only displays metadata for discovery purposes.</p>
            </div>
          </div>
        </section>

        <section className="w-screen bg-myBlue h-fit p-2 md:p-5 lg:p-10 mt-5">
          <h2 className="text-3xl font-bold mt-8 mb-4 text-myWhite">Discover Movies</h2>
          <div className="w-full flex py-5 gap-6 inset-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-2xl p-10 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
            {movies_data.results.map((movie) => (
              <div key={movie.id} className="relative shrink-0 w-36 sm:w-40 md:w-48">
                  <Link href={`/moviepage/${movie.id}`} className="group block">
                      <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative aspect-2/3 overflow-hidden">
                              <Image
                              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/assets/images/no_image.png"}
                              alt={movie.original_title}
                              fill
                              sizes="192px"
                              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                              />
                          </div>
                      </div>
                     
                        <div className="absolute top-2 right-2 w-10 h-10 flex flex-col justify-center items-center rounded-4xl p-2 text-white bg-slate-900 border-2 border-orange-500 text-sm font-mono font-bold shadow-black shadow-md">
                            {Math.round(movie.vote_average * 10) / 1}%
                        </div>
                        <div className="relative">
                        <p className="mt-2 mb-3 text-lg font-medium text-myWhite line-clamp-1">
                            {movie.original_title}
                        </p>
                        
                      </div>
                  </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="w-screen bg-myWhite h-fit p-2 md:p-5 lg:p-10 mt-5">
          <h2 className="text-3xl font-bold mt-8 mb-4 text-Gray">Top Rated Movies</h2>
          <div className="w-full flex py-5 gap-6 inset-shadow-[0_35px_35px_rgba(0,0,0,0.05)] rounded-2xl p-10 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
            {popular_data.results.map((movie) => (
              <div key={movie.id} className="relative shrink-0 w-36 sm:w-40 md:w-48">
                  <Link href={`/moviepage/${movie.id}`} className="group block">
                      <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative aspect-2/3 overflow-hidden">
                              <Image
                              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/assets/images/no_image.png"}
                              alt={movie.original_title}
                              fill
                              sizes="192px"
                              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                              />
                          </div>
                      </div>
                      <div className="absolute top-2 right-2 w-10 h-10 flex flex-col justify-center items-center rounded-4xl p-2 text-white bg-slate-900 border-2 border-orange-500 text-sm font-mono font-bold shadow-black shadow-md">
                            {Math.round(movie.vote_average * 10) / 1}%
                        </div>
                      <p className="mt-2 mb-3 text-sm font-medium text-slate-900 line-clamp-1">
                          {movie.original_title}
                      </p>
                  </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
  );
}
