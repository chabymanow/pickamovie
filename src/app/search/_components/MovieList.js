"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation";

export default function MovieList({ movie_list }){
    const sp = useSearchParams();
    const qs = sp.toString();

    const params = new URLSearchParams(qs); // qs from original URL query string
    params.set("category", "movie");        // movie | tv | person
    params.delete("type");   
    
    return(
          <section>
            <div className="w-full flex flex-row justify-start items-center gap-5 mb-5">
                    <h1 className="text-3xl font-extrabold leading-tight text-blacksm:text-2xl">
                        Movies
                    </h1>
                    <Link href={`/search/search_all?${params.toString()}`} className="group relative inline-flex h-fit items-center justify-center overflow-hidden rounded-md bg-orange-500 hover:bg-orange-600 px-5 py-1 font-medium text-neutral-200 shadow-md shadow-slate-400">
                        <span className="mr-5">See all...</span>
                        <div class="ml-1 transition duration-300 group-hover:rotate-[360deg]">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" clipRule="evenodd" clipPath="evenodd">
                            </path>
                            </svg>
                        </div>
                    </Link>
                </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-auto">
            {movie_list.map((item) => (
              <Link key={`${item.mediaType ?? "unknown"}-${item.id}`} href={`/moviepage/${item.id}`} className="block w-full">
              <div className="group w-full aspect-2/3 flex flex-col rounded-xl relative overflow-hidden shadow-slate-400 hover:shadow-2xl hover:shadow-gray-500">
                <img
                  src={
                    item.posterPath
                      ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
                      : "/assets/images/no_image.png"
                  }
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gray-600/25 backdrop-blur-sm">
                  <div className="w-full h-full p-2">
                    <p className="text-md font-semibold text-white line-clamp-2">
                      {item.title || "Untitled"}
                    </p>

                    {item.releaseDate && (
                      <p className="text-xs text-white mt-1">
                        {item.releaseDate}
                      </p>
                    )}
                    </div>
                </div>
                </div>
                </Link>
              
            ))}
          </div>
          </section>
    )
} 