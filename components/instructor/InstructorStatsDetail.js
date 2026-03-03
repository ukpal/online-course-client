// src/components/instructor/InstructorStatsDetail.js
import {
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlinePlay,
  HiOutlineBadgeCheck,
  HiOutlineClock,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

export default function InstructorStatsDetail({ instructor, coursesCount, totalHours }) {
  const stats = [
    {
      icon: HiOutlineStar,
      value: instructor.rating,
      label: "Instructor Rating",
      color: "text-warning bg-warning/10",
    },
    {
      icon: HiOutlineBadgeCheck,
      value: instructor.totalReviews.toLocaleString(),
      label: "Total Reviews",
      color: "text-primary bg-primary/10",
    },
    {
      icon: HiOutlineUsers,
      value: instructor.totalStudents.toLocaleString(),
      label: "Total Students",
      color: "text-success bg-success/10",
    },
    {
      icon: HiOutlinePlay,
      value: coursesCount,
      label: "Total Courses",
      color: "text-info bg-info/10",
    },
    {
      icon: HiOutlineClock,
      value: `${totalHours}h+`,
      label: "Content Hours",
      color: "text-error bg-error/10",
    },
    {
      icon: HiOutlineGlobeAlt,
      value: "English",
      label: "Language",
      color: "text-secondary bg-secondary/10",
    },
  ];

  return (
    <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Stats at a Glance</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-3 rounded-xl bg-base-200/30">
            <div
              className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}
            >
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-[10px] opacity-50 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}