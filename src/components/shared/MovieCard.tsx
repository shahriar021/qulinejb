import React from "react";
import { TMDB_IMAGE_BASE_URL } from "../lib/constants";
import {  MovieCardProp } from "@/src/types/movie";

const MovieCard:React.FC<MovieCardProp> = ({ movie }) => {

  return (
    <div className="shrink-0 w-48 sm:w-56 md:w-64 hover:cursor-pointer relative" >
      <img
        src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg hover:scale-105 transition-transform w-full h-auto"
      />
      <p className="text-white font-bold texl-lg mt-2 absolute bg-black/50 text-center z-10 bottom-0 w-full">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
