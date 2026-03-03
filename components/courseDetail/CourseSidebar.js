// src/components/courseDetail/CourseSidebar.js
"use client";

import Link from "next/link";
import { HiOutlinePlay as HiPlay } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiHeart,
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineDeviceMobile,
  HiOutlineBadgeCheck,
  HiOutlineDownload,
  HiOutlineGift,
  HiOutlineShare,
  HiOutlineCheck,
} from "react-icons/hi";

export default function CourseSidebar({ course }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const inCart = isInCart(course.id);
  const wishlisted = isInWishlist(course.id);
  const discountPercent = Math.round(
    ((course.price - course.discountPrice) / course.price) * 100
  );

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(course);
      addToast(`"${course.title}" added to cart!`, "success");
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist(course);
    addToast(
      wishlisted ? "Removed from wishlist" : `Added to wishlist!`,
      wishlisted ? "info" : "success"
    );
  };

  return (
    <div className="sticky top-28">
      <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
        <figure className="relative group cursor-pointer">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <HiOutlinePlay className="w-8 h-8 text-primary ml-1" />
            </div>
          </div>
          <span className="absolute bottom-3 left-3 badge badge-neutral text-xs">
            Preview this course
          </span>
        </figure>

        <div className="card-body p-5">
          {/* Price */}
          <div className="flex items-center gap-3 mb-1">
            {course.isFree || course.discountPrice === 0 ? (
              <span className="text-3xl font-bold text-success">Free</span>
            ) : (
              <>
                <span className="text-3xl font-bold">${course.discountPrice}</span>
                {course.discountPrice < course.price && (
                  <>
                    <span className="text-lg line-through opacity-40">${course.price}</span>
                    <span className="badge badge-error text-white font-semibold">
                      {discountPercent}% off
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          {/* Timer - only for paid courses */}
          {!course.isFree && course.discountPrice > 0 && (
            <p className="text-sm text-error font-medium mb-4 flex items-center gap-1.5">
              <HiOutlineClock className="w-4 h-4" />
              <span>2 days left at this price!</span>
            </p>
          )}

          {/* CTA Buttons */}
          {course.isFree || course.discountPrice === 0 ? (
            <Link
              href={`/learn/${course.slug}`}
              className="btn btn-success w-full rounded-lg text-base mb-3 gap-2"
            >
              <HiOutlinePlay className="w-5 h-5" />
              Enroll for Free
            </Link>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                className={`btn w-full rounded-lg text-base mb-2 gap-2 ${inCart ? "btn-success" : "btn-primary"
                  }`}
              >
                {inCart ? (
                  <><HiOutlineCheck className="w-5 h-5" /> Added to Cart</>
                ) : (
                  <><HiOutlineShoppingCart className="w-5 h-5" /> Add to Cart</>
                )}
              </button>

              <button className="btn btn-outline w-full rounded-lg text-base mb-2">
                Buy Now
              </button>
            </>
          )}

          <Link
            href={`/learn/${course.slug}`}
            className="btn btn-accent w-full rounded-lg text-base mb-3 gap-2"
          >
            <HiOutlinePlay className="w-5 h-5" />
            Start Learning
          </Link>

          <p className="text-center text-xs opacity-50 mb-4">
            30-Day Money-Back Guarantee
          </p>

          <div className="flex gap-2 mb-4">
            <button
              className="btn btn-ghost btn-sm flex-1 gap-1.5"
              onClick={() => {
                navigator.share?.({
                  title: course.title,
                  url: window.location.href,
                }).catch(() => { });
              }}
            >
              <HiOutlineShare className="w-4 h-4" />
              Share
            </button>
            <button className="btn btn-ghost btn-sm flex-1 gap-1.5">
              <HiOutlineGift className="w-4 h-4" />
              Gift
            </button>
            <button
              className={`btn btn-ghost btn-sm flex-1 gap-1.5 ${wishlisted ? "text-error" : ""
                }`}
              onClick={handleToggleWishlist}
            >
              {wishlisted ? (
                <HiHeart className="w-4 h-4" />
              ) : (
                <HiOutlineHeart className="w-4 h-4" />
              )}
              Wishlist
            </button>
          </div>

          <div className="border-t border-base-300 pt-4">
            <h4 className="font-semibold text-sm mb-3">This course includes:</h4>
            <ul className="space-y-2.5">
              {[
                { icon: HiOutlinePlay, text: `${course.totalHours} hours on-demand video` },
                { icon: HiOutlineDocumentText, text: `${course.totalLectures} lectures` },
                { icon: HiOutlineDownload, text: "Downloadable resources" },
                { icon: HiOutlineDeviceMobile, text: "Access on mobile and TV" },
                { icon: HiOutlineBadgeCheck, text: "Certificate of completion" },
                { icon: HiOutlineClock, text: "Full lifetime access" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm opacity-80">
                  <item.icon className="w-4 h-4 shrink-0 opacity-60" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-base-300 pt-4 mt-4">
            <h4 className="font-semibold text-sm mb-2">Apply Coupon</h4>
            <div className="join w-full">
              <input
                type="text"
                placeholder="Enter coupon"
                className="input input-bordered join-item input-sm flex-1"
              />
              <button className="btn btn-primary btn-sm join-item">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}