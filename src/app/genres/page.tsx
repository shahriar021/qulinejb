"use client";

import { sortData } from "@/src/components/lib/constants";
import ErrorMessage from "@/src/components/shared/ErrorMessage";
import MovieCard from "@/src/components/shared/MovieCard";
import MovieCardSkeleton from "@/src/components/shared/MovieCardSkeleton";
import { useWatchLaterContext } from "@/src/context/WatchLaterContext";
import { useGetAllGenreQuery, useGetMoviesByGenreQuery } from "@/src/redux/features/genre/moviesByGenreApi";
import { Genres } from "@/src/types/genre";
import { Movie } from "@/src/types/movie";
import Image from "next/image";
import { useState } from "react";

export default function GenresPage() {
  const { watchLaterIds, toggleWatchLater } = useWatchLaterContext();
  const [showSortOption, setShowSortOption] = useState(false);
  const [sortOption, setSortOption] = useState<{} | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genres | null>(null);

  const { data: getAllGenre, isLoading: isGenreLoading, error: genreError } = useGetAllGenreQuery();
  const {
    data: getMoviesByGenre,
    isLoading: isGenreMovies,
    error: genreMovies,
  } = useGetMoviesByGenreQuery({ genreId: selectedGenre?.id, sortBy: sortOption });

  if (genreError || genreMovies)
    return <ErrorMessage message={"Something wrong with genre list. Please Try again."} onRetry={() => window.location.reload()} />;

  const handleSort = (value: string) => {
    setSortOption(value);
    setShowSortOption(false);
  };

  return (
    <div>
      <div className="relative w-full h-96 ">
        <Image src="/images/movieBg.webp" alt="genre" fill className="object-cover" />
        <p className="font-bold text-white text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{selectedGenre?.name}</p>
      </div>

      <div className="p-5">
        
        <div className="flex items-center justify-between mb-2 ">
          <h1 className="font-bold text-foreground text-2xl mb-2 mt-2">Choose Your Genre</h1>
          <div className="border border-foreground rounded-2xl p-2 hover:cursor-pointer" onClick={() => setShowSortOption(!showSortOption)}>
            <p>sort by</p>
          </div>
        </div>

        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar relative">
          {getAllGenre?.genres?.map((movie: Genres) => (
            <div
              className="shrink-0 flex  w-80 h-50 bg-blue-300 items-center justify-center rounded-3xl bg-linear-to-br from-blue-600 via-purple-600 to-pink-500"
              key={movie.id}
              onClick={() => setSelectedGenre(movie)}
            >
              <p key={movie.id} className="text-white font-bold text-xl mt-2 mb-2">
                {movie.name}
              </p>
            </div>
          ))}
          {showSortOption && (
            <div className="absolute bg-background right-0 p-2 rounded-2xl">
              {Object.entries(sortData).map(([key, value]) => (
                <p key={key} className="text-foreground font-medium m-2 hover:cursor-pointer" onClick={() => handleSort(value)}>
                  {key}
                </p>
              ))}
            </div>
          )}
        </div>

        <h1 className="font-bold text-foreground text-2xl mt-2 mb-2">{selectedGenre?.name}</h1>

        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar mt-3">
          {isGenreMovies || isGenreLoading
            ? Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
            : getMoviesByGenre?.results?.map((movie: Movie) => {
              const isInWatchLater = watchLaterIds.includes(movie.id.toString())
              return (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  actions={{ watchLater: true }}
                  isInWatchLater={isInWatchLater}
                  onWatchLater={() => toggleWatchLater(movie.id)}
                />
              )})}
        </div>
      </div>
    </div>
  );
}
