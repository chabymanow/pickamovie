import Image from "next/image";
import Link from "next/link";

export default async function Popular() {
    const API_KEY = process.env.TMDB_API_KEY;
    const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
    const URL = "https://api.themoviedb.org/3/trending/person/week?language=en-US";
    const res = await fetch(URL, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        });
        
    if (!res.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    const people_data = await res.json();

    return (
        <div className="min-h-screen mb-30">
            <main className="flex min-h-screen w-full flex-col items-center justify-between py-2 px-8 sm:items-start">
                <h1 className="mb-8 text-3xl font-extrabold leading-tight text-blacksm:text-2xl">
                    Trending People on this week
                </h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-400 mx-auto">
          {people_data.results.map((person) => (
            <Link key={person.id} href={`./persondetails/${person.id}`} className="block w-full sm:max-w-full md:w-60 lg:w-64 text-sm font-semibold" >
            <div className="group w-full h-115 flex flex-col rounded-2xl relative overflow-hidden shadow-gray-400 shadow-md hover:shadow-sm hover:shadow-gray-700 transition-transform duration-600 ease-out">
              <div className="w-full h-72 relative flex-1">
                <Image
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "/assets/images/no_profile.png"
                  }
                  alt={person.original_name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 208px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
          
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%]
                      bg-white/30 backdrop-blur-2xl mask-[linear-gradient(to_top,black_10%,black_30%,transparent_100%)]
                      [-webkit-mask-image:linear-gradient(to_top,black_10%,black_30%,transparent_100%)]" ></div>
              </div>

              <div className="absolute bottom-7 left-3 px-2 mt-auto pb-3 h-16 pt-5 z-20 text-white">
                <p className="text-2xl font-semibold">{person.name}</p>
                <p className="text-sm font-light text-white/80">
                  Original Name: {person.original_name}
                </p>
              </div>
            </div>
          </Link>

          ))}
        </div>
            </main>
        </div>
    );
}