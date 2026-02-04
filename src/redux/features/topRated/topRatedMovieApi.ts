import {  MovieResponse } from "@/src/types/movie";
import { baseApi } from "../../createdApi/baseApi";

const topRated = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopRated: builder.query<MovieResponse, void>({
      query: () => {
        return {
          url: "/movie/top_rated",
          method: "GET",
        };
      },
    }),
  }),
});

export const {useGetTopRatedQuery} = topRated