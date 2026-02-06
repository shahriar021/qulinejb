"use client";
import MovieCard from "@/src/components/shared/MovieCard";
import { useGetSearchItemQuery } from "@/src/redux/features/search/searchApi";
import { useGetTopRatedQuery } from "@/src/redux/features/topRated/topRatedMovieApi";
import React, { useState } from "react";

const Page = () => {
  const [query, setQuery] = useState("");
  const { data: getTopRatedMovies } = useGetTopRatedQuery();
  const {data:getSearchMovies}=useGetSearchItemQuery(query)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div>
      <div className="p-5">
        <input type="text" value={query} onChange={handleChange} placeholder="Search movies..." className="p-2 rounded w-full " />
        <div className="w-full border border-white" />
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-12">
          {(getSearchMovies?.results.length > 0 ? getSearchMovies?.results : getTopRatedMovies?.results)?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} actions={{ watchLater: true }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
