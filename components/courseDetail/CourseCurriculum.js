// src/components/courseDetail/CourseCurriculum.js
"use client";

import { useState } from "react";
import {
  HiOutlinePlay,
  HiOutlineLockClosed,
  HiOutlineChevronDown,
  HiOutlineClock,
  HiOutlineDocument,
} from "react-icons/hi";

export default function CourseCurriculum({ course }) {
  const [expandedSections, setExpandedSections] = useState([0]);
  const [expandAll, setExpandAll] = useState(false);

  const toggleSection = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedSections([]);
    } else {
      setExpandedSections(course.sections.map((_, i) => i));
    }
    setExpandAll(!expandAll);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Course Content</h2>
          <p className="text-sm opacity-60 mt-1">
            {course.totalSections} sections • {course.totalLectures} lectures •{" "}
            {course.totalHours}h total length
          </p>
        </div>
        <button
          onClick={handleExpandAll}
          className="btn btn-ghost btn-sm text-primary"
        >
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="border border-base-300 rounded-2xl overflow-hidden divide-y divide-base-300">
        {course.sections.map((section, sIndex) => (
          <div key={sIndex}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sIndex)}
              className="w-full flex items-center justify-between p-4 bg-base-200/50 hover:bg-base-200 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <HiOutlineChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    expandedSections.includes(sIndex) ? "rotate-180" : ""
                  }`}
                />
                <h3 className="font-semibold text-sm">{section.title}</h3>
              </div>
              <span className="text-xs opacity-60 shrink-0 ml-4">
                {section.lectures.length} lectures
              </span>
            </button>

            {/* Lectures */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSections.includes(sIndex)
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {section.lectures.map((lecture, lIndex) => (
                <div
                  key={lIndex}
                  className="flex items-center justify-between px-4 py-3 hover:bg-base-200/30 transition-colors border-t border-base-300/50"
                >
                  <div className="flex items-center gap-3">
                    {lecture.isPreview ? (
                      <HiOutlinePlay className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <HiOutlineLockClosed className="w-4 h-4 opacity-40 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm">{lecture.title}</p>
                      {lecture.isPreview && (
                        <button className="text-xs text-primary font-medium hover:underline">
                          Preview
                        </button>
                      )}
                    </div>
                  </div>
                  <span className="text-xs opacity-50 flex items-center gap-1 shrink-0 ml-4">
                    <HiOutlineClock className="w-3 h-3" />
                    {lecture.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}