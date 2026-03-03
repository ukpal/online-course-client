// src/components/home/CTASection.js
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineAcademicCap } from "react-icons/hi";

export default function CTASection() {
  return (
    <section className="section-padding bg-base-200/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-content rounded-3xl p-8 md:p-10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <HiOutlineAcademicCap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Start Learning Today
              </h3>
              <p className="opacity-90 mb-6 max-w-sm leading-relaxed">
                Join millions of learners and get access to over 10,000 courses. 
                Learn at your own pace, with lifetime access.
              </p>
              <Link
                href="/courses"
                className="btn bg-white text-primary hover:bg-white/90 border-none rounded-full px-8 gap-2"
              >
                Browse Courses
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* For Instructors */}
          <div className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content rounded-3xl p-8 md:p-10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Become an Instructor
              </h3>
              <p className="opacity-90 mb-6 max-w-sm leading-relaxed">
                Share your knowledge with the world. Create courses, earn money, 
                and impact millions of lives globally.
              </p>
              <Link
                href="/teach"
                className="btn bg-white text-secondary hover:bg-white/90 border-none rounded-full px-8 gap-2"
              >
                Start Teaching
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}