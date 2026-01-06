"use client";

export default function MovieVideos({ movie_videos }) {
    const youtubeVideos = (movie_videos?.results ?? []).filter(v => v.site === "YouTube");
    const main = youtubeVideos[0];
    const side = youtubeVideos.slice(1, 5);
    console.log(main);
    return (
        <div>
        <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Videos</h2>
        <div className="grid gap-4 lg:grid-cols-5 lg:grid-rows-4 w-8/12 mx-auto">
            {/* Main video (spans 4 rows) */}
            <div className="lg:col-span-4 lg:row-span-4">
            <div className="h-full rounded-lg overflow-hidden">
                {main ? (
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${main.key}`}
                    title={main.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-slate-500 bg-slate-100">
                    No trailer available
                </div>
                )}
            </div>
            </div>

            {/* Side videos (each takes 1 row) */}
            {side.map((v) => (
            <div key={v.id} className="rounded-lg overflow-hidden">
                <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${v.key}`}
                title={v.name}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
            </div>
            ))}

            {/* If fewer than 4 side videos, optionally fill empty slots */}
            {Array.from({ length: Math.max(0, 4 - side.length) }).map((_, idx) => (
                <div key={`empty-${idx}`} className="rounded-lg h-32 bg-transparent" />
            ))}
        </div>
    </div>
    );
};