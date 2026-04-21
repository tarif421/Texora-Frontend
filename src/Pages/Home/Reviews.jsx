import React, { use } from "react";

import { EffectCoverflow, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div>
      <div>
        <h3 className="text-3xl text-center">Review</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          atque optio eligendi asperiores placeat autem excepturi commodi
          voluptas neque ipsa.
        </p>
      </div>
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/abstract-1.jpg" />
          </SwiperSlide>
       
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
