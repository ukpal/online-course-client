// src/app/wishlist/page.js
"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineHeart,
  HiOutlineTrash,
  HiOutlineShoppingCart,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineCheck,
} from "react-icons/hi";

// export const metadata = {
//   title: "Wishlist | LearnHub",
// };

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (item) => {
    if (!isInCart(item.id)) {
      addToCart(item);
      addToast(`"${item.title}" added to cart!`, "success");
    }
  };

  const handleRemove = (item) => {
    removeFromWishlist(item.id);
    addToast(`Removed from wishlist`, "info");
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="w-28 h-28 mx-auto bg-base-200 rounded-full flex items-center justify-center">
            <HiOutlineHeart className="w-12 h-12 opacity-20" />
          </div>
          <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
          <p className="text-muted">
            Save courses you&apos;re interested in for later by clicking the heart icon.
          </p>
          <Link
            href="/courses"
            className="btn btn-primary rounded-full px-8 gap-2"
          >
            Browse Courses
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container-custom py-8">
        <h1 className="heading-secondary mb-2">My Wishlist</h1>
        <p className="text-muted mb-8">
          {wishlistCount} {wishlistCount === 1 ? "course" : "courses"} saved
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => {
            const inCart = isInCart(item.id);
            const discountPercent = Math.round(
              ((item.price - item.discountPrice) / item.price) * 100
            );

            return (
              <div
                key={item.id}
                className="card bg-base-100 border border-base-300/50 shadow-sm card-hover overflow-hidden"
              >
                <Link href={`/courses/${item.slug}`}>
                  <figure className="relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {item.isBestseller && (
                      <span className="absolute top-3 left-3 badge badge-warning badge-sm font-semibold">
                        Bestseller
                      </span>
                    )}
                  </figure>
                </Link>

                <div className="card-body p-4 gap-2">
                  <Link href={`/courses/${item.slug}`}>
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs opacity-60">{item.instructor}</p>

                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-warning">
                      {item.rating}
                    </span>
                    <HiOutlineStar className="w-3.5 h-3.5 text-warning fill-warning" />
                    <span className="text-xs opacity-50">
                      ({item.totalRatings?.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs opacity-60">
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-3.5 h-3.5" />
                      {item.totalHours}h
                    </span>
                    <span>{item.totalLectures} lectures</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold">
                      ${item.discountPrice}
                    </span>
                    {item.discountPrice < item.price && (
                      <>
                        <span className="text-sm line-through opacity-40">
                          ${item.price}
                        </span>
                        <span className="badge badge-sm badge-error text-white">
                          -{discountPercent}%
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`btn btn-sm flex-1 rounded-lg gap-1 ${
                        inCart ? "btn-success" : "btn-primary"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <HiOutlineCheck className="w-4 h-4" />
                          In Cart
                        </>
                      ) : (
                        <>
                          <HiOutlineShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleRemove(item)}
                      className="btn btn-ghost btn-sm btn-square rounded-lg text-error"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}