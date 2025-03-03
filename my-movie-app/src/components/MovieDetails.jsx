import React, { useEffect, useState } from "react"; // Import React and hooks.
import axios from "axios"; // Import axios for making API requests.
// MovieDetail component displays detailed information about a selected movie.
function MovieDetails({ selectedMovie, onClose, addToFavorites }) {
  const [trailerUrl, setTrailerUrl] = useState(""); // State to store the trailer URL.
  // Fetch the movie trailer from YouTube API when the selected movie changes
  useEffect(() => {
    const fetchTrailer = async () =>{
      try {
        const YOUTUBE_API_KEY = "AIzaSyAdTUnXQJmYEjS6Bmyjsr_RP1U6R746Pc8" //Youtube API key.
        if (!YOUTUBE_API_KEY) {
          console.error("YoutubeAPI key is missing or invalid.");
          return;
        }
        // Make a request to the YouTube API to search for the official trailer
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: `${selectedMovie.Title} official trailer`, // Search query with the movie title
              key: YOUTUBE_API_KEY,
              type: "video",
              maxResults: 1, // Fetch only one result
            },
          }
        );
        // Check if a trailer was found
        if (response.data.items && response.data.items.length > 0) {
          setTrailerUrl(`https://www.youtube.com/embed/${response.data.items[0].id.videoId}`);
        } else {
          console.warn("No trailer found for this movie");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
    // Only fetch trailer if a movie is selected
    if (selectedMovie && selectedMovie.Title) {
      fetchTrailer();
    }
    
  }, [selectedMovie]); // Dependency array ensures useEffect runs when selectedMovie changes
  return (
    // Modal container for displaying movie details
    <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full">
        {/* Close button to close the modal */}
        <button className="absolute top-2 right-2 text-red-600 cursor-pointer" onClick={onClose}>
          Close
        </button>
        {/* Movie Poster */}
        <img
          src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/placeholder.png"}
          alt={selectedMovie.Title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        {/* Movie Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedMovie.Title}</h2>
        {/* Movie Release Year */}
        <p className="text-sm text-gray-600 mb-2">Release Year: {selectedMovie.Year}</p>
        {/* Movie Plot */}
        <p className="text-gray-800 mb-4">{selectedMovie.Plot}</p>
        {/* Additional Movie Details */}
        <p className="text-sm font-semibold">Genre: {selectedMovie.Genre}</p>
        <p className="text-sm font-semibold">Actors: {selectedMovie.Actors}</p>
        {/* Ratings Section */}
        <p className="text-sm font-semibold">Ratings:</p>
        <ul className="list-disc ml-5">
          {selectedMovie.Ratings.map((rating, index) => (
            <li key={index} className="text-sm">
              {rating.Source}: {rating.Value}
            </li>
          ))}
        </ul>
        {/* Display the YouTube trailer if available */}
        {trailerUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Watch Trailer</h3>
            <iframe 
              width="100%"
              height="315"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >

            </iframe>
          </div>
        )}
        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Close
          </button>
          {/* Add to Favorites button */}
          <button
            onClick={() => addToFavorites(selectedMovie)}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; // Export the MovieDetails component
