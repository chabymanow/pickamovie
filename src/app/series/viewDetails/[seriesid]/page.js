import Image from "next/image";
import Link from "next/link";
import { averageColorFromUrl, rgbToCss } from "@/lib/avgColor";
import { notFound } from "next/navigation";
import { fetchSeries } from "@/lib/fetchData";
import SeriesReviews from "./SeriesReviews";

export default async function viewDetails({ params }) {
    const { seriesid } = await params;

    const series = await fetchSeries(seriesid);
    if (!series) return notFound();

    const movie_images = await series.images;
    const movie_details = await series.external_ids;
    const series_recommendations = await series.recommendations;

    const backdropUrl = `https://image.tmdb.org/t/p/w500${series.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
    const rgb = posterUrl ? await averageColorFromUrl(posterUrl) : { r: 37, g: 99, b: 235 };
    const headerBackColour = rgbToCss(rgb, 1);

    const series_reviews = await series.reviews.results;

    const backdrops = (movie_images.backdrops ?? []).map(b => ({
        filePath: b.file_path,
        width: b.width,
        height: b.height,
        aspectRatio: b.aspect_ratio,
        votes: b.vote_average,
    }));

  const posters = (movie_images.posters ?? []).map(p => ({
      filePath: p.file_path,
      width: p.width,
      height: p.height,
      aspectRatio: p.aspect_ratio,
      votes: p.vote_average,
  }));

  const visible_backdrops = backdrops.slice(0, 8);
  const visible_posters = posters.slice(0, 8);

  return (
    <div className="">
      <div className="relative isolate flex flex-row justify-center md:justify-start items-center w-screen mx-auto min-h-dvh md:min-h-[70vh] p-7 overflow-hidden bg-stone-800">

      {/* background image layer */}
      <div className="absolute inset-0 z-0">
          <img src={backdropUrl} alt="" className="w-full h-full object-cover object-top blur-[3px] opacity-40" />

        {/* 2) colour tint (this is what makes it “red/orange-ish”) */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-5"
          style={{
            backgroundColor: headerBackColour ?? "transparent",
            opacity: headerBackColour ? 0.55 : 0,   // stronger than before
          }}
        />

        {/* 3) dark gradient for text readability (NOT by darkening the colour) */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>

      {/* content */}
      <div className="relative w-full max-w-600 xl:mx-auto lg:w-[80%] flex flex-row gap-5 text-white flex-wrap md:flex-nowrap">
        <img className="w-96 aspect-2/3 mx-auto md:mx-0 shadow-md shadow-gray-700"
          src={posterUrl}
          alt={series.title}
        />

        <div className="flex flex-col justify-start">
          <h1 className="text-4xl font-semibold">
            {series.original_name}{" "}
          </h1>
            <p>{series.tagline ? <span className="mb-2 text-lg">{series.tagline}</span> : null}</p>
          <p>
            {new Date(series.first_air_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <div className="mt-2">
            {series.genres?.map((genre) => (
              <span key={genre.id} className="inline-block text-sm font-semibold mr-2">
                #{genre.name}
              </span>
            ))}
          </div>

            <p className="mt-5 text-xl font-semibold">Overview</p>
            <p className=" text-[.8rem] md:text-[.9rem] xl:text-[1rem] leading-relaxed">{series.overview}</p>

            <div className="mt-5 flex flex-col gap-1 text-[.8rem] md:text-[1rem] xl:text-lg">
                <p>Status: <span className="text-myOffWhite font-bold">{series.status}</span></p>
                <p >Rating: <span className="text-myOffWhite font-bold">{Math.round(series.vote_average * 10)}%</span></p>
                <p>Original language: <span className="text-myOffWhite font-bold">{series.original_language.toUpperCase()}</span></p>
                <p>
                    First Air Date:
                    <span className="text-myOffWhite font-bold">
                        {" "}
                        {new Date(series.first_air_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                </p>
                
                    {series.last_air_date !== null ? (
                    <p>
                        Last Air Date:{" "}
                        <span className="text-myOffWhite font-bold">
                            {" "}
                            {new Date(series.last_air_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </span>
                    </p>
                    ):(null)}
                    
                <p>
                    Official website:<br /> <a className="text-myOffWhite font-bold" href={series.homepage} target="_blank" rel="noopener noreferrer">{series.homepage}</a>
                </p>
            </div>
        </div>
      </div>
    </div>
    <div className="max-w-600 mx-auto">
        <section className="f-full flex flex-row flex-wrap justify-between items-center gap-10 px-5 lg:px-20 mt-10">
            <div className="w-full md:w-4/12 text-md md:text-md lg:text-lg">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="flex flex-col gap-3">
                    <p>Status: <span className="text-slate-800 font-semibold">{series.status}</span></p>
                    {series.first_air_date !== null ? (
                        <p>First Air Date: {" "}  
                            <span className="text-slate-800 font-semibold">{new Date(series.first_air_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}</span>
                        </p>
                    ):(
                        <p>First Air Date: No data</p>
                    )}
                    {series.last_air_date !== null ? (
                        <p>Last Air Date: {" "}  
                            <span className="text-slate-800 font-semibold">{new Date(series.last_air_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}</span>
                        </p>
                    ):(
                        <p>First Air Date: Running</p>
                    )}
                    <p>Number of season: <span className="text-slate-800 font-semibold">{series.number_of_seasons}</span></p>
                    <p>Number of episodes: <span className="text-slate-800 font-semibold">{series.number_of_episodes}</span></p>
                </div>
            </div>
    
                <div className="w-full md:w-5/12 text-sm md:text-md lg:text-lg">
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
        </section>

        <section className="mb-20 px-2 lg:px-20">
            <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Seasons</h2>
            <div className="w-full max-w-600 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {series.seasons.map((season) => (
                    <Link key={season.id} className="w-full border border-slate-300 rounded-lg overflow-hidden shadow-md shadow-slate-300" href={`/series/viewDetails/${seriesid}/seriesseason/${season.season_number}`}>
                        <div className="w-full flex flex-row justify-start items-center gap-3 flex-nowrap">
                            <img src={season.poster_path ? `https://image.tmdb.org/t/p/w185${season.poster_path}` : `https://image.tmdb.org/t/p/w185${series.poster_path}`}
                                        alt={season.name}
                                        width={640}
                                        height={480}
                                        className="w-24 aspect-2/3 object-cover"
                                    />
                            <div>                                
                                <p>Season name: {season.name}</p>
                                <p>{season.season_number}</p>
                                <p>{season.episode_count}</p>
                                <p><span className="text-slate-800 font-semibold">{new Date(season.air_date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}</span></p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        <section className="px-5 lg:px-20 mb-10 background-white">
            <SeriesReviews series_reviews = {series_reviews} />
        </section>

        <section className="mb-20 px-2 lg:px-20">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Backdrops</h2>
                <Link className="py-1 px-6 rounded-2xl text-md font-light w-fit bg-slate-300 shadow-md shadow-slate-400 hover:bg-slate-400 hover:shadow-sm" href={`/series/viewDetails/${seriesid}/backdrops`}>
                    See all...
                </Link>
            </div>
            <div className="w-full flex gap-4 pb-4 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                {visible_backdrops.map((image) => (
                    <div key={image.filePath} className="group rounded-xl overflow-hidden shrink-0 w-96">
                        <a className="block" href={`https://image.tmdb.org/t/p/original${image.filePath}`} target="_blank" rel="noopener noreferrer">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={
                                        image.filePath
                                        ? `https://image.tmdb.org/t/p/w500${image.filePath}`
                                        : "/assets/images/no_profile.png"
                                    }
                                    alt={image.filePath}
                                    width={640}
                                    height={480}
                                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 hover:z-20 hover:shadow-md hover:shadow-slate-700"
                                />
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Posters</h2>
                <Link className="py-1 px-6 rounded-2xl text-md font-light w-fit bg-slate-300 shadow-md shadow-slate-400 hover:bg-slate-400 hover:shadow-sm" href={`/series/viewDetails/${seriesid}/posters`}>
                    See all...
                </Link>
            </div>
            <div className="w-full flex gap-4 pb-4 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                {visible_posters.map((image) => (
                    <p key={image.filePath} className="group rounded-xl overflow-hidden shrink-0 w-62">
                        <a href={`https://image.tmdb.org/t/p/original${image.filePath}`} target="_blank">
                            <img
                                src={
                                    image.filePath
                                    ? `https://image.tmdb.org/t/p/w500${image.filePath}`
                                    : "/assets/images/no_profile.png"
                                }
                                alt={image.filePath}
                                width={640}
                                height={480}
                                className="w-full h-fullo object-cover transition-transform duration-300 ease-out group-hover:scale-110 hover:z-20 hover:shadow-md hover:shadow-slate-700"
                            />
                        </a>
                    </p>
                ))}
            </div>
        </section>
        
            <section className="mb-20 px-2 lg:px-20">
                {series_recommendations.results.length !== 0 ? (<>
                    <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Recommendations</h2>
                    <div className="w-full flex py-2 gap-6 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                        {series_recommendations.results.map((recom) => (
                            <div key={recom.id} className="shrink-0 w-72">
                                <Link href={`/series/viewDetails/${recom.id}`} className="group block">
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                            src={recom.backdrop_path ? `https://image.tmdb.org/t/p/w500${recom.backdrop_path}` : "/assets/images/no_image.png"}
                                            alt={recom.original_title}
                                            fill = "true"
                                            sizes="288px"
                                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    <p className="mt-2 mb-3 text-md font-semibold text-slate-900 line-clamp-1">
                                        {recom.original_name}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div></>
                ): null}
            </section>
        </div>
      </div>
  );

}