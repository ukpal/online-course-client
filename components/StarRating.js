// src/components/StarRating.js
import { HiStar, HiOutlineStar } from "react-icons/hi";

export default function StarRating({ rating, size = "sm", showNumber = true, totalRatings }) {
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex items-center gap-1.5">
      {showNumber && (
        <span className={`font-bold text-warning ${textSizes[size]}`}>
          {rating}
        </span>
      )}
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          const filled = i < Math.floor(rating);
          const halfFilled = !filled && i < rating;

          return filled || halfFilled ? (
            <HiStar key={i} className={`${sizes[size]} text-warning`} />
          ) : (
            <HiOutlineStar key={i} className={`${sizes[size]} text-base-300`} />
          );
        })}
      </div>
      {totalRatings !== undefined && (
        <span className={`opacity-50 ${textSizes[size]}`}>
          ({totalRatings.toLocaleString()})
        </span>
      )}
    </div>
  );
}