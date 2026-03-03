// src/components/courses/ActiveFilters.js
"use client";

import { HiOutlineX } from "react-icons/hi";
import { categories } from "@/data/courses";

export default function ActiveFilters({ filters, setFilters }) {
  const activeFilters = [];

  if (filters.search) {
    activeFilters.push({
      label: `Search: "${filters.search}"`,
      onRemove: () => setFilters((prev) => ({ ...prev, search: "" })),
    });
  }

  if (filters.category) {
    const cat = categories.find((c) => c.slug === filters.category);
    activeFilters.push({
      label: cat?.name || filters.category,
      onRemove: () => setFilters((prev) => ({ ...prev, category: "" })),
    });
  }

  filters.levels.forEach((level) => {
    activeFilters.push({
      label: level,
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          levels: prev.levels.filter((l) => l !== level),
        })),
    });
  });

  if (filters.priceRange !== "all") {
    const labels = {
      free: "Free",
      under15: "Under $15",
      "15to20": "$15 - $20",
      over20: "$20+",
    };
    activeFilters.push({
      label: labels[filters.priceRange],
      onRemove: () =>
        setFilters((prev) => ({ ...prev, priceRange: "all" })),
    });
  }

  if (filters.rating > 0) {
    activeFilters.push({
      label: `${filters.rating}+ Stars`,
      onRemove: () => setFilters((prev) => ({ ...prev, rating: 0 })),
    });
  }

  filters.durations.forEach((dur) => {
    const labels = {
      short: "0-10 Hours",
      medium: "10-30 Hours",
      long: "30-50 Hours",
      extra: "50+ Hours",
    };
    activeFilters.push({
      label: labels[dur],
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          durations: prev.durations.filter((d) => d !== dur),
        })),
    });
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium opacity-60">Active Filters:</span>
      {activeFilters.map((filter, index) => (
        <button
          key={index}
          onClick={filter.onRemove}
          className="badge badge-lg gap-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
        >
          {filter.label}
          <HiOutlineX className="w-3 h-3" />
        </button>
      ))}
      <button
        onClick={() =>
          setFilters({
            category: "",
            levels: [],
            priceRange: "all",
            rating: 0,
            durations: [],
            search: "",
          })
        }
        className="text-sm text-error hover:underline font-medium ml-1"
      >
        Clear All
      </button>
    </div>
  );
}