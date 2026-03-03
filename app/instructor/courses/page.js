// src/app/instructor/courses/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { draftCourses } from "@/data/instructor";
import {
  HiOutlinePlusCircle,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlineSearch,
  HiOutlineDuplicate,
} from "react-icons/hi";

export default function InstructorCoursesPage() {
  const [activeTab, setActiveTab] = useState("published");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulate instructor's courses (Sarah Johnson - instructorId: 1)
  const publishedCourses = courses.filter((c) => c.instructorId === 1);

  const filteredPublished = publishedCourses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDrafts = draftCourses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">My Courses</h1>
          <p className="text-sm opacity-60">
            Manage your published and draft courses
          </p>
        </div>
        <Link href="/instructor/create" className="btn btn-primary rounded-xl gap-2">
          <HiOutlinePlusCircle className="w-5 h-5" />
          Create New Course
        </Link>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-1 border-b border-base-300/50">
          {[
            { id: "published", label: `Published (${publishedCourses.length})` },
            { id: "drafts", label: `Drafts (${draftCourses.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id ? "border-primary text-primary" : "border-transparent opacity-60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-xs ml-auto">
          <input
            type="text"
            placeholder="Search courses..."
            className="input input-bordered input-sm w-full pl-9 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
        </div>
      </div>

      {/* Published Courses */}
      {activeTab === "published" && (
        <div className="space-y-4">
          {filteredPublished.length > 0 ? (
            filteredPublished.map((course) => (
              <div key={course.id} className="bg-base-100 border border-base-300/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 card-hover">
                <div className="sm:w-44 shrink-0 rounded-xl overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-28 sm:h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-1">{course.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs opacity-60">
                        <span className="flex items-center gap-1">
                          <HiOutlineStar className="w-3.5 h-3.5 text-warning" />
                          {course.rating} ({course.totalRatings.toLocaleString()})
                        </span>
                        <span className="flex items-center gap-1">
                          <HiOutlineUsers className="w-3.5 h-3.5" />
                          {course.totalStudents.toLocaleString()} students
                        </span>
                        <span className="badge badge-ghost badge-xs">{course.level}</span>
                        {course.isBestseller && <span className="badge badge-warning badge-xs">Bestseller</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-bold">${course.discountPrice}</span>
                        <span className="text-xs line-through opacity-40">${course.price}</span>
                      </div>
                    </div>
                    <span className="badge badge-success badge-sm">Published</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link href={`/courses/${course.slug}`} className="btn btn-ghost btn-xs gap-1"><HiOutlineEye className="w-3.5 h-3.5" /> View</Link>
                    <button className="btn btn-ghost btn-xs gap-1"><HiOutlinePencil className="w-3.5 h-3.5" /> Edit</button>
                    <button className="btn btn-ghost btn-xs gap-1"><HiOutlineDuplicate className="w-3.5 h-3.5" /> Duplicate</button>
                    <button className="btn btn-ghost btn-xs gap-1 text-error"><HiOutlineTrash className="w-3.5 h-3.5" /> Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-base-100 rounded-2xl border border-base-300/50">
              <p className="opacity-50">No published courses found</p>
            </div>
          )}
        </div>
      )}

      {/* Draft Courses */}
      {activeTab === "drafts" && (
        <div className="space-y-4">
          {filteredDrafts.length > 0 ? (
            filteredDrafts.map((course) => (
              <div key={course.id} className="bg-base-100 border border-base-300/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 card-hover">
                <div className="sm:w-44 shrink-0 rounded-xl overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-28 sm:h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm">{course.title}</h3>
                      <p className="text-xs opacity-50 mt-1">{course.sections} sections • {course.lectures} lectures</p>
                      <p className="text-xs opacity-40 mt-0.5">Last edited: {new Date(course.lastEdited).toLocaleDateString()}</p>
                    </div>
                    <span className="badge badge-warning badge-sm">Draft</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs opacity-50">Completion</span>
                      <span className="text-xs font-bold">{course.progress}%</span>
                    </div>
                    <progress className="progress progress-primary w-full h-2" value={course.progress} max="100" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="btn btn-primary btn-xs gap-1"><HiOutlinePencil className="w-3.5 h-3.5" /> Continue Editing</button>
                    <button className="btn btn-ghost btn-xs gap-1 text-error"><HiOutlineTrash className="w-3.5 h-3.5" /> Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-base-100 rounded-2xl border border-base-300/50">
              <p className="opacity-50">No draft courses found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}