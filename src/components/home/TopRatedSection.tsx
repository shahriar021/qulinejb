import { useGetTopRatedQuery } from "@/src/redux/features/topRated/topRatedMovieApi";
import React from "react";
import MovieCard from "../shared/MovieCard";
import MovieCardSkeleton from "../shared/MovieCardSkeleton";
import { Movie } from "@/src/types/movie";
import { useWatchLaterContext } from "@/src/context/WatchLaterContext";

const TopRatedSection = () => {
  const { data: getTopRatedMovies, isLoading } = useGetTopRatedQuery();
   const { watchLaterIds, toggleWatchLater } = useWatchLaterContext();

  return (
    <div>
      <h1 className="font-bold text-foreground text-2xl mb-2">Top Rated</h1>
      <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : getTopRatedMovies?.results?.map((movie: Movie) => {
            const isInWatchLater = watchLaterIds.includes(movie.id.toString());
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
  );
};

export default TopRatedSection;
