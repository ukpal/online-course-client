// src/app/layout.js
import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/components/Toast";
import { ProgressProvider } from "@/context/ProgressContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "LearnHub - Learn Without Limits",
  description:
    "Discover thousands of online courses taught by expert instructors. Start learning today and unlock your potential with LearnHub.",
  keywords: "online courses, learning, education, web development, data science, design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className="min-h-screen bg-base-100 text-base-content">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ProgressProvider>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </ProgressProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}