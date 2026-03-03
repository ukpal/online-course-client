// src/app/(main)/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlineAcademicCap,
    HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaGoogle, FaFacebookF, FaGithub, FaApple } from "react-icons/fa";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated, authError, setAuthError } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();

    // Redirect if already logged in
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect");

    // Update the redirect in useEffect
    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirectTo || "/");
        }
    }, [isAuthenticated, router, redirectTo]);

    // Update the success redirect in handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const success = login({ email, password, rememberMe });
        if (success) {
            addToast("Welcome back! 🎉", "success");
            router.push(redirectTo || "/");
        }
        setIsSubmitting(false);
    };

    const handleSocialLogin = (provider) => {
        addToast(`${provider} login will be available soon!`, "info");
    };

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
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-sm opacity-60 mt-1">
                        Log in to continue your learning journey
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

                    {/* Demo Credentials */}
                    <div className="bg-info/10 border border-info/20 rounded-xl p-3 mb-5">
                        <p className="text-xs font-semibold text-info mb-1.5">
                            🔑 Demo Credentials
                        </p>
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => { setEmail("john@example.com"); setPassword("John1234"); }}
                                className="text-xs text-info hover:underline text-left"
                            >
                                👨‍🎓 Student: john@example.com / John1234
                            </button>
                            <button
                                onClick={() => { setEmail("sarah@example.com"); setPassword("Sarah1234"); }}
                                className="text-xs text-info hover:underline text-left"
                            >
                                👩‍🏫 Instructor: sarah@example.com / Sarah1234
                            </button>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                            { icon: FaGoogle, label: "Google", color: "text-red-500" },
                            { icon: FaFacebookF, label: "Facebook", color: "text-blue-600" },
                            { icon: FaApple, label: "Apple", color: "" },
                            { icon: FaGithub, label: "GitHub", color: "" },
                        ].map((provider) => (
                            <button
                                key={provider.label}
                                onClick={() => handleSocialLogin(provider.label)}
                                className="btn btn-outline rounded-xl gap-2 text-sm h-11"
                            >
                                <provider.icon className={`w-4 h-4 ${provider.color}`} />
                                {provider.label}
                            </button>
                        ))}
                    </div>

                    <div className="divider text-xs opacity-50">or continue with email</div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="input input-bordered w-full pl-10 rounded-xl"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pl-10 pr-10 rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary checkbox-sm"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl text-base h-12"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-primary font-semibold hover:underline">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
}