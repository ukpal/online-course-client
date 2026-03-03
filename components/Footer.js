// src/components/Footer.js
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineMail,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
    { name: "Partnerships", href: "/partnerships" },
  ],
  community: [
    { name: "Teach on LearnHub", href: "/teach" },
    { name: "Affiliate Program", href: "/affiliate" },
    { name: "Student Stories", href: "/stories" },
    { name: "Forums", href: "/forums" },
    { name: "Scholarships", href: "/scholarships" },
  ],
  resources: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Mobile App", href: "/app" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook", color: "hover:text-blue-500" },
  { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  { icon: FaGithub, href: "#", label: "GitHub", color: "hover:text-gray-900" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated with LearnHub
              </h3>
              <p className="opacity-70 max-w-md">
                Subscribe to our newsletter for the latest courses, tips, and
                exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 focus:border-primary"
                />
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
              </div>
              <button className="btn btn-primary shrink-0">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <HiOutlineAcademicCap className="w-7 h-7 text-primary-content" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-primary">Learn</span>
                <span>Hub</span>
              </span>
            </Link>
            <p className="opacity-70 mb-6 max-w-xs text-sm leading-relaxed">
              Empowering millions of learners worldwide with top-quality online
              education. Learn new skills, advance your career, and explore your
              passions.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Community
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-60">
              © {new Date().getFullYear()} LearnHub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <select className="select select-sm bg-white/10 border-white/20 text-sm min-h-0 h-8">
                <option>🌐 English</option>
                <option>🇪🇸 Español</option>
                <option>🇫🇷 Français</option>
                <option>🇩🇪 Deutsch</option>
                <option>🇮🇳 हिन्दी</option>
              </select>
              <span className="text-sm opacity-60">Made with ❤️ for learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}