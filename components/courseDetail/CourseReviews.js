// src/components/courseDetail/CourseReviews.js
"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating";
import {
  HiOutlineStar,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiOutlineSearch,
} from "react-icons/hi";
import { HiStar } from "react-icons/hi";

export default function CourseReviews({ course }) {
  const [filterRating, setFilterRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const ratingDistribution = [
    { stars: 5, percent: 72 },
    { stars: 4, percent: 18 },
    { stars: 3, percent: 6 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 1 },
  ];

  const filteredReviews = course.reviews.filter((review) => {
    const matchesRating = filterRating === 0 || review.rating === filterRating;
    const matchesSearch =
      searchQuery === "" ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-6">Student Reviews</h2>

      {/* Rating Overview */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8 p-6 bg-base-200/30 rounded-2xl border border-base-300/50">
        {/* Average Rating */}
        <div className="text-center sm:text-left shrink-0">
          <p className="text-5xl font-bold text-warning mb-1">
            {course.rating}
          </p>
          <StarRating rating={course.rating} size="md" showNumber={false} />
          <p className="text-sm opacity-60 mt-1">
            {course.totalRatings.toLocaleString()} ratings
          </p>
        </div>

        {/* Distribution Bars */}
        <div className="flex-1 space-y-2">
          {ratingDistribution.map((item) => (
            <button
              key={item.stars}
              onClick={() =>
                setFilterRating(
                  filterRating === item.stars ? 0 : item.stars
                )
              }
              className={`flex items-center gap-3 w-full group hover:bg-base-200 rounded-lg px-2 py-1 transition-colors ${
                filterRating === item.stars ? "bg-base-200" : ""
              }`}
            >
              <div className="flex items-center gap-1 shrink-0 w-20">
                <span className="text-sm font-medium">{item.stars}</span>
                <HiStar className="w-4 h-4 text-warning" />
              </div>
              <div className="flex-1 h-2.5 bg-base-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="text-xs opacity-60 w-10 text-right">
                {item.percent}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search reviews..."
            className="input input-bordered w-full pl-10 input-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterRating(0)}
            className={`btn btn-sm rounded-full ${
              filterRating === 0 ? "btn-primary" : "btn-ghost"
            }`}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() =>
                setFilterRating(filterRating === star ? 0 : star)
              }
              className={`btn btn-sm rounded-full gap-1 ${
                filterRating === star ? "btn-primary" : "btn-ghost"
              }`}
            >
              {star}
              <HiStar className="w-3 h-3" />
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-base-300">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm opacity-60">
              No reviews match your filter criteria.
            </p>
            <button
              onClick={() => {
                setFilterRating(0);
                setSearchQuery("");
              }}
              className="btn btn-ghost btn-sm text-primary mt-2"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredReviews.length > 0 && (
        <div className="text-center mt-6">
          <button className="btn btn-outline btn-primary rounded-full px-8">
            Show More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(null);

  return (
    <div className="py-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300 shrink-0">
          <img
            src={review.avatar}
            alt={review.user}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
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

          <StarRating rating={review.rating} size="xs" showNumber={false} />

          <p className="text-sm opacity-80 mt-2 leading-relaxed">
            {review.comment}
          </p>

          {/* Helpful */}
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs opacity-50">Was this review helpful?</span>
            <button
              onClick={() => setHelpful(true)}
              className={`btn btn-ghost btn-xs gap-1 ${
                helpful === true ? "text-success" : ""
              }`}
            >
              <HiOutlineThumbUp className="w-3.5 h-3.5" />
              Yes
            </button>
            <button
              onClick={() => setHelpful(false)}
              className={`btn btn-ghost btn-xs gap-1 ${
                helpful === false ? "text-error" : ""
              }`}
            >
              <HiOutlineThumbDown className="w-3.5 h-3.5" />
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}