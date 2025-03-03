import React from "react"; // Import React.
// FavoritesList component displays a list of favorite movies
// It receives the 'favorites' array and 'removeFromFavorites' function as props
function FavoritesList({ favorites, removeFromFavorites }) {
  return (
    <div className="mt-6">
      {/* Section heading */}
      <h2 className="text-xl font-bold text-center mb-4">Favorites List</h2>
      {/* If there are no favorite movies, display a message */}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite movies added</p>
      ) : (
        // Display the list of favorite movies in a responsive grid layout
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="bg-white shadow rounded-lg p-4">
              {/* Movie poster */}
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} 
                alt={movie.Title} 
                className="w-full h-64 object-cover rounded-lg"
              />
              {/* Movie title */}
              <h3 className="font-semibold text-lg mt-2">{movie.Title}</h3>
              {/* Movie release year */}
              <p className="text-sm text-gray-600">Release Year: {movie.Year}</p>
              {/* Button to remove the movie from favorites */}
              <button
                onClick={() => removeFromFavorites(movie.imdbID)} // Calls function with movie ID
                className="mt-2 cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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

export default FavoritesList; // Export the FavoritesList component
