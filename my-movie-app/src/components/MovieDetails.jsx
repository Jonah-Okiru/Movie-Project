function MovieDetails ({movie}) {
    return (
        <div className="w-full md:w-0.5 p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
            <img 
                src={movie.Poster} 
                alt={movie.Title} 
                className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600"><strong>Genre:</strong>{movie.Plot}</p>
            <p className="text-sm text-gray-600"><strong>Cast:</strong>{movie.Actors}</p>
            <p className="text-sm text-gray-600"><strong>Ratings:</strong></p>
            <ul className="list-disc list-inside">
                {movie.Ratings.map((rating, index) =>(
                    <li key={index} className="text-sm text-gray-600">
                        {rating.Source}: {rating.Value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default MovieDetails;