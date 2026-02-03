import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_TMDB_BASE_URL,

  prepareHeaders: (headers) => {
    const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["getCart", "feedPost", "favProduct", "profile", "product"],
  endpoints: () => ({}),
});

