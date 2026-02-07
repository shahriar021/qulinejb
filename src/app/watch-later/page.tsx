"use client";
import ErrorMessage from "@/src/components/shared/ErrorMessage";
import MovieCard from "@/src/components/shared/MovieCard";
import MovieCardSkeleton from "@/src/components/shared/MovieCardSkeleton";
import { movieDetails } from "@/src/redux/features/movieDetails/movieDetails";
import { useAppDispatch } from "@/src/redux/hooks";
import { Movie } from "@/src/types/movie";
import { toggleWatchLater } from "@/src/utils/toggleWatchLater";
import React, { useEffect, useState } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const [watchLaterIds, setWatchLaterIds] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
         setError("something went wrong in watch later page. Please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [watchLaterIds, dispatch]);

  const handleRemove = (id: number) => {
    setWatchLaterIds((prev) => toggleWatchLater(id, prev, true));
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div>
      <section className="relative w-full h-auto md:h-64 bg-linear-to-r from-purple-900 to-black overflow-hidden flex flex-col md:flex-row items-center">
        
        <div className="flex-1 text-white z-20 p-6 bg-linear-to-r from-purple-600 via-pink-500 to-red-500 rounded-xl shadow-lg m-4 w-[calc(100%-2rem)] md:w-auto">
          <h2 className="text-2xl md:text-3xl font-bold">🎬 Your Watch Later Collection</h2>
          <p className="mt-2 text-gray-100 text-sm md:text-base">
            You’ve saved <span className="font-bold text-yellow-300">{movies?.length}</span> {movies?.length === 1 ? "movie" : "movies"} to
            watch later. Pick a movie and enjoy!
          </p>
        </div>

        
        <div className="relative w-full md:w-1/3 lg:flex-[0.4] h-40 md:h-full shrink-0 z-10 overflow-hidden">
          <img src="/images/allMovies.jpg" alt="Movies Illustration" className="w-full h-full object-cover object-center md:object-right" />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-l from-transparent via-black/20 to-purple-900 md:to-black"></div>
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

