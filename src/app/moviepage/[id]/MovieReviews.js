"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MovieReviews({ movie_reviews }){
    const [isOpen, setIsOpen] = useState(false);
    return(
 <div>
      <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-800">Reviews <span className="text-xl font-light">({movie_reviews.length})</span></h2>

      {/* Wrapper that collapses EVERYTHING */}
      <div className="relative">
        <div
           className={[
                "w-10/12 mx-auto flex flex-col gap-5 transition-all duration-300",
                isOpen
                ? "max-h-none"
                : "max-h-75 overflow-hidden fade-mask",
            ].join(" ")}
        >
          {movie_reviews.map((review) => (
            <div
              key={review.id}
              className="w-full p-5 border border-slate-300 rounded-xl flex flex-col"
            >
              <div className="mb-4">
                <p className="text-xl font-semibold underline">
                  Review by: {review.author}
                </p>
                <p className="text-xs">
                  Written by: {review.author} on {review.created_at}
                </p>
              </div>

<div className="prose prose-slate max-w-none dark:prose-invert">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
  >
    {review.content}
  </ReactMarkdown>
</div>
            </div>
          ))}
        </div>

        {/* Fade overlay when collapsed */}
        {!isOpen && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 
                  bg-linear-to-t from-slate-50/90 to-transparent backdrop-blur-[1px]" />
        )}
      </div>

      {/* Global toggle */}
      <div className="w-10/12 mx-auto mt-4">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="text-xl font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-4 hover:cursor-pointer"
        >
          {isOpen ? "Show less reviews ⬆" : "Show all reviews ⬇"}
        </button>
      </div>
    </div>
    )
}