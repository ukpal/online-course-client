'use client';

import { useState, useEffect } from 'react';

export default function TrustedBy() {
  const companies = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Spotify", "Adobe"
  ];

  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredIndex((prevIndex) => (prevIndex + 1) % companies.length);
    }, 800);

    return () => clearInterval(interval);
  }, [companies.length]);

  return (
    <section className="py-8 bg-base-200/50 border-y border-base-300/50">
      <div className="container-custom">
        <p className="text-center text-sm font-medium opacity-50 mb-6 uppercase tracking-wider">
          Trusted by employees at leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((company, index) => (
            <span
              key={company}
              className={`text-xl md:text-2xl font-bold transition-opacity duration-300 cursor-default ${
                hoveredIndex === index ? 'opacity-40' : 'opacity-20'
              }`}
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}