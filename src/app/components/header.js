import Image from "next/image";

export default function Header() {
  return (
    <header>
  <nav className="bg-slate-100 w-full h-12.5 border-b border-slate-500 flex items-center justify-start text-slate-800 gap-2 p-4 shadow-2xl">
    <a className="px-2 py-1 mr-24" href="/">
      <Image src="/assets/images/logo.png" alt="Pick A Movie" width={120} height={50} />
    </a>

    {/* Movies dropdown */}
    <div className="relative group">
      <button
        type="button"
        className="px-2 py-1 rounded-lg hover:text-indigo-900 hover:bg-slate-500 transition duration-500 ease-in-out inline-flex items-center gap-1
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
        <a className="block px-4 py-2 hover:bg-slate-100" href="/popular" role="menuitem">
          Popular
        </a>
        <a className="block px-4 py-2 hover:bg-slate-100" href="/top-rated" role="menuitem">
          Top Rated
        </a>
        <a className="block px-4 py-2 hover:bg-slate-100" href="/now-playing" role="menuitem">
          Now Playing
        </a>
        <a className="block px-4 py-2 hover:bg-slate-100" href="/upcoming" role="menuitem">
          Upcoming
        </a>
      </div>
    </div>

    {/* Series dropdown */}
    <div className="relative group">
      <button
        type="button"
        className="px-2 py-1 rounded-lg hover:text-indigo-900 hover:bg-slate-500 transition duration-500 ease-in-out inline-flex items-center gap-1
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
        <a className="block px-4 py-2 hover:bg-slate-100" href="/series/popular" role="menuitem">
          Popular
        </a>
        <a className="block px-4 py-2 hover:bg-slate-100" href="/series/top-rated" role="menuitem">
          Top Rated
        </a>
        <a className="block px-4 py-2 hover:bg-slate-100" href="/series/airing-today" role="menuitem">
          Airing Today
        </a>
        <a className="block px-4 py-2 hover:bg-slate-100" href="/series/on-the-air" role="menuitem">
          On The Air
        </a>
      </div>
    </div>

    {/* People dropdown */}
    <div className="relative group">
      <button
        type="button"
        className="px-2 py-1 rounded-lg hover:text-indigo-900 hover:bg-slate-500 transition duration-500 ease-in-out inline-flex items-center gap-1
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
        <a className="block px-4 py-2 hover:bg-slate-100" href="/people/popular" role="menuitem">
          Popular People
        </a>
        <a className="block px-4 py-2 hover:bg-slate-100" href="/people/trending" role="menuitem">
          Trending
        </a>
      </div>
    </div>
  </nav>
</header>

  )};