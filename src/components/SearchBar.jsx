"use client";

import { FaSearch } from "react-icons/fa";
import { useSearch } from "@/context/SearchContext";
import { useCallback } from "react";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearch = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );
  return (
    <div className="relative w-full max-w-md mx-4">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
        <FaSearch className="text-sm" />
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
