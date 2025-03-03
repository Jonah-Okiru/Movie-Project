import React, { useEffect, useState } from "react"; // Import React and hooks
import SearchBar from "./components/SearchBar"; // Import SearchBar component
import MovieList from "./components/MovieList"; // Import MovieList component
import MovieDetails from "./components/MovieDetails"; // Import MovieDetails component
import FavoritesList from "./components/FavoritesList"; // Import FavoritesList component
import axios from "axios"; // Import axios for API requests
import { button } from "framer-motion/client"; // Import button from framer-motion
import { useTranslation } from "react-i18next"; // Import translation functionality
import "./i18n"; // Import i18n configuration

// API constants.
const API_URL = "https://www.omdbapi.com/";
const API_KEY = "22d71a0c";

function App() {
  const { t, i18n } = useTranslation(); // Initialize translation
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [movies, setMovies] = useState([]); // State for storing fetched movies
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie details
  const [error, setError] = useState(null); // State for handling errors
  const [favorites, setFavorites] = useState([]); // State for favorite movies
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [totalResults, setTotalResults] = useState(0); // State for total search results
  const [sortOption, setSortOption] = useState("year"); // State for sorting option
  const [filterYear, setFilterYear] = useState(""); // State for filtering movies by year
  const [theme, setTheme] = useState(localStorage.getItem("theme" || "light")); // State for theme (light/dark)

  // Effect to update theme based on state
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  // Effect to load favorite movies from local storage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

   // Effect to save favorite movies to local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Function to fetch movies from OMDB API
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
        let fetchedMovies = response.data.Search;
        setTotalResults(parseInt(response.data.totalResults, 10));
        setCurrentPage(page);
        // Apply year filter if specified
        if (filterYear) {
          fetchedMovies = fetchedMovies.filter((movie) => movie.Year.includes(filterYear))
        }
        // Apply sorting based on selected option
        if (sortOption === "year") {
          fetchedMovies = fetchedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        } else if (sortOption === "title") {
          fetchedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
          
        }
        setMovies(fetchedMovies);
      } else {
        setMovies([]);
        setError("No movies found. Try a different query.");
      }
    } catch (error) {
      setError("Failed to fetch movies. Please check your connection.");
    }
  };
  // Function to fetch movie details from OMDB API
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
   // Function to add a movie to favorites
  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };
  // Function to remove a movie from favorites
  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <div className = {`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header Section */}
      <header className="p-4 flex flex-col items-center text-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold">{t("Movie Database")}</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Language selection dropdown */}
          <select onChange={(e) => i18n.changeLanguage(e.target.value)} className="border p-2 rounded w-full sm:w-auto">
            <option value="en">GB English</option>
            <option value="es">ES Español</option>
            <option value="fr">FR Français</option>
          </select>
          {/* Theme toggle button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
          >
            {t("Turn to")} {theme === "dark" ? t("light") : t("dark")} {t("Mode")}
          </button>
        </div>
        
      </header>
      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={() => fetchMovies(1)} />
          {/* Sorting and filtering options */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 my-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            >
              <option value="year">Sort by Year</option>
              <option value="title">Sort by Title</option>
            </select>
            <input 
              type="text" 
              placeholder="Filter by Year"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            />
            <button
              onClick={() => fetchMovies(1)}
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
          {/* Error message display */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Movie List */}
        <MovieList movies={movies} fetchMovieDetails={fetchMovieDetails} addToFavorites={addToFavorites} />
         {/* Movie Details Modal */}
        {selectedMovie && (
          <MovieDetails selectedMovie={selectedMovie} onClose={() => setSelectedMovie(null)} addToFavorites={addToFavorites} />
        )}
        {/* Favorites List */}
        <FavoritesList favorites={favorites} removeFromFavorites={(imdbID) => setFavorites(favorites.filter(movie => movie.imdbID !== imdbID))} />
      </div>
        {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {currentPage >1 && (
          <button
            onClick={() => fetchMovies(currentPage-1)}
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 "
          >
            Previous
          </button>
        )}
        {movies.length > 0 && (currentPage * 10) <totalResults && (
          <button
            onClick={() => fetchMovies(currentPage+1)}
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;