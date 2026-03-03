// src/components/home/CategoriesSection.js
import Link from "next/link";
import { categories } from "@/data/courses";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function CategoriesSection() {
  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="heading-secondary">
              Explore Top{" "}
              <span className="text-primary">Categories</span>
            </h2>
            <p className="text-muted mt-2 max-w-lg">
              Browse our most popular categories and find the right course for you
            </p>
          </div>
          <Link
            href="/courses"
            className="btn btn-ghost btn-sm gap-1 text-primary shrink-0"
          >
            View All
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/courses?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-base-200/50 border border-base-300/50 p-5 md:p-6 card-hover"
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                <span className="text-4xl md:text-5xl block mb-3">
                  {category.icon}
                </span>
                <h3 className="font-semibold text-sm md:text-base mb-1">
                  {category.name}
                </h3>
                <p className="text-xs md:text-sm opacity-60">
                  {category.courseCount.toLocaleString()} courses
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-base-300/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <HiOutlineArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}