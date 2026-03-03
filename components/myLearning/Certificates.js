// src/components/myLearning/Certificates.js
"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { courses, enrolledCourses } from "@/data/courses";
import {
  HiOutlineDownload,
  HiOutlineShare,
  HiOutlineBadgeCheck,
  HiOutlineExternalLink,
} from "react-icons/hi";

export default function Certificates() {
  const { getCourseProgress } = useProgress();

  const completedCourses = courses.filter((c) => {
    if (!enrolledCourses.includes(c.id)) return false;
    const totalLectures = c.sections.reduce(
      (sum, s) => sum + s.lectures.length,
      0
    );
    return getCourseProgress(c.id, totalLectures) === 100;
  });

  if (completedCourses.length === 0) {
    return (
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-base-200 rounded-full flex items-center justify-center mb-4">
          <HiOutlineBadgeCheck className="w-8 h-8 opacity-20" />
        </div>
        <h3 className="font-bold mb-1">No Certificates Yet</h3>
        <p className="text-sm opacity-60 max-w-sm mx-auto mb-4">
          Complete a course to earn your certificate of completion. Try our free
          courses to get started!
        </p>
        <Link
          href="/courses?price=free"
          className="btn btn-primary btn-sm rounded-full"
        >
          Browse Free Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {completedCourses.map((course) => (
        <div
          key={course.id}
          className="bg-base-100 border border-base-300/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 card-hover"
        >
          {/* Certificate Icon */}
          <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
            <HiOutlineBadgeCheck className="w-8 h-8 text-success" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm line-clamp-1">
                {course.title}
              </h4>
              {(course.isFree || course.discountPrice === 0) && (
                <span className="badge badge-info badge-xs">Free Course</span>
              )}
            </div>
            <p className="text-xs opacity-50 mt-0.5">
              Completed on{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-xs opacity-50">
              Instructor: {course.instructor} • {course.totalHours}h •{" "}
              {course.level}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <Link
              href={`/certificate/${course.slug}`}
              className="btn btn-sm btn-primary rounded-lg gap-1.5"
            >
              <HiOutlineExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View</span>
            </Link>
            <button className="btn btn-sm btn-ghost rounded-lg gap-1.5">
              <HiOutlineDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button className="btn btn-sm btn-ghost rounded-lg gap-1.5">
              <HiOutlineShare className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}