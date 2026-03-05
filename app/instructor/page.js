// src/app/instructor/page.js
"use client";

import Link from "next/link";
import { instructorStats, revenueData, recentEnrollments, recentReviews } from "@/data/instructor";
import {
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineStar,
  HiOutlineBookOpen,
  HiOutlineTrendingUp,
  HiOutlineArrowRight,
  HiOutlineEye,
} from "react-icons/hi";

export default function InstructorDashboard() {
  const stats = [
    { icon: HiOutlineCurrencyDollar, label: "Total Revenue", value: `$${instructorStats.totalRevenue.toLocaleString()}`, change: "+12.5%", color: "text-success bg-success/10", positive: true },
    { icon: HiOutlineUsers, label: "Total Students", value: instructorStats.totalStudents.toLocaleString(), change: "+8.3%", color: "text-info bg-info/10", positive: true },
    { icon: HiOutlineStar, label: "Avg. Rating", value: instructorStats.avgRating, change: "+0.1", color: "text-warning bg-warning/10", positive: true },
    { icon: HiOutlineBookOpen, label: "Active Courses", value: instructorStats.publishedCourses, change: "+2", color: "text-primary bg-primary/10", positive: true },
  ];

  const maxRevenue = Math.max(...revenueData.monthly.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-base-100 border border-base-300/50 rounded-2xl p-5 card-hover">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.positive ? "text-success" : "text-error"}`}>
                <HiOutlineTrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold mt-3">{stat.value}</p>
            <p className="text-xs opacity-60 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-base-100 border border-base-300/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold">Revenue Overview</h3>
              <p className="text-xs opacity-50">Monthly earnings this year</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-success">
                ${instructorStats.monthlyRevenue.toLocaleString()}
              </p>
              <p className="text-[10px] opacity-50">This Month</p>
            </div>
          </div>

          <div className="flex items-end gap-2 h-55">
            {revenueData.monthly.map((d, i) => {
              const height = (d.revenue / maxRevenue) * 100;
              const isCurrentMonth = i === revenueData.monthly.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full flex items-end justify-center" style={{ height: "200px" }}>
                    <div
                      className={`relative w-full max-w-8 rounded-t-lg transition-all duration-500 cursor-pointer ${
                        isCurrentMonth ? "bg-primary" : "bg-primary/25 hover:bg-primary/50"
                      }`}
                      style={{ height: `${Math.max(height, 4)}%` }}
                    >

                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral text-neutral-content text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ${d.revenue.toLocaleString()}
                    </div>
                    </div>
                  </div>
                  <span className={`text-[10px] ${isCurrentMonth ? "font-bold text-primary" : "opacity-50"}`}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
          <h3 className="font-bold mb-4">Quick Overview</h3>
          <div className="space-y-4">
            {[
              { label: "Published Courses", value: instructorStats.publishedCourses, icon: "📚" },
              { label: "Draft Courses", value: instructorStats.draftCourses, icon: "📝" },
              { label: "Total Reviews", value: instructorStats.totalReviews.toLocaleString(), icon: "⭐" },
              { label: "Content Hours", value: `${instructorStats.totalHoursContent}h`, icon: "🕐" },
              { label: "New Students (Month)", value: instructorStats.newStudentsThisMonth.toLocaleString(), icon: "🎓" },
              { label: "Monthly Revenue", value: `$${instructorStats.monthlyRevenue.toLocaleString()}`, icon: "💰" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <span className="text-sm flex items-center gap-2">
                  <span>{item.icon}</span> {item.label}
                </span>
                <span className="font-bold text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Enrollments</h3>
            <Link href="/instructor/enrollments" className="btn btn-ghost btn-xs text-primary gap-1">
              View All <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentEnrollments.map((e) => (
              <div key={e.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-base-200/50 transition-colors">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-base-300 shrink-0">
                  <img src={e.avatar} alt={e.student} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.student}</p>
                  <p className="text-[10px] opacity-50 truncate">{e.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-success">${e.price}</p>
                  <p className="text-[10px] opacity-40">{e.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Reviews</h3>
            <Link href="/instructor/reviews" className="btn btn-ghost btn-xs text-primary gap-1">
              View All <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentReviews.slice(0, 4).map((r) => (
              <div key={r.id} className="p-2 rounded-xl hover:bg-base-200/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-base-300">
                    <img src={r.avatar} alt={r.student} className="w-full h-full" />
                  </div>
                  <span className="text-sm font-medium">{r.student}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < r.rating ? "text-warning" : "text-base-300"}`}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] opacity-40 ml-auto">{r.date}</span>
                </div>
                <p className="text-xs opacity-70 line-clamp-2 ml-9">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}