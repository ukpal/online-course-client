"use client";

import { useState, useMemo } from "react";
import { allEnrollments, courses } from "@/data/instructor";
import {
  HiOutlineSearch,
  HiOutlineAdjustments,
  HiOutlineCalendar,
  HiOutlineGlobe,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const ITEMS_PER_PAGE = 10;

export default function EnrollmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sortField, setSortField] = useState("enrollmentDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search logic
  const filteredEnrollments = useMemo(() => {
    let filtered = [...allEnrollments];

    // Filter by course
    if (selectedCourse) {
      filtered = filtered.filter((e) => e.course === selectedCourse);
    }

    // Search by student name or country
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.student.toLowerCase().includes(query) ||
          e.country.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;

      if (sortField === "enrollmentDate") {
        aVal = new Date(a.enrollmentDate);
        bVal = new Date(b.enrollmentDate);
      } else if (sortField === "student") {
        aVal = a.student.toLowerCase();
        bVal = b.student.toLowerCase();
      } else if (sortField === "country") {
        aVal = a.country.toLowerCase();
        bVal = b.country.toLowerCase();
      } else if (sortField === "course") {
        aVal = a.course.toLowerCase();
        bVal = b.course.toLowerCase();
      }

      if (sortOrder === "desc") {
        return aVal > bVal ? -1 : 1;
      } else {
        return aVal < bVal ? -1 : 1;
      }
    });

    return filtered;
  }, [searchQuery, selectedCourse, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Calculate paginated data
  const totalPages = Math.ceil(filteredEnrollments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedEnrollments = filteredEnrollments.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <div className="w-4 h-4" />;
    return sortOrder === "desc" ? (
      <HiOutlineChevronDown className="w-4 h-4" />
    ) : (
      <HiOutlineChevronUp className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Enrollments</h1>
        <p className="text-sm opacity-60 mt-1">
          Manage and view all student enrollments
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-4 space-y-4">
        {/* Search Input */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200/50 border border-base-300/30">
          <HiOutlineSearch className="w-5 h-5 opacity-50" />
          <input
            type="text"
            placeholder="Search by student name or country..."
            className="flex-1 bg-transparent outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Toggle and Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-sm btn-ghost gap-2"
          >
            <HiOutlineAdjustments className="w-4 h-4" />
            Filters {showFilters && "✕"}
          </button>

          {(searchQuery || selectedCourse) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCourse("");
              }}
              className="text-xs text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="pt-2 border-t border-base-300/30 space-y-3">
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2">
                Filter by Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="select select-sm select-bordered w-full"
              >
                <option value="">All Courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-base-100 border border-base-300/50 rounded-xl p-4">
          <p className="text-xs opacity-60 mb-1">Total Enrollments</p>
          <p className="text-2xl font-bold">{filteredEnrollments.length}</p>
        </div>
        <div className="bg-base-100 border border-base-300/50 rounded-xl p-4">
          <p className="text-xs opacity-60 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold">
            $
            {filteredEnrollments
              .reduce((sum, e) => sum + e.price, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5 overflow-x-auto">
        {filteredEnrollments.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-base-300/30">
                <th className="text-left py-3 px-3 font-semibold opacity-70">
                  <button
                    onClick={() => handleSort("student")}
                    className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    Student <SortIcon field="student" />
                  </button>
                </th>
                <th className="text-left py-3 px-3 font-semibold opacity-70">
                  <button
                    onClick={() => handleSort("course")}
                    className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    Course <SortIcon field="course" />
                  </button>
                </th>
                <th className="text-left py-3 px-3 font-semibold opacity-70">
                  <button
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    Country <SortIcon field="country" />
                  </button>
                </th>
                <th className="text-left py-3 px-3 font-semibold opacity-70">
                  <button
                    onClick={() => handleSort("enrollmentDate")}
                    className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    Enrollment Date <SortIcon field="enrollmentDate" />
                  </button>
                </th>
                <th className="text-right py-3 px-3 font-semibold opacity-70">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEnrollments.map((enrollment) => (
                <tr
                  key={enrollment.id}
                  className="border-b border-base-300/20 hover:bg-base-200/30 transition-colors"
                >
                  {/* Student */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-base-300 shrink-0">
                        <img
                          src={enrollment.avatar}
                          alt={enrollment.student}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="font-medium">{enrollment.student}</span>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-4 px-3">
                    <span className="text-sm">{enrollment.course}</span>
                  </td>

                  {/* Country */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <HiOutlineGlobe className="w-4 h-4 opacity-50" />
                      <span className="text-sm">{enrollment.country}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar className="w-4 h-4 opacity-50" />
                      <span className="text-sm">
                        {formatDate(enrollment.enrollmentDate)}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-3 text-right">
                    <span className="font-semibold text-success">
                      ${enrollment.price.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center">
            <p className="opacity-50 mb-2">No enrollments found</p>
            <p className="text-xs opacity-40">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredEnrollments.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-xs opacity-60">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredEnrollments.length)} of{" "}
            {filteredEnrollments.length} enrollments
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-ghost gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiOutlineChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn btn-xs ${
                    currentPage === page
                      ? "btn-primary"
                      : "btn-ghost"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-ghost gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <HiOutlineChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      {filteredEnrollments.length > 0 && (
        <div className="text-xs opacity-60 text-center">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
}
