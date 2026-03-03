// src/components/instructor/InstructorAbout.js
"use client";

import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export default function InstructorAbout({ instructor }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullBio = `${instructor.bio}

With a passion for teaching and years of hands-on industry experience, ${instructor.name.split(" ")[0]} has helped thousands of students transform their careers. Their courses are known for being practical, engaging, and up-to-date with the latest industry standards.

Before becoming a full-time instructor, ${instructor.name.split(" ")[0]} worked at several leading tech companies where they gained deep expertise in ${instructor.expertise.join(", ")}. This real-world experience forms the backbone of their teaching approach.

${instructor.name.split(" ")[0]} believes that everyone deserves access to quality education, regardless of their background. Their courses are designed to be accessible to beginners while still providing value to experienced professionals looking to level up their skills.

When not teaching, ${instructor.name.split(" ")[0]} contributes to open-source projects, speaks at conferences, and writes technical articles. They are also an active member of several online communities where they mentor aspiring developers.`;

  return (
    <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">About {instructor.name}</h2>
      <div className="relative">
        <div
          className={`text-sm leading-relaxed opacity-80 whitespace-pre-line overflow-hidden transition-all duration-500 ${
            isExpanded ? "max-h-[2000px]" : "max-h-36"
          }`}
        >
          {fullBio}
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base-100 to-transparent" />
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn btn-ghost btn-sm text-primary mt-2 gap-1"
      >
        {isExpanded ? (
          <>
            Show Less <HiOutlineChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Read More <HiOutlineChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}