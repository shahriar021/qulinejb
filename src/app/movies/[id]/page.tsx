"use client";
import { TMDB_IMAGE_BASE_URL } from "@/src/components/lib/constants";
import { useGetCastListQuery, useGetMovieDetailsQuery } from "@/src/redux/features/movieDetails/movieDetails";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { useGetMoviesByGenreQuery } from "@/src/redux/features/genre/moviesByGenreApi";
import MovieCardSkeleton from "@/src/components/shared/MovieCardSkeleton";
import { CastMember, Movie } from "@/src/types/movie";
import MovieCard from "@/src/components/shared/MovieCard";
import { saveRecentWatchedmoviess } from "@/src/utils/saveRecentMovies";
import { Genres } from "@/src/types/genre";
import ErrorMessage from "@/src/components/shared/ErrorMessage";

const Page = () => {
  const params = useParams();
  const movieId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: getMovieDetails,error:detailsError } = useGetMovieDetailsQuery(movieId);
  const {data:getCastList}=useGetCastListQuery(movieId)
  const genresIds = getMovieDetails?.genres?.map((item: Genres) => item.id).join(",");
  const {data: getMoviesByGenre,isLoading: isGenreMovies,error: genreMovies} = useGetMoviesByGenreQuery({ genreId: genresIds, sortBy: "popularity.desc" });

  if (detailsError || genreMovies) {
    return <ErrorMessage message={"Some thing wrong with Details page. Please wait."} onRetry={() => window.location.reload()} />;
  }

  useEffect(()=>{
    if(movieId){
      saveRecentWatchedmoviess(movieId)
    }
  },[movieId])

  return (
    <div>
      
      <div className="block lg:hidden w-full">
        <div className="relative h-62.5 w-full">
          <img src={`${TMDB_IMAGE_BASE_URL}${getMovieDetails?.backdrop_path}`} className="w-full h-full object-cover" alt="backdrop" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="px-5 -mt-20 relative z-10 flex flex-col gap-4">
          <div className="w-40 rounded-xl overflow-hidden shadow-xl">
            <img src={`${TMDB_IMAGE_BASE_URL}${getMovieDetails?.poster_path}`} alt="poster" className="w-full h-auto" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">{getMovieDetails?.title}</h2>
            <p className="text-blue-500 font-medium">
              {getMovieDetails?.release_date?.slice(0, 4)} • {getMovieDetails?.runtime} min
            </p>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{getMovieDetails?.overview}</p>

            <div className="mt-4 p-3 bg-foreground/5 rounded-lg">
              <p className="text-xs font-bold uppercase tracking-wider opacity-50">Cast</p>
              <p className="text-sm">
                {getCastList?.cast
                  ?.slice(0, 15)
                  .map((item: any) => item.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="hidden lg:block relative w-full h-125">
        <img src={`${TMDB_IMAGE_BASE_URL}${getMovieDetails?.backdrop_path}`} alt="genre" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/90 flex items-center px-8 gap-8 text-white">
          {getMovieDetails?.poster_path && (
            <div className="w-56 shrink-0 rounded-2xl overflow-hidden">
              <img src={`${TMDB_IMAGE_BASE_URL}${getMovieDetails.poster_path}`} alt="poster" className="w-full h-auto" />
            </div>
          )}

          <div className="w-full">
            <div className="inline-flex items-center justify-between w-full">
              <h2 className="text-4xl font-bold">{getMovieDetails?.title}</h2>
              <h2 className="text-4xl font-bold">{getMovieDetails?.release_date?.slice(0, 4)}</h2>
            </div>
            <p className="mt-3 text-base text-gray-200">{getMovieDetails?.overview}</p>

            <div className="flex gap-6 mt-3">
              <p className="text-gray-200 inline-flex gap-1">
                <ClockIcon className="h-6 w-6 text-blue-500" /> {getMovieDetails?.runtime} min
              </p>
              <p className="text-gray-200 inline-flex gap-1">
                <StarIcon className="h-6 w-6 text-amber-400" /> {getMovieDetails?.vote_average}/10
              </p>
            </div>

            <p className="mt-4 flex flex-row gap-2">
              <span className="font-bold text-blue-400">Genre:</span>
              {getMovieDetails?.genres?.map((item: Genres) => (
                <span key={item.id}>{item.name}</span>
              ))}
            </p>

            <p className="mt-4 underline decoration-blue-500 underline-offset-4">Cast</p>
            <div className="flex flex-row flex-wrap gap-1 text-sm text-gray-300">
              {getCastList?.cast
                ?.slice(0, 25)
                .map((item: any) => item.name)
                .join(", ")}
            </div>
          </div>
        </div>
      </div>


      <div className="p-5">
        <p className="text-foreground font-bold text-2xl">Similar picks</p>
        <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar mt-3">
          {isGenreMovies
            ? Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
            : getMoviesByGenre?.results?.map((movie: Movie) => <MovieCard movie={movie} key={movie.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Page;
