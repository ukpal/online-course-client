// src/components/courses/Pagination.js
"use client";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        className="btn btn-sm btn-ghost btn-circle"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <HiOutlineChevronLeft className="w-4 h-4" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 opacity-50">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm btn-circle ${
              currentPage === page
                ? "btn-primary"
                : "btn-ghost hover:bg-base-200"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="btn btn-sm btn-ghost btn-circle"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <HiOutlineChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}