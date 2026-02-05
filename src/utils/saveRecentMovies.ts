export const saveRecentWatchedmoviess = (movieId:string) => {
  if (!movieId) {
    return;
  }

  const stored = localStorage.getItem("recently_wathced_movies");
  let movies:string[] = stored ? JSON.parse(stored) : [];

  movies = movies.filter((item:string) => item !== movieId);

  movies.unshift(movieId);

  movies = movies.slice(0, 10);

  localStorage.setItem("recently_wathced_movies", JSON.stringify(movies));
};
