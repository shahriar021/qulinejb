import { GenresResponse } from "@/src/types/genre";
import { baseApi } from "../../createdApi/baseApi";

const genreMovies = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGenre: builder.query<GenresResponse, void>({
      query: () => {
        return {
          url: "/genre/movie/list",
          method: "GET",
        };
      },
    }),

    getMoviesByGenre: builder.query({
      query: (genreId) => {
        return {
          url: "/discover/movie",
          params: {
            with_genres: genreId,
            language: "en-US",
            sort_by: "popularity.desc",
          },
        };
      },
    }),
  }),
});

export const { useGetAllGenreQuery,useGetMoviesByGenreQuery } = genreMovies;