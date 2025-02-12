import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FavoritesList from "./components/FavoritesList";
import axios from "axios";
import { button } from "framer-motion/client";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "22d71a0c";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = async (page=1) => {
    if (!searchQuery.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }
    try {
      setError(null);
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${searchQuery}&page=${page}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults, 10));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setError("No movies found. Try a different query.");
      }
    } catch (error) {
      setError("Failed to fetch movies. Please check your connection.");
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      setError(null);
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
      if (response.data.Response === "True") {
        setSelectedMovie(response.data);
      } else {
        setError("Movie details not available.");
      }
    } catch (error) {
      setError("Failed to fetch movie details. Please try again.");
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Movie Database</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={() => fetchMovies(1)} />
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <MovieList movies={movies} fetchMovieDetails={fetchMovieDetails} addToFavorites={addToFavorites} />
      {selectedMovie && (
        <MovieDetails selectedMovie={selectedMovie} onClose={() => setSelectedMovie(null)} addToFavorites={addToFavorites} />
      )}
      <FavoritesList favorites={favorites} removeFromFavorites={removeFromFavorites} />
      <div className="flex justify-center mt-4">
        {currentPage >1 && (
          <button
            onClick={() => fetchMovies(currentPage-1)}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mx-2 hover:bg-blue-700"
          >
            Previous
          </button>
        )}
        {movies.length > 0 && (currentPage * 10) <totalResults && (
          <button
            onClick={() => fetchMovies(currentPage+1)}
            className="bg-blue-500 text-white px-4 rounded mx-2 cursor-pointer hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;