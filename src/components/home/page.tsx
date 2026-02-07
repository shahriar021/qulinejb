"use client";

import React from "react";
import TopRatedSection from "./TopRatedSection";
import GenreSection from "./GenreSection";
import { useGetTopRatedQuery } from "@/src/redux/features/topRated/topRatedMovieApi";
import ErrorMessage from "../shared/ErrorMessage";
import { useGetAllGenreQuery } from "@/src/redux/features/genre/moviesByGenreApi";

const HomeSection = () => {
   const {error:topRatedError } = useGetTopRatedQuery();
   const {error:genreError } = useGetAllGenreQuery();

  if (topRatedError || genreError) {
    return <ErrorMessage message={"Something wrong with home page. Please wait."} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="p-5">
      <TopRatedSection />
      <GenreSection />
    </div>
  );
};

export default HomeSection;
