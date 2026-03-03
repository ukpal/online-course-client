// src/app/(main)/teach/page.js
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineCurrencyDollar,
  HiOutlineGlobeAlt,
  HiOutlineChartBar,
  HiOutlinePlay,
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineStar,
} from "react-icons/hi";

const benefits = [
  {
    icon: HiOutlineCurrencyDollar,
    title: "Earn Money",
    description:
      "Set your own prices and earn revenue every time a student enrolls. Top instructors earn over $100K/year.",
    color: "text-success bg-success/10",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Global Reach",
    description:
      "Reach millions of students worldwide. Your courses are available 24/7, in every country.",
    color: "text-info bg-info/10",
  },
  {
    icon: HiOutlineChartBar,
    title: "Analytics Dashboard",
    description:
      "Track your performance with detailed analytics. See enrollments, revenue, and student engagement.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: HiOutlineLightBulb,
    title: "Creative Freedom",
    description:
      "Teach what you love, the way you want. Create courses in video, text, quizzes, and more.",
    color: "text-warning bg-warning/10",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Community Support",
    description:
      "Join our instructor community. Get help, share tips, and collaborate with fellow educators.",
    color: "text-secondary bg-secondary/10",
  },
  {
    icon: HiOutlineStar,
    title: "Build Your Brand",
    description:
      "Establish yourself as an expert. Build your personal brand and grow your professional network.",
    color: "text-error bg-error/10",
  },
];

const steps = [
  {
    step: "01",
    title: "Plan Your Course",
    description:
      "Choose your topic, define your target audience, and outline your curriculum. We provide tools and templates to help.",
  },
  {
    step: "02",
    title: "Create Your Content",
    description:
      "Record videos, create quizzes, and upload resources. Our studio tools make production easy, even for beginners.",
  },
  {
    step: "03",
    title: "Publish & Earn",
    description:
      "Submit your course for review. Once approved, it goes live and you start earning with every enrollment.",
  },
];

const stats = [
  { value: "1,200+", label: "Active Instructors" },
  { value: "$50M+", label: "Paid to Instructors" },
  { value: "500K+", label: "Students Reached" },
  { value: "10,000+", label: "Courses Published" },
];

const faqs = [
  {
    question: "Who can become an instructor?",
    answer:
      "Anyone with expertise in a subject can become an instructor. Whether you're a professional, hobbyist, or academic — if you have knowledge to share, you can teach on LearnHub.",
  },
  {
    question: "How much can I earn?",
    answer:
      "Earnings vary based on course pricing, quality, and marketing. Our top instructors earn over $100,000 per year. You earn 70% of every sale made through your own promotions.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "At minimum, you need a computer, a microphone, and screen recording software. A webcam is optional but recommended. Many successful courses are created with just a laptop!",
  },
  {
    question: "How long does the review process take?",
    answer:
      "Our quality review process typically takes 2-5 business days. We check for audio/video quality, content accuracy, and completeness.",
  },
  {
    question: "Can I teach in my own language?",
    answer:
      "Yes! We support courses in multiple languages including English, Spanish, French, German, Hindi, and many more.",
  },
];

const testimonials = [
  {
    name: "Robert Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    role: "Web Development Instructor",
    earnings: "$85,000/year",
    comment:
      "Teaching on LearnHub has been life-changing. I quit my corporate job and now make more money doing what I love.",
  },
  {
    name: "Maya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    role: "Data Science Instructor",
    earnings: "$120,000/year",
    comment:
      "The platform and community support are incredible. I've reached over 50,000 students from 180 countries.",
  },
];

export default function TeachPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-neutral to-neutral/90 text-neutral-content overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom py-16 lg:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 text-sm font-medium text-primary mb-6">
              <HiOutlineAcademicCap className="w-4 h-4" />
              Become an Instructor
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Share Your Knowledge,{" "}
              <span className="text-primary">Impact Lives</span>
            </h1>

            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join over 1,200 instructors teaching on LearnHub. Create online
              courses, reach students worldwide, and earn money doing what
              you love.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/teach/apply"
                className="btn btn-primary btn-lg rounded-full px-8 gap-2 shadow-lg shadow-primary/25"
              >
                Get Started for Free
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn btn-ghost btn-lg rounded-full px-8 gap-2 border-2 border-white/20">
                <HiOutlinePlay className="w-5 h-5" />
                Watch How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-base-200/50 border-b border-base-300/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-sm opacity-60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-secondary">
              Why Teach on <span className="text-primary">LearnHub</span>?
            </h2>
            <p className="text-muted mt-2 max-w-2xl mx-auto">
              Everything you need to create, publish, and profit from your
              expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-base-300/50 card-hover"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-base-200/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-secondary">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted mt-2">Three simple steps to start teaching</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-primary/30" />
                )}
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-2xl font-bold text-primary">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Testimonials */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-secondary">
              Hear from Our <span className="text-primary">Instructors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-base-200/50 border border-base-300/50 rounded-2xl p-6"
              >
                <p className="text-sm opacity-80 leading-relaxed mb-4 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs opacity-60">{t.role}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-sm font-bold text-success">
                      {t.earnings}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-base-200/30">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="heading-secondary">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="collapse collapse-arrow bg-base-100 border border-base-300/50 rounded-xl"
              >
                <input type="radio" name="faq" />
                <div className="collapse-title font-semibold text-sm">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-sm opacity-70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-content relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Teaching?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join our community of instructors and start making an impact
            today. It&apos;s free to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/teach/apply"
              className="btn bg-white text-primary hover:bg-white/90 border-none btn-lg rounded-full px-8 gap-2"
            >
              Start Teaching Today
              <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm opacity-80">
            {[
              "Free to start",
              "No technical skills needed",
              "Earn from day one",
              "Full support team",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <HiOutlineCheck className="w-4 h-4" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}