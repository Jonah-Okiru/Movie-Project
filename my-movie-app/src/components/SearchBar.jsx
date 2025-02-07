import { useState } from "react";
function SearchBar ({onSearch}) {
    const [query, setQuery] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };
    return (
        <form onSubmit={handleSubmit} className="flex justify-center">
            <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="p-2 border border-gray-300 rounded-r-lg hover: bg-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
                Search
            </button>
        </form>
    );
}
export default SearchBar;