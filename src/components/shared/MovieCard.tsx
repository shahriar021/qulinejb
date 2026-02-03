import React from "react";
import { TMDB_IMAGE_BASE_URL } from "../lib/constants";

const MovieCard = ({ movie }: any) => {
  return (
    <div className="shrink-0 w-48 sm:w-56 md:w-64 hover:cursor-pointer" key={movie.id}>
      <img
        src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg hover:scale-105 transition-transform w-full h-auto"
      />
      <p className="text-white font-bold text-xl mt-2 mb-2">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
