// src/app/courses/[slug]/not-found.js
import Link from "next/link";
import { HiOutlineEmojiSad } from "react-icons/hi";

export default function CourseNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-base-200 rounded-full flex items-center justify-center">
          <HiOutlineEmojiSad className="w-12 h-12 opacity-30" />
        </div>
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <p className="text-muted max-w-md mx-auto">
          The course you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Link href="/courses" className="btn btn-primary rounded-full px-6">
            Browse Courses
          </Link>
          <Link href="/" className="btn btn-ghost rounded-full px-6">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}