"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function MovieCast({ movie_cast }){
    const [expanded, setExpanded] = useState(false);

    // “One line” approximation per breakpoint:
    // mobile ~2, sm ~3, md ~4, lg ~6, xl ~8
    const initialCount = 8;

    const cast = movie_cast.cast ?? [];
    const visibleCast = expanded ? cast : cast.slice(0, initialCount);

    return(
        <div>
        <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Cast</h2>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
            {visibleCast.map((member) => (
                <div key={member.id} className="group bg-gray-100 rounded-lg overflow-hidden flex flex-col border border-gray-300 shadow-md hover:shadow-lg hover:cursor-pointer h-90 z-10">
                    <div className="relative overflow-hidden h-full">
                        <Image
                            src={
                                member.profile_path
                                ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                                : "/assets/images/no_profile.png"
                            }
                            alt={member.name}
                            width={300}
                            height={600}
                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-120"
                        />
                    </div>
                    <div className="p-2 flex flex-col items-start justify-start h-30">
                        <p className="text-sm text-grey-900">{member.name}</p>
                        <p className="text-sm text-slate-500">{member.character}</p>
                    </div>
                </div>
            ))}
            </div>

        {cast.length > initialCount && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 mx-auto w-fit text-xl font-semibold text-slate-700 hover:background-slate-200 px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
        >
          {expanded ? "Show less ⬆" : "Show all cast ⬇"}
        </button>
      )}
    </div>
    );
}