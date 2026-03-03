// src/app/courses/layout.js
import { Suspense } from "react";

export const metadata = {
  title: "Browse Courses | LearnHub",
  description: "Explore thousands of online courses across various categories.",
};

export default function CoursesLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}