import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { WatchLaterProvider } from "@/src/context/WatchLaterContext";
import { Movie } from "@/src/types/movie";

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
  adult: false,
  backdrop_path: null,
  genre_ids: [],
  original_language: "en",
  original_title: "Test Movie",
  overview: "Test overview",
  popularity: 1,
  release_date: "2024-01-01",
  video: false,
  vote_average: 7.5,
  vote_count: 100,
};

describe("MovieCard", () => {
  it("renders movie title", () => {
    render(
      <WatchLaterProvider>
        <MovieCard movie={mockMovie } actions={{}} />
      </WatchLaterProvider>,
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });
});
