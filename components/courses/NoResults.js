// src/components/courses/NoResults.js
import Link from "next/link";
import { HiOutlineSearch, HiOutlineRefresh } from "react-icons/hi";

export default function NoResults({ searchQuery, onClearFilters }) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
        <HiOutlineSearch className="w-10 h-10 opacity-30" />
      </div>
      <h3 className="text-xl font-bold mb-2">No courses found</h3>
      <p className="text-muted max-w-md mx-auto mb-6">
        {searchQuery
          ? `We couldn't find any courses matching "${searchQuery}". Try adjusting your search or filters.`
          : "Try adjusting your filters to find what you're looking for."}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onClearFilters}
          className="btn btn-outline btn-primary rounded-full gap-2"
        >
          <HiOutlineRefresh className="w-4 h-4" />
          Clear Filters
        </button>
        <Link href="/courses" className="btn btn-primary rounded-full">
          Browse All Courses
        </Link>
      </div>
    </div>
  );
}