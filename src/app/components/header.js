"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


    



function NavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Optional: prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="w-full">
      <nav className="bg-slate-100 w-full border-b border-slate-500 text-slate-800 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between md:justify-start px-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-10">
            <Image
              src="/assets/images/logo.png"
              alt="Pick A Movie"
              width={120}
              height={50}
              priority
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Movies dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="px-2 py-1 rounded-lg hover:text-indigo-900 hover:bg-slate-200 transition inline-flex items-center gap-1
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-haspopup="true"
              >
                Movies
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-slate-300 bg-white shadow-lg overflow-hidden
                           opacity-0 invisible translate-y-1
                           group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                           group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0
                           transition-all duration-200 z-50"
                role="menu"
              >
                <NavLink href="/popular">Popular</NavLink>
                <NavLink href="/top-rated">Top Rated</NavLink>
                <NavLink href="/now-playing">Now Playing</NavLink>
                <NavLink href="/upcoming">Upcoming</NavLink>
              </div>
            </div>

            {/* Series dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="px-2 py-1 rounded-lg hover:text-indigo-900 hover:bg-slate-200 transition inline-flex items-center gap-1
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-haspopup="true"
              >
                Series
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-slate-300 bg-white shadow-lg overflow-hidden
                           opacity-0 invisible translate-y-1
                           group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                           group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0
                           transition-all duration-200 z-50"
                role="menu"
              >
                <NavLink href="/series/popular">Popular</NavLink>
                <NavLink href="/series/top-rated">Top Rated</NavLink>
                <NavLink href="/series/airing-today">Airing Today</NavLink>
                <NavLink href="/series/on-the-air">On The Air</NavLink>
              </div>
            </div>

            {/* People dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="px-2 py-1 rounded-lg hover:text-indigo-900 hover:bg-slate-200 transition inline-flex items-center gap-1
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-haspopup="true"
              >
                People
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-slate-300 bg-white shadow-lg overflow-hidden
                           opacity-0 invisible translate-y-1
                           group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                           group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0
                           transition-all duration-200 z-50"
                role="menu"
              >
                <NavLink href="/people/popular">Popular People</NavLink>
                <NavLink href="/people/trending">Trending</NavLink>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              // X icon
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile panel (all submenus shown as normal menu) */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-300">
            <div className="px-2 py-3 space-y-3">
              <div>
                <p className="px-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Movies</p>
                <div className="mt-1">
                  <NavLink href="/popular" onClick={() => setMobileOpen(false)}>Popular</NavLink>
                  <NavLink href="/top-rated" onClick={() => setMobileOpen(false)}>Top Rated</NavLink>
                  <NavLink href="/now-playing" onClick={() => setMobileOpen(false)}>Now Playing</NavLink>
                  <NavLink href="/upcoming" onClick={() => setMobileOpen(false)}>Upcoming</NavLink>
                </div>
              </div>

              <div>
                <p className="px-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Series</p>
                <div className="mt-1">
                  <NavLink href="/series/popular" onClick={() => setMobileOpen(false)}>Popular</NavLink>
                  <NavLink href="/series/top-rated" onClick={() => setMobileOpen(false)}>Top Rated</NavLink>
                  <NavLink href="/series/airing-today" onClick={() => setMobileOpen(false)}>Airing Today</NavLink>
                  <NavLink href="/series/on-the-air" onClick={() => setMobileOpen(false)}>On The Air</NavLink>
                </div>
              </div>

              <div>
                <p className="px-4 text-xs font-semibold uppercase tracking-wide text-slate-500">People</p>
                <div className="mt-1">
                  <NavLink href="/people/popular" onClick={() => setMobileOpen(false)}>Popular People</NavLink>
                  <NavLink href="/people/trending" onClick={() => setMobileOpen(false)}>Trending</NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Optional: click-away overlay for mobile */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="md:hidden fixed inset-0 bg-black/10"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}

