// src/components/instructor/InstructorHeader.js
"use client";

import {
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlinePlay,
  HiOutlineBadgeCheck,
  HiOutlineGlobe,
  HiOutlineMail,
} from "react-icons/hi";
import { FaTwitter, FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa";

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

export default function InstructorHeader({ instructor }) {
  return (
    <div className="bg-neutral text-neutral-content">
      <div className="container-custom py-10 lg:py-14">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl mx-auto md:mx-0">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {instructor.name}
              </h1>
              <div className="badge badge-primary gap-1">
                <HiOutlineBadgeCheck className="w-3.5 h-3.5" />
                Verified
              </div>
            </div>

            <p className="text-base md:text-lg opacity-80 mb-4">
              {instructor.title}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mb-5">
              <div className="flex items-center gap-1.5">
                <HiOutlineStar className="w-5 h-5 text-warning" />
                <span className="font-bold">{instructor.rating}</span>
                <span className="opacity-60 text-sm">Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineBadgeCheck className="w-5 h-5 text-primary" />
                <span className="font-bold">
                  {instructor.totalReviews.toLocaleString()}
                </span>
                <span className="opacity-60 text-sm">Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineUsers className="w-5 h-5 text-success" />
                <span className="font-bold">
                  {instructor.totalStudents.toLocaleString()}
                </span>
                <span className="opacity-60 text-sm">Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlinePlay className="w-5 h-5 text-info" />
                <span className="font-bold">{instructor.totalCourses}</span>
                <span className="opacity-60 text-sm">Courses</span>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5">
              {instructor.expertise.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-outline badge-lg border-white/20 text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Social & Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
              <div className="w-px h-6 bg-white/20 hidden sm:block" />
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <HiOutlineGlobe className="w-4 h-4" />
                website.com
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <HiOutlineMail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}