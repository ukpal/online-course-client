// src/components/Navbar.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/data/courses";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineShoppingCart,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineHeart,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineAcademicCap,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, isLoaded } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    addToast("You have been logged out", "info");
    router.push("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-base-100/95 backdrop-blur-md shadow-lg"
          : "bg-base-100 shadow-sm"
          }`}
      >
        {/* Promo Bar */}
        <div className="bg-primary text-primary-content text-center py-1.5 text-sm font-medium">
          🎉 New Year Sale — All courses from <strong>$9.99</strong> |{" "}
          <Link href="/courses" className="underline underline-offset-2 hover:opacity-80">
            Shop Now
          </Link>
        </div>

        {/* Main Navbar */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                className="btn btn-ghost btn-sm btn-square lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>

              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                  <HiOutlineAcademicCap className="w-6 h-6 text-primary-content" />
                </div>
                <span className="text-xl font-bold hidden sm:block">
                  <span className="text-primary">Learn</span>
                  <span className="text-secondary">Hub</span>
                </span>
              </Link>

              {/*  Categories dropdown */}
              <div className="dropdown dropdown-hover hidden lg:block">
                <label tabIndex={0} className="btn btn-ghost btn-sm gap-1 font-medium">
                  Categories
                  <HiOutlineChevronDown className="w-4 h-4" />
                </label>
                <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-xl shadow-2xl border border-base-300 w-64 p-2 z-50">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/courses?category=${cat.slug}`} className="flex items-center gap-3 py-2.5" onClick={() => {
                        document.activeElement?.blur();
                      }}>
                        <span className="text-xl">{cat.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{cat.name}</p>
                          <p className="text-xs opacity-60">{cat.courseCount.toLocaleString()} courses</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Search */}
            <div className="hidden md:flex flex-1 max-w-xl" ref={searchRef}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="input input-bordered w-full pl-10 pr-4 h-11 rounded-full bg-base-200/50 focus:bg-base-100 "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                />
                <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />

                {isSearchOpen && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-xl shadow-2xl border border-base-300 p-3 z-50">
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2 px-2">Popular Searches</p>
                    {["React", "Python", "Web Development", "Machine Learning"]
                      .filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((suggestion) => (
                        <Link
                          key={suggestion}
                          href={`/courses?search=${suggestion}`}
                          className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-base-200 transition-colors"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <HiOutlineSearch className="w-4 h-4 opacity-40" />
                          <span className="text-sm">{suggestion}</span>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Link href="/courses" className="btn btn-ghost btn-sm btn-square md:hidden">
                <HiOutlineSearch className="w-5 h-5" />
              </Link>

              <Link href="/teach" className="btn btn-ghost btn-sm font-medium hidden lg:flex">
                Teach on LearnHub
              </Link>

              {isAuthenticated && (
                <Link href="/my-learning" className="btn btn-ghost btn-sm font-medium hidden xl:flex">
                  My Learning
                </Link>
              )}

              <Link href="/wishlist" className="btn btn-ghost btn-sm btn-square hidden sm:flex relative">
                <HiOutlineHeart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-[5px] -right-[5px] w-4 h-4 bg-primary text-secondary-content text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {isAuthenticated && (
                <button className="btn btn-ghost btn-sm btn-square hidden sm:flex relative">
                  <HiOutlineBell className="w-6 h-6" />
                  <span className="absolute -top-[5px] -right-[5px] w-4 h-4 bg-primary text-secondary-content text-[10px] font-bold rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>
              )}

              <Link href="/cart" className="btn btn-ghost btn-sm btn-square relative">
                <HiOutlineShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-[5px] -right-[5px] w-4 h-4 bg-primary text-secondary-content text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Section */}
              {isLoaded && (
                <>
                  {isAuthenticated ? (
                    /* User Dropdown */
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm gap-2 rounded-full pl-1 pr-3"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30">
                          <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="hidden md:inline text-sm font-medium max-w-[100px] truncate">
                          {user.fullName.split(" ")[0]}
                        </span>
                        <HiOutlineChevronDown className="w-3 h-3 hidden md:block" />
                      </label>

                      <div
                        tabIndex={0}
                        className="dropdown-content mt-2 bg-base-100 rounded-xl shadow-2xl border border-base-300 w-72 z-50"
                      >
                        {/* User Info */}
                        <div className="p-4 border-b border-base-300">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                              <img
                                src={user.avatar}
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {user.fullName}
                              </p>
                              <p className="text-xs opacity-50 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <ul className="menu p-2 gap-0.5" style={{ width: '100%' }}>
                          <li>
                            <Link
                              href="/my-learning"
                              className="flex items-center gap-3 py-2.5"
                              onClick={() => {
                                document.activeElement?.blur();
                              }}
                            >
                              <HiOutlineBookOpen className="w-4 h-4" />
                              My Learning
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/cart"
                              className="flex items-center gap-3 py-2.5"
                              onClick={() => {
                                document.activeElement?.blur();
                              }}
                            >
                              <HiOutlineShoppingCart className="w-4 h-4" />
                              My Cart
                              {cartCount > 0 && (
                                <span className="badge badge-primary badge-xs ml-auto">
                                  {cartCount}
                                </span>
                              )}
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/wishlist"
                              className="flex items-center gap-3 py-2.5"
                              onClick={() => {
                                document.activeElement?.blur();
                              }}
                            >
                              <HiOutlineHeart className="w-4 h-4" />
                              Wishlist
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 py-2.5"
                              onClick={() => {
                                document.activeElement?.blur();
                              }}
                            >
                              <HiOutlineUser className="w-4 h-4" />
                              Profile
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              href="/settings"
                              className="flex items-center gap-3 py-2.5"
                              onClick={() => {
                                document.activeElement?.blur();
                              }}
                            >
                              <HiOutlineCog className="w-4 h-4" />
                              Settings
                            </Link>
                          </li> */}
                          {user?.role !== "instructor" && (
                            <li>
                              <Link
                                href="/teach/apply"
                                className="flex items-center gap-3 py-2.5"
                                onClick={() => document.activeElement?.blur()}
                              >
                                <HiOutlineAcademicCap className="w-4 h-4" />
                                Become Instructor
                              </Link>
                            </li>
                          )}
                          {user?.role === "instructor" && (
                            <li>
                              <Link
                                href="/instructor"
                                className="flex items-center gap-3 py-2.5"
                                onClick={() => {
                                  document.activeElement?.blur();
                                }}
                              >
                                <HiOutlineAcademicCap className="w-4 h-4" />
                                Instructor Dashboard
                              </Link>
                            </li>
                          )}
                        </ul>

                        {/* Logout */}
                        <div className="p-2 border-t border-base-300">
                          <button
                            onClick={handleLogout}
                            className="btn btn-ghost btn-sm w-full justify-start gap-3 text-error hover:bg-error/10"
                          >
                            <HiOutlineLogout className="w-4 h-4" />
                            Log Out
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Guest Buttons */
                    <>
                      <div className="hidden sm:flex items-center gap-2 ml-1">
                        <Link
                          href="/login"
                          className="btn btn-outline btn-sm btn-primary rounded-full px-5"
                        >
                          Log In
                        </Link>
                        <Link
                          href="/signup"
                          className="btn btn-primary btn-sm rounded-full px-5"
                        >
                          Sign Up
                        </Link>
                      </div>
                      <div className="sm:hidden">
                        <Link
                          href="/login"
                          className="btn btn-primary btn-sm btn-square rounded-full"
                        >
                          <HiOutlineUser className="w-4 h-4" />
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />

      <div className="h-[96px]" />
    </>
  );
}

function MobileMenu({ isOpen, onClose, isAuthenticated, user, onLogout }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-base-100 z-50 transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <HiOutlineAcademicCap className="w-6 h-6 text-primary-content" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-primary">Learn</span>
              <span className="text-secondary">Hub</span>
            </span>
          </Link>
          <button className="btn btn-ghost btn-sm btn-square" onClick={onClose}>
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        {/* User Section */}
        {isAuthenticated && user ? (
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                <img src={user.avatar} alt={user.fullName} className="w-full h-full" />
              </div>
              <div>
                <p className="font-semibold text-sm">{user.fullName}</p>
                <p className="text-xs opacity-50">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-base-300">
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-outline btn-primary flex-1 rounded-full" onClick={onClose}>
                Log In
              </Link>
              <Link href="/signup" className="btn btn-primary flex-1 rounded-full" onClick={onClose}>
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything..."
              className="input input-bordered w-full pl-10 rounded-full bg-base-200/50"
            />
            <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
          </div>
        </div>

        {/* Nav Links */}
        <ul className="menu p-4 gap-1">
          <li className="menu-title"><span className="text-xs uppercase tracking-wider">Learn</span></li>
          {isAuthenticated && (
            <li><Link href="/my-learning" onClick={onClose} className="font-medium">📖 My Learning</Link></li>
          )}
          <li><Link href="/wishlist" onClick={onClose} className="font-medium">❤️ Wishlist</Link></li>
          <li><Link href="/cart" onClick={onClose} className="font-medium">🛒 Cart</Link></li>
          {isAuthenticated && user?.role === "instructor" && (
            <li><Link href="/instructor" onClick={onClose} className="font-medium">📊 Instructor Dashboard</Link></li>
          )}
        </ul>

        <div className="divider my-0 px-4" />

        <ul className="menu p-4 gap-1">
          <li className="menu-title"><span className="text-xs uppercase tracking-wider">Categories</span></li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link href={`/courses?category=${cat.slug}`} onClick={onClose} className="font-medium">
                <span>{cat.icon}</span>{cat.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="divider my-0 px-4" />

        <ul className="menu p-4 gap-1">
          <li className="menu-title"><span className="text-xs uppercase tracking-wider">More</span></li>
          <li><Link href="/teach" onClick={onClose} className="font-medium">🎓 Teach on LearnHub</Link></li>
          {isAuthenticated && (
            <>
              <li><Link href="/profile" onClick={onClose} className="font-medium">👤 Profile</Link></li>
              <li><Link href="/settings" onClick={onClose} className="font-medium">⚙️ Settings</Link></li>
            </>
          )}
          {user?.role === "instructor" && (
            <li>
              <Link
                href="/instructor"
                className="flex items-center gap-3 py-2.5"
              >
                <HiOutlineAcademicCap className="w-4 h-4" />
                Instructor Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Logout */}
        {isAuthenticated && (
          <>
            <div className="divider my-0 px-4" />
            <div className="p-4">
              <button
                onClick={() => { onLogout(); onClose(); }}
                className="btn btn-error btn-outline w-full rounded-full gap-2"
              >
                <HiOutlineLogout className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}