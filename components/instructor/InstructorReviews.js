// src/components/instructor/InstructorReviews.js
"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating";
import { HiOutlineThumbUp, HiStar } from "react-icons/hi";

const dummyReviews = [
  {
    id: 1,
    user: "Alex M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 5,
    date: "2024-10-28",
    course: "The Complete Web Development Bootcamp 2024",
    comment:
      "One of the best instructors I've ever had. Explains complex concepts in simple terms. The projects are practical and portfolio-worthy!",
  },
  {
    id: 2,
    user: "Priya S.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 5,
    date: "2024-10-15",
    course: "Machine Learning A-Z: AI, Python & R",
    comment:
      "I went from knowing nothing about coding to building real applications. The teaching style is perfect for beginners.",
  },
  {
    id: 3,
    user: "Tom B.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    rating: 4,
    date: "2024-09-22",
    course: "Advanced CSS and Sass",
    comment:
      "Great course overall. Some sections could use more depth, but the coverage is impressive. Would definitely recommend.",
  },
  {
    id: 4,
    user: "Nina P.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
    rating: 5,
    date: "2024-09-10",
    course: "UI/UX Design Masterclass",
    comment:
      "Absolutely loved this course! The real-world examples and hands-on projects are fantastic. Best investment in my education.",
  },
  {
    id: 5,
    user: "Carlos R.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rating: 5,
    date: "2024-08-28",
    course: "The Complete Web Development Bootcamp 2024",
    comment:
      "I landed my first dev job after completing this course. The curriculum is comprehensive and up-to-date.",
  },
];

export default function InstructorReviews({ instructor }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const ratingDistribution = [
    { stars: 5, percent: 75 },
    { stars: 4, percent: 16 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 1 },
  ];

  return (
    <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-5">Student Reviews</h2>

      {/* Rating Overview */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6 p-4 bg-base-200/30 rounded-xl">
        <div className="text-center shrink-0">
          <p className="text-4xl font-bold text-warning mb-1">
            {instructor.rating}
          </p>
          <StarRating rating={instructor.rating} size="sm" showNumber={false} />
          <p className="text-xs opacity-50 mt-1">
            {instructor.totalReviews.toLocaleString()} reviews
          </p>
        </div>

        <div className="flex-1 space-y-1.5">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 w-14 shrink-0">
                <span className="text-xs font-medium">{item.stars}</span>
                <HiStar className="w-3.5 h-3.5 text-warning" />
              </div>
              <div className="flex-1 h-2 bg-base-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="text-[10px] opacity-50 w-8 text-right">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-base-300/50">
        {dummyReviews.slice(0, visibleCount).map((review) => (
          <div key={review.id} className="py-4 first:pt-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300 shrink-0">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{review.user}</span>
                  <span className="text-xs opacity-40">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <StarRating
                  rating={review.rating}
                  size="xs"
                  showNumber={false}
                />
                <p className="text-xs text-primary opacity-70 mt-1 mb-1.5">
                  {review.course}
                </p>
                <p className="text-sm opacity-80 leading-relaxed">
                  {review.comment}
                </p>
                <button className="btn btn-ghost btn-xs gap-1 opacity-50 hover:opacity-100 mt-2">
                  <HiOutlineThumbUp className="w-3.5 h-3.5" />
                  Helpful
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < dummyReviews.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount(dummyReviews.length)}
            className="btn btn-ghost btn-sm text-primary"
          >
            Show All Reviews ({dummyReviews.length})
          </button>
        </div>
      )}
    </div>
  );
}