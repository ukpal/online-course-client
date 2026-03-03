// src/app/cart/page.js
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineTrash,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineTag,
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineArrowRight,
} from "react-icons/hi";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    cartTotal,
    cartOriginalTotal,
    cartDiscount,
    cartCount,
  } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const handleRemove = (item) => {
    removeFromCart(item.id);
    addToast(`"${item.title}" removed from cart`, "info");
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      addToWishlist(item);
    }
    removeFromCart(item.id);
    addToast(`"${item.title}" moved to wishlist`, "success");
  };

  if (cartCount === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container-custom py-8">
        <h1 className="heading-secondary mb-2">Shopping Cart</h1>
        <p className="text-muted mb-8">
          {cartCount} {cartCount === 1 ? "course" : "courses"} in cart
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 min-w-0">
            <div className="divide-y divide-base-300 border border-base-300 rounded-2xl overflow-hidden">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemove(item)}
                  onMoveToWishlist={() => handleMoveToWishlist(item)}
                />
              ))}
            </div>

            {cartCount > 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    clearCart();
                    addToast("Cart cleared", "info");
                  }}
                  className="btn btn-ghost btn-sm text-error gap-1"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-28">
              <div className="bg-base-200/50 border border-base-300 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Original Price</span>
                    <span className="line-through opacity-50">
                      ${cartOriginalTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Discount</span>
                    <span className="text-success font-medium">
                      -${cartDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="divider my-0" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-4">
                  <div className="join w-full">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="input input-bordered join-item flex-1 input-sm"
                    />
                    <button className="btn btn-primary btn-sm join-item">
                      <HiOutlineTag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="btn btn-primary w-full rounded-xl text-base gap-2 mb-3">
                  Checkout
                  <HiOutlineArrowRight className="w-5 h-5" />
                </button>

                {/* Trust Badges */}
                <div className="space-y-2 pt-3 border-t border-base-300">
                  <div className="flex items-center gap-2 text-xs opacity-60">
                    <HiOutlineShieldCheck className="w-4 h-4 text-success" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-60">
                    <HiOutlineShieldCheck className="w-4 h-4 text-success" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-60">
                    <HiOutlineShieldCheck className="w-4 h-4 text-success" />
                    <span>Full lifetime access</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 text-center">
                <p className="text-xs opacity-40 mb-2">Accepted payment methods</p>
                <div className="flex justify-center gap-3">
                  {["Visa", "MC", "Amex", "PayPal"].map((m) => (
                    <span
                      key={m}
                      className="px-2 py-1 bg-base-200 rounded text-[10px] font-bold opacity-40"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, onRemove, onMoveToWishlist }) {
  const discountPercent = Math.round(
    ((item.price - item.discountPrice) / item.price) * 100
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 hover:bg-base-200/30 transition-colors">
      {/* Thumbnail */}
      <Link
        href={`/courses/${item.slug}`}
        className="shrink-0 sm:w-36 overflow-hidden rounded-lg"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-24 sm:h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/courses/${item.slug}`}
          className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2"
        >
          {item.title}
        </Link>
        <p className="text-xs opacity-60 mt-1">By {item.instructor}</p>

        <div className="flex items-center gap-2 mt-2">
          {item.isBestseller && (
            <span className="badge badge-warning badge-xs font-semibold">
              Bestseller
            </span>
          )}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-warning">{item.rating}</span>
            <HiOutlineStar className="w-3 h-3 text-warning fill-warning" />
            <span className="text-xs opacity-50">
              ({item.totalRatings?.toLocaleString()})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-1 text-xs opacity-50">
          <span className="flex items-center gap-1">
            <HiOutlineClock className="w-3 h-3" />
            {item.totalHours}h
          </span>
          <span>{item.totalLectures} lectures</span>
          <span className="badge badge-ghost badge-xs">{item.level}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={onRemove}
            className="btn btn-ghost btn-xs text-error gap-1"
          >
            <HiOutlineTrash className="w-3.5 h-3.5" />
            Remove
          </button>
          <button
            onClick={onMoveToWishlist}
            className="btn btn-ghost btn-xs text-primary gap-1"
          >
            <HiOutlineHeart className="w-3.5 h-3.5" />
            Move to Wishlist
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <p className="text-lg font-bold text-primary">${item.discountPrice}</p>
        {item.discountPrice < item.price && (
          <>
            <p className="text-sm line-through opacity-40">${item.price}</p>
            <p className="text-xs text-success font-medium">-{discountPercent}%</p>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md mx-auto px-4">
        <div className="w-28 h-28 mx-auto bg-base-200 rounded-full flex items-center justify-center">
          <HiOutlineShoppingCart className="w-12 h-12 opacity-20" />
        </div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted">
          Looks like you haven&apos;t added any courses yet. Browse our catalog and
          find the perfect course for you!
        </p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Link
            href="/courses"
            className="btn btn-primary rounded-full px-8 gap-2"
          >
            Browse Courses
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/wishlist"
            className="btn btn-ghost rounded-full px-6 gap-2"
          >
            <HiOutlineHeart className="w-4 h-4" />
            View Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
}