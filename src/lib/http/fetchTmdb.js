// src/lib/http/fetchTmdb.js

/**
 * Server-side fetch helper for TMDB API.
 * - Injects Authorization header automatically
 * - Enforces JSON responses
 * - Supports Next.js revalidation
 * - Normalises errors
 *
 * IMPORTANT:
 * This file is intended for SERVER usage only.
 */

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTmdb(path, options = {}) {
  const {
    params,
    revalidate = 60, // short revalidation strategy (seconds)
  } = options;

  const url = new URL(`${TMDB_BASE_URL}${path}`);

  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
    next: {
      revalidate,
    },
  });

  if (!res.ok) {
    let payload = null;
    try {
      payload = await res.json();
    } catch {
      // ignore JSON parse failure
    }

    const error = new Error(
      `TMDB request failed: ${res.status} ${res.statusText} (${path})`
    );
    error.status = res.status;
    error.payload = payload;
    throw error;
  }

  return res.json();
}
