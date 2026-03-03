// src/context/CartContext.js
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("learnhub_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading cart:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("learnhub_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((course) => {
    setCartItems((prev) => {
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

  const removeFromCart = useCallback((courseId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== courseId));
  }, []);

  const isInCart = useCallback(
    (courseId) => cartItems.some((item) => item.id === courseId),
    [cartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.discountPrice, 0);
  const cartOriginalTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const cartDiscount = cartOriginalTotal - cartTotal;
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        cartTotal,
        cartOriginalTotal,
        cartDiscount,
        cartCount,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}