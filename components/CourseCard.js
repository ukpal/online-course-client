// src/components/CourseCard.js
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineStar,
  HiOutlineClock,
  HiOutlinePlay,
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingCart,
  HiOutlineCheck,
} from "react-icons/hi";

export default function CourseCard({ course, variant = "default" }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const discountPercent = Math.round(
    ((course.price - course.discountPrice) / course.price) * 100
  );

  const wishlisted = isInWishlist(course.id);
  const inCart = isInCart(course.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addToCart(course);
      addToast(`"${course.title}" added to cart!`, "success");
    }
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(course);
    addToast(
      wishlisted
        ? `Removed from wishlist`
        : `"${course.title}" added to wishlist!`,
      wishlisted ? "info" : "success"
    );
  };

  if (variant === "horizontal") {
    return (
      <HorizontalCard
        course={course}
        discountPercent={discountPercent}
        inCart={inCart}
        wishlisted={wishlisted}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />
    );
  }

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group card bg-base-100 border border-base-300/50 shadow-sm card-hover overflow-hidden"
    >
      {/* Thumbnail */}
      <figure className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
            <HiOutlinePlay className="w-7 h-7 text-primary ml-1" />
          </div>
        </div>

        <div className="absolute top-3 left-3 flex gap-2">
          {course.isBestseller && (
            <span className="badge badge-warning badge-sm font-semibold">Bestseller</span>
          )}
          {course.isNew && (
            <span className="badge badge-success badge-sm font-semibold text-white">New</span>
          )}
          {(course.isFree || course.discountPrice === 0) && (
            <span className="badge badge-info badge-sm font-semibold text-white">Free</span>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${wishlisted
            ? "bg-error/90 text-white"
            : "bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white"
            }`}
        >
          {wishlisted ? (
            <HiHeart className="w-4 h-4" />
          ) : (
            <HiOutlineHeart className="w-4 h-4" />
          )}
        </button>
      </figure>

      {/* Content */}
      <div className="card-body p-4 gap-2">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-xs opacity-60">{course.instructor}</p>

        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-warning">{course.rating}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <HiOutlineStar
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(course.rating)
                  ? "text-warning fill-warning"
                  : "text-base-300"
                  }`}
              />
            ))}
          </div>
          <span className="text-xs opacity-50">
            ({course.totalRatings.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs opacity-60">
          <span className="flex items-center gap-1">
            <HiOutlineClock className="w-3.5 h-3.5" />
            {course.totalHours}h
          </span>
          <span>{course.totalLectures} lectures</span>
          <span className="badge badge-ghost badge-xs">{course.level}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-1 pt-2 border-t border-base-300/50">
          <div className="flex items-center gap-2">
            {course.isFree || course.discountPrice === 0 ? (
              <span className="text-lg font-bold text-success">Free</span>
            ) : (
              <>
                <span className="text-lg font-bold">${course.discountPrice}</span>
                {course.discountPrice < course.price && (
                  <>
                    <span className="text-sm line-through opacity-40">${course.price}</span>
                    <span className="badge badge-sm badge-error text-white font-medium">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn btn-sm btn-circle ${inCart ? "btn-success" : "btn-primary"
              }`}
            title={inCart ? "In cart" : "Add to cart"}
          >
            {inCart ? (
              <HiOutlineCheck className="w-4 h-4" />
            ) : (
              <HiOutlineShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

function HorizontalCard({
  course,
  discountPercent,
  inCart,
  wishlisted,
  onAddToCart,
  onToggleWishlist,
}) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col sm:flex-row bg-base-100 border border-base-300/50 rounded-xl shadow-sm card-hover overflow-hidden"
    >
      <figure className="relative overflow-hidden sm:w-60 shrink-0">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-36 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {course.isBestseller && (
          <span className="absolute top-3 left-3 badge badge-warning badge-sm font-semibold">
            Bestseller
          </span>
        )}
        <button
          onClick={onToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${wishlisted
            ? "bg-error/90 text-white"
            : "bg-white/80 backdrop-blur-sm"
            }`}
        >
          {wishlisted ? (
            <HiHeart className="w-4 h-4" />
          ) : (
            <HiOutlineHeart className="w-4 h-4" />
          )}
        </button>
      </figure>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm opacity-70 mt-1 line-clamp-2">{course.shortDescription}</p>
          <p className="text-xs opacity-50 mt-1">{course.instructor}</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-warning">{course.rating}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <HiOutlineStar
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(course.rating)
                    ? "text-warning fill-warning"
                    : "text-base-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-xs opacity-50">
              ({course.totalRatings.toLocaleString()})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {course.isFree || course.discountPrice === 0 ? (
                <span className="text-lg font-bold text-success">Free</span>
              ) : (
                <>
                  <span className="text-lg font-bold">${course.discountPrice}</span>
                  {course.discountPrice < course.price && (
                    <span className="text-sm line-through opacity-40">${course.price}</span>
                  )}
                </>
              )}
            </div>
            <button
              onClick={onAddToCart}
              className={`btn btn-sm btn-circle ${inCart ? "btn-success" : "btn-primary"
                }`}
            >
              {inCart ? (
                <HiOutlineCheck className="w-4 h-4" />
              ) : (
                <HiOutlineShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}