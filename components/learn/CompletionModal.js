// src/components/learn/CompletionModal.js
"use client";

import Link from "next/link";
import { HiOutlineAcademicCap, HiOutlineShare, HiOutlineDownload, HiOutlineExternalLink } from "react-icons/hi";

export default function CompletionModal({ course, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-base-100 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-bounce-in overflow-hidden">
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899"][i % 6],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
            <HiOutlineAcademicCap className="w-10 h-10 text-success" />
          </div>

          <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
          <p className="text-sm opacity-70 mb-1">You&apos;ve completed the course</p>
          <p className="font-semibold text-primary mb-6 text-sm">{course.title}</p>

          <div className="bg-base-200/50 rounded-2xl p-5 mb-6 border border-base-300/50">
            <div className="text-4xl mb-2">🏆</div>
            <p className="font-bold">Certificate of Completion</p>
            <p className="text-xs opacity-50 mt-1">
              Issued by LearnHub •{" "}
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/certificate/${course.slug}`}
              className="btn btn-primary flex-1 rounded-xl gap-2"
              onClick={onClose}
            >
              <HiOutlineExternalLink className="w-4 h-4" />
              View Certificate
            </Link>
            <button className="btn btn-outline flex-1 rounded-xl gap-2">
              <HiOutlineShare className="w-4 h-4" />
              Share
            </button>
          </div>

          <Link
            href="/my-learning"
            className="btn btn-ghost btn-sm mt-4 text-primary"
            onClick={onClose}
          >
            Back to My Learning
          </Link>
        </div>

        <style jsx>{`
          @keyframes bounce-in {
            0% { opacity: 0; transform: scale(0.8); }
            50% { transform: scale(1.02); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
          @keyframes confetti {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
          }
          .animate-confetti { animation: confetti 3s ease-in-out infinite; }
        `}</style>
      </div>
    </div>
  );
}