"use client";

import { useEffect, useMemo, useState } from "react";

export default function MovieVideos({ youtubeVideos = [] }) {
  const initial = useMemo(() => youtubeVideos?.[0] ?? null, [youtubeVideos]);
  const [selected, setSelected] = useState(initial);

  // If the list changes (route change / new movie), reset selection.
  useEffect(() => {
    setSelected(initial);
  }, [initial]);

  return (
    <section className="mb-15">
      <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Videos</h2>

      {/* Big video */}
      <div className="w-full md:w-10/12 lg:w-10/12 xl:w-8/12 max-w-[1024px] aspect-video mx-auto mb-10">
        <div className="h-full rounded-lg overflow-hidden shadow-lg shadow-slate-600">
          {selected ? (
            <iframe
              key={selected.key} // forces refresh when selecting a new video
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selected.key}`}
              title={selected.name}
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

      {/* Carousel with fades */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-14 lg:w-64 px-2 lg:px-20 z-30 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-14 lg:w-64 px-2 lg:px-20 z-30 bg-linear-to-l from-white to-transparent" />

        <div className="w-full mx-auto flex gap-4 pb-4 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]">
            {youtubeVideos.map((video) => {
                const isActive = selected?.key === video.key;
                return (
                    <button key={video.id} onClick={() => setSelected(video)} className="relative shrink-0 w-44 md:w-52 lg:w-64 rounded-md overflow-hidden group">
                        <img src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={video.name} className="w-full aspect-video object-cover" />

                        {/* Optional subtle hover play icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                            ▶
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
      </div>
    </section>
  );
}
