// src/components/courseDetail/CourseDetailContent.js
"use client";

import CourseHeader from "@/components/courseDetail/CourseHeader";
import CourseSidebar from "@/components/courseDetail/CourseSidebar";
import WhatYouLearn from "@/components/courseDetail/WhatYouLearn";
import CourseCurriculum from "@/components/courseDetail/CourseCurriculum";
import CourseDescription from "@/components/courseDetail/CourseDescription";
import CourseRequirements from "@/components/courseDetail/CourseRequirements";
import InstructorProfile from "@/components/courseDetail/InstructorProfile";
import CourseReviews from "@/components/courseDetail/CourseReviews";
import RelatedCourses from "@/components/courseDetail/RelatedCourses";

export default function CourseDetailContent({ course, instructor }) {
  return (
    <div>
      {/* Header */}
      <CourseHeader course={course} instructor={instructor}/>

      {/* Content */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            <WhatYouLearn items={course.whatYouWillLearn} />
            <CourseCurriculum course={course} />
            <CourseRequirements requirements={course.requirements} />
            <CourseDescription description={course.description} />
            <InstructorProfile instructor={instructor} />
            <CourseReviews course={course} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 shrink-0 order-1 lg:order-2">
            <CourseSidebar course={course} />
          </div>
        </div>

        {/* Related Courses */}
        <div className="border-t border-base-300 mt-8 pt-8">
          <RelatedCourses currentCourse={course} />
        </div>
      </div>
    </div>
  );
}