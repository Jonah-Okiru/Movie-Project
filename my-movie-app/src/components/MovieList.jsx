import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MovieList({ movies, fetchMovieDetails }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <motion.div
          key={movie.imdbID}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
          onClick={() => fetchMovieDetails(movie.imdbID)}
        >
          <div className="bg-white shadow rounded-lg">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{movie.Title}</h2>
              <p className="text-sm text-gray-600">Release Year: {movie.Year}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MovieList;