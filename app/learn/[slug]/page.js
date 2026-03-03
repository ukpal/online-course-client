// src/app/learn/[slug]/page.js
"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { useProgress } from "@/context/ProgressContext";
import VideoPlayer from "@/components/learn/VideoPlayer";
import LearnSidebar from "@/components/learn/LearnSidebar";
import LearnTabs from "@/components/learn/LearnTabs";
import CompletionModal from "@/components/learn/CompletionModal";
import {
  HiOutlineArrowLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineAcademicCap,
  HiOutlineCheck,
} from "react-icons/hi";

export default function LearnPage({ params }) {
  const { slug } = use(params);
  const course = courses.find((c) => c.slug === slug);

  const {
    isLectureComplete,
    toggleLectureComplete,
    getCourseProgress,
    setLastWatched,
    getLastWatched,
    isLoaded,
  } = useProgress();

  const [currentSection, setCurrentSection] = useState(0);
  const [currentLecture, setCurrentLecture] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [expandedSections, setExpandedSections] = useState([0]);

  // Load last watched on mount
  useEffect(() => {
    if (isLoaded && course) {
      const lastWatched = getLastWatched(course.id);
      setCurrentSection(lastWatched.sectionIndex);
      setCurrentLecture(lastWatched.lectureIndex);
      setExpandedSections([lastWatched.sectionIndex]);
    }
  }, [isLoaded, course, getLastWatched]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  const totalLectures = course
    ? course.sections.reduce((sum, s) => sum + s.lectures.length, 0)
    : 0;

  const currentLectureData =
    course?.sections[currentSection]?.lectures[currentLecture];

  // Flatten lectures for prev/next navigation
  const flatLectures = course
    ? course.sections.flatMap((s, si) =>
        s.lectures.map((l, li) => ({
          sectionIndex: si,
          lectureIndex: li,
          ...l,
        }))
      )
    : [];

  const currentFlatIndex = flatLectures.findIndex(
    (l) =>
      l.sectionIndex === currentSection && l.lectureIndex === currentLecture
  );

  const hasPrev = currentFlatIndex > 0;
  const hasNext = currentFlatIndex < flatLectures.length - 1;

  const goToLecture = useCallback(
    (sectionIndex, lectureIndex) => {
      setCurrentSection(sectionIndex);
      setCurrentLecture(lectureIndex);
      setLastWatched(course.id, sectionIndex, lectureIndex);
      setIsMobileSidebarOpen(false);

      if (!expandedSections.includes(sectionIndex)) {
        setExpandedSections((prev) => [...prev, sectionIndex]);
      }

      // Scroll to top of video
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [course, setLastWatched, expandedSections]
  );

  const goPrev = () => {
    if (hasPrev) {
      const prev = flatLectures[currentFlatIndex - 1];
      goToLecture(prev.sectionIndex, prev.lectureIndex);
    }
  };

  const goNext = () => {
    if (hasNext) {
      const next = flatLectures[currentFlatIndex + 1];
      goToLecture(next.sectionIndex, next.lectureIndex);
    }
  };

  const handleVideoComplete = () => {
    if (!isLectureComplete(course.id, currentSection, currentLecture)) {
      toggleLectureComplete(course.id, currentSection, currentLecture);
    }

    const completedCount =
      course.sections.reduce(
        (sum, s, si) =>
          sum +
          s.lectures.filter((_, li) => isLectureComplete(course.id, si, li))
            .length,
        0
      ) + 1;

    if (completedCount >= totalLectures) {
      setTimeout(() => setShowCompletion(true), 500);
    } else if (hasNext) {
      setTimeout(goNext, 1500);
    }
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (!course) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course not found</h1>
          <Link href="/courses" className="btn btn-primary rounded-full">
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = getCourseProgress(course.id, totalLectures);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-40 h-14 bg-neutral text-neutral-content flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="btn btn-ghost btn-sm btn-square text-neutral-content"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <HiOutlineAcademicCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium truncate max-w-xs lg:max-w-md">
              {course.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <progress
              className="progress progress-primary w-24 h-2"
              value={progressPercent}
              max="100"
            />
            <span className="text-xs font-medium">{progressPercent}%</span>
          </div>

          {/* Mark Complete Button */}
          <button
            onClick={() =>
              toggleLectureComplete(course.id, currentSection, currentLecture)
            }
            className={`btn btn-sm rounded-lg gap-1.5 ${
              isLectureComplete(course.id, currentSection, currentLecture)
                ? "btn-success"
                : "btn-outline border-neutral-content/30 text-neutral-content hover:btn-success"
            }`}
          >
            <HiOutlineCheck className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isLectureComplete(course.id, currentSection, currentLecture)
                ? "Completed"
                : "Mark Complete"}
            </span>
          </button>

          {/* Sidebar Toggle - Desktop */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn btn-ghost btn-sm btn-square text-neutral-content hidden lg:flex"
          >
            <HiOutlineMenu className="w-5 h-5" />
          </button>

          {/* Sidebar Toggle - Mobile */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="btn btn-ghost btn-sm btn-square text-neutral-content lg:hidden"
          >
            <HiOutlineMenu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left: Video + Navigation + Tabs (scrollable) */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="bg-black">
            <div className="max-w-7xl mx-auto">
              <VideoPlayer
                lecture={currentLectureData}
                onComplete={handleVideoComplete}
              />
            </div>
          </div>

          {/* Lecture Navigation Bar */}
          <div className="sticky top-14 z-30 flex items-center justify-between px-4 py-2.5 border-b border-base-300 bg-base-100 shadow-sm">
            <button
              onClick={goPrev}
              disabled={!hasPrev}
              className="btn btn-ghost btn-sm gap-1 disabled:opacity-30"
            >
              <HiOutlineChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <p className="text-xs sm:text-sm font-medium text-center truncate px-2 flex-1">
              <span className="opacity-50 hidden sm:inline">
                Lecture {currentFlatIndex + 1} of {flatLectures.length}:{" "}
              </span>
              <span className="opacity-50 sm:hidden">
                {currentFlatIndex + 1}/{flatLectures.length}:{" "}
              </span>
              {currentLectureData?.title}
            </p>

            <button
              onClick={goNext}
              disabled={!hasNext}
              className="btn btn-ghost btn-sm gap-1 disabled:opacity-30"
            >
              <span className="hidden sm:inline">Next</span>
              <HiOutlineChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs Content (naturally scrollable) */}
          <div className="max-w-5xl mx-auto">
            <LearnTabs
              course={course}
              currentSection={currentSection}
              currentLecture={currentLecture}
            />
          </div>
        </div>

        {/* Right: Desktop Sidebar (sticky, independently scrollable) */}
        <div
          className={`hidden lg:block border-l border-base-300 transition-all duration-300 shrink-0 ${
            isSidebarOpen ? "w-80 xl:w-96" : "w-0"
          }`}
        >
          <div
            className={`sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden ${
              isSidebarOpen ? "w-80 xl:w-96" : "w-0"
            }`}
          >
            <LearnSidebar
              course={course}
              currentSection={currentSection}
              currentLecture={currentLecture}
              onSelectLecture={goToLecture}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileSidebarOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-base-100 z-50 transform transition-transform duration-300 lg:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-3 border-b border-base-300">
          <span className="font-bold text-sm">Course Content</span>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="btn btn-ghost btn-sm btn-square"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
        <div className="h-[calc(100%-52px)] overflow-y-auto">
          <LearnSidebar
            course={course}
            currentSection={currentSection}
            currentLecture={currentLecture}
            onSelectLecture={goToLecture}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>
      </div>

      {/* Completion Modal */}
      <CompletionModal
        course={course}
        isOpen={showCompletion}
        onClose={() => setShowCompletion(false)}
      />
    </div>
  );
}