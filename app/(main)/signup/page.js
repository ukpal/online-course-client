// src/app/(main)/signup/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineCheck,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaGoogle, FaFacebookF, FaGithub, FaApple } from "react-icons/fa";

const passwordChecks = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p) => /\d/.test(p) },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, isAuthenticated, authError, setAuthError } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const allChecksPassed = passwordChecks.every((c) =>
      c.test(formData.password)
    );
    if (!allChecksPassed) {
      setAuthError("Please meet all password requirements");
      setIsSubmitting(false);
      return;
    }

    const success = signup(formData);

    if (success) {
      addToast("Account created successfully! Welcome to LearnHub! 🎉", "success");
      router.push("/");
    }

    setIsSubmitting(false);
  };

  const handleSocialSignup = (provider) => {
    addToast(`${provider} signup will be available soon!`, "info");
  };

  const passwordStrength = passwordChecks.filter((c) =>
    c.test(formData.password)
  ).length;
  const strengthPercent = (passwordStrength / passwordChecks.length) * 100;
  const strengthColors = ["bg-error", "bg-warning", "bg-warning", "bg-success"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <HiOutlineAcademicCap className="w-8 h-8 text-primary-content" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-sm opacity-60 mt-1">
            Join millions of learners and start your journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 border border-base-300/50 rounded-2xl shadow-xl p-6 md:p-8">
          {/* Error Alert */}
          {authError && (
            <div className="alert alert-error mb-4 py-2 text-sm rounded-xl">
              <HiOutlineExclamationCircle className="w-5 h-5 shrink-0" />
              <span>{authError}</span>
              <button
                onClick={() => setAuthError("")}
                className="btn btn-ghost btn-xs btn-square"
              >
                ✕
              </button>
            </div>
          )}

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: FaGoogle, label: "Google", color: "text-red-500" },
              { icon: FaFacebookF, label: "Facebook", color: "text-blue-600" },
              { icon: FaApple, label: "Apple", color: "" },
              { icon: FaGithub, label: "GitHub", color: "" },
            ].map((provider) => (
              <button
                key={provider.label}
                onClick={() => handleSocialSignup(provider.label)}
                className="btn btn-outline rounded-xl gap-2 text-sm h-11"
              >
                <provider.icon className={`w-4 h-4 ${provider.color}`} />
                {provider.label}
              </button>
            ))}
          </div>

          <div className="divider text-xs opacity-50">or sign up with email</div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-10 rounded-xl"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10 rounded-xl"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  className="input input-bordered w-full pl-10 pr-10 rounded-xl"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedPassword(true)}
                  onBlur={() => setTimeout(() => setFocusedPassword(false), 200)}
                  required
                />
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {(focusedPassword || formData.password) && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-base-300 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          strengthColors[passwordStrength - 1] || "bg-base-300"
                        }`}
                        style={{ width: `${strengthPercent}%` }}
                      />
                    </div>
                    {formData.password && (
                      <span
                        className={`text-[10px] font-semibold ${
                          passwordStrength <= 1
                            ? "text-error"
                            : passwordStrength <= 2
                            ? "text-warning"
                            : "text-success"
                        }`}
                      >
                        {strengthLabels[passwordStrength - 1] || ""}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    {passwordChecks.map((check) => {
                      const passed = check.test(formData.password);
                      return (
                        <div
                          key={check.id}
                          className={`flex items-center gap-1.5 text-[11px] ${
                            passed ? "text-success" : "opacity-40"
                          }`}
                        >
                          <HiOutlineCheck
                            className={`w-3 h-3 ${passed ? "opacity-100" : "opacity-30"}`}
                          />
                          {check.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm mt-0.5"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span className="text-xs opacity-70">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl text-base h-12"
              disabled={!agreeTerms || isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}