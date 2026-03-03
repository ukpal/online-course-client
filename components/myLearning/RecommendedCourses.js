// src/components/myLearning/RecommendedCourses.js
"use client";

import { courses, enrolledCourses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function RecommendedCourses() {
  const recommended = courses
    .filter((c) => !enrolledCourses.includes(c.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (recommended.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-base">Recommended For You</h3>
          <p className="text-xs opacity-50 mt-0.5">
            Based on your learning history
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recommended.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}