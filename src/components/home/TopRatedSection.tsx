import { useGetTopRatedQuery } from "@/src/redux/features/topRated/topRatedMovieApi";
import React, { useEffect, useState } from "react";
import MovieCard from "../shared/MovieCard";
import MovieCardSkeleton from "../shared/MovieCardSkeleton";
import ErrorMessage from "../shared/ErrorMessage";
import { Movie } from "@/src/types/movie";
import { useWatchLaterContext } from "@/src/context/WatchLaterContext";

const TopRatedSection = () => {
  const { data: getTopRatedMovies, isLoading, error } = useGetTopRatedQuery();
   const { watchLaterIds, toggleWatchLater } = useWatchLaterContext();

  if(error){
    return <ErrorMessage message={"Some thing wrong with top rated movies. Please wait."} onRetry={()=>window.location.reload()}/>
  }

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
                isInWatchLater={isInWatchLater} // pass it explicitly
                onWatchLater={() => toggleWatchLater(movie.id)}
              />
            )})}
      </div>
    </div>
  );
};

export default TopRatedSection;
