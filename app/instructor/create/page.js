// src/app/instructor/create/page.js
"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { categories } from "@/data/courses";
import {
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi";

export default function CreateCoursePage() {
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    level: "Beginner",
    language: "English",
    price: "",
    thumbnail: "",
    whatYouLearn: ["", ""],
    requirements: [""],
    sections: [{ title: "", lectures: [{ title: "", duration: "" }] }],
  });

  const steps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Curriculum" },
    { num: 3, label: "Pricing" },
    { num: 4, label: "Publish" },
  ];

  const updateField = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  const addListItem = (field) => {
    setCourseData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const updateListItem = (field, index, value) => {
    setCourseData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const removeListItem = (field, index) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addSection = () => {
    setCourseData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", lectures: [{ title: "", duration: "" }] }],
    }));
  };

  const addLecture = (sectionIndex) => {
    setCourseData((prev) => {
      const sections = prev.sections.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, lectures: [...section.lectures, { title: "", duration: "" }] }
          : section
      );
      return { ...prev, sections };
    });
  };

  const removeLecture = (sectionIndex, lectureIndex) => {
    setCourseData((prev) => {
      const sections = prev.sections.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, lectures: section.lectures.filter((_, li) => li !== lectureIndex) }
          : section
      );
      return { ...prev, sections };
    });
  };

  const moveLectureUp = (sectionIndex, lectureIndex) => {
    if (lectureIndex === 0) return;
    setCourseData((prev) => {
      const sections = prev.sections.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              lectures: section.lectures.map((lecture, li) => {
                if (li === lectureIndex - 1) return section.lectures[lectureIndex];
                if (li === lectureIndex) return section.lectures[lectureIndex - 1];
                return lecture;
              }),
            }
          : section
      );
      return { ...prev, sections };
    });
  };

  const moveLectureDown = (sectionIndex, lectureIndex) => {
    setCourseData((prev) => {
      const section = prev.sections[sectionIndex];
      if (lectureIndex >= section.lectures.length - 1) return prev;
      
      const sections = prev.sections.map((sec, idx) =>
        idx === sectionIndex
          ? {
              ...sec,
              lectures: sec.lectures.map((lecture, li) => {
                if (li === lectureIndex) return sec.lectures[lectureIndex + 1];
                if (li === lectureIndex + 1) return sec.lectures[lectureIndex];
                return lecture;
              }),
            }
          : sec
      );
      return { ...prev, sections };
    });
  };

  const handlePublish = () => {
    addToast("Course submitted for review! 🎉", "success");
  };

  const handleSaveDraft = () => {
    addToast("Course saved as draft", "info");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Create New Course</h1>
        <p className="text-sm opacity-60">Fill in the details to create your course</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between bg-base-100 border border-base-300/50 rounded-2xl p-4">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setCurrentStep(step.num)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                currentStep === step.num
                  ? "bg-primary text-primary-content"
                  : currentStep > step.num
                  ? "bg-success text-white"
                  : "bg-base-200 opacity-50"
              }`}
            >
              {currentStep > step.num ? <HiOutlineCheck className="w-4 h-4" /> : step.num}
            </button>
            <span className={`text-xs font-medium hidden sm:block ${currentStep === step.num ? "text-primary" : "opacity-50"}`}>
              {step.label}
            </span>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-base-300 mx-2 hidden sm:block" />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 space-y-5">
          <h2 className="font-bold">Basic Information</h2>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Course Title *</label>
            <input type="text" className="input input-bordered w-full rounded-xl" placeholder="e.g., Complete React Developer Course" value={courseData.title} onChange={(e) => updateField("title", e.target.value)} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Short Description *</label>
            <textarea className="textarea textarea-bordered w-full rounded-xl h-20" placeholder="Brief overview of your course (max 200 characters)" value={courseData.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Description *</label>
            <textarea className="textarea textarea-bordered w-full rounded-xl h-36" placeholder="Detailed description of your course" value={courseData.description} onChange={(e) => updateField("description", e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Category *</label>
              <select className="select select-bordered w-full rounded-xl" value={courseData.category} onChange={(e) => updateField("category", e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((cat) => (<option key={cat.id} value={cat.slug}>{cat.name}</option>))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Level *</label>
              <select className="select select-bordered w-full rounded-xl" value={courseData.level} onChange={(e) => updateField("level", e.target.value)}>
                {["Beginner", "Intermediate", "Advanced"].map((l) => (<option key={l} value={l}>{l}</option>))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Language</label>
              <select className="select select-bordered w-full rounded-xl" value={courseData.language} onChange={(e) => updateField("language", e.target.value)}>
                {["English", "Spanish", "French", "German", "Hindi"].map((l) => (<option key={l} value={l}>{l}</option>))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Thumbnail</label>
            <div className="border-2 border-dashed border-base-300 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <HiOutlinePhotograph className="w-10 h-10 mx-auto opacity-30 mb-2" />
              <p className="text-sm opacity-60">Click to upload thumbnail image</p>
              <p className="text-xs opacity-40 mt-1">Recommended: 1280x720px, JPG or PNG</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">What Students Will Learn</label>
            {courseData.whatYouLearn.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" className="input input-bordered input-sm flex-1 rounded-lg" placeholder={`Learning outcome ${i + 1}`} value={item} onChange={(e) => updateListItem("whatYouLearn", i, e.target.value)} />
                {courseData.whatYouLearn.length > 1 && (
                  <button onClick={() => removeListItem("whatYouLearn", i)} className="btn btn-ghost btn-sm btn-square text-error"><HiOutlineTrash className="w-4 h-4" /></button>
                )}
              </div>
            ))}
            <button onClick={() => addListItem("whatYouLearn")} className="btn btn-ghost btn-xs text-primary gap-1"><HiOutlinePlusCircle className="w-4 h-4" /> Add More</button>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Requirements</label>
            {courseData.requirements.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" className="input input-bordered input-sm flex-1 rounded-lg" placeholder={`Requirement ${i + 1}`} value={item} onChange={(e) => updateListItem("requirements", i, e.target.value)} />
                {courseData.requirements.length > 1 && (
                  <button onClick={() => removeListItem("requirements", i)} className="btn btn-ghost btn-sm btn-square text-error"><HiOutlineTrash className="w-4 h-4" /></button>
                )}
              </div>
            ))}
            <button onClick={() => addListItem("requirements")} className="btn btn-ghost btn-xs text-primary gap-1"><HiOutlinePlusCircle className="w-4 h-4" /> Add More</button>
          </div>
        </div>
      )}

      {/* Step 2: Curriculum */}
      {currentStep === 2 && (
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 space-y-5">
          <h2 className="font-bold">Course Curriculum</h2>
          {courseData.sections.map((section, si) => (
            <div key={si} className="border border-base-300/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold opacity-50">Section {si + 1}</span>
                <input type="text" className="input input-bordered input-sm flex-1 rounded-lg" placeholder="Section Title" value={section.title} onChange={(e) => {
                  const sections = [...courseData.sections]; sections[si].title = e.target.value; updateField("sections", sections);
                }} />
              </div>
              {section.lectures.map((lecture, li) => (
                <div key={li} className="flex items-center gap-2 ml-6">
                  <HiOutlineVideoCamera className="w-4 h-4 opacity-40 shrink-0" />
                  <input type="text" className="input input-bordered input-xs flex-1 rounded-lg" placeholder={`Lecture ${li + 1} Title`} value={lecture.title} onChange={(e) => {
                    const sections = [...courseData.sections]; sections[si].lectures[li].title = e.target.value; updateField("sections", sections);
                  }} />
                  <input type="text" className="input input-bordered input-xs w-20 rounded-lg" placeholder="00:00" value={lecture.duration} onChange={(e) => {
                    const sections = [...courseData.sections]; sections[si].lectures[li].duration = e.target.value; updateField("sections", sections);
                  }} />
                  <div className="border-2 border-dashed border-base-300 rounded-lg px-2 py-1 text-[10px] opacity-40 cursor-pointer hover:border-primary whitespace-nowrap">Upload</div>
                  <div className="flex gap-1">
                    {li > 0 && (
                      <button onClick={() => moveLectureUp(si, li)} className="btn btn-ghost btn-xs btn-square text-info" title="Move Up"><HiOutlineChevronUp className="w-4 h-4" /></button>
                    )}
                    {li < section.lectures.length - 1 && (
                      <button onClick={() => moveLectureDown(si, li)} className="btn btn-ghost btn-xs btn-square text-info" title="Move Down"><HiOutlineChevronDown className="w-4 h-4" /></button>
                    )}
                  </div>
                  {section.lectures.length > 1 && (
                    <button onClick={() => removeLecture(si, li)} className="btn btn-ghost btn-xs btn-square text-error"><HiOutlineTrash className="w-4 h-4" /></button>
                  )}
                </div>
              ))}
              <button onClick={() => addLecture(si)} className="btn btn-ghost btn-xs text-primary gap-1 ml-6">
                <HiOutlinePlusCircle className="w-4 h-4" /> Add Lecture
              </button>
            </div>
          ))}
          <button onClick={addSection} className="btn btn-outline btn-sm rounded-xl gap-1">
            <HiOutlinePlusCircle className="w-4 h-4" /> Add Section
          </button>
        </div>
      )}

      {/* Step 3: Pricing */}
      {currentStep === 3 && (
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 space-y-5">
          <h2 className="font-bold">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Original Price (USD) *</label>
              <input type="number" className="input input-bordered w-full rounded-xl" placeholder="99.99" value={courseData.price} onChange={(e) => updateField("price", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Discount Price (USD)</label>
              <input type="number" className="input input-bordered w-full rounded-xl" placeholder="14.99" />
            </div>
          </div>
          <div className="bg-info/10 border border-info/20 rounded-xl p-4">
            <p className="text-sm font-medium text-info">💡 Pricing Tips</p>
            <ul className="text-xs opacity-70 mt-2 space-y-1 list-disc ml-4">
              <li>Courses priced between $12-20 tend to sell best</li>
              <li>Offer launch discounts to boost initial enrollments</li>
              <li>You earn 70% of sales from your promotions</li>
            </ul>
          </div>
        </div>
      )}

      {/* Step 4: Publish */}
      {currentStep === 4 && (
        <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 space-y-5 text-center">
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <HiOutlineCheck className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-bold text-xl">Ready to Publish?</h2>
          <p className="text-sm opacity-60 max-w-md mx-auto">
            Review your course details and submit for review. Our team will review within 2-5 business days.
          </p>
          <div className="bg-base-200/50 rounded-xl p-4 max-w-md mx-auto text-left space-y-2">
            <p className="text-sm"><strong>Title:</strong> {courseData.title || "Not set"}</p>
            <p className="text-sm"><strong>Category:</strong> {courseData.category || "Not set"}</p>
            <p className="text-sm"><strong>Level:</strong> {courseData.level}</p>
            <p className="text-sm"><strong>Sections:</strong> {courseData.sections.length}</p>
            <p className="text-sm"><strong>Price:</strong> ${courseData.price || "Not set"}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={handleSaveDraft} className="btn btn-ghost rounded-xl">Save as Draft</button>
        <div className="flex gap-2">
          {currentStep > 1 && (
            <button onClick={() => setCurrentStep((s) => s - 1)} className="btn btn-outline rounded-xl">Previous</button>
          )}
          {currentStep < 4 ? (
            <button onClick={() => setCurrentStep((s) => s + 1)} className="btn btn-primary rounded-xl">Next Step</button>
          ) : (
            <button onClick={handlePublish} className="btn btn-success rounded-xl gap-2">
              <HiOutlineCheck className="w-5 h-5" /> Submit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}