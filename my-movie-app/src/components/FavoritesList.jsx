import React from "react";

function FavoritesList({ favorites, removeFromFavorites }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-center mb-4">Favorites List</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite movies added</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="bg-white shadow rounded-lg p-4">
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} 
                alt={movie.Title} 
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="font-semibold text-lg mt-2">{movie.Title}</h3>
              <p className="text-sm text-gray-600">Release Year: {movie.Year}</p>
              <button
                onClick={() => removeFromFavorites(movie.imdbID)}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesList;
