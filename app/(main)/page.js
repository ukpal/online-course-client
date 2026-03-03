// src/app/page.js
import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import AISpotlight from "@/components/home/AISpotlight";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularTopics from "@/components/home/PopularTopics";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <FeaturedCourses />
      <CategoriesSection />
      <AISpotlight />
      <WhyChooseUs />
      <PopularTopics />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}