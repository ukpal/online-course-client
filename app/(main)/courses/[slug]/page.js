// src/app/courses/[slug]/page.js
import { notFound } from "next/navigation";
import { courses, instructors } from "@/data/courses";
import CourseDetailContent from "@/components/courseDetail/CourseDetailContent";

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return { title: "Course Not Found | LearnHub" };
  }

  return {
    title: `${course.title} | LearnHub`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const instructor = instructors.find((i) => i.id === course.instructorId);

  return <CourseDetailContent course={course} instructor={instructor} />;
}