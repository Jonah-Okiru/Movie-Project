function MovieList ({ movies, onSelectiveMovie}) {
    retturn (
        <div className="w-full md:w-0.5">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <ul className="space-y-4">
                {movies.map((movie) => (
                    <li
                        key={movie.imdbID}
                        onClick={() => onSelectiveMovie(movie.imdbID)}
                        className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center space-x-4">
                            <img 
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-16 h-24 object-cover rounded"
                            />
                            <div>
                                <h3 className="font-bold">{movie.Title}</h3>
                                <h3 className="text-sm text-gray-600">{movie.Year}</h3>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}
export default MovieList;