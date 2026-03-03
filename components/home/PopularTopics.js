// src/components/home/PopularTopics.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineTrendingUp } from "react-icons/hi";

const topics = [
  { name: "React", slug: "React", courses: 1240, color: "from-cyan-500 to-blue-500", size: "lg" },
  { name: "Python", slug: "Python", courses: 1850, color: "from-yellow-400 to-green-500", size: "lg" },
  { name: "JavaScript", slug: "JavaScript", courses: 2100, color: "from-yellow-400 to-amber-500", size: "lg" },
  { name: "Machine Learning", slug: "Machine Learning", courses: 890, color: "from-purple-500 to-indigo-500", size: "md" },
  { name: "AWS", slug: "AWS", courses: 760, color: "from-orange-400 to-amber-600", size: "md" },
  { name: "Node.js", slug: "Node.js", courses: 920, color: "from-green-500 to-emerald-600", size: "md" },
  { name: "Figma", slug: "Figma", courses: 430, color: "from-pink-500 to-rose-500", size: "sm" },
  { name: "TypeScript", slug: "TypeScript", courses: 680, color: "from-blue-500 to-indigo-500", size: "md" },
  { name: "SQL", slug: "SQL", courses: 540, color: "from-blue-400 to-cyan-500", size: "sm" },
  { name: "Flutter", slug: "Flutter", courses: 380, color: "from-sky-400 to-blue-500", size: "sm" },
  { name: "Docker", slug: "Docker", courses: 420, color: "from-blue-500 to-sky-600", size: "sm" },
  { name: "Next.js", slug: "Next.js", courses: 510, color: "from-gray-700 to-gray-900", size: "sm" },
  { name: "Data Science", slug: "Data Science", courses: 970, color: "from-teal-400 to-emerald-500", size: "md" },
  { name: "UI/UX Design", slug: "UI/UX Design", courses: 650, color: "from-fuchsia-500 to-pink-500", size: "md" },
  { name: "Cybersecurity", slug: "Cybersecurity", courses: 340, color: "from-red-500 to-rose-600", size: "sm" },
  { name: "React Native", slug: "React Native", courses: 290, color: "from-cyan-400 to-blue-600", size: "sm" },
  { name: "Tailwind CSS", slug: "Tailwind CSS", courses: 310, color: "from-sky-400 to-cyan-500", size: "sm" },
  { name: "Django", slug: "Django", courses: 270, color: "from-green-600 to-emerald-700", size: "sm" },
  { name: "TensorFlow", slug: "TensorFlow", courses: 410, color: "from-orange-500 to-red-500", size: "sm" },
  { name: "Git & GitHub", slug: "Git", courses: 380, color: "from-gray-600 to-gray-800", size: "sm" },
  { name: "GraphQL", slug: "GraphQL", courses: 220, color: "from-pink-600 to-fuchsia-600", size: "sm" },
  { name: "Kotlin", slug: "Kotlin", courses: 190, color: "from-violet-500 to-purple-600", size: "sm" },
  { name: "DevOps", slug: "DevOps", courses: 480, color: "from-indigo-500 to-blue-600", size: "md" },
  { name: "Photoshop", slug: "Photoshop", courses: 350, color: "from-blue-600 to-indigo-700", size: "sm" },
];

export default function PopularTopics() {
  const [showAll, setShowAll] = useState(false);

  const visibleTopics = showAll ? topics : topics.slice(0, 16);

  return (
    <section className="section-padding bg-base-200/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <HiOutlineTrendingUp className="w-4 h-4" />
            Trending Now
          </div>
          <h2 className="heading-secondary">
            Explore <span className="text-primary">Popular Topics</span>
          </h2>
          <p className="text-muted mt-2 max-w-2xl mx-auto">
            Discover the most in-demand skills. Click any topic to find the best
            courses and start learning today.
          </p>
        </div>

        {/* Topics Cloud */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {visibleTopics.map((topic) => (
            <Link
              key={topic.name}
              href={`/courses?search=${encodeURIComponent(topic.slug)}`}
              className={`group relative overflow-hidden rounded-full border border-base-300/50 bg-base-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-transparent ${
                topic.size === "lg"
                  ? "px-6 py-3"
                  : topic.size === "md"
                  ? "px-5 py-2.5"
                  : "px-4 py-2"
              }`}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                <span
                  className={`font-semibold group-hover:text-white transition-colors duration-300 ${
                    topic.size === "lg"
                      ? "text-base"
                      : topic.size === "md"
                      ? "text-sm"
                      : "text-xs"
                  }`}
                >
                  {topic.name}
                </span>
                <span
                  className={`opacity-50 group-hover:text-white/80 group-hover:opacity-100 transition-all duration-300 ${
                    topic.size === "lg"
                      ? "text-xs"
                      : "text-[10px]"
                  }`}
                >
                  {topic.courses.toLocaleString()}+
                </span>
                <HiOutlineArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Show More / Less */}
        {topics.length > 16 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-ghost btn-sm text-primary gap-1 rounded-full"
            >
              {showAll ? "Show Less" : `Show All ${topics.length} Topics`}
              <HiOutlineArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAll ? "rotate-[-90deg]" : "rotate-90"
                }`}
              />
            </button>
          </div>
        )}

        {/* Bottom Stats */}
        {/* <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-base-300/50">
          {[
            { value: "200+", label: "Topics Available" },
            { value: "10,000+", label: "Courses" },
            { value: "Updated", label: "Weekly" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-lg font-bold text-primary">{stat.value}</p>
              <p className="text-xs opacity-50">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}