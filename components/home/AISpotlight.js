// src/components/home/AISpotlight.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineChip,
  HiOutlineSparkles,
} from "react-icons/hi";

const aiCourses = [
  {
    id: 1,
    title: "ChatGPT & Prompt Engineering Masterclass",
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tag: "Most Popular",
    students: "45,000+",
    slug: "machine-learning-az-ai-python-r",
  },
  {
    id: 2,
    title: "Machine Learning with Python: Zero to Hero",
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    tag: "Bestseller",
    students: "142,000+",
    slug: "machine-learning-az-ai-python-r",
  },
    {
    id: 3,
    title: "Build AI Apps with LangChain & OpenAI",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=400&fit=crop",
    tag: "New & Hot",
    students: "18,000+",
    slug: "python-data-science-ml-bootcamp",
  },
  {
    id: 4,
    title: "Deep Learning & Neural Networks A-Z",
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&h=400&fit=crop",
    tag: "Advanced",
    students: "89,000+",
    slug: "machine-learning-az-ai-python-r",
  },
];

const aiStats = [
  { value: "300%", label: "Growth in AI Jobs (2024)" },
  { value: "$150K+", label: "Avg. AI Engineer Salary" },
  { value: "50M+", label: "AI Tools Users Worldwide" },
];

const floatingIcons = ["🤖", "🧠", "⚡", "🔮", "💡", "🚀"];

export default function AISpotlight() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % aiCourses.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glowing Orbs — theme colors */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      {/* Floating Icons */}
      {floatingIcons.map((icon, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-10 ai-float hidden lg:block"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i}s`,
          }}
        >
          {icon}
        </div>
      ))}

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-neutral-content">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <HiOutlineSparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary font-semibold">
                The AI Revolution is Here
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Master{" "}
              <span className="relative inline-block">
                <span className="text-primary">
                  Artificial Intelligence
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/50 rounded-full" />
              </span>
              <br />
              <span className="text-neutral-content/90">
                Before It Masters You
              </span>
            </h2>

            {/* Description */}
            <p className="text-base text-neutral-content/60 mb-8 leading-relaxed max-w-lg">
              AI is transforming every industry. Stay ahead of the curve with
              our expert-led courses on Machine Learning, Deep Learning, ChatGPT,
              Generative AI, and more. From beginner to advanced.
            </p>

            {/* AI Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "ChatGPT",
                "Machine Learning",
                "Deep Learning",
                "Generative AI",
                "Computer Vision",
                "NLP",
                "LangChain",
                "Prompt Engineering",
              ].map((skill) => (
                <Link
                  key={skill}
                  href={`/courses?search=${encodeURIComponent(skill)}`}
                  className="px-3 py-1.5 rounded-full border border-neutral-content/10 text-xs font-medium text-neutral-content/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  {skill}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {aiStats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-neutral-content/40 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses?search=AI"
                className="btn btn-primary rounded-full px-7 gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <HiOutlineLightningBolt className="w-5 h-5" />
                Explore AI Courses
              </Link>
              <Link
                href="/courses?search=Machine+Learning"
                className="btn btn-ghost text-neutral-content/70 hover:text-neutral-content rounded-full px-6 gap-2 border border-neutral-content/10 hover:border-neutral-content/30 hover:bg-neutral-content/5"
              >
                Browse ML Courses
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Course Cards */}
          <div className="relative">
            {/* Main Featured Card */}
            <div className="relative">
              {aiCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`transition-all duration-700 ease-in-out ${
                    index === activeCard
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95 absolute inset-0"
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-content/10">
                    {/* Image */}
                    <div className="relative h-56 sm:h-64">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/20 to-transparent" />

                      {/* Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full">
                          {course.tag}
                        </span>
                      </div>

                      {/* AI Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 rounded-xl bg-neutral-content/10 backdrop-blur-md flex items-center justify-center border border-neutral-content/20">
                          <HiOutlineChip className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-neutral-content font-bold text-lg leading-snug mb-1">
                          {course.title}
                        </h3>
                        <p className="text-neutral-content/60 text-sm">
                          {course.instructor}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-neutral-content/50 text-xs">
                            {course.students} students enrolled
                          </span>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="btn btn-sm bg-primary/20 hover:bg-primary/30 text-primary border-none backdrop-blur-md rounded-full gap-1"
                          >
                            View Course
                            <HiOutlineArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {aiCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeCard
                      ? "w-8 bg-primary"
                      : "w-2 bg-neutral-content/20 hover:bg-neutral-content/40"
                  }`}
                />
              ))}
            </div>

            {/* Mini Cards List */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              {aiCourses.map((course, index) => (
                <button
                  key={course.id}
                  onClick={() => setActiveCard(index)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-300 ${
                    index === activeCard
                      ? "bg-primary/10 border border-primary/25 shadow-lg shadow-primary/5"
                      : "bg-neutral-content/5 border border-neutral-content/5 hover:bg-neutral-content/10 hover:border-neutral-content/10"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={course.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium leading-snug line-clamp-2 ${
                        index === activeCard
                          ? "text-primary"
                          : "text-neutral-content/60"
                      }`}
                    >
                      {course.title}
                    </p>
                  </div>
                  {index === activeCard && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ai-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
          }
          50% {
            transform: translateY(-5px) rotate(-3deg);
          }
          75% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
        .ai-float {
          animation: ai-float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}