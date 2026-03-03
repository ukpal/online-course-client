// src/app/instructor/layout.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineStar,
  HiOutlineCurrencyDollar,
  HiOutlinePlusCircle,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineArrowLeft,
  HiOutlineChevronDown,
} from "react-icons/hi";

const sidebarLinks = [
  { href: "/instructor", label: "Dashboard", icon: HiOutlineHome },
  { href: "/instructor/courses", label: "My Courses", icon: HiOutlineBookOpen },
  { href: "/instructor/create", label: "Create Course", icon: HiOutlinePlusCircle },
  { href: "/instructor/analytics", label: "Analytics", icon: HiOutlineChartBar },
  { href: "/instructor/reviews", label: "Reviews", icon: HiOutlineStar },
  { href: "/instructor/earnings", label: "Earnings", icon: HiOutlineCurrencyDollar },
  { href: "/instructor/settings", label: "Settings", icon: HiOutlineCog },
];

export default function InstructorLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isInstructor, isLoaded, logout, switchToStudent } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoaded, isAuthenticated, router]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "info");
    router.push("/");
  };

  const handleSwitchToStudent = () => {
    switchToStudent();
    addToast("Switched to student mode", "info");
    router.push("/");
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-base-100 border-r border-base-300/50 fixed top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-4 border-b border-base-300/50">
          <Link href="/instructor" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <HiOutlineAcademicCap className="w-6 h-6 text-primary-content" />
            </div>
            <div>
              <span className="text-lg font-bold block leading-tight">
                <span className="text-primary">Learn</span>
                <span className="text-secondary">Hub</span>
              </span>
              <span className="text-[10px] text-primary font-medium uppercase tracking-wider">
                Instructor
              </span>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/instructor" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md shadow-primary/20"
                    : "hover:bg-base-200 opacity-70 hover:opacity-100"
                }`}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-base-300/50 space-y-1">
          <button
            onClick={handleSwitchToStudent}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full hover:bg-base-200 opacity-70 hover:opacity-100 transition-all"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            Switch to Student
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full hover:bg-error/10 text-error transition-all"
          >
            <HiOutlineLogout className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-base-100 z-50 transform transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300/50">
          <Link href="/instructor" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <HiOutlineAcademicCap className="w-6 h-6 text-primary-content" />
            </div>
            <span className="text-lg font-bold">
              <span className="text-primary">Learn</span>
              <span className="text-secondary">Hub</span>
            </span>
          </Link>
          <button className="btn btn-ghost btn-sm btn-square" onClick={() => setIsSidebarOpen(false)}>
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/instructor" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive ? "bg-primary text-primary-content" : "hover:bg-base-200 opacity-70 hover:opacity-100"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-base-300/50 space-y-1">
          <button onClick={handleSwitchToStudent} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full hover:bg-base-200">
            <HiOutlineArrowLeft className="w-5 h-5" /> Switch to Student
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-error hover:bg-error/10">
            <HiOutlineLogout className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-base-100 border-b border-base-300/50 px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-ghost btn-sm btn-square lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <HiOutlineMenu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-semibold text-sm capitalize">
                {pathname === "/instructor"
                  ? "Dashboard"
                  : pathname.split("/").pop().replace(/-/g, " ")}
              </h2>
              <p className="text-[10px] opacity-50">
                Welcome back, {user.fullName.split(" ")[0]}!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm btn-square relative">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-error text-error-content text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm gap-2 rounded-full pl-1 pr-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30">
                  <img src={user.avatar} alt={user.fullName} className="w-full h-full" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">{user.fullName.split(" ")[0]}</span>
                <HiOutlineChevronDown className="w-3 h-3 hidden sm:block" />
              </label>
              <div tabIndex={0} className="dropdown-content mt-2 bg-base-100 rounded-xl shadow-2xl border border-base-300 w-56 z-50">
                <div className="p-3 border-b border-base-300">
                  <p className="font-semibold text-sm">{user.fullName}</p>
                  <p className="text-xs opacity-50">{user.email}</p>
                </div>
                <ul className="menu p-2">
                  <li><Link href="/instructor/settings">⚙️ Settings</Link></li>
                  <li><button onClick={handleSwitchToStudent}>🎓 Student Mode</button></li>
                  <li><button onClick={handleLogout} className="text-error">🚪 Log Out</button></li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}