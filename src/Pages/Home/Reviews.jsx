import React, { use } from "react";

import { EffectCoverflow, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCards from "./ReviewCards";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div>
       <div  className="mb-15 text-center">
        <h1 className="font-bold text-4xl  text-[#384bb4] mt-15 font-serif">
          Customers Feedback
        </h1>
        <p className="text-xs mt-2"> Crafting excellence through the eyes of our customers</p>
      </div>
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 30,
            stretch: "20%",
            depth: 100,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCards review={review}></ReviewCards>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
