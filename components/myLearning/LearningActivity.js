// src/components/myLearning/LearningActivity.js
"use client";

import { useState } from "react";

export default function LearningActivity() {
  const [period, setPeriod] = useState("week");

  // Dummy activity data
  const weekData = [
    { day: "Mon", hours: 1.5, lectures: 3 },
    { day: "Tue", hours: 2.0, lectures: 5 },
    { day: "Wed", hours: 0.5, lectures: 1 },
    { day: "Thu", hours: 3.0, lectures: 7 },
    { day: "Fri", hours: 1.0, lectures: 2 },
    { day: "Sat", hours: 4.0, lectures: 9 },
    { day: "Sun", hours: 2.5, lectures: 6 },
  ];

  const maxHours = Math.max(...weekData.map((d) => d.hours));

  const totalHours = weekData.reduce((sum, d) => sum + d.hours, 0);
  const totalLectures = weekData.reduce((sum, d) => sum + d.lectures, 0);
  const avgHours = (totalHours / weekData.length).toFixed(1);

  return (
    <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-base">Learning Activity</h3>
          <p className="text-xs opacity-50 mt-0.5">Your study pattern this week</p>
        </div>
        <select
          className="select select-bordered select-xs rounded-full"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 mb-4" style={{ height: "235px" }}>
        {weekData.map((d, i) => {
          const heightPixels = maxHours > 0 ? (d.hours / maxHours) * 200 : 0;
          const isToday = i === new Date().getDay() - 1;

          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium opacity-60">
                {d.hours}h
              </span>
              <div className="w-full relative flex items-end" style={{ height: "200px" }}>
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                    isToday
                      ? "bg-primary"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  style={{ height: `${Math.max(heightPixels, 4)}px` }}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isToday ? "text-primary font-bold" : "opacity-50"
                }`}
              >
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-base-300/50">
        <div className="text-center">
          <p className="text-lg font-bold text-primary">{totalHours}h</p>
          <p className="text-[10px] opacity-50">Total Hours</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-success">{totalLectures}</p>
          <p className="text-[10px] opacity-50">Lectures</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-info">{avgHours}h</p>
          <p className="text-[10px] opacity-50">Daily Avg</p>
        </div>
      </div>
    </div>
  );
}