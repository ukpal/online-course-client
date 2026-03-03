// src/app/(main)/login/layout.js
import { Suspense } from "react";

export default function LoginLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}