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
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });
  const cast_res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });
  const video_res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });
  const images_res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });
  const review_res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });
  const details_res = await fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });
  const recommendations_res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`, {
      headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
      },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie. Id: " + id + " Status: " + res.status);
  }
  if (!cast_res.ok) {
    throw new Error("Failed to fetch movie cast. Id: " + id + " Status: " + cast_res.status);
  }
  if (!video_res.ok) {
    throw new Error("Failed to fetch movie videos. Id: " + id + " Status: " + video_res.status);
  }
  if (!images_res.ok) {
    throw new Error("Failed to fetch movie images. Id: " + id + " Status: " + images_res.status);
  }
  if (!review_res.ok) {
    throw new Error("Failed to fetch movie images. Id: " + id + " Status: " + review_res.status);
  }
  if (!details_res.ok) {
    throw new Error("Failed to fetch movie images. Id: " + id + " Status: " + details_res.status);
  }
  if (!recommendations_res.ok) {
    throw new Error("Failed to fetch movie images. Id: " + id + " Status: " + recommendations_res.status);
  }

  const movie = await res.json();
  const movie_cast = await cast_res.json();
  const movie_videos = await video_res.json();
  const movie_images = await images_res.json();
  const movie_reviews = await review_res.json();
  const movie_details = await details_res.json();
  const movie_recommendations = await recommendations_res.json();
  

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