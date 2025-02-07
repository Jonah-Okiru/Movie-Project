import React from "react";

function MovieDetails({ selectedMovie, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full relative">
        <button className="absolute top-2 right-2 text-red-600" onClick={onClose}>
          Close
        </button>
        <img
          src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/placeholder.png"}
          alt={selectedMovie.Title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{selectedMovie.Title}</h2>
        <p className="text-sm text-gray-600 mb-2">Release Year: {selectedMovie.Year}</p>
        <p className="text-gray-800 mb-4">{selectedMovie.Plot}</p>
        <p className="text-sm font-semibold">Genre: {selectedMovie.Genre}</p>
        <p className="text-sm font-semibold">Actors: {selectedMovie.Actors}</p>
        <p className="text-sm font-semibold">Ratings:</p>
        <ul className="list-disc ml-5">
          {selectedMovie.Ratings.map((rating, index) => (
            <li key={index} className="text-sm">
              {rating.Source}: {rating.Value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetails;
