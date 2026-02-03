"use client";

import { useGetAllGenreQuery } from "@/src/redux/features/genre/moviesByGenreApi";

export default function GenresPage() {
  

  return (
    <div>
      <h1 className="font-bold text-white text-4xl mb-2">Top Rated</h1>
      {/* <div className="flex flex-row overflow-x-auto gap-4 pb-5 no-scrollbar">
        {data?.results?.map((movie: any) => (
          <div className="shrink-0  w-100" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg hover:scale-105 transition-transform w-80 h-100"
            />
            <p key={movie.id} className="text-white font-bold text-xl mt-2 mb-2">{movie.title}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
