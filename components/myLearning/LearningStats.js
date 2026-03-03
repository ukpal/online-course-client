// src/components/myLearning/LearningStats.js
"use client";

import { useProgress } from "@/context/ProgressContext";
import { courses, enrolledCourses } from "@/data/courses";
import {
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineTrendingUp,
} from "react-icons/hi";

export default function LearningStats() {
  const { getCourseProgress } = useProgress();

  const enrolled = courses.filter((c) => enrolledCourses.includes(c.id));

  const totalHours = enrolled.reduce((sum, c) => sum + c.totalHours, 0);

  const completedCourses = enrolled.filter((c) => {
    const totalLectures = c.sections.reduce(
      (sum, s) => sum + s.lectures.length,
      0
    );
    return getCourseProgress(c.id, totalLectures) === 100;
  }).length;

  const avgProgress =
    enrolled.length > 0
      ? Math.round(
          enrolled.reduce((sum, c) => {
            const totalLectures = c.sections.reduce(
              (s, sec) => s + sec.lectures.length,
              0
            );
            return sum + getCourseProgress(c.id, totalLectures);
          }, 0) / enrolled.length
        )
      : 0;

  const stats = [
    {
      icon: HiOutlineAcademicCap,
      label: "Enrolled Courses",
      value: enrolled.length,
      color: "text-primary bg-primary/10",
    },
    {
      icon: HiOutlineTrendingUp,
      label: "Completed",
      value: completedCourses,
      color: "text-success bg-success/10",
    },
    {
      icon: HiOutlineClock,
      label: "Total Hours",
      value: `${totalHours}h`,
      color: "text-info bg-info/10",
    },
    {
      icon: HiOutlineFire,
      label: "Avg. Progress",
      value: `${avgProgress}%`,
      color: "text-warning bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-base-100 border border-base-300/50 rounded-2xl p-4 card-hover"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-60">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}