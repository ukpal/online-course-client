// src/components/courseDetail/CourseRequirements.js
import { HiOutlineArrowRight } from "react-icons/hi";

export default function CourseRequirements({ requirements }) {
  if (!requirements || requirements.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Requirements</h2>
      <ul className="space-y-2">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm">
            <HiOutlineArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="opacity-80">{req}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}