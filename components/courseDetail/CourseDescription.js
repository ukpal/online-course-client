// src/components/courseDetail/CourseDescription.js
"use client";

import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export default function CourseDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Description</h2>
      <div className="relative">
        <div
          className={`text-sm leading-relaxed opacity-80 overflow-hidden transition-all duration-500 ${
            isExpanded ? "max-h-[2000px]" : "max-h-32"
          }`}
        >
          {description.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-3">
              {paragraph}
            </p>
          ))}
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base-100 to-transparent" />
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn btn-ghost btn-sm text-primary mt-2 gap-1"
      >
        {isExpanded ? (
          <>
            Show Less <HiOutlineChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Show More <HiOutlineChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}