import { useGetTopRatedQuery } from "@/src/redux/features/topRated/topRatedMovieApi";
import React from "react";
import MovieCard from "../shared/MovieCard";
import MovieCardSkeleton from "../shared/MovieCardSkeleton";
import ErrorMessage from "../shared/ErrorMessage";

const TopRatedSection = () => {
  const { data: getTopRatedMovies, isLoading, error } = useGetTopRatedQuery();

  if(error){
    return <ErrorMessage message={"Some thing wrong with top rated movies. Please wait."} onRetry={()=>window.location.reload()}/>
  }

  return (
    <div>
      <h1 className="font-bold text-white text-4xl mb-2">Top Rated</h1>
      <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : getTopRatedMovies?.results?.map((movie: any) => <MovieCard movie={movie} />)}
      </div>
    </div>
  );
};

export default TopRatedSection;
