import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FavoritesList from "./components/FavoritesList";
import axios from "axios";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "22d71a0c";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }
    try {
      setError(null);
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${searchQuery}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={fetchMovies} />
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <MovieList movies={movies} fetchMovieDetails={fetchMovieDetails} addToFavorites={addToFavorites} />
      {selectedMovie && (
        <MovieDetails selectedMovie={selectedMovie} onClose={() => setSelectedMovie(null)} addToFavorites={addToFavorites} />
      )}
      <FavoritesList favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
}

export default App;