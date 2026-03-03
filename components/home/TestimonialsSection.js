// src/components/home/TestimonialsSection.js
"use client";

import { useState } from "react";
import { testimonials } from "@/data/courses";
import { HiOutlineStar, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-secondary">
            What Our Learners{" "}
            <span className="text-primary">Say</span>
          </h2>
          <p className="text-muted mt-2 max-w-2xl mx-auto">
            Hear from students who transformed their careers through LearnHub
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[current]} />

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="btn btn-circle btn-sm btn-ghost"
            >
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? "w-6 bg-primary" : "bg-base-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="btn btn-circle btn-sm btn-ghost"
            >
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-base-200/50 border border-base-300/50 rounded-2xl p-6 relative">
      <FaQuoteLeft className="w-8 h-8 text-primary/20 mb-4" />

      <p className="text-sm leading-relaxed opacity-80 mb-6">
        &ldquo;{testimonial.comment}&rdquo;
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <HiOutlineStar key={i} className="w-4 h-4 text-warning fill-warning" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{testimonial.name}</p>
          <p className="text-xs opacity-60">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}