// src/app/(main)/instructors/[slug]/page.js
"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { instructors, courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import InstructorHeader from "@/components/instructor/InstructorHeader";
import InstructorAbout from "@/components/instructor/InstructorAbout";
import InstructorStatsDetail from "@/components/instructor/InstructorStatsDetail";
import InstructorReviews from "@/components/instructor/InstructorReviews";

export default function InstructorPage({ params }) {
  const { slug } = use(params);
  
  const instructor = instructors.find((i) => i.slug === slug);

  if (!instructor) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Instructor Not Found</h1>
          <a href="/courses" className="btn btn-primary rounded-full">
            Browse Courses
          </a>
        </div>
      </div>
    );
  }

  const instructorCourses = courses.filter(
    (c) => c.instructorId === instructor.id
  );
  const totalHours = instructorCourses.reduce(
    (sum, c) => sum + c.totalHours,
    0
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <InstructorHeader instructor={instructor} />

      {/* Content */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* About */}
            <InstructorAbout instructor={instructor} />

            {/* Courses */}
            <div>
              <h2 className="text-lg font-bold mb-4">
                Courses by {instructor.name} ({instructorCourses.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {instructorCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <InstructorReviews instructor={instructor} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <InstructorStatsDetail
              instructor={instructor}
              coursesCount={instructorCourses.length}
              totalHours={totalHours}
            />

            {/* Quick Contact */}
            <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6">
              <h3 className="font-bold text-sm mb-3">
                Connect with {instructor.name.split(" ")[0]}
              </h3>
              <p className="text-xs opacity-60 mb-4">
                Have a question about a course? Send a message directly.
              </p>
              <textarea
                placeholder="Write your message..."
                className="textarea textarea-bordered rounded-lg w-full text-sm h-24 mb-3"
              />
              <button className="btn btn-primary btn-sm w-full rounded-lg">
                Send Message
              </button>
            </div>

            {/* Similar Instructors */}
            <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6">
              <h3 className="font-bold text-sm mb-4">Similar Instructors</h3>
              <div className="space-y-3">
                {instructors
                  .filter((i) => i.id !== instructor.id)
                  .slice(0, 3)
                  .map((inst) => (
                    <a
                      key={inst.id}
                      href={`/instructors/${inst.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300">
                        <img
                          src={inst.avatar}
                          alt={inst.name}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {inst.name}
                        </p>
                        <p className="text-[10px] opacity-50 truncate">
                          {inst.title}
                        </p>
                      </div>
                      <div className="text-xs font-bold text-warning">
                        ⭐ {inst.rating}
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}