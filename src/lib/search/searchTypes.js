// src/lib/search/searchTypes.js

/**
 * Allowed search types for the /search page.
 * Keep this small and explicit to avoid unexpected query shapes.
 */
export const SEARCH_TYPES = {
  MULTI: "multi",
  MOVIE: "movie",
  TV: "tv",
  PERSON: "person",
};

export const DEFAULT_SEARCH_TYPE = SEARCH_TYPES.MULTI;

export const ALLOWED_SEARCH_TYPES = new Set(Object.values(SEARCH_TYPES));
