// src/components/learn/LearnSidebar.js
"use client";

import { useProgress } from "@/context/ProgressContext";
import {
  HiOutlineCheck,
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineChevronDown,
  HiOutlineLockOpen,
} from "react-icons/hi";

export default function LearnSidebar({
  course,
  currentSection,
  currentLecture,
  onSelectLecture,
  expandedSections,
  toggleSection,
}) {
  const { isLectureComplete, toggleLectureComplete, getCourseProgress } =
    useProgress();

  const totalLectures = course.sections.reduce(
    (sum, s) => sum + s.lectures.length,
    0
  );
  const progressPercent = getCourseProgress(course.id, totalLectures);

  return (
    <div className="flex flex-col h-full bg-base-100">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <h3 className="font-bold text-sm line-clamp-1 mb-2">Course Content</h3>
        <div className="flex items-center gap-3">
          <progress
            className="progress progress-primary flex-1 h-2"
            value={progressPercent}
            max="100"
          />
          <span className="text-xs font-semibold text-primary shrink-0">
            {progressPercent}%
          </span>
        </div>
        <p className="text-xs opacity-50 mt-1">
          {course.sections.reduce(
            (sum, s, si) =>
              sum +
              s.lectures.filter((_, li) =>
                isLectureComplete(course.id, si, li)
              ).length,
            0
          )}{" "}
          / {totalLectures} lectures completed
        </p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {course.sections.map((section, sIndex) => {
          const sectionCompleted = section.lectures.every((_, lIndex) =>
            isLectureComplete(course.id, sIndex, lIndex)
          );
          const completedInSection = section.lectures.filter((_, lIndex) =>
            isLectureComplete(course.id, sIndex, lIndex)
          ).length;

          return (
            <div key={sIndex} className="border-b border-base-300/50">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sIndex)}
                className={`w-full text-left p-3 flex items-center gap-2 hover:bg-base-200/50 transition-colors ${
                  sectionCompleted ? "bg-success/5" : "bg-base-200/30"
                }`}
              >
                <HiOutlineChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    expandedSections.includes(sIndex) ? "rotate-180" : ""
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-1">
                    Section {sIndex + 1}: {section.title}
                  </p>
                  <p className="text-[10px] opacity-50 mt-0.5">
                    {completedInSection}/{section.lectures.length} completed
                  </p>
                </div>
                {sectionCompleted && (
                  <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center shrink-0">
                    <HiOutlineCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>

              {/* Lectures */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections.includes(sIndex)
                    ? "max-h-[2000px]"
                    : "max-h-0"
                }`}
              >
                {section.lectures.map((lecture, lIndex) => {
                  const isActive =
                    currentSection === sIndex && currentLecture === lIndex;
                  const isCompleted = isLectureComplete(
                    course.id,
                    sIndex,
                    lIndex
                  );

                  return (
                    <div
                      key={lIndex}
                      className={`flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors border-l-2 ${
                        isActive
                          ? "bg-primary/10 border-l-primary"
                          : "border-l-transparent hover:bg-base-200/50"
                      }`}
                      onClick={() => onSelectLecture(sIndex, lIndex)}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLectureComplete(course.id, sIndex, lIndex);
                        }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                          isCompleted
                            ? "bg-success border-success"
                            : "border-base-300 hover:border-primary"
                        }`}
                      >
                        {isCompleted && (
                          <HiOutlineCheck className="w-3 h-3 text-white" />
                        )}
                      </button>

                      {/* Lecture Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs leading-snug line-clamp-2 ${
                            isActive ? "font-semibold text-primary" : ""
                          } ${isCompleted ? "opacity-60" : ""}`}
                        >
                          {lIndex + 1}. {lecture.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {isActive ? (
                            <HiOutlinePlay className="w-3 h-3 text-primary" />
                          ) : (
                            <HiOutlineLockOpen className="w-3 h-3 opacity-40" />
                          )}
                          <span className="text-[10px] opacity-40 flex items-center gap-0.5">
                            <HiOutlineClock className="w-2.5 h-2.5" />
                            {lecture.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}