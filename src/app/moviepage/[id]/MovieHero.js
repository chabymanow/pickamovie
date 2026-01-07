"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function averageColorFromImage(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  // Downsample for speed
  const w = 64;
  const h = 64;
  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  let r = 0, g = 0, b = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];

    // skip very dark pixels
    if (pr + pg + pb < 60) continue;

    r += pr;
    g += pg;
    b += pb;
    count++;
  }

  if (count === 0) return { r: 37, g: 99, b: 235 }; // fallback

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

function rgbToCss({ r, g, b }, alpha = 1) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function MovieHero({ movie }) {
  const backdropUrl = useMemo(
    () => `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
    [movie.backdrop_path]
  );
  const posterUrl = useMemo(
    () => (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null),
    [movie.poster_path]
  );

  const [bg, setBg] = useState(null);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (!posterUrl) return;

    const runId = ++runIdRef.current; // unique id for this run
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Ignore late results from older runs (prevents “flash then change”)
      if (runId !== runIdRef.current) return;

      try {
        const c = averageColorFromImage(img);

        // Ignore near-black pixels in the sampler (see below) OR darken less:
        const dark = {
          r: Math.round(c.r * 1),
          g: Math.round(c.g * 1),
          b: Math.round(c.b * 1),
        };

        setBg(rgbToCss(c, 1));
      } catch (e) {
        // keep fallback
      }
    };

    img.onerror = () => {
      if (runId !== runIdRef.current) return;
      // keep fallback
    };

    img.src = posterUrl;

    // Cleanup: invalidates this run if component re-renders/unmounts
    return () => {
      // bumping runIdRef is enough; older onload will be ignored
    };
  }, [posterUrl]);

  return (
    <div className="relative isolate flex flex-row justify-center md:justify-start items-center w-full min-h-dvh md:min-h-[70vh] p-7 overflow-hidden bg-stone-800">

      {/* background image layer */}
      <div className="absolute inset-0 z-0">
        {/* 1) blurred image (keep it subtle) */}
        <img src={backdropUrl}
          alt=""
          className="w-full h-full object-cover object-top blur-[3px] opacity-40"
        />

        {/* 2) colour tint (this is what makes it “red/orange-ish”) */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-5"
          style={{
            backgroundColor: bg ?? "transparent",
            opacity: bg ? 0.55 : 0,   // stronger than before
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
        <img
          className="w-full max-w-xs mx-auto md:mx-0 md:h-auto md:w-auto shadow-md shadow-gray-700"
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
  );
}
