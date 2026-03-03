// src/components/courses/FilterSidebar.js
"use client";

import { HiOutlineX, HiOutlineStar } from "react-icons/hi";
import { categories } from "@/data/courses";

const levels = ["Beginner", "Intermediate", "Advanced"];
const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "free", label: "Free", icon: "🆓" },
  { id: "under15", label: "Under $15" },
  { id: "15to20", label: "$15 - $20" },
  { id: "over20", label: "$20+" },
];
const ratings = [4.5, 4.0, 3.5, 3.0];
const durations = [
  { id: "short", label: "0-10 Hours", min: 0, max: 10 },
  { id: "medium", label: "10-30 Hours", min: 10, max: 30 },
  { id: "long", label: "30-50 Hours", min: 30, max: 50 },
  { id: "extra", label: "50+ Hours", min: 50, max: 999 },
];

export default function FilterSidebar({
  filters,
  setFilters,
  onClose,
  isMobile = false,
  totalResults,
}) {
  const handleCategoryChange = (slug) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === slug ? "" : slug,
    }));
  };

  const handleLevelChange = (level) => {
    setFilters((prev) => {
      const levels = prev.levels.includes(level)
        ? prev.levels.filter((l) => l !== level)
        : [...prev.levels, level];
      return { ...prev, levels };
    });
  };

  const handleDurationChange = (id) => {
    setFilters((prev) => {
      const durations = prev.durations.includes(id)
        ? prev.durations.filter((d) => d !== id)
        : [...prev.durations, id];
      return { ...prev, durations };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: "",
      levels: [],
      priceRange: "all",
      rating: 0,
      durations: [],
      search: filters.search,
    });
  };

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    filters.levels.length +
    (filters.priceRange !== "all" ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    filters.durations.length;

  return (
    <div
      className={`${
        isMobile
          ? "h-full flex flex-col"
          : "sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            Filters
            {activeFilterCount > 0 && (
              <span className="badge badge-primary badge-sm">
                {activeFilterCount}
              </span>
            )}
          </h3>
          {totalResults !== undefined && (
            <p className="text-sm opacity-60 mt-0.5">
              {totalResults} results found
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="btn btn-ghost btn-xs text-error"
            >
              Clear All
            </button>
          )}
          {isMobile && (
            <button onClick={onClose} className="btn btn-ghost btn-sm btn-square">
              <HiOutlineX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="collapse collapse-arrow bg-base-200/30 rounded-xl mb-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title font-semibold text-sm py-3 min-h-0">
          Category
        </div>
        <div className="collapse-content pb-3">
          <div className="space-y-1">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  filters.category === cat.slug
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-200"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  className="radio radio-primary radio-xs"
                  checked={filters.category === cat.slug}
                  onChange={() => handleCategoryChange(cat.slug)}
                />
                <span className="text-sm flex-1">{cat.name}</span>
                <span className="text-xs opacity-50">{cat.courseCount}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Level Filter */}
      <div className="collapse collapse-arrow bg-base-200/30 rounded-xl mb-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title font-semibold text-sm py-3 min-h-0">
          Level
        </div>
        <div className="collapse-content pb-3">
          <div className="space-y-1">
            {levels.map((level) => (
              <label
                key={level}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  filters.levels.includes(level)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-xs"
                  checked={filters.levels.includes(level)}
                  onChange={() => handleLevelChange(level)}
                />
                <span className="text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className="collapse collapse-arrow bg-base-200/30 rounded-xl mb-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title font-semibold text-sm py-3 min-h-0">
          Price
        </div>
        <div className="collapse-content pb-3">
          <div className="space-y-1">
            {priceRanges.map((range) => (
              <label
                key={range.id}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  filters.priceRange === range.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-200"
                }`}
              >
                <input
                  type="radio"
                  name="price"
                  className="radio radio-primary radio-xs"
                  checked={filters.priceRange === range.id}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, priceRange: range.id }))
                  }
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="collapse collapse-arrow bg-base-200/30 rounded-xl mb-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title font-semibold text-sm py-3 min-h-0">
          Rating
        </div>
        <div className="collapse-content pb-3">
          <div className="space-y-1">
            {ratings.map((rating) => (
              <label
                key={rating}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  filters.rating === rating
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-200"
                }`}
              >
                <input
                  type="radio"
                  name="rating"
                  className="radio radio-primary radio-xs"
                  checked={filters.rating === rating}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      rating: prev.rating === rating ? 0 : rating,
                    }))
                  }
                />
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(rating)
                            ? "text-warning fill-warning"
                            : i < rating
                            ? "text-warning fill-warning"
                            : "text-base-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{rating} & up</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Filter */}
      <div className="collapse collapse-arrow bg-base-200/30 rounded-xl mb-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title font-semibold text-sm py-3 min-h-0">
          Duration
        </div>
        <div className="collapse-content pb-3">
          <div className="space-y-1">
            {durations.map((dur) => (
              <label
                key={dur.id}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  filters.durations.includes(dur.id)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-xs"
                  checked={filters.durations.includes(dur.id)}
                  onChange={() => handleDurationChange(dur.id)}
                />
                <span className="text-sm">{dur.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="mt-auto pt-4 border-t border-base-300">
          <button onClick={onClose} className="btn btn-primary w-full rounded-full">
            Show {totalResults} Results
          </button>
        </div>
      )}
    </div>
  );
}