// src/components/myLearning/EnrolledCourseCard.js
"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import {
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

export default function EnrolledCourseCard({ course }) {
  const { getCourseProgress, getCompletedCount, getLastWatched } =
    useProgress();

  const totalLectures = course.sections.reduce(
    (sum, s) => sum + s.lectures.length,
    0
  );

  const progressPercent = getCourseProgress(course.id, totalLectures);
  const completedCount = getCompletedCount(course.id);
  const lastWatched = getLastWatched(course.id);
  const isCompleted = progressPercent === 100;

  const currentLecture =
    course.sections[lastWatched.sectionIndex]?.lectures[
      lastWatched.lectureIndex
    ];

  return (
    <div className="group bg-base-100 border border-base-300/50 rounded-2xl overflow-hidden card-hover">
      {/* Thumbnail */}
      <Link href={`/learn/${course.slug}`} className="relative block">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <HiOutlinePlay className="w-7 h-7 text-primary ml-1" />
          </div>
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-success text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              <HiOutlineBadgeCheck className="w-3.5 h-3.5" />
              Completed
            </div>
          </div>
        )}

        {/* Progress Bar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <div
            className={`h-full transition-all duration-500 ${
              isCompleted ? "bg-success" : "bg-primary"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/learn/${course.slug}`}>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {course.title}
          </h3>
        </Link>

        <p className="text-xs opacity-60 mb-3">{course.instructor}</p>

        {/* Progress Info */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium opacity-70">
              {completedCount} / {totalLectures} lectures
            </span>
            <span
              className={`text-xs font-bold ${
                isCompleted ? "text-success" : "text-primary"
              }`}
            >
              {progressPercent}%
            </span>
          </div>
          <progress
            className={`progress w-full h-2 ${
              isCompleted ? "progress-success" : "progress-primary"
            }`}
            value={progressPercent}
            max="100"
          />
        </div>

        {/* Last Watched / Resume */}
        {!isCompleted && currentLecture && (
          <div className="bg-base-200/50 rounded-lg p-2.5 mb-3">
            <p className="text-[10px] uppercase tracking-wider opacity-40 font-semibold mb-0.5">
              Continue from
            </p>
            <p className="text-xs font-medium line-clamp-1">
              {currentLecture.title}
            </p>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/learn/${course.slug}`}
          className={`btn btn-sm w-full rounded-lg gap-2 ${
            isCompleted ? "btn-success btn-outline" : "btn-primary"
          }`}
        >
          <HiOutlinePlay className="w-4 h-4" />
          {isCompleted
            ? "Review Course"
            : progressPercent > 0
            ? "Continue Learning"
            : "Start Learning"}
        </Link>
      </div>
    </div>
  );
}