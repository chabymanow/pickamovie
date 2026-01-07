import MovieHero from "./MovieHero";
import MovieCast from "./MovieCast";
import MovieVideos from "./MovieVideos";
import MovieImages from "./MovieImages";
import MovieReviews from "./MovieReviews";
import MovieDetails from "./MovieDetails";
import MovieRecommendations from "./MovieRecommendations";

export default async function MoviePage({ params }) {
  const { id } = await params;
  const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
    // const URL = "https://api.themoviedb.org/3/movie/popular";
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos,images,reviews,external_ids,recommendations`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie. Id: " + id + " Status: " + res.status);
  }

  const movie = await res.json();
  const movie_cast = await movie.credits;
  const movie_videos = await movie.videos;
  const movie_images = await movie.images;
  const movie_reviews = await movie.reviews;
  const movie_details = await movie.external_ids;
  const movie_recommendations = await movie.recommendations;

  return (
    <div>
      <MovieHero movie={movie} />
      <div className="p-10 background-white">
        <MovieDetails movie_details={movie_details} movie_companies={movie.production_companies}/>
        <MovieCast movie_cast={movie_cast} />
        <div className="mt-5 relative bg-gray-200 h-0.5 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:pointer-events-none after:z-20 after:shadow-sm"></div>
        <MovieReviews movie_reviews={movie_reviews.results} />
        <div className="mt-5 relative bg-gray-200 h-0.5 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:pointer-events-none after:z-20 after:shadow-sm"></div>
        <MovieVideos movie_videos={movie_videos} />
        <div className="mt-5 relative bg-gray-200 h-0.5 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:pointer-events-none after:z-20 after:shadow-sm"></div>
        <MovieImages movie_images={movie_images} movie_id={movie.id} />
        <div className="mt-5 relative bg-gray-200 h-0.5 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:pointer-events-none after:z-20 after:shadow-sm"></div>
        <MovieRecommendations movie_recommendations={movie_recommendations.results}/>
      </div>
    </div>
  );

}