"use client"
import React, { useEffect, useState } from "react";

const Page = () => {
  const [recentMovies, setRecentMovies] = useState([]);

  const getRecentlyViewedMovies = () => {
    const stored = localStorage.getItem("recently_wathced_movies");
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    const movies = getRecentlyViewedMovies();
    setRecentMovies(movies);
  }, []);

  return <div>recently viewed</div>;
};

export default Page;
