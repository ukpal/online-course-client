// src/app/(main)/teach/apply/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineAcademicCap,
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineLightBulb,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineVideoCamera,
  HiOutlineGlobe,
  HiOutlineDocumentText,
  HiOutlineChevronDown,
} from "react-icons/hi";

const expertiseOptions = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning / AI",
  "UI/UX Design",
  "Cloud Computing",
  "Cybersecurity",
  "Digital Marketing",
  "Business & Finance",
  "Photography & Video",
  "Music & Audio",
  "Other",
];

const experienceLevels = [
  { value: "beginner", label: "Beginner (1-2 years)", description: "I'm relatively new but passionate about teaching" },
  { value: "intermediate", label: "Intermediate (3-5 years)", description: "I have solid experience in my field" },
  { value: "expert", label: "Expert (5-10 years)", description: "I'm a seasoned professional" },
  { value: "veteran", label: "Veteran (10+ years)", description: "I have extensive industry experience" },
];

const audienceSizes = [
  { value: "none", label: "No existing audience" },
  { value: "small", label: "Small (< 1,000 followers)" },
  { value: "medium", label: "Medium (1,000 - 10,000 followers)" },
  { value: "large", label: "Large (10,000+ followers)" },
];

const videoExperience = [
  { value: "none", label: "No experience", description: "I've never created video content" },
  { value: "some", label: "Some experience", description: "I've made a few videos or screencasts" },
  { value: "experienced", label: "Experienced", description: "I regularly create video content" },
  { value: "professional", label: "Professional", description: "I'm a professional content creator" },
];

export default function InstructorApplyPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoaded, switchToInstructor } = useAuth();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    displayName: "",
    professionalTitle: "",
    bio: "",
    website: "",
    linkedin: "",

    // Step 2: Expertise
    expertise: [],
    experienceLevel: "",
    otherExpertise: "",

    // Step 3: Teaching Plan
    courseTopics: "",
    targetAudience: "",
    existingAudience: "none",
    videoExperience: "",
    sampleVideoUrl: "",

    // Step 4: Agreement
    agreeTerms: false,
    agreeGuidelines: false,
    agreeRevenue: false,
  });

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push("/login?redirect=/teach/apply");
    }
  }, [isLoaded, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        displayName: prev.displayName || user.fullName || "",
      }));
    }
  }, [user]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleExpertise = (topic) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(topic)
        ? prev.expertise.filter((t) => t !== topic)
        : [...prev.expertise, topic],
    }));
  };

  const steps = [
    { num: 1, label: "About You", icon: HiOutlineUser },
    { num: 2, label: "Expertise", icon: HiOutlineBriefcase },
    { num: 3, label: "Teaching Plan", icon: HiOutlineLightBulb },
    { num: 4, label: "Review & Submit", icon: HiOutlineCheck },
  ];

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.displayName && formData.professionalTitle && formData.bio;
      case 2:
        return formData.expertise.length > 0 && formData.experienceLevel;
      case 3:
        return formData.courseTopics && formData.targetAudience && formData.videoExperience;
      case 4:
        return formData.agreeTerms && formData.agreeGuidelines && formData.agreeRevenue;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      addToast("Please agree to all terms", "error");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));

    switchToInstructor();
    addToast("🎉 Congratulations! You're now an instructor on LearnHub!", "success");
    setIsSubmitting(false);

    router.push("/teach/apply/success");
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-8">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/teach" className="btn btn-ghost btn-sm gap-1 mb-4">
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Teach
          </Link>
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <HiOutlineAcademicCap className="w-8 h-8 text-primary-content" />
          </div>
          <h1 className="text-2xl font-bold">Become an Instructor</h1>
          <p className="text-sm opacity-60 mt-1">
            Share your expertise with millions of learners worldwide
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => {
                    if (step.num < currentStep) setCurrentStep(step.num);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    currentStep === step.num
                      ? "bg-primary text-primary-content shadow-md shadow-primary/20"
                      : currentStep > step.num
                      ? "bg-success text-success-content cursor-pointer"
                      : "bg-base-200 opacity-40"
                  }`}
                >
                  {currentStep > step.num ? (
                    <HiOutlineCheck className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </button>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    currentStep === step.num
                      ? "text-primary"
                      : currentStep > step.num
                      ? "text-success"
                      : "opacity-40"
                  }`}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 hidden sm:block ${
                      currentStep > step.num ? "bg-success" : "bg-base-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: About You */}
        {currentStep === 1 && (
          <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <h2 className="text-lg font-bold mb-1">Tell Us About Yourself</h2>
              <p className="text-sm opacity-60">
                This information will be displayed on your instructor profile
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Display Name <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 rounded-xl"
                  placeholder="How students will see your name"
                  value={formData.displayName}
                  onChange={(e) => updateField("displayName", e.target.value)}
                />
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Professional Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-xl"
                placeholder="e.g., Senior Software Engineer at Google"
                value={formData.professionalTitle}
                onChange={(e) => updateField("professionalTitle", e.target.value)}
              />
              <p className="text-xs opacity-40 mt-1">
                Your current role and company (or freelance title)
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Bio <span className="text-error">*</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-xl h-32"
                placeholder="Tell students about your background, experience, and teaching philosophy..."
                value={formData.bio}
                onChange={(e) => updateField("bio", e.target.value)}
              />
              <p className="text-xs opacity-40 mt-1">
                {formData.bio.length}/500 characters (minimum 50)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Website
                </label>
                <div className="relative">
                  <input
                    type="url"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => updateField("website", e.target.value)}
                  />
                  <HiOutlineGlobe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  className="input input-bordered w-full rounded-xl"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Expertise */}
        {currentStep === 2 && (
          <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <h2 className="text-lg font-bold mb-1">Your Expertise</h2>
              <p className="text-sm opacity-60">
                Help us understand your areas of knowledge
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Areas of Expertise <span className="text-error">*</span>
                <span className="text-xs opacity-40 ml-1">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {expertiseOptions.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleExpertise(topic)}
                    className={`p-3 rounded-xl text-sm font-medium text-left transition-all border ${
                      formData.expertise.includes(topic)
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-base-200/30 border-base-300/50 hover:border-primary/20 hover:bg-primary/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {formData.expertise.includes(topic) && (
                        <HiOutlineCheck className="w-4 h-4 shrink-0" />
                      )}
                      {topic}
                    </span>
                  </button>
                ))}
              </div>

              {formData.expertise.includes("Other") && (
                <input
                  type="text"
                  className="input input-bordered w-full rounded-xl mt-3"
                  placeholder="Please specify your expertise..."
                  value={formData.otherExpertise}
                  onChange={(e) => updateField("otherExpertise", e.target.value)}
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Experience Level <span className="text-error">*</span>
              </label>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <label
                    key={level.value}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      formData.experienceLevel === level.value
                        ? "bg-primary/10 border-primary/30"
                        : "bg-base-200/30 border-base-300/50 hover:border-primary/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      className="radio radio-primary radio-sm mt-0.5"
                      checked={formData.experienceLevel === level.value}
                      onChange={() => updateField("experienceLevel", level.value)}
                    />
                    <div>
                      <p className="text-sm font-medium">{level.label}</p>
                      <p className="text-xs opacity-50">{level.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Teaching Plan */}
        {currentStep === 3 && (
          <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <h2 className="text-lg font-bold mb-1">Your Teaching Plan</h2>
              <p className="text-sm opacity-60">
                Tell us about the courses you plan to create
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                What topics do you plan to teach? <span className="text-error">*</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-xl h-24"
                placeholder="e.g., I plan to create courses on React.js fundamentals, advanced React patterns, and building full-stack apps with Next.js..."
                value={formData.courseTopics}
                onChange={(e) => updateField("courseTopics", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Who is your target audience? <span className="text-error">*</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-xl h-20"
                placeholder="e.g., Beginner web developers who want to learn modern JavaScript frameworks..."
                value={formData.targetAudience}
                onChange={(e) => updateField("targetAudience", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Do you have an existing audience?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {audienceSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => updateField("existingAudience", size.value)}
                    className={`p-3 rounded-xl text-sm text-left transition-all border ${
                      formData.existingAudience === size.value
                        ? "bg-primary/10 border-primary/30 text-primary font-medium"
                        : "bg-base-200/30 border-base-300/50 hover:border-primary/20"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Video creation experience <span className="text-error">*</span>
              </label>
              <div className="space-y-2">
                {videoExperience.map((exp) => (
                  <label
                    key={exp.value}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      formData.videoExperience === exp.value
                        ? "bg-primary/10 border-primary/30"
                        : "bg-base-200/30 border-base-300/50 hover:border-primary/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="videoExp"
                      className="radio radio-primary radio-sm mt-0.5"
                      checked={formData.videoExperience === exp.value}
                      onChange={() => updateField("videoExperience", exp.value)}
                    />
                    <div>
                      <p className="text-sm font-medium">{exp.label}</p>
                      <p className="text-xs opacity-50">{exp.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Sample Video URL <span className="text-xs opacity-40">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  className="input input-bordered w-full pl-10 rounded-xl"
                  placeholder="Link to a YouTube video, portfolio, etc."
                  value={formData.sampleVideoUrl}
                  onChange={(e) => updateField("sampleVideoUrl", e.target.value)}
                />
                <HiOutlineVideoCamera className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              </div>
              <p className="text-xs opacity-40 mt-1">
                Share any existing content that showcases your teaching ability
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-5">
            {/* Summary */}
            <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-4">Review Your Application</h2>

              <div className="space-y-4">
                {/* Personal */}
                <div className="p-4 bg-base-200/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <HiOutlineUser className="w-4 h-4 text-primary" />
                      About You
                    </h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-ghost btn-xs text-primary"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <p><span className="opacity-50">Name:</span> {formData.displayName}</p>
                    <p><span className="opacity-50">Title:</span> {formData.professionalTitle}</p>
                  </div>
                  <p className="text-sm mt-1">
                    <span className="opacity-50">Bio:</span>{" "}
                    <span className="line-clamp-2">{formData.bio}</span>
                  </p>
                </div>

                {/* Expertise */}
                <div className="p-4 bg-base-200/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <HiOutlineBriefcase className="w-4 h-4 text-primary" />
                      Expertise
                    </h3>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-ghost btn-xs text-primary"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {formData.expertise.map((e) => (
                      <span key={e} className="badge badge-primary badge-sm badge-outline">
                        {e}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm">
                    <span className="opacity-50">Experience:</span>{" "}
                    {experienceLevels.find((l) => l.value === formData.experienceLevel)?.label}
                  </p>
                </div>

                {/* Teaching Plan */}
                <div className="p-4 bg-base-200/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <HiOutlineLightBulb className="w-4 h-4 text-primary" />
                      Teaching Plan
                    </h3>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="btn btn-ghost btn-xs text-primary"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm mb-1">
                    <span className="opacity-50">Topics:</span>{" "}
                    <span className="line-clamp-2">{formData.courseTopics}</span>
                  </p>
                  <p className="text-sm">
                    <span className="opacity-50">Video Experience:</span>{" "}
                    {videoExperience.find((v) => v.value === formData.videoExperience)?.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 md:p-8 space-y-4">
              <h3 className="font-bold">Terms & Agreements</h3>

              {[
                {
                  field: "agreeTerms",
                  label: "I agree to the Instructor Terms of Service",
                  description: "You agree to follow LearnHub's policies, content guidelines, and community standards.",
                },
                {
                  field: "agreeGuidelines",
                  label: "I agree to the Content Quality Guidelines",
                  description: "You commit to creating high-quality, original content with good audio/video production.",
                },
                {
                  field: "agreeRevenue",
                  label: "I understand the Revenue Sharing model",
                  description: "You'll earn 70% from your own promotions and 37% from LearnHub organic sales.",
                },
              ].map((agreement) => (
                <label
                  key={agreement.field}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                    formData[agreement.field]
                      ? "bg-success/5 border-success/20"
                      : "bg-base-200/30 border-base-300/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm mt-0.5"
                    checked={formData[agreement.field]}
                    onChange={(e) => updateField(agreement.field, e.target.checked)}
                  />
                  <div>
                    <p className="text-sm font-medium">{agreement.label}</p>
                    <p className="text-xs opacity-50 mt-0.5">{agreement.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          {currentStep > 1 ? (
            <button
              onClick={handlePrev}
              className="btn btn-ghost rounded-xl gap-2"
            >
              <HiOutlineArrowLeft className="w-4 h-4" />
              Previous
            </button>
          ) : (
            <Link href="/teach" className="btn btn-ghost rounded-xl gap-2">
              <HiOutlineArrowLeft className="w-4 h-4" />
              Back
            </Link>
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="btn btn-primary rounded-xl gap-2"
            >
              Continue
              <HiOutlineArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn btn-success rounded-xl gap-2 px-8"
              disabled={isSubmitting || !validateStep(4)}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Processing...
                </>
              ) : (
                <>
                  <HiOutlineCheck className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4">
          <progress
            className="progress progress-primary w-full h-1.5"
            value={currentStep}
            max={4}
          />
        </div>
      </div>
    </div>
  );
}