"use client";

import Image from "next/image";
import Link from "next/link";

export default function MovieRecommendations({ movie_recommendations }){
    console.log(movie_recommendations);
    return(
        <div>
            <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Recommendations</h2>
            <div className="w-full flex py-2 gap-6 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                {movie_recommendations.map((recom) => (
                    <div key={recom.id} className="shrink-0 w-72">
                        <Link href={`/moviepage/${recom.id}`} className="group block">
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                    src={recom.poster_path ? `https://image.tmdb.org/t/p/w500${recom.poster_path}` : "/assets/images/no_image.png"}
                                    alt={recom.original_title}
                                    fill
                                    sizes="288px"
                                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            <p className="mt-2 mb-3 text-sm font-medium text-slate-900 line-clamp-1">
                                {recom.original_title}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
