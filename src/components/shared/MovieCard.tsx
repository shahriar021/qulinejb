import React, { useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "../lib/constants";
import { MovieCardProp } from "@/src/types/movie";
import Link from "next/link";
import { ClockIcon,XMarkIcon } from "@heroicons/react/24/solid";
import { toggleWatchLater } from "@/src/utils/toggleWatchLater";

const MovieCard: React.FC<MovieCardProp> = ({ movie, actions = { watchLater: true } }) => {
  const [saveToWatch, setSaveToWatch] = useState(false);
  const [watchLaterIds, setWatchLaterIds] = useState<string[]>(() => {
    const stored = localStorage.getItem("watch_later");
    return stored ? JSON.parse(stored) : [];
  });

  const handleWatchLater = () => {
    setWatchLaterIds((prev) => toggleWatchLater(movie.id, prev,actions.remove));
    setSaveToWatch(prev=>!prev); 
  };

  return (
    <div className="relative shrink-0 w-48 sm:w-56 md:w-64 hover:cursor-pointer">
      <Link href={`/movies/${movie.id}`} className="block">
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg hover:scale-105 transition-transform w-full h-auto"
        />
        <p className="text-white font-bold texl-lg mt-2 absolute bg-black/50 text-center z-10 bottom-0 w-full">{movie.title}</p>
      </Link>

      {/*this section is for watch later */}
      <div className="absolute top-0 right-0 hover:cursor-pointer z-50 ">
        {actions.watchLater && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWatchLater();
            }}
            className="bg-black/70 p-3 rounded-full"
          >
            {!saveToWatch ? "⏰ watch later" : <ClockIcon className="h-6 w-6 text-blue-500" />}
          </button>
        )}

        {actions.remove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWatchLater();
            }}
            className="bg-black/70 p-3 rounded-full"
          >
            <XMarkIcon className="h-6 w-6 text-blue-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
