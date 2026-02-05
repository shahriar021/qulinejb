import { baseApi } from "../../createdApi/baseApi";

export const movieDetails = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieDetails: builder.query({
      query: (movieId) => {
        return {
          url: `/movie/${movieId}`,
          method: "GET",
        };
      },
    }),
    getCastList: builder.query({
      query: (movieId) => {
        return {
          url: `/movie/${movieId}/credits`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {useGetMovieDetailsQuery,useGetCastListQuery} = movieDetails
