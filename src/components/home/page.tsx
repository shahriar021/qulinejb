"use client";

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
