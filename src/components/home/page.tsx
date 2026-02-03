"use client";
import { useGetAllGenreQuery } from "@/src/redux/features/genre/moviesByGenreApi";
import { useGetTopRatedQuery } from "@/src/redux/features/topRated/topRatedMovieApi";
import Link from "next/link";
import React from "react";
import TopRatedSection from "./TopRatedSection";
import GenreSection from "./GenreSection";

const HomeSection = () => {

  return (
    <div className="p-5">
      <TopRatedSection />
      <GenreSection />
    </div>
  );
};

export default HomeSection;
