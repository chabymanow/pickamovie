"use client"

import Image from "next/image"
import Link from "next/link";

export default function HomeHeader({ movie_discover }){
    return(
        <div className="relative w-full h-[90vh] shadow-lg shadow-gray-800">
            <Image 
            src={
                movie_discover[0].backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie_discover[0].backdrop_path}`
                : "/assets/images/no_profile.png"
            }
            alt={movie_discover[0].original_title}
            fill
                priority
                className="object-cover"
            />

            {/* General dark overlay (optional, for contrast) */}
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex h-full items-end justify-start px-8 pb-12">
                <div className="flex flex-col gap-3">
                    <h1 className="text-white text-3xl md:text-5xl font-semibold">
                        {movie_discover[0].original_title}
                    </h1>
                    <p className="text-white text-sm md:text-md lg:text-2xl font-light">
                        Release Date: {new Date(movie_discover[0].release_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </p>
                    <p className="text-white text-sm md:text-md lg:text-2xl font-normal w-full md:w-10/12 xl:w-6/12">
                        {movie_discover[0].overview}
                    </p>
                    <Link href={`/moviepage/${movie_discover[0].id}`} className="mt-5 w-fit h-fit px-8 py-3 opacity-75 bg-blue-700 rounded-4xl text-xl text-white font-semibold shadow-lg shadow-gray-900 hover:cursor-pointer hover:bg-blue-900 transition duration-500 ease-in-out">
                        Read more...
                    </Link>
                </div>
            </div>
        </div>
    )
}