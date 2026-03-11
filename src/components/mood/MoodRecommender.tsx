"use client";
import { useState } from "react";

interface Movie {
  title: string;
  year: number;
  reason: string;
  genre: string;
}

export default function MoodRecommender() {
  const [mood, setMood] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });
      const data = await res.json();
      setMovies(data.movies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎬 AI Movie Recommender</h2>
      <p className="text-gray-400 mb-4">Describe your mood and get movie picks</p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getRecommendations()}
          placeholder="e.g. I want something thrilling and dark..."
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={getRecommendations}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? <p className="text-white text-sm mt-2">This may take 10-15 seconds on free tier...</p>:<p>find</p>}
        </button>
      </div>

      {movies.length > 0 && (
        <div className="flex flex-col gap-4">
          {movies.map((movie, i) => (
            <div key={i} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <span className="text-sm text-gray-400">{movie.year}</span>
              </div>
              <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded mb-2 inline-block">{movie.genre}</span>
              <p className="text-gray-300 text-sm">{movie.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
