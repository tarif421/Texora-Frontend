import React, { use } from "react";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCards from "./ReviewCards";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Heading */}
      <div className="mb-10 sm:mb-12 md:mb-15 text-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#384bb4] mt-10 sm:mt-12 md:mt-15 font-serif">
          Customers Feedback
        </h1>
        <p className="text-xs sm:text-sm mt-2">
          Crafting excellence through the eyes of our customers
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        
        /* ✅ KEY RESPONSIVE FIX */
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}

        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 0.85,
          slideShadows: true,
        }}

        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper py-6 sm:py-8 md:py-10"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCards review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;