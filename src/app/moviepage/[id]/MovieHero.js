"use client";

import { useEffect, useMemo, useState } from "react";

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
  const count = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);

  return { r, g, b };
}

function rgbToCss({ r, g, b }, alpha = 1) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function MovieHero({ movie }) {
  const posterUrl = useMemo(
    () => `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    [movie.poster_path]
  );

  const [bg, setBg] = useState("rgb(37, 99, 235)"); // fallback (blue-600-ish)

  useEffect(() => {
    if (!movie.poster_path) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // may still fail if CORS blocks
    img.src = posterUrl;

    img.onload = () => {
      try {
        const c = averageColorFromImage(img);
        // Slightly darken for readability
        const dark = { r: Math.round(c.r * 0.55), g: Math.round(c.g * 0.55), b: Math.round(c.b * 0.55) };
        setBg(rgbToCss(dark, 1));
      } catch {
        // If canvas is tainted by CORS, keep fallback
      }
    };
  }, [posterUrl, movie.poster_path]);

  return (
    <div
      className="w-full min-h-screen md:min-h-11/12 relative p-7"
      style={{ backgroundColor: bg }}
    >
      {/* background image layer */}
      <div className="absolute inset-0 blur-[1px] opacity-20 overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full -translate-y-[20%]"
          src={posterUrl}
          alt={movie.title}
        />
      </div>

      {/* content */}
      <div className="relative w-[95%] mx-auto flex flex-row gap-5 text-white flex-wrap md:flex-nowrap">
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
            <p className="text-md leading-relaxed">{movie.overview}</p>

            <div className="mt-5 flex flex-col gap-2 text-[1.1rem]">
                <p>
                    Status: <span className="text-slate-200">{movie.status}</span>
                </p>
                <p >
                    Rating: <span className="text-slate-200">{Math.round(movie.vote_average * 10)}%</span>
                </p>
                <p>
                    Original language: <span className="text-slate-200">{movie.original_language.toUpperCase()}</span>
                </p>
                <p>
                    Budget:
                    <span className="text-slate-200">
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
                    <span className="text-slate-200">
                        {" "}
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                        }).format(movie.revenue)}
                    </span>
                </p>
                <p>
                    Official website: <a className="text-slate-200" href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
