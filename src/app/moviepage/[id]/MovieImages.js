"use client";

import Image from "next/image";
import Link from "next/link";

export default function MovieImages({ movie_images, movie_id }) {
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
    return(
        <div>
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Backdrops</h2>
                <Link className="mr-10 py-2 px-8 rounded-2xl text-md font-light w-fit bg-slate-300 shadow-md shadow-slate-400 hover:bg-slate-400 hover:shadow-sm" href={`/moviepage/${movie_id}/backdrops`}>
                    See all backdrops..
                </Link>
            </div>
            <div className="w-full flex gap-4 pb-4 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                {visible_backdrops.map((image) => (
                    <div key={image.filePath} className="group rounded-xl overflow-hidden shrink-0 w-96">
                        <a className="block" href={`https://image.tmdb.org/t/p/original${image.filePath}`} target="_blank" rel="noopener noreferrer">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
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
                <Link className="mr-10 py-2 px-8 rounded-2xl text-md font-light w-fit bg-slate-300 shadow-md shadow-slate-400 hover:bg-slate-400 hover:shadow-sm" href={`/moviepage/${movie_id}/posters`}>
                    See all posters..
                </Link>
            </div>
            <div className="w-full flex gap-4 pb-4 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
                {visible_posters.map((image) => (
                    <p key={image.filePath} className="group rounded-xl overflow-hidden shrink-0 w-96">
                        <a href={`https://image.tmdb.org/t/p/original${image.filePath}`} target="_blank">
                            <Image
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
        </div>
    )
}