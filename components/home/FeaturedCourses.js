// src/components/home/FeaturedCourses.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import { HiOutlineArrowRight } from "react-icons/hi";

const tabs = [
  { id: "featured", label: "Featured" },
  { id: "popular", label: "Most Popular" },
  { id: "new", label: "New Arrivals" },
  { id: "trending", label: "Trending" },
];

export default function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState("featured");

  const getFilteredCourses = () => {
    switch (activeTab) {
      case "featured":
        return courses.filter((c) => c.isFeatured);
      case "popular":
        return [...courses].sort((a, b) => b.totalStudents - a.totalStudents);
      case "new":
        return courses.filter((c) => c.isNew).length > 0
          ? courses.filter((c) => c.isNew)
          : courses.slice(0, 4);
      case "trending":
        return [...courses].sort((a, b) => b.rating - a.rating);
      default:
        return courses;
    }
  };

  const filteredCourses = getFilteredCourses().slice(0, 8);

  return (
    <section className="section-padding bg-base-200/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="heading-secondary">
            Courses to Get You{" "}
            <span className="text-primary">Started</span>
          </h2>
          <p className="text-muted mt-2 max-w-2xl mx-auto">
            Explore our most popular courses across all categories,
            handpicked for quality and relevance
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="tabs tabs-boxed bg-base-200 p-1 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab rounded-full px-5 font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "tab-active bg-primary text-primary-content"
                    : "hover:bg-base-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="btn btn-outline btn-primary rounded-full px-8 gap-2"
          >
            Browse All Courses
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}