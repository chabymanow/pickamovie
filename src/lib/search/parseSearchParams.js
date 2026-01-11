// src/lib/search/parseSearchParams.js

import { ALLOWED_SEARCH_TYPES, DEFAULT_SEARCH_TYPE } from "./searchTypes";

function parseCsv(v) {
  if (!v || typeof v !== "string") return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Normalises and validates incoming searchParams from Next.js App Router.
 * Keeps URL as the source of truth.
 */
export function parseSearchParams(searchParams) {
  const qRaw = typeof searchParams?.q === "string" ? searchParams.q : "";
  const q = qRaw.trim().slice(0, 120);

  const typeRaw =
    typeof searchParams?.type === "string" ? searchParams.type : DEFAULT_SEARCH_TYPE;
  const type = ALLOWED_SEARCH_TYPES.has(typeRaw) ? typeRaw : DEFAULT_SEARCH_TYPE;

  const pageRaw = typeof searchParams?.page === "string" ? searchParams.page : "1";
  const pageNum = Number.parseInt(pageRaw, 10);
  const page = Number.isFinite(pageNum) && pageNum >= 1 && pageNum <= 500 ? pageNum : 1;

  const includeAdult = searchParams?.include_adult === "true";
  const language = typeof searchParams?.language === "string" ? searchParams.language : "en-GB";

  // Filters (URL-driven)
  const genre = parseCsv(searchParams?.genre); // array of genre ids as strings
  const from = typeof searchParams?.from === "string" ? searchParams.from : "";
  const to = typeof searchParams?.to === "string" ? searchParams.to : "";

  return {
    q,
    type,
    page,
    includeAdult,
    language,
    genre,
    from,
    to,
  };
}
