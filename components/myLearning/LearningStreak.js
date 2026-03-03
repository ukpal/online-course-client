// src/components/myLearning/LearningStreak.js
"use client";

import { HiOutlineFire, HiOutlineLightningBolt } from "react-icons/hi";

export default function LearningStreak() {
  // Dummy streak data
  const currentStreak = 7;
  const longestStreak = 15;
  const totalDays = 42;

  // Last 30 days activity (1 = active, 0 = inactive)
  const last30Days = [
    1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  ];

  return (
    <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-base">Learning Streak</h3>
          <p className="text-xs opacity-50 mt-0.5">Keep the momentum going!</p>
        </div>
        <div className="flex items-center gap-1 text-warning">
          <HiOutlineFire className="w-6 h-6" />
          <span className="text-2xl font-bold">{currentStreak}</span>
        </div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-warning/10 rounded-xl p-3 text-center">
          <HiOutlineFire className="w-5 h-5 text-warning mx-auto mb-1" />
          <p className="text-sm font-bold">{currentStreak}</p>
          <p className="text-[10px] opacity-50">Current</p>
        </div>
        <div className="bg-error/10 rounded-xl p-3 text-center">
          <HiOutlineLightningBolt className="w-5 h-5 text-error mx-auto mb-1" />
          <p className="text-sm font-bold">{longestStreak}</p>
          <p className="text-[10px] opacity-50">Longest</p>
        </div>
        <div className="bg-primary/10 rounded-xl p-3 text-center">
          <span className="text-sm block mb-1">📅</span>
          <p className="text-sm font-bold">{totalDays}</p>
          <p className="text-[10px] opacity-50">Total Days</p>
        </div>
      </div>

      {/* Activity Grid */}
      <div>
        <p className="text-xs font-medium opacity-50 mb-2">Last 30 Days</p>
        <div className="grid grid-cols-10 gap-1.5">
          {last30Days.map((active, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm transition-colors ${
                active
                  ? "bg-primary hover:bg-primary/80"
                  : "bg-base-300/50 hover:bg-base-300"
              }`}
              title={`Day ${i + 1}: ${active ? "Active" : "Inactive"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2 justify-end">
          <span className="text-[10px] opacity-40">Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-base-300/50" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
          <span className="text-[10px] opacity-40">More</span>
        </div>
      </div>
    </div>
  );
}