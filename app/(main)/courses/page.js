// src/app/courses/page.js
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import FilterSidebar from "@/components/courses/FilterSidebar";
import ActiveFilters from "@/components/courses/ActiveFilters";
import SortDropdown from "@/components/courses/SortDropdown";
import Pagination from "@/components/courses/Pagination";
import NoResults from "@/components/courses/NoResults";
import { courses } from "@/data/courses";
import {
  HiOutlineSearch,
  HiOutlineAdjustments,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineX,
} from "react-icons/hi";

const ITEMS_PER_PAGE = 6;

const durationRanges = {
  short: { min: 0, max: 10 },
  medium: { min: 10, max: 30 },
  long: { min: 30, max: 50 },
  extra: { min: 50, max: 999 },
};

export default function CoursesPage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    levels: [],
    priceRange: "all",
    rating: 0,
    durations: [],
    search: searchParams.get("search") || "",
  });

  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Sync search params
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) setFilters((prev) => ({ ...prev, category }));
    if (search) {
      setFilters((prev) => ({ ...prev, search }));
      setSearchInput(search);
    }
  }, [searchParams]);

  // Lock body scroll on mobile filter
  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setFilters((prev) => ({ ...prev, search: searchInput }));
    },
    [searchInput]
  );

  const clearAllFilters = () => {
    setFilters({
      category: "",
      levels: [],
      priceRange: "all",
      rating: 0,
      durations: [],
      search: "",
    });
    setSearchInput("");
  };

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.shortDescription.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query) ||
          c.tags.some((t) => t.toLowerCase().includes(query)) ||
          c.category.toLowerCase().includes(query)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((c) => c.categorySlug === filters.category);
    }

    // Level
    if (filters.levels.length > 0) {
      result = result.filter((c) => filters.levels.includes(c.level));
    }

    // Price
    switch (filters.priceRange) {
      case "free":
        result = result.filter((c) => c.discountPrice === 0 || c.isFree);
        break;
      case "under15":
        result = result.filter((c) => c.discountPrice > 0 && c.discountPrice < 15);
        break;
      case "15to20":
        result = result.filter(
          (c) => c.discountPrice >= 15 && c.discountPrice <= 20
        );
        break;
      case "over20":
        result = result.filter((c) => c.discountPrice > 20);
        break;
    }

    // Rating
    if (filters.rating > 0) {
      result = result.filter((c) => c.rating >= filters.rating);
    }

    // Duration
    if (filters.durations.length > 0) {
      result = result.filter((c) =>
        filters.durations.some((d) => {
          const range = durationRanges[d];
          return c.totalHours >= range.min && c.totalHours < range.max;
        })
      );
    }

    // Sort
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.totalStudents - a.totalStudents);
        break;
      case "rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        break;
      case "price-low":
        result.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-base-100">
      {/* Page Header */}
      <div className="bg-base-200/50 border-b border-base-300/50">
        <div className="container-custom py-8">
          <h1 className="heading-secondary mb-2">
            {filters.search ? (
              <>
                Results for &ldquo;
                <span className="text-primary">{filters.search}</span>&rdquo;
              </>
            ) : filters.category ? (
              <>
                <span className="text-primary capitalize">
                  {filters.category.replace("-", " ")}
                </span>{" "}
                Courses
              </>
            ) : (
              <>
                All <span className="text-primary">Courses</span>
              </>
            )}
          </h1>
          <p className="text-muted">
            Explore {filteredCourses.length} courses to find the right fit for
            you
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-4 max-w-2xl">
            <div className="join w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search courses, topics, instructors..."
                  className="input input-bordered join-item w-full pl-10 bg-base-100"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setFilters((prev) => ({ ...prev, search: "" }));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <HiOutlineX className="w-4 h-4 opacity-40 hover:opacity-100" />
                  </button>
                )}
              </div>
              <button type="submit" className="btn btn-primary join-item px-6">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn btn-outline btn-sm rounded-full gap-2 lg:hidden"
            >
              <HiOutlineAdjustments className="w-4 h-4" />
              Filters
              {(filters.category ||
                filters.levels.length > 0 ||
                filters.priceRange !== "all" ||
                filters.rating > 0 ||
                filters.durations.length > 0) && (
                  <span className="badge badge-primary badge-xs">!</span>
                )}
            </button>

            <span className="text-sm opacity-60 hidden sm:inline">
              Showing{" "}
              <strong>
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)}
              </strong>{" "}
              of <strong>{filteredCourses.length}</strong> courses
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />

            {/* View Toggle */}
            <div className="hidden md:flex border border-base-300 rounded-full overflow-hidden" style={{width:'stretch'}}>
              <button
                onClick={() => setViewMode("grid")}
                className={`btn btn-sm btn-square border-none rounded-none ${viewMode === "grid"
                    ? "bg-primary text-primary-content"
                    : "bg-base-100"
                  }`}
              >
                <HiOutlineViewGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`btn btn-sm btn-square border-none rounded-none ${viewMode === "list"
                    ? "bg-primary text-primary-content"
                    : "bg-base-100"
                  }`}
              >
                <HiOutlineViewList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilters filters={filters} setFilters={setFilters} />

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              totalResults={filteredCourses.length}
            />
          </aside>

          {/* Course Results */}
          <div className="flex-1 min-w-0">
            {paginatedCourses.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginatedCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        variant="horizontal"
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <NoResults
                searchQuery={filters.search}
                onClearFilters={clearAllFilters}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${isMobileFilterOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setIsMobileFilterOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-base-100 z-50 transform transition-transform duration-300 ease-out lg:hidden p-5 ${isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onClose={() => setIsMobileFilterOpen(false)}
            isMobile={true}
            totalResults={filteredCourses.length}
          />
        </div>
      </>
    </div>
  );
}