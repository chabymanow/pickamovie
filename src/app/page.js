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

  const genre_res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en'", {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
      },
      });
      
  if (!genre_res.ok) {
      throw new Error("Failed to fetch genre list");
  }
   

  const movies_data = await res.json();
  const header_movie = movies_data.results.slice(0, 1);
  const popular_data = await popular_res.json();
  const genre_list = await genre_res.json();

  return (
    
      <main className="flex flex-col items-start justify-start min-h-screen w-screen sm:items-start bg-myWhite">
        <HomeHeader movie_discover={header_movie} />
        <section className="w-screen max-w-500 mx-auto mt-2 p-10 bg-myWhite text-center">
          
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

            <div className="w-full md:w-11/12 xl:w-8/12 mx-auto flex flex-row justify-center lg:justify-around items-center gap-5 flex-wrap mt-10 mb-15">
              <Link href="/popular">
                <button className="group relative inline-flex h-14 items-center justify-center rounded-full bg-sky-900 py-1 pl-6 pr-14 font-medium text-neutral-50 cursor-pointer shadow-md shadow-slate-500 whitespace-nowrap min-w-72">
                  <span className="z-10 pr-2">Check the popular movies</span>
                  <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-sky-600 transition-[width] group-hover:w-[calc(100%-8px)]">
                    <div className="mr-3.5 flex items-center justify-center">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </Link>
              <Link href="/upcoming">
                <button className="group relative inline-flex h-14 items-center justify-center rounded-full bg-orange-700 py-1 pl-6 pr-14 font-medium text-neutral-50 cursor-pointer shadow-md shadow-slate-500 whitespace-nowrap">
                  <span className="z-10 pr-2">Check the upcoming movies</span>
                  <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-orange-500 transition-[width] group-hover:w-[calc(100%-8px)]">
                    <div className="mr-3.5 flex items-center justify-center">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
        </section>

        <section className="w-full md:w-11/12 xl:w-10/12 max-w-450 mx-auto mb-20 p-2 md:p-5 lg:p-10">
        <h2 className="text-3xl font-bold mt-8 mb-10 text-myGray">Choose A Genre</h2>
          <div className="w-full flex flex-row justify-around items-center gap-4 flex-wrap">
            {genre_list.genres.map((genre) => (
              <Link key={genre.id} href={`/genre/${genre.id}`} 
                className="w-44 py-1 px-3 text-center whitespace-nowrap bg-linear-to-b from-green-500 to-green-700 rounded-2xl text-lg text-white font-semibold shadow-md shadow-slate-500 mb-3">
                #{genre.name}
              </Link>
            ))}
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
