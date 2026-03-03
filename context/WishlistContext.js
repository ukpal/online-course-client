// src/context/WishlistContext.js
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("learnhub_wishlist");
      if (saved) {
        setWishlistItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading wishlist:", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("learnhub_wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoaded]);

  const addToWishlist = useCallback((course) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === course.id)) return prev;
      return [...prev, {
        id: course.id,
        title: course.title,
        slug: course.slug,
        thumbnail: course.thumbnail,
        instructor: course.instructor,
        price: course.price,
        discountPrice: course.discountPrice,
        rating: course.rating,
        totalRatings: course.totalRatings,
        totalHours: course.totalHours,
        totalLectures: course.totalLectures,
        level: course.level,
        isBestseller: course.isBestseller,
      }];
    });
  }, []);

  const removeFromWishlist = useCallback((courseId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== courseId));
  }, []);

  const isInWishlist = useCallback(
    (courseId) => wishlistItems.some((item) => item.id === courseId),
    [wishlistItems]
  );

  const toggleWishlist = useCallback(
    (course) => {
      if (isInWishlist(course.id)) {
        removeFromWishlist(course.id);
      } else {
        addToWishlist(course);
      }
    },
    [isInWishlist, removeFromWishlist, addToWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        wishlistCount: wishlistItems.length,
        isLoaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}