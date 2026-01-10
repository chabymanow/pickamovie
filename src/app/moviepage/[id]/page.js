import MovieCast from "./MovieCast";
import MovieReviews from "./MovieReviews";
import MovieVideos from "./MovieVideos";
import Image from "next/image";
import Link from "next/link";
import { averageColorFromUrl, rgbToCss } from "@/lib/avgColor";
import { notFound } from "next/navigation";
import { fetchMovie } from "@/lib/fetchData";

export default async function MoviePage({ params }) {
  const { id } = await params;

    const movie = await fetchMovie(id);
    if (!movie) return notFound();
    const movie_cast = await movie.credits;
    const movie_videos = await movie.videos;
    const movie_images = await movie.images;
    const movie_reviews = await movie.reviews;
    const movie_details = await movie.external_ids;
    const production_companies = await movie.production_companies;
    const movie_recommendations = await movie.recommendations;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const rgb = posterUrl ? await averageColorFromUrl(posterUrl) : { r: 37, g: 99, b: 235 };
  const headerBackColour = rgbToCss(rgb, 1);

  const youtubeVideos = (movie_videos?.results ?? []).filter(v => v.site === "YouTube");
  const main = youtubeVideos[0];
  const side = youtubeVideos.slice(1, 5);

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
    <div>
      <div className="relative isolate flex flex-row justify-center md:justify-start items-center w-full min-h-dvh md:min-h-[70vh] p-7 overflow-hidden bg-stone-800">

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
      <div className="relative w-[99%] lg:w-[70%] lg:ml-10 flex flex-row gap-5 text-white flex-wrap md:flex-nowrap">
        <img className="w-full max-w-xs mx-auto md:mx-0 md:h-auto md:w-auto shadow-md shadow-gray-700"
          src={posterUrl}
          alt={movie.title}
        />

        <div className="flex flex-col justify-start">
          <h1 className="text-4xl font-semibold">
            {movie.title}{" "}
            
            ({new Date(movie.release_date).toLocaleDateString("en-GB", { year: "numeric" })})
          </h1>
            <p>{movie.tagline ? <span className="mb-2 text-lg">{movie.tagline}</span> : null}</p>
          <p>
            {new Date(movie.release_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <div className="mt-2">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="inline-block text-sm font-semibold mr-2">
                #{genre.name}
              </span>
            ))}
          </div>

            <p className="mt-5 text-xl font-semibold">Overview</p>
            <p className=" text-[.8rem] md:text-[1rem] xl:text-[1.1rem] leading-relaxed">{movie.overview}</p>

            <div className="mt-5 flex flex-col gap-1 text-[.8rem] md:text-[1rem] xl:text-lg">
                <p>Status: <span className="text-myOffWhite font-bold">{movie.status}</span></p>
                <p >Rating: <span className="text-myOffWhite font-bold">{Math.round(movie.vote_average * 10)}%</span></p>
                <p>Original language: <span className="text-myOffWhite font-bold">{movie.original_language.toUpperCase()}</span></p>
                <p>
                    Budget:
                    <span className="text-myOffWhite font-bold">
                        {" "}
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                        }).format(movie.budget)}
                    </span>
                </p>
                <p>
                    Revenue:
                    <span className="text-myOffWhite font-bold">
                        {" "}
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                        }).format(movie.revenue)}
                    </span>
                </p>
                <p>
                    Official website:<br /> <a className="text-myOffWhite font-bold" href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
                </p>
            </div>
        </div>
      </div>
    </div>
      <div className="p-10 background-white">
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Details</h2>
          <div className="flex flex-col justify-between items-start gap-3 flex-wrap">
              <div className="flex flex-col justify-start items-start h-full w-8/12 mb-5">
                  <h2 className="text-xl font-semibold mb-4">Production Companies</h2>
                  <div className="w-full flex flex-row justify-start gap-10 h-44">
                      {production_companies.map((comp) => 
                          <div key={comp.id}>
                              <p className="mb-2 text-center">{comp.name}</p>
                              <img
                                  src={
                                      comp.logo_path
                                      ? `https://image.tmdb.org/t/p/original${comp.logo_path}`
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
        </section>
        <MovieCast movie_cast={movie_cast} />
        <MovieReviews movie_reviews={movie_reviews.results} />
        <MovieVideos youtubeVideos={youtubeVideos} />

        <section className="mb-20">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Backdrops</h2>
                <Link className="py-1 px-6 rounded-2xl text-md font-light w-fit bg-slate-300 shadow-md shadow-slate-400 hover:bg-slate-400 hover:shadow-sm" href={`/moviepage/${movie.id}/backdrops`}>
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
                <Link className="py-1 px-6 rounded-2xl text-md font-light w-fit bg-slate-300 shadow-md shadow-slate-400 hover:bg-slate-400 hover:shadow-sm" href={`/moviepage/${movie.id}/posters`}>
                    See all...
                </Link>
            </div>
            <div className="w-full flex gap-4 pb-4 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                {visible_posters.map((image) => (
                    <p key={image.filePath} className="group rounded-xl overflow-hidden shrink-0 w-96">
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
        
        <section>
          {movie_recommendations.results.length !== 0 ? (<>
            <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Recommendations</h2>
            <div className="w-full flex py-2 gap-6 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                {movie_recommendations.results.map((recom) => (
                    <div key={recom.id} className="shrink-0 w-72">
                        <Link href={`/moviepage/${recom.id}`} className="group block">
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
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
            </div></>): null}
        </section>
      </div>
    </div>
  );

}