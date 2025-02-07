import { useState } from 'react'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] =useState((null));
  const [error, setError] = useState("");
  const searchMovies = async (query) => {
    if (!query) {
      setError("Please enter a movie name.");
      return;
    }
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=22d71a0c`
      );
      const data = await response.json();
      if (data.Response === "True"){
        setMovies(data.Search);
        setError("");
      } else {
        setError(data.Error || "No movies found")
        setMovies([]);
      }
    } catch (err) {
      setError("An error occured while fetching data.");
      console.error(err);
    }
  };
  const selectMovie = async (imdbID) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=22d71a0c`
      );
      const data = await response.json();
      setSelectedMovie(data)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h1 className='text-3xl font-bold text-center mb-6'>Movie Database</h1>
      <SearchBar onSearch={searchMovies} />
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
      <div>
        <MovieList movies={movies} onSelectiveMovie={selectMovie} />
        {selectMovie && <MovieDetails movie={selectedMovie} />}
      </div>

    </div>
  );
}

export default App;
