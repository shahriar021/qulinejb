"use client";
import MovieCard from "@/src/components/shared/MovieCard";
import MovieCardSkeleton from "@/src/components/shared/MovieCardSkeleton";
import { movieDetails } from "@/src/redux/features/movieDetails/movieDetails";
import { useAppDispatch } from "@/src/redux/hooks";
import { Movie } from "@/src/types/movie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const [loading, setLoading] = useState(false);

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
        console.error("Error fetching recently viewed movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <div>
      <section className="relative w-full h-64 bg-linear-to-r from-purple-900  to-black overflow-hidden flex items-center">
        <div className="flex-1 text-white z-10 p-6">
          <h2 className="text-3xl font-bold">🎬 Discover Your Next Movie Adventure</h2>
          <p className="mt-2 text-gray-300 text-sm md:text-base mb-4">
            Explore trending movies, hidden gems, and create your own watchlist.
          </p>
          <Link className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition" href={"/"}>
            Explore Now
          </Link>
        </div>

        <div className="relative flex-[0.4] md:w-64 h-full shrink-0 ml-6 z-10">
          <img src="/images/allMovies.jpg" alt="Movies Illustration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-l from-transparent via-black/40 to-black"></div>
        </div>
      </section>

      <div className="p-5">
        <h1 className="font-bold text-white text-2xl mb-2">Recently Viewed</h1>
        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar mt-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
          ) : !movies?.length ? (
            <div className="flex items-center justify-center w-full">
              <h3 className=" ">😩 Oops! Your recently viewed list is empty… go explore some movies and fill it up!</h3>
            </div>
          ) : (
            movies?.map((movie: Movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
