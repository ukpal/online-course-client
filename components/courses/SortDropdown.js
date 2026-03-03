// src/components/courses/SortDropdown.js
"use client";

const sortOptions = [
  { id: "relevance", label: "Most Relevant" },
  { id: "popular", label: "Most Popular" },
  { id: "rated", label: "Highest Rated" },
  { id: "newest", label: "Newest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
];

export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <select
      className="select select-bordered select-sm rounded-full bg-base-100 font-medium min-w-[180px]"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}