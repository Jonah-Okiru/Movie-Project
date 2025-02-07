// components/SearchBar.js
import React from "react";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-lg p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}

export default SearchBar;