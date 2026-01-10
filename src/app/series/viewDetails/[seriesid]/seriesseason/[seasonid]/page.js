import Image from "next/image";
import Link from "next/link";
import { averageColorFromUrl, rgbToCss } from "@/lib/avgColor";
import { notFound } from "next/navigation";
import { fetchSeason, fetchSeries } from "@/lib/fetchData";

export default async function viewDetails({ params }) {
    const { seriesid } = await params;
    const { seasonid  } = await params;

    const seasons = await fetchSeason(seriesid, seasonid);
    if (!seasons) return notFound();
    const series = await fetchSeries(seriesid);
    if (!series) return notFound();

  return (
    <div className="mb-10">
        <section className="w-screen h-32 bg-myGray text-white py-6 mb-5">
            <div className="w-10/12 mx-auto">
                <p className="text-3xl font-bold">{series.original_name}</p>
                <p className="text-2xl">Season: <span className="font-semibold">{seasonid}</span></p>
            </div>
        </section>
        <section className="w-screen mx-auto flex flex-col justify-start gap-5">
            {seasons.episodes.map((episode) => (
                <div key={episode.id} className="w-screen">
                    <div className="w-10/12 flex flex-col lg:flex-row justify-start gap-2 mx-auto mb-5">
                        <img src={episode.still_path ? `https://image.tmdb.org/t/p/w500${episode.still_path}` : `https://image.tmdb.org/t/p/w500${series.poster_path}`}
                            alt={episode.name}
                            width={640}
                            height={480}
                            className="w-full lg:w-100 shrink max-w-200 aspect-video"
                        />
                        <div>
                            <p className="text-lg font-bold">{episode.name}</p>
                            <p className="text-md">Episode: <span className="font-semibold">{episode.episode_number}</span></p>
                            <p className="text-md">Air Date: 
                                <span className="font-semibold ml-2">
                                    {new Date(episode.air_date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </span>
                            </p>
                            <p className="text-md">{episode.overview}</p>
                        </div>
                        
                    </div>
                    
                    {episode.crew.length !== 0 ? (
                        <div className="w-10/12 mx-auto">
                            <h2 className="text-lg font-bold mt-8 mb-4 text-slate-800">Crew</h2>
                            <div className="relative mb-10">
                                <input id={`crewToggle-${episode.id}`} type="checkbox" className="peer sr-only" />
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-hidden max-h-52 peer-checked:max-h-2499.75 mb-10">
                                    {episode.crew.map((crew, index) => (
                                        <Link key={`${crew.id}-${crew.job}-${index}`} href={`/people/persondetails/${crew.id}`}>
                                            <div className="min-w-100 flex flex-row justify-start items-start gap-2">
                                                <img src={crew.profile_path ? `https://image.tmdb.org/t/p/w185${crew.profile_path}` : "/assets/images/no_profile.png"}
                                                    alt={episode.name}
                                                    width={640}
                                                    height={480}
                                                    className="w-24 aspect-2/3 rounded-lg"
                                                />
                                                <div>
                                                    <p className="">Name: <span className="font-semibold">{crew.name}</span></p>
                                                    <p className="">Role: <span className="font-semibold">{crew.job}</span></p>
                                                    <p className="">Department: <span className="font-semibold">{crew.department}</span></p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="pointer-events-none absolute bottom-10 left-0 w-full h-30 bg-linear-to-t from-white to-transparent backdrop-blur-[1px] peer-checked:hidden" />

                                <label htmlFor={`crewToggle-${episode.id}`} className="mt-6 mx-auto w-fit cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 peer-checked:hidden">
                                    Show all crew
                                </label>

                                <label htmlFor={`crewToggle-${episode.id}`} className="mx-auto w-fit hidden peer-checked:inline-flex cursor-pointer select-none rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                                    Hide crew
                                </label>
                            </div>
                        </div>
                    ):("")}

                    {episode.guest_stars.length !== 0 ? (
                        <div className="w-10/12 mx-auto">
                            <h2 className="text-lg font-bold mt-8 mb-4 text-slate-800">Guest Stars</h2>
                            <div className="relative mb-10">
                                <input id={`starToggle-${episode.id}`} type="checkbox" className="peer sr-only" />
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-hidden max-h-52 peer-checked:max-h-2499.75 mb-10">
                                    {episode.guest_stars.map((star, index) => (
                                        <Link key={`${star.id}-${star.job}-${index}`} href={`/people/persondetails/${star.id}`}>
                                            <div className="min-w-100 flex flex-row justify-start items-start gap-2">
                                                <img src={star.profile_path ? `https://image.tmdb.org/t/p/w185${star.profile_path}` : "/assets/images/no_profile.png"}
                                                    alt={episode.name}
                                                    width={640}
                                                    height={480}
                                                    className="w-24 aspect-2/3 rounded-lg"
                                                />
                                                <div>
                                                    <p className="">Name: <span className="font-semibold">{star.name}</span></p>
                                                    <p className="">Character: <span className="font-semibold">{star.character}</span></p>
                                                    <p className="">Department: <span className="font-semibold">{star.known_for_department}</span></p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="pointer-events-none absolute bottom-10 left-0 w-full h-30 bg-linear-to-t from-white to-transparent backdrop-blur-[1px] peer-checked:hidden" />
                            

                                <label htmlFor={`starToggle-${episode.id}`} className="mt-6 mx-auto w-fit cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 peer-checked:hidden">
                                    Show all stars
                                </label>

                                <label htmlFor={`starToggle-${episode.id}`} className="mx-auto w-fit hidden peer-checked:inline-flex cursor-pointer select-none rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                                    Hide stars
                                </label>
                            </div>
                        </div>
                    ):("")}    
                    
                    <div className="w-screen h-px bg-slate-300 my-10"></div>
                </div>
            ))}
        </section>
    </div>
  );

}