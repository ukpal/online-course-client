// src/app/(main)/my-learning/page.js
"use client";

import { useState } from "react";
import { courses, enrolledCourses } from "@/data/courses";
import LearningStats from "@/components/myLearning/LearningStats";
import EnrolledCourseCard from "@/components/myLearning/EnrolledCourseCard";
import LearningActivity from "@/components/myLearning/LearningActivity";
import LearningStreak from "@/components/myLearning/LearningStreak";
import Certificates from "@/components/myLearning/Certificates";
import RecommendedCourses from "@/components/myLearning/RecommendedCourses";
import { useProgress } from "@/context/ProgressContext";
import {
  HiOutlineSearch,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineFilter,
} from "react-icons/hi";

const filterTabs = [
  { id: "all", label: "All Courses" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "not-started", label: "Not Started" },
];

export default function MyLearningPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [activeTab, setActiveTab] = useState("courses");
  const { getCourseProgress } = useProgress();

  const enrolled = courses.filter((c) => enrolledCourses.includes(c.id));

  const filteredCourses = enrolled.filter((course) => {
    const totalLectures = course.sections.reduce(
      (sum, s) => sum + s.lectures.length,
      0
    );
    const progress = getCourseProgress(course.id, totalLectures);

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !course.title.toLowerCase().includes(query) &&
        !course.instructor.toLowerCase().includes(query) &&
        !course.category.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    switch (activeFilter) {
      case "in-progress":
        return progress > 0 && progress < 100;
      case "completed":
        return progress === 100;
      case "not-started":
        return progress === 0;
      default:
        return true;
    }
  });

  // Sort
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "progress": {
        const aTotalLectures = a.sections.reduce(
          (sum, s) => sum + s.lectures.length,
          0
        );
        const bTotalLectures = b.sections.reduce(
          (sum, s) => sum + s.lectures.length,
          0
        );
        return (
          getCourseProgress(b.id, bTotalLectures) -
          getCourseProgress(a.id, aTotalLectures)
        );
      }
      default:
        return 0;
    }
  });

  const tabs = [
    { id: "courses", label: "My Courses" },
    { id: "activity", label: "Activity" },
    { id: "certificates", label: "Certificates" },
  ];

  return (
    <div className="min-h-screen bg-base-200/30">
      {/* Header */}
      <div className="bg-base-100 border-b border-base-300/50">
        <div className="container-custom py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="heading-secondary">My Learning</h1>
              <p className="text-muted mt-1">
                Track your progress and continue learning
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-4xl">👋</span>
              <div>
                <p className="text-sm font-medium">Welcome back!</p>
                <p className="text-xs opacity-50">
                  You have {enrolled.length} active courses
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <LearningStats />
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mb-8 border-b border-base-300/50 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`btn btn-sm rounded-full whitespace-nowrap ${
                      activeFilter === tab.id
                        ? "btn-primary"
                        : "btn-ghost bg-base-100"
                    }`}
                  >
                    {tab.label}
                    {tab.id === "all" && (
                      <span className="badge badge-xs ml-1">
                        {enrolled.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search & Sort */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-60">
                  <input
                    type="text"
                    placeholder="Search my courses..."
                    className="input input-bordered input-sm w-full pl-9 rounded-full bg-base-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                </div>
                <select
                  className="select select-bordered select-sm rounded-full bg-base-100"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Recently Accessed</option>
                  <option value="title">Title A-Z</option>
                  <option value="progress">Progress</option>
                </select>
              </div>
            </div>

            {/* Course Grid */}
            {sortedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCourses.map((course) => (
                  <EnrolledCourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-base-100 rounded-2xl border border-base-300/50">
                <div className="w-16 h-16 mx-auto bg-base-200 rounded-full flex items-center justify-center mb-4">
                  <HiOutlineFilter className="w-8 h-8 opacity-20" />
                </div>
                <h3 className="font-bold mb-1">No courses found</h3>
                <p className="text-sm opacity-60">
                  {searchQuery
                    ? `No courses match "${searchQuery}"`
                    : "No courses in this category yet"}
                </p>
                {(searchQuery || activeFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("all");
                    }}
                    className="btn btn-ghost btn-sm text-primary mt-2"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

            {/* Recommended Courses */}
            <div className="mt-12 pt-8 border-t border-base-300/50">
              <RecommendedCourses />
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LearningActivity />
            <LearningStreak />

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-base-100 border border-base-300/50 rounded-2xl p-5">
              <h3 className="font-bold text-base mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  {
                    action: "Completed lecture",
                    detail: "JavaScript Essentials: DOM Manipulation",
                    course: "Complete Web Development Bootcamp",
                    time: "2 hours ago",
                    icon: "✅",
                  },
                  {
                    action: "Started section",
                    detail: "CSS Mastery",
                    course: "Complete Web Development Bootcamp",
                    time: "3 hours ago",
                    icon: "▶️",
                  },
                  {
                    action: "Took notes",
                    detail: "Data Preprocessing: Feature Scaling",
                    course: "Machine Learning A-Z",
                    time: "Yesterday",
                    icon: "📝",
                  },
                  {
                    action: "Completed lecture",
                    detail: "Figma Interface Tour",
                    course: "UI/UX Design Masterclass",
                    time: "Yesterday",
                    icon: "✅",
                  },
                  {
                    action: "Earned certificate",
                    detail: "Python for Data Science Bootcamp",
                    course: "",
                    time: "3 days ago",
                    icon: "🏆",
                  },
                  {
                    action: "Asked a question",
                    detail: "How do closures work?",
                    course: "Complete Web Development Bootcamp",
                    time: "4 days ago",
                    icon: "❓",
                  },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-base-200/50 transition-colors"
                  >
                    <span className="text-lg shrink-0 mt-0.5">
                      {activity.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>
                        {" — "}
                        <span className="opacity-80">{activity.detail}</span>
                      </p>
                      {activity.course && (
                        <p className="text-xs opacity-50 mt-0.5">
                          {activity.course}
                        </p>
                      )}
                    </div>
                    <span className="text-xs opacity-40 shrink-0 mt-0.5">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div>
            <div className="mb-6">
              <p className="text-sm opacity-60">
                Earn certificates by completing courses. Share them on LinkedIn
                or add to your resume.
              </p>
            </div>
            <Certificates />
          </div>
        )}
      </div>
    </div>
  );
}