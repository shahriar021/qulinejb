import { useGetAllGenreQuery, useGetMoviesByGenreQuery } from '@/src/redux/features/genre/moviesByGenreApi';
import React, { useState } from 'react';
import MovieCard from '../shared/MovieCard';
import ErrorMessage from '../shared/ErrorMessage';
import MovieCardSkeleton from '../shared/MovieCardSkeleton';
import { Genres } from '@/src/types/genre';
import { Movie } from '@/src/types/movie';

const GenreSection = () => {
    
    const [selectedGenre,setSelectedGenre]=useState<Genres | null>(null)
    const { data: getAllGenre, isLoading:isGenreLoading, error:genreError } = useGetAllGenreQuery();
    const { data:getMoviesByGenre,isLoading:isGenreMovies,error:genreMovies}=useGetMoviesByGenreQuery({genreId:selectedGenre?.id,sortBy:"popularity.desc"})
   
    if (genreError || genreMovies) return <ErrorMessage message={"Something wrong with genre list. Please Try again."} onRetry={()=>window.location.reload()}/>;

    return (
      <div>
        <h1 className="font-bold text-white text-2xl mb-2 mt-2">All Genre</h1>
        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar">
          {getAllGenre?.genres?.map((movie:Genres) => (
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
        </div>

        <h1 className="font-bold text-white text-2xl mt-2 mb-2">{selectedGenre?.name}</h1>

        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar mt-3">
          {isGenreMovies || isGenreLoading
            ? Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i}/>)
            : getMoviesByGenre?.results?.slice(0, 5)?.map((movie: Movie) => <MovieCard movie={movie} key={movie.id}/>)}
        </div>
      </div>
    );
}

export default GenreSection;
