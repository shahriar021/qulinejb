"use client";
import MovieCard from "@/src/components/shared/MovieCard";
import MovieCardSkeleton from "@/src/components/shared/MovieCardSkeleton";
import { movieDetails } from "@/src/redux/features/movieDetails/movieDetails";
import { useAppDispatch } from "@/src/redux/hooks";
import { Movie } from "@/src/types/movie";
import { toggleWatchLater } from "@/src/utils/toggleWatchLater";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const [watchLaterIds, setWatchLaterIds] = useState<string[] | null>(null);
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const stored = localStorage.getItem("watch_later");
    if (stored) {
      setWatchLaterIds(JSON.parse(stored));
    }

  },[])

  useEffect(() => {

    if (!watchLaterIds?.length) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          watchLaterIds?.map((id: string) => dispatch(movieDetails.endpoints.getMovieDetails.initiate(id))),
        );

        const fetchedMovies = results.map((res) => res.data).filter((m) => m !== undefined);

        setMovies(fetchedMovies);
      } catch (err) {
        console.error("Error fetching recently viewed movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [watchLaterIds, dispatch]);

  const handleRemove = (id: number) => {
    setWatchLaterIds((prev) => toggleWatchLater(id, prev, true));
  };

  return (
    <div>
      <section className="relative w-full h-64 bg-linear-to-r from-purple-900  to-black overflow-hidden flex items-center">
        <div className="flex-1 text-white z-10 p-6 bg-linear-to-r from-purple-600 via-pink-500 to-red-500 rounded-xl shadow-lg m-3">
          <h2 className="text-3xl font-bold">🎬 Your Watch Later Collection</h2>
          <p className="mt-2 text-gray-100 text-sm md:text-base mb-4">
            You’ve saved {movies?.length} {movies?.length === 1 ? "movie" : "movies"} to watch later. Pick a movie and enjoy
            your next movie night!
          </p>
        </div>

        <div className="relative flex-[0.4] md:w-64 h-full shrink-0 ml-6 z-10">
          <img src="/images/allMovies.jpg" alt="Movies Illustration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-l from-transparent via-black/40 to-black"></div>
        </div>
      </section>

      <div className="p-5">
        <h1 className="font-bold text-foreground text-2xl mb-2">Your Watch Later</h1>
        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar mt-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
          ) : !movies?.length ? (
            <div className="flex items-center justify-center w-full">
              <h3 className=" ">😩 Oops! Your watch later list is empty… go explore some movies and fill it up!</h3>
            </div>
          ) : (
            movies?.map((movie: Movie) => <MovieCard movie={movie} key={movie.id} actions={{ remove: true }} onRemove={handleRemove} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

