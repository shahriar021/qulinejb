import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { WatchLaterProvider } from "@/src/context/WatchLaterContext";

const mockMovie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
};

describe("MovieCard", () => {
  it("renders movie title", () => {
    render(
      <WatchLaterProvider>
        <MovieCard movie={mockMovie as any} actions={{}} />
      </WatchLaterProvider>,
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });
});
