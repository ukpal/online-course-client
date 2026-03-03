// src/components/courseDetail/CourseHeader.js
"use client";

import Link from "next/link";
import StarRating from "@/components/StarRating";
import {
  HiOutlineClock,
  HiOutlinePlay,
  HiOutlineGlobe,
  HiOutlineRefresh,
  HiOutlineBadgeCheck,
  HiOutlineUsers,
} from "react-icons/hi";

export default function CourseHeader({ course,instructor }) {
  return (
    <div className="bg-neutral text-neutral-content">
      <div className="container-custom py-8 lg:py-12">
        <div className="max-w-3xl">
          {/* Breadcrumbs */}
          <div className="text-sm breadcrumbs mb-4 opacity-70">
            <ul>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href={`/courses?category=${course.categorySlug}`}
                  className="hover:text-primary transition-colors"
                >
                  {course.category}
                </Link>
              </li>
            </ul>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            {course.title}
          </h1>

          {/* Short Description */}
          <p className="text-base md:text-lg opacity-90 mb-5 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Badges & Rating */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {course.isBestseller && (
              <span className="badge badge-warning font-semibold">
                Bestseller
              </span>
            )}
            {course.isNew && (
              <span className="badge badge-success text-white font-semibold">
                New
              </span>
            )}
            <StarRating
              rating={course.rating}
              size="md"
              totalRatings={course.totalRatings}
            />
            <span className="flex items-center gap-1 text-sm opacity-80">
              <HiOutlineUsers className="w-4 h-4" />
              {course.totalStudents.toLocaleString()} students
            </span>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-full h-full"
              />
            </div>
            <p className="text-sm">
              Created by{" "}
              <Link
                href={`/instructors/${instructor.slug}`}
                className="text-primary hover:underline font-medium"
              >
                {course.instructor}
              </Link>
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
            <span className="flex items-center gap-1.5">
              <HiOutlineRefresh className="w-4 h-4" />
              Last updated{" "}
              {new Date(course.lastUpdated).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineGlobe className="w-4 h-4" />
              {course.language}
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineBadgeCheck className="w-4 h-4" />
              Certificate of completion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}