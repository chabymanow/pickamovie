"use client";

import Image from "next/image";

export default function MovieDetails({ movie_details, movie_companies }) {
    return(
        <div>
            <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Details</h2>
            <div className="flex flex-col justify-between items-start gap-3 flex-wrap">
                <div className="flex flex-col justify-start items-start h-full w-8/12 mb-5">
                    <h2 className="text-xl font-semibold mb-4">Production Companies</h2>
                    <div className="w-full flex flex-row justify-start gap-10 h-44">
                        {movie_companies.map((comp) => 
                            <div key={comp.id}>
                                <p className="mb-2 text-center">{comp.name}</p>
                                <Image
                                    src={
                                        comp.logo_path
                                        ? `https://image.tmdb.org/t/p/w500${comp.logo_path}`
                                        : "/assets/images/no_logo.png"
                                    }
                                    alt={comp.name}
                                    width={200}
                                    height={200}
                                    className="W-96 h-auto"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full text-sm md:text-md lg:text-lg">
                    <h2 className="text-xl font-semibold mb-4">Social Network</h2>
                    <div className="flex flex-col gap-3">
                        {movie_details.imdb_id !== null ? (
                            <p>IMDb: {" "}
                                <a href={`https://www.imdb.com/title/${movie_details.imdb_id}`} target="_blank" rel="noopener noreferrer"><span className="text-slate-700 font-semibold underline">https://www.imdb.com/title/{movie_details.imdb_id}</span></a>
                            </p>
                        ):(
                            <p>IMDb: No data</p>
                        )}
                        {movie_details.wikidata_id !== null ? (
                            <p>Wikipedia: {" "}
                                <a href={`https://www.wikidata.org/wiki/${movie_details.wikidata_id}`} target="_blank" rel="noopener noreferrer"><span className="text-slate-700 font-semibold underline">https://www.wikidata.org/wiki/{movie_details.wikidata_id}</span></a>
                            </p>
                        ):(
                            <p>Wikipedia: No data</p>
                        )}
                        {movie_details.facebook_id !== null ? (
                            <p>Facebook: {" "}
                                <a href={`https://facebook.com/${movie_details.facebook_id}`} target="_blank" rel="noopener noreferrer"><span className="text-slate-700 font-semibold underline">https://facebook.com/{movie_details.facebook_id}</span></a>
                            </p>
                        ):(
                            <p>Facebook: No data</p>
                        )}
                        {movie_details.instagram_id !== null ? (
                            <p>Instagram: {" "}
                                <a href={`https://instagram.com/${movie_details.instagram_id}`} target="_blank" rel="noopener noreferrer"><span className="text-slate-700 font-semibold underline">https://instagram.com/{movie_details.instagram_id}</span></a>
                            </p>
                        ):(
                            <p>Instagram: No data</p>
                        )}
                        {movie_details.twitter_id ? (
                            <p>X: {" "}
                                <a href={`https://x.com/${movie_details.twitter_id}`} target="_blank" rel="noopener noreferrer"><span className="text-slate-700 font-semibold underline">https://x.com/{movie_details.twitter_id}</span></a>
                            </p>
                        ):(
                            <p>X: No data</p>
                        )}

                    </div>
                </div>
                
            </div>
        </div>
    )
}