// src/app/(main)/certificate/[courseSlug]/page.js
"use client";

import { use, useRef } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import {
  HiOutlineDownload,
  HiOutlineShare,
  HiOutlineArrowLeft,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";

export default function CertificatePage({ params }) {
  const { courseSlug } = use(params);
  const { user, isAuthenticated } = useAuth();
  const { getCourseProgress } = useProgress();
  const certificateRef = useRef(null);

  const course = courses.find((c) => c.slug === courseSlug);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <Link href="/courses" className="btn btn-primary rounded-full">Browse Courses</Link>
        </div>
      </div>
    );
  }

  const totalLectures = course.sections.reduce((sum, s) => sum + s.lectures.length, 0);
  const progress = getCourseProgress(course.id, totalLectures);
  const isCompleted = progress === 100;

  if (!isCompleted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto bg-warning/10 rounded-full flex items-center justify-center">
            <HiOutlineAcademicCap className="w-10 h-10 text-warning" />
          </div>
          <h2 className="text-xl font-bold">Course Not Yet Completed</h2>
          <p className="text-sm opacity-60">
            Complete all lectures in &quot;{course.title}&quot; to earn your certificate.
          </p>
          <div className="flex items-center justify-center gap-2">
            <progress className="progress progress-primary w-48 h-3" value={progress} max="100" />
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <Link href={`/learn/${course.slug}`} className="btn btn-primary rounded-full px-8">
            Continue Learning
          </Link>
        </div>
      </div>
    );
  }

  const certId = `LH-${course.id.toString(36).toUpperCase()}-${(user?.id || 0).toString(36).toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-4)}`;

  const handleDownload = () => {
    alert("In production, this would generate a PDF certificate for download.");
  };

  const handleShare = (platform) => {
    const text = `I just earned a certificate for completing "${course.title}" on LearnHub! 🎉`;
    const url = window.location.href;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-base-200/30 py-8">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link href="/my-learning" className="btn btn-ghost btn-sm gap-2 mb-6">
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to My Learning
        </Link>

        {/* Certificate Card */}
        <div
          ref={certificateRef}
          className="bg-base-100 border-2 border-primary/20 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <HiOutlineAcademicCap className="w-8 h-8" />
                <span className="text-2xl font-bold">
                  Learn<span className="opacity-80">Hub</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mt-4">
                Certificate of Completion
              </h1>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-8 md:p-12 text-center">
            <p className="text-sm opacity-60 mb-2 uppercase tracking-widest">
              This certifies that
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {user?.fullName || "Student"}
            </h2>

            <p className="text-sm opacity-60 mb-2 uppercase tracking-widest">
              has successfully completed
            </p>
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              {course.title}
            </h3>

            {/* Course Details */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { label: "Duration", value: `${course.totalHours} hours` },
                { label: "Lectures", value: totalLectures },
                { label: "Level", value: course.level },
                { label: "Category", value: course.category },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-bold">{item.value}</p>
                  <p className="text-[10px] opacity-50 uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto mb-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-base-300 mx-auto mb-2">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-full h-full"
                  />
                </div>
                <div className="border-t border-base-300 pt-2">
                  <p className="text-sm font-semibold">{course.instructor}</p>
                  <p className="text-[10px] opacity-50">Instructor</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <HiOutlineAcademicCap className="w-8 h-8 text-primary" />
                </div>
                <div className="border-t border-base-300 pt-2">
                  <p className="text-sm font-semibold">LearnHub</p>
                  <p className="text-[10px] opacity-50">Platform</p>
                </div>
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="flex flex-col items-center gap-2 pt-6 border-t border-base-300/50">
              <div className="flex items-center gap-2 text-success">
                <HiOutlineBadgeCheck className="w-5 h-5" />
                <span className="text-sm font-semibold">Verified Certificate</span>
              </div>
              <p className="text-xs opacity-40 font-mono">
                Certificate ID: {certId}
              </p>
              <p className="text-xs opacity-40">
                Issued on{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="btn btn-primary rounded-xl gap-2 px-6"
          >
            <HiOutlineDownload className="w-5 h-5" />
            Download PDF
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => handleShare("linkedin")}
              className="btn btn-outline rounded-xl gap-2"
            >
              <FaLinkedinIn className="w-4 h-4" />
              LinkedIn
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="btn btn-outline rounded-xl gap-2"
            >
              <FaTwitter className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="btn btn-outline rounded-xl gap-2"
            >
              <FaFacebookF className="w-4 h-4" />
              Facebook
            </button>
          </div>
        </div>

        {/* What's Next */}
        <div className="mt-10 bg-base-100 border border-base-300/50 rounded-2xl p-6">
          <h3 className="font-bold mb-4">🎯 What&apos;s Next?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/courses"
              className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors text-center"
            >
              <span className="text-2xl block mb-2">📚</span>
              <p className="text-sm font-medium">Explore More Courses</p>
              <p className="text-xs opacity-50 mt-1">Continue your learning journey</p>
            </Link>
            <Link
              href="/my-learning"
              className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors text-center"
            >
              <span className="text-2xl block mb-2">📖</span>
              <p className="text-sm font-medium">My Learning Dashboard</p>
              <p className="text-xs opacity-50 mt-1">Track all your progress</p>
            </Link>
            <Link
              href="/profile"
              className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors text-center"
            >
              <span className="text-2xl block mb-2">🏆</span>
              <p className="text-sm font-medium">View All Certificates</p>
              <p className="text-xs opacity-50 mt-1">Manage your achievements</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}