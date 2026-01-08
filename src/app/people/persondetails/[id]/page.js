import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";
import { fetchPerson } from "@/lib/fetchPerson";

function MovieCard({ cast }) {
  return (
    <div className="w-full min-w-80 border border-slate-300 rounded-lg flex gap-2 overflow-hidden shadow-md shadow-slate-300 hover:bg-slate-100 hover:shadow-sm">
      <div className="w-16 min-w-16 md:min-w-20 aspect-2/3 relative">
        <Image
          src={
            cast.poster_path
              ? `https://image.tmdb.org/t/p/w185${cast.poster_path}`
              : "/assets/images/no_image.png"
          }
          alt={cast.title ?? cast.name ?? "Title"}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <p className="text-lg md:text-2xl lg:text-2xl font-semibold">{cast.title ?? cast.name}</p>
        <p className="text-sm font-light">
          Character:
          <span className="ml-1 font-semibold text-slate-900">{cast.character}</span>
        </p>
        {cast.release_date && (
          <p className="text-sm font-light">
            Release Date:
            <span className="ml-1 font-semibold text-slate-900">
              {new Date(cast.release_date).toLocaleDateString("en-GB")}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default async function Popular({ params }) {
    const { id } = await params;

    const person = await fetchPerson(id);
    if (!person) return notFound();
    const act_movie = (person.combined_credits.cast ?? [])
    .filter((c) => c.media_type === "movie" && c.release_date)
    .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    const act_tv = (person.combined_credits.cast ?? [])
    .filter((c) => c.media_type === "tv" && c.first_air_date)
    .sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime());

    const PREVIEW_COUNT = 4;
    const previewMovies = act_movie.slice(0, PREVIEW_COUNT);
    const restMovies = act_movie.slice(PREVIEW_COUNT);

    console.log(person)
    return(
        <div>
            <section className="w-screen h-fit bg-linear-to-b from-slate-500 to-slate-800 pb-5">
                <div className="w-11/12 lg:w-10/12 max-w-500 flex flex-row flex-wrap justify-center lg:justify-start items-center gap-5 mx-auto pt-5">
                    <div className="w-64 aspect-2/3 relative rounded-2xl overflow-hidden  shadow-lg shadow-slate-900 border border-slate-200/50">
                        <Image
                            src={
                            person.profile_path
                                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                : "/assets/images/no_image.png"
                            }
                            alt={person.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 208px"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-5 w-full md:w-6/12 lg:w-8/12 xl:w-8/12 text-myWhite p-1 lg:p-5">
                        <div className="text-4xl font-extrabold text-orange-300 text-shadow-lg text-shadow-slate-900">{person.name}</div>
                        <div>Born <span className="text-lg font-semibold">{new Date(person.birthday).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}</span> in <span className="text-lg font-semibold">{person.place_of_birth}</span> </div>
                        <div className="text-md font-light text-justify">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} >
                                {person.biography.split("\n\n")[0]}
                            </ReactMarkdown>
                        </div>
                        {person.homepage ? (
                            <div className="text-sm lg:text-lg font-semibold">Homepage: {" "}
                            <a href={person.homepage} target="_blank" rel="noopener noreferrer">
                                <span className="text-orange-300 font-semibold ml-3">{person.homepage}</span>
                            </a>
                        </div>
                        ):(null)}
                    </div>
                </div>
            </section>

             <section className="w-11/12 md:w-10/12 max-w-500 mx-auto text-sm md:text-md lg:text-lg mt-5 font-normal personBio text-justify">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} >
                    {person.biography}
                </ReactMarkdown>
            </section>

            <section className="w-11/12 lg:w-10/12 max-w-500 mt-10 mx-auto text-sm md:text-md lg:text-lg">
                  <h2 className="text-2xl font-semibold mb-4">External links</h2>
                  <div className="flex flex-col gap-3">
                      {person.external_ids.imdb_id !== null ? (
                          <p>IMDb: {" "}
                              <a href={`https://www.imdb.com/title/${person.external_ids.imdb_id}`} target="_blank" rel="noopener noreferrer"><span className="text-orange-500 font-semibold">https://www.imdb.com/title/{person.external_ids.imdb_id}</span></a>
                          </p>
                      ):(
                          <p>IMDb: No data</p>
                      )}
                      {person.external_ids.wikidata_id !== null ? (
                          <p>Wikipedia: {" "}
                              <a href={`https://www.wikidata.org/wiki/${person.external_ids.wikidata_id}`} target="_blank" rel="noopener noreferrer"><span className="text-orange-500 font-semibold">https://www.wikidata.org/wiki/{person.external_ids.wikidata_id}</span></a>
                          </p>
                      ):(
                          <p>Wikipedia: No data</p>
                      )}
                      {person.external_ids.facebook_id !== null ? (
                          <p>Facebook: {" "}
                              <a href={`https://facebook.com/${person.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer"><span className="text-orange-500 font-semibold">https://facebook.com/{person.external_ids.facebook_id}</span></a>
                          </p>
                      ):(
                          <p>Facebook: No data</p>
                      )}
                      {person.external_ids.instagram_id !== null ? (
                          <p>Instagram: {" "}
                              <a href={`https://instagram.com/${person.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer"><span className="text-orange-500 font-semibold">https://instagram.com/{person.external_ids.instagram_id}</span></a>
                          </p>
                      ):(
                          <p>Instagram: No data</p>
                      )}
                      {person.external_ids.twitter_id ? (
                          <p>X: {" "}
                              <a href={`https://x.com/${person.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer"><span className="text-orange-500 font-semibold">https://x.com/{person.external_ids.twitter_id}</span></a>
                          </p>
                      ):(
                          <p>X: No data</p>
                      )}

                  </div>
              </section>

                <section className="w-11/12 lg:w-10/12 max-w-500 mt-10 mx-auto">
                    <h2 className="text-2xl font-bold mt-8 mb-7 text-slate-800">Filmography (Movies)</h2>
                    <input id="moviesToggle" type="checkbox" className="peer sr-only" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 px-2 gap-5 overflow-hidden max-h-[500px] peer-checked:max-h-[9999px] transition-[max-height] duration-500 mb-10">
                        {act_movie.map((cast) => (
                            <Link key={cast.credit_id} href={`/moviepage/${cast.id}`} className="w-full">
                            <MovieCard cast={cast} />
                            </Link>
                        ))}
                    </div>

                    <label htmlFor="moviesToggle" className="mt-6 mx-auto w-fit cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 peer-checked:hidden">
                        Show full filmography
                    </label>

                    <label htmlFor="moviesToggle" className="mt-10 mx-auto w-fit hidden peer-checked:inline-flex cursor-pointer select-none rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                        Hide filmography
                    </label>
                </section>


             <section className="w-11/12 lg:w-10/12 max-w-500 mt-20 mx-auto">
                <h2 className="text-2xl font-bold mt-8 mb-7 text-slate-800">Television Appearances</h2>
                <input id="tvToggle" type="checkbox" className="peer sr-only" />

                <div className="grid grid-cols-1 lg:grid-cols-2 px-2 gap-5 overflow-hidden max-h-[500px] peer-checked:max-h-[9999px] transition-[max-height] duration-500 mb-10">
                    {act_tv.map((cast) => (
                        <Link key={cast.credit_id} href={`/moviepage/${cast.id}`} className="w-full">
                        <MovieCard cast={cast} />
                        </Link>
                    ))}
                </div>

                <label htmlFor="tvToggle" className="w-fit cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 peer-checked:hidden">
                    Show full appearances
                </label>

                <label htmlFor="tvToggle" className="w-fit hidden peer-checked:inline-flex cursor-pointer select-none rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                    Hide appearances
                </label>
            </section>

            <section className="w-11/12 lg:w-10/12 max-w-500 mt-10 mx-auto text-sm md:text-md lg:text-lg mb-20">
                <h2 className="text-2xl font-semibold mb-4">Images</h2>
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
                    {person.images.profiles.map((p) => (
                        <div key={p.file_path} className="group rounded-lg overflow-hidden flex flex-col shadow-md">
                            <a href={`https://image.tmdb.org/t/p/original${p.file_path}`} target="_blank" rel="noopener noreferrer">
                                <div className="relative overflow-hidden h-full">
                                    <Image
                                        src={
                                            p.file_path
                                            ? `https://image.tmdb.org/t/p/w185${p.file_path}`
                                            : "/assets/images/no_profile.png"
                                        }
                                        alt={p.file_path}
                                        width={300}
                                        height={600}
                                        className="w-full h-fullo object-cover transition-transform duration-300 ease-out group-hover:scale-120"
                                    />
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}