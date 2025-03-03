import React, { useEffect, useState } from "react"; // import React and states.
import { motion } from "framer-motion"; // Import motion from Framer Motion for animations.
// MovieList component receives movies array and fetchMovieDetails function as props
function MovieList({ movies, fetchMovieDetails }) {
  return (
    // Responsive grid layout for displaying movies
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Iterate over the movies array and render each movie */}
      {movies.map((movie) => (
        <motion.div
          key={movie.imdbID}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
          onClick={() => fetchMovieDetails(movie.imdbID)}
        >
          <div className="bg-white shadow rounded-lg">
            {/* Display movie poster or a placeholder image if unavailable */}
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title} // Accessible alternative text for the image
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              {/* Movie title */}
              <h2 className="font-semibold text-lg text-gray-800">{movie.Title}</h2>
              {/* Release year of the movie */}
              <p className="text-sm text-gray-600">Release Year: {movie.Year}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MovieList;