import React from "react";

const Banner = () => {
  return (
    <section className="mt-10 w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] relative">
      
      {/* Background Image */}
      <img
        className="absolute w-full h-full object-cover"
        src="https://i.ibb.co.com/LDQK5Nmb/hero.jpg"
        alt="fabrio"
      />

      {/* bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050b1f]/95 via-[#0b122f]/85 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-[#050b1f]/45 via-[#0b122f]/5 to-transparent"></div>

      {/* banner text */}
      <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-full md:max-w-xl lg:max-w-2xl text-center md:text-left">
          
          <h1 className="text-white font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-tight">
            Where Garment Production <br />
            <span className="text-[#7988d2]">Meets Precision</span>
          </h1>

          <p className="text-[#c6cbec] mt-3 sm:mt-4 text-xs sm:text-sm md:text-base">
            An advance tracking system for modern factories. Manage orders, track
            <br className="hidden sm:block" />
            production stages in real-time, and ensure timely delivery with
            precision.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Banner;