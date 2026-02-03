import { useGetAllGenreQuery, useGetMoviesByGenreQuery } from '@/src/redux/features/genre/moviesByGenreApi';
import React, { useState } from 'react';
import MovieCard from '../shared/MovieCard';

const GenreSection = () => {
    
    const [selectedGenre,setSelectedGenre]=useState()
    const { data: getAllGenre, isLoading, error } = useGetAllGenreQuery();
    const { data:getMoviesByGenre}=useGetMoviesByGenreQuery(selectedGenre)

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading top rated movies</p>;
    console.log(getMoviesByGenre);

    return (
      <div>
        <h1 className="font-bold text-white text-4xl mb-2">All Genre</h1>
        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar">
          {getAllGenre?.genres?.map((movie) => (
            <div
              className="shrink-0 flex  w-80 h-50 bg-blue-300 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"
              key={movie.id}
              onClick={() => setSelectedGenre(movie.id)}
            >
              <p key={movie.id} className="text-white font-bold text-xl mt-2 mb-2">
                {movie.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar mt-3">
          {getMoviesByGenre?.results?.slice(0,5)?.map((movie:any) => (
            <MovieCard movie={movie}/>
          ))}
        </div>
      </div>
    );
}

export default GenreSection;
