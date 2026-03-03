// src/components/courseDetail/WhatYouLearn.js
import { HiOutlineCheck } from "react-icons/hi";

export default function WhatYouLearn({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="border border-base-300 rounded-2xl p-6 md:p-8 mb-8">
      <h2 className="text-xl font-bold mb-5">What you&apos;ll learn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
              <HiOutlineCheck className="w-3.5 h-3.5 text-success" />
            </div>
            <p className="text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}