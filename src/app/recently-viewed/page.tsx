"use client";
import ErrorMessage from "@/src/components/shared/ErrorMessage";
import MovieCard from "@/src/components/shared/MovieCard";
import MovieCardSkeleton from "@/src/components/shared/MovieCardSkeleton";
import { useWatchLaterContext } from "@/src/context/WatchLaterContext";
import { movieDetails } from "@/src/redux/features/movieDetails/movieDetails";
import { useAppDispatch } from "@/src/redux/hooks";
import { Movie } from "@/src/types/movie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { watchLaterIds, toggleWatchLater } = useWatchLaterContext();
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecentlyViewedMovies = () => {
    const stored = localStorage.getItem("recently_wathced_movies");
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    const ids = getRecentlyViewedMovies();
    if (!ids.length) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(ids.map((id: string) => dispatch(movieDetails.endpoints.getMovieDetails.initiate(id))));

        const fetchedMovies = results.map((res) => res.data).filter((m) => m !== undefined);

        setMovies(fetchedMovies);
      } catch (err) {
        setError("something went wrong in recently viewed page. Please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [dispatch]);

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div>
      <section className="relative w-full h-auto md:h-64 bg-linear-to-r from-purple-900 to-black overflow-hidden flex flex-col md:flex-row items-center">
        
        <div className="flex-1 text-white z-20 p-6 md:p-10 w-full">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight">🎬 Discover Your Next Movie Adventure</h2>
          <p className="mt-2 text-gray-300 text-sm md:text-base mb-6 max-w-md">
            Explore trending movies, hidden gems, and create your own watchlist.
          </p>
          
          <div>
            <Link className="px-6 py-3 bg-blue-600 rounded shadow-lg hover:bg-blue-500 transition-all inline-block font-medium" href={"/"}>
              Explore Now
            </Link>
          </div>
        </div>

  
        <div className="relative w-full md:w-1/3 lg:flex-[0.4] h-48 md:h-full shrink-0 z-10 overflow-hidden">
          <img src="/images/allMovies.jpg" alt="Movies Illustration" className="w-full h-full object-cover object-center md:object-right" />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-l from-transparent via-black/20 to-purple-900 md:to-black"></div>
        </div>
      </section>

      <div className="p-5">
        <h1 className="font-bold text-foreground text-2xl mb-2">Recently Viewed</h1>
        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar mt-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
          ) : !movies?.length ? (
            <div className="flex items-center justify-center w-full">
              <h3 className=" ">😩 Oops! Your recently viewed list is empty… go explore some movies and fill it up!</h3>
            </div>
          ) : (
            movies?.map((movie: Movie) => {
              const isInWatchLater = watchLaterIds.includes(movie.id.toString());
              return (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  actions={{ watchLater: true }}
                  isInWatchLater={isInWatchLater}
                  onWatchLater={() => toggleWatchLater(movie.id)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
