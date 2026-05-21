import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCards = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;

  return (
    <div className="w-full">
      {/* Top Dotted Border */}
      <div className="border-t-2 border-dotted border-primary mb-3 sm:mb-4"></div>

      <div className="card bg-base-200 shadow-sm rounded-2xl p-4 sm:p-6 md:p-8 h-full">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-primary text-2xl sm:text-3xl md:text-4xl opacity-40 mb-3 sm:mb-4" />

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {testimonial}
        </p>

        {/* Middle Dotted Divider */}
        <div className="border-t border-dotted border-primary my-4 sm:my-6"></div>

        {/* User Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary overflow-hidden">
            <img
              src={user_photoURL}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800">
              {userName}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Senior Product Designer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCards;