// src/app/(main)/teach/apply/success/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  HiOutlineCheck,
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
  HiOutlinePlusCircle,
  HiOutlineBookOpen,
  HiOutlineCog,
} from "react-icons/hi";

export default function ApplicationSuccessPage() {
  const { user, isInstructor } = useAuth();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: [
                  "#f59e0b",
                  "#10b981",
                  "#3b82f6",
                  "#ef4444",
                  "#8b5cf6",
                  "#ec4899",
                ][i % 6],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto animate-bounce-in">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
              <HiOutlineCheck className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <HiOutlineAcademicCap className="w-5 h-5 text-primary-content" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          🎉 Welcome, Instructor!
        </h1>

        <p className="text-base opacity-70 mb-2">
          Congratulations{user?.fullName ? `, ${user.fullName}` : ""}! Your
          instructor account is now active.
        </p>

        <p className="text-sm opacity-50 mb-8 max-w-md mx-auto">
          You&apos;re all set to start creating amazing courses and impacting
          students worldwide. Here&apos;s what you can do next:
        </p>

        {/* Next Steps */}
        <div className="grid gap-3 mb-8 text-left">
          {[
            {
              icon: HiOutlinePlusCircle,
              title: "Create Your First Course",
              description: "Start building your course with our easy-to-use course creator",
              href: "/instructor/create",
              color: "text-primary bg-primary/10",
              primary: true,
            },
            {
              icon: HiOutlineBookOpen,
              title: "Go to Instructor Dashboard",
              description: "Access your dashboard to manage courses, analytics, and earnings",
              href: "/instructor",
              color: "text-info bg-info/10",
              primary: false,
            },
            {
              icon: HiOutlineCog,
              title: "Complete Your Profile",
              description: "Add more details to your instructor profile to attract students",
              href: "/instructor/settings",
              color: "text-secondary bg-secondary/10",
              primary: false,
            },
          ].map((step, i) => (
            <Link
              key={i}
              href={step.href}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all card-hover ${
                step.primary
                  ? "bg-primary/5 border-2 border-primary/20 hover:border-primary/40"
                  : "bg-base-200/50 border border-base-300/50"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${step.color} flex items-center justify-center shrink-0`}
              >
                <step.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="text-xs opacity-50">{step.description}</p>
              </div>
              <HiOutlineArrowRight className="w-5 h-5 opacity-30" />
            </Link>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-base-200/50 rounded-xl p-4 border border-base-300/50 text-left mb-6">
          <p className="text-xs font-semibold mb-2">💡 Quick Tips to Get Started:</p>
          <ul className="text-xs opacity-60 space-y-1">
            <li>• Plan your course outline before recording</li>
            <li>• Keep lessons short and focused (5-15 minutes each)</li>
            <li>• Use a good microphone — audio quality matters most</li>
            <li>• Add quizzes and assignments for engagement</li>
            <li>• Promote your course on social media for initial traction</li>
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost btn-sm text-primary">
          Return to Homepage
        </Link>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall 4s ease-in-out forwards;
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}