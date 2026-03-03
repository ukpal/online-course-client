// src/components/courseDetail/RelatedCourses.js
"use client";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

export default function RelatedCourses({ currentCourse }) {
  const related = courses
    .filter(
      (c) =>
        c.id !== currentCourse.id &&
        (c.categorySlug === currentCourse.categorySlug ||
          c.instructorId === currentCourse.instructorId)
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}