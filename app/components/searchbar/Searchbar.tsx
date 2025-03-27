"use client";
import { useState, useEffect, useRef } from "react";

interface SearchbarProps {
  breeds: string[];
  onSelectBreed: (breed: string) => void;
}

export default function Searchbar({ breeds, onSelectBreed }: SearchbarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter breeds based on query
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredBreeds([]);
      return;
    }
    const filtered = breeds
      .filter((breed) => breed.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10); // Limit to 10 suggestions
    setFilteredBreeds(filtered);
  }, [query, breeds]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredBreeds.length > 0) {
      onSelectBreed(
        highlightedIndex >= 0
          ? filteredBreeds[highlightedIndex]
          : filteredBreeds[0]
      );
      setQuery("");
      setShowSuggestions(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredBreeds.length - 1 ? prev + 1 : prev
      );
    }
    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
    // Escape
    else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
    // Enter when suggestions are shown
    else if (e.key === "Enter" && showSuggestions) {
      if (highlightedIndex >= 0) {
        e.preventDefault();
        onSelectBreed(filteredBreeds[highlightedIndex]);
        setQuery("");
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            id="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search breeds..."
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            autoComplete="off"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredBreeds.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredBreeds.map((breed, index) => (
              <li
                key={breed}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  index === highlightedIndex ? "bg-indigo-50" : ""
                }`}
                onClick={() => {
                  onSelectBreed(breed);
                  setQuery("");
                  setShowSuggestions(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {breed}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
