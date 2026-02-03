import { baseApi } from "../../createdApi/baseApi";

const topRated = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopRated: builder.query<any,void>({
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