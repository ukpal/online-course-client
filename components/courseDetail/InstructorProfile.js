// src/components/courseDetail/InstructorProfile.js
import Link from "next/link";
import StarRating from "@/components/StarRating";
import {
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlinePlay,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

export default function InstructorProfile({ instructor }) {
  if (!instructor) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Instructor</h2>

      <div className="bg-base-200/30 rounded-2xl p-6 border border-base-300/50">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Avatar */}
          <Link
            href={`/instructors/${instructor.slug}`}
            className="shrink-0"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary transition-colors">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Info */}
          <div className="flex-1">
            <Link
              href={`/instructors/${instructor.slug}`}
              className="text-lg font-bold text-primary hover:underline"
            >
              {instructor.name}
            </Link>
            <p className="text-sm opacity-70 mt-0.5">{instructor.title}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-3 mb-4">
              <div className="flex items-center gap-1.5 text-sm">
                <HiOutlineStar className="w-4 h-4 text-warning" />
                <span className="font-semibold">{instructor.rating}</span>
                <span className="opacity-60">Instructor Rating</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <HiOutlineBadgeCheck className="w-4 h-4 text-primary" />
                <span className="font-semibold">
                  {instructor.totalReviews.toLocaleString()}
                </span>
                <span className="opacity-60">Reviews</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <HiOutlineUsers className="w-4 h-4 text-success" />
                <span className="font-semibold">
                  {instructor.totalStudents.toLocaleString()}
                </span>
                <span className="opacity-60">Students</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <HiOutlinePlay className="w-4 h-4 text-info" />
                <span className="font-semibold">
                  {instructor.totalCourses}
                </span>
                <span className="opacity-60">Courses</span>
              </div>
            </div>

            <p className="text-sm opacity-80 leading-relaxed">
              {instructor.bio}
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {instructor.expertise.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-outline badge-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}