import React from "react";

interface RatingStarsProps {
  rating: number; // A number between 0 and 5, including decimals
  color?: string; // Custom color for the filled stars
  size?: string; // Custom size for the stars (Tailwind CSS size classes or custom values)
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  color = "text-yellow-500",
  size = "w-6 h-6", // Adjust size as necessary for design
}) => {
  // Helper function to render stars
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
            className={`${size} ${color}`} // Apply size and color dynamically
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i - rating < 1 && i - rating > 0) {
        // Half star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="none"
            className={`${size} ${color}`} // Apply size and color dynamically
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="gray" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="gray"
            viewBox="0 0 24 24"
            stroke="none"
            className={`${size}`} // Apply size dynamically for unfilled stars
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return <div className="flex space-x-1">{renderStars()}</div>;
};

export default RatingStars;
