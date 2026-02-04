"use client";
import { TMDB_IMAGE_BASE_URL } from "@/src/components/lib/constants";
import { useGetCastListQuery, useGetMovieDetailsQuery } from "@/src/redux/features/movieDetails/movieDetails";
import { useParams } from "next/navigation";
import React from "react";
import { ClockIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { useGetMoviesByGenreQuery } from "@/src/redux/features/genre/moviesByGenreApi";
import MovieCardSkeleton from "@/src/components/shared/MovieCardSkeleton";
import { Movie } from "@/src/types/movie";
import MovieCard from "@/src/components/shared/MovieCard";

const Page = () => {
  const params = useParams();
  const movieId = params.id;

  const { data: getMovieDetails } = useGetMovieDetailsQuery(movieId);
  const {data:getCastList}=useGetCastListQuery(movieId)
  const genresIds = getMovieDetails?.genres?.map(item=>item.id).join(",")
  const {
    data: getMoviesByGenre,
    isLoading: isGenreMovies,
    error: genreMovies,
  } = useGetMoviesByGenreQuery({ genreId: genresIds, sortBy: "popularity.desc" });
  console.log(getMoviesByGenre,"----");

  return (
    <div>
      <div className="relative w-full ">
        <img src={`${TMDB_IMAGE_BASE_URL}${getMovieDetails?.backdrop_path}`} alt="genre" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/90 flex items-center px-8 gap-8 text-white">
          {getMovieDetails?.poster_path && (
            <div className="w-40 sm:w-48 md:w-56 shrink-0 rounded-2xl overflow-hidden">
              <img src={`${TMDB_IMAGE_BASE_URL}${getMovieDetails.poster_path}`} alt="poster" className="w-full h-auto" />
            </div>
          )}

          <div className="w-full">
            <div className="inline-flex items-center justify-between w-full">
              <h2 className="text-3xl md:text-4xl font-bold">{getMovieDetails?.title}</h2>
              <h2 className="text-3xl md:text-4xl font-bold">{getMovieDetails?.release_date?.slice(0, 4)}</h2>
            </div>
            <p className="mt-3 text-sm md:text-base text-gray-200">{getMovieDetails?.overview}</p>
            <p className="mt-3 text-sm md:text-base text-gray-200 inline-flex gap-1">
              <ClockIcon className="h-6 w-6 text-blue-500" />
              {getMovieDetails?.runtime} min
            </p>{" "}
            <p className="mt-3 text-sm md:text-base text-gray-200 inline-flex gap-1">
              <StarIcon className="h-6 w-6 text-amber-400" />
              {getMovieDetails?.vote_average}/10
            </p>
            <p className="flex flex-row gap-2">
              Genre:
              {getMovieDetails?.genres?.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
            </p>
            <p className="underline">Cast</p>
            <div className="flex flex-row flex-wrap gap-0.5">{getCastList?.cast?.map((item) => item.name).join(",")}</div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-white font-bold text-2xl">Similar picks</p>
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
