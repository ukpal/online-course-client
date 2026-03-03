// src/components/home/WhyChooseUs.js
import {
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineClock,
  HiOutlineDeviceMobile,
  HiOutlineUserGroup,
  HiOutlineRefresh,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineAcademicCap,
    title: "Expert Instructors",
    description: "Learn from industry professionals and world-class educators with real-world experience.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Certified Courses",
    description: "Earn recognized certificates upon completion to boost your resume and LinkedIn profile.",
    color: "text-green-500 bg-green-50",
  },
  {
    icon: HiOutlineClock,
    title: "Lifetime Access",
    description: "Once enrolled, access your courses anytime, anywhere with no expiration date.",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: HiOutlineDeviceMobile,
    title: "Learn Anywhere",
    description: "Study on any device - desktop, tablet, or mobile. Download courses for offline learning.",
    color: "text-pink-500 bg-pink-50",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Community Support",
    description: "Join a community of learners. Get help from peers and instructors through Q&A forums.",
    color: "text-indigo-500 bg-indigo-50",
  },
  {
    icon: HiOutlineRefresh,
    title: "30-Day Refund",
    description: "Not satisfied? Get a full refund within 30 days of purchase, no questions asked.",
    color: "text-teal-500 bg-teal-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-secondary">
            Why Choose{" "}
            <span className="text-primary">LearnHub</span>?
          </h2>
          <p className="text-muted mt-2 max-w-2xl mx-auto">
            We provide the best learning experience with features designed
            to help you succeed
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-base-300/50 bg-base-100 card-hover"
            >
              <div
                className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}