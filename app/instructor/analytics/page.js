// src/app/instructor/analytics/page.js
"use client";

import { revenueData, instructorStats } from "@/data/instructor";
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from "react-icons/hi";

export default function AnalyticsPage() {
  const maxStudents = Math.max(...revenueData.monthly.map((d) => d.students));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Enrollments", value: "145,000", change: "+8.3%", positive: true },
          { label: "Completion Rate", value: "68%", change: "+2.1%", positive: true },
          { label: "Avg. Watch Time", value: "42 min", change: "-3.5%", positive: false },
        ].map((stat, i) => (
          <div key={i} className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
            <p className="text-xs opacity-50">{stat.label}</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.positive ? "text-success" : "text-error"}`}>
                {stat.positive ? <HiOutlineTrendingUp className="w-3 h-3" /> : <HiOutlineTrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Enrollment Chart */}
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
        <h3 className="font-bold mb-4">Enrollment Trends</h3>
        <div className="flex items-end gap-2 h-55">
          {revenueData.monthly.map((d, i) => {
            const height = (d.students / maxStudents) * 100;
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex items-end justify-center" style={{ height: "220px" }}>
                  <div className="relative w-full max-w-8 rounded-t-lg bg-info/30 hover:bg-info/60 transition-colors" style={{ height: `${Math.max(height, 4)}%` }}>
                    <span className="absolute -top-5 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">{d.students.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-[10px] opacity-50">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Courses */}
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
        <h3 className="font-bold mb-4">Top Performing Courses</h3>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead><tr><th>Course</th><th>Students</th><th>Revenue</th><th>Rating</th><th>Completion</th></tr></thead>
            <tbody>
              {[
                { course: "Complete Web Dev Bootcamp", students: "85,000", revenue: "$42,350", rating: 4.8, completion: "72%" },
                { course: "Advanced CSS and Sass", students: "35,000", revenue: "$18,200", rating: 4.9, completion: "65%" },
                { course: "AWS Solutions Architect", students: "25,000", revenue: "$24,200", rating: 4.8, completion: "58%" },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="font-medium text-sm">{row.course}</td>
                  <td className="text-sm">{row.students}</td>
                  <td className="text-sm text-success font-medium">{row.revenue}</td>
                  <td><span className="text-sm">⭐ {row.rating}</span></td>
                  <td><progress className="progress progress-primary w-16 h-2" value={parseInt(row.completion)} max="100" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}