// components/SearchBar.js
import React, { useState } from "react"; // Import React and hook
// SearchBar component receives searchQuery, setSearchQuery, and onSearch as props
function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  
  return (
    <div className="flex justify-center mb-6">
      {/* Input field for entering the search query */}
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery} // Controlled component with value from state
        onChange={(e) => setSearchQuery(e.target.value)} // Updates searchQuery state on input change
        className="w-full max-w-lg p-2 border border-gray-300 rounded-lg"
      />
      {/* Search button triggers the onSearch function */}
      <button 
        onClick={onSearch} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar; // Export the SearchBar component.