// src/components/home/HeroSection.js
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  HiOutlinePlay,
  HiOutlineArrowRight,
  HiOutlineStar,
} from "react-icons/hi";

const heroSlides = [
  {
    title: "Learn Without Limits",
    highlight: "Without Limits",
    subtitle:
      "Start, switch, or advance your career with thousands of courses from world-class instructors and institutions.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
  },
  {
    title: "Unlock Your Potential",
    highlight: "Your Potential",
    subtitle:
      "Gain in-demand skills with expert-led courses in tech, business, design, and more. Learn at your own pace.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop",
  },
  {
    title: "Future-Proof Your Skills",
    highlight: "Your Skills",
    subtitle:
      "Stay ahead with cutting-edge courses in AI, cloud computing, cybersecurity, and emerging technologies.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating || index === currentSlide) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 700);
      }, 400);
    },
    [isAnimating, currentSlide]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setTimeout(() => setIsAnimating(false), 700);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-base-200 via-base-100 to-base-200 min-h-[600px] lg:min-h-[650px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite_1s]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-16">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            {/* Trust Badge */}
            <div
              className={`inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary transition-all duration-700 ease-out ${
                isAnimating
                  ? "opacity-0 -translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <HiOutlineStar className="w-4 h-4 fill-primary" />
              <span>Trusted by 500,000+ learners worldwide</span>
            </div>

            {/* Title with smooth animation */}
            <div className="overflow-hidden">
              <h1
                className={`heading-primary leading-tight transition-all duration-700 ease-out ${
                  isAnimating
                    ? "opacity-0 translate-y-8"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {slide.title.split(slide.highlight)[0]}
                <span className="relative inline-block">
                  <span className="text-primary">{slide.highlight}</span>
                  <svg
                    className={`absolute -bottom-2 left-0 w-full transition-all duration-500 delay-500 ${
                      isAnimating ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                    }`}
                    style={{ transformOrigin: "left" }}
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-secondary"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Subtitle with smooth animation */}
            <p
              className={`text-lg opacity-70 max-w-lg mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-100 ease-out ${
                isAnimating
                  ? "opacity-0 translate-y-6"
                  : "opacity-70 translate-y-0"
              }`}
            >
              {slide.subtitle}
            </p>

            {/* Search Bar */}
            <div
              className={`max-w-lg mx-auto lg:mx-0 transition-all duration-700 delay-200 ease-out ${
                isAnimating
                  ? "opacity-0 translate-y-6"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="join w-full shadow-lg rounded-full">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="input join-item flex-1 bg-base-100 border-base-300 h-13 text-base pl-5 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link
                  href={`/courses${searchQuery ? `?search=${searchQuery}` : ""}`}
                  className="btn join-item btn-primary h-13 px-6 rounded-r-full"
                >
                  <span className="hidden sm:inline">Search</span>
                  <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Popular Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 justify-center lg:justify-start">
                <span className="text-xs opacity-50 font-medium">Popular:</span>
                {["React", "Python", "UI/UX", "AI"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/courses?search=${tag}`}
                    className="badge badge-outline badge-sm hover:badge-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-3 justify-center lg:justify-start pt-2 transition-all duration-700 delay-300 ease-out ${
                isAnimating
                  ? "opacity-0 translate-y-6"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <Link
                href="/courses"
                className="btn btn-primary btn-lg rounded-full gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Explore Courses
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn btn-ghost btn-lg rounded-full gap-2 border-2 border-base-300">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HiOutlinePlay className="w-5 h-5 text-primary ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right: Image with crossfade */}
          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-full">
              {/* Image Container with crossfade */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[350px] lg:h-[420px]">
                {heroSlides.map((s, index) => (
                  <img
                    key={index}
                    src={s.image}
                    alt="Students learning"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating Card 1 - Students */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-base-100 rounded-xl shadow-xl p-3 sm:p-4 border border-base-300 hero-float-1">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-base-100 overflow-hidden"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold">500K+</p>
                    <p className="text-xs opacity-60">Active Learners</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 - Rating */}
              <div className="absolute -top-4 -right-4 sm:-right-8 bg-base-100 rounded-xl shadow-xl p-3 sm:p-4 border border-base-300 hero-float-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <HiOutlineStar className="w-6 h-6 text-warning fill-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">4.8/5</p>
                    <p className="text-xs opacity-60">Avg. Rating</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 3 - Course Count */}
              <div className="absolute top-1/2 -right-4 sm:-right-10 transform -translate-y-1/2 bg-base-100 rounded-xl shadow-xl p-3 border border-base-300 hidden sm:block hero-float-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">10K+</p>
                  <p className="text-xs opacity-60">Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 pb-8">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-base-300 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes heroFloat1 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes heroFloat2 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes heroFloat3 {
          0%,
          100% {
            transform: translateY(-50%) translateX(0px);
          }
          50% {
            transform: translateY(calc(-50% - 10px)) translateX(4px);
          }
        }
        .hero-float-1 {
          animation: heroFloat1 4s ease-in-out infinite;
        }
        .hero-float-2 {
          animation: heroFloat2 3.5s ease-in-out infinite 0.5s;
        }
        .hero-float-3 {
          animation: heroFloat3 5s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
}