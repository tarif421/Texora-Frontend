import React from "react";

const Banner = () => {
  return (
    <section className="relative mt-5 w-full h-[60vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
      
      {/* Background Image - optimized with object-center and sublte scale */}
      <img
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
        src="https://i.ibb.co.com/LDQK5Nmb/hero.jpg"
        alt="Texora Garment Production Facility"
      />

      {/* Premium Cinematic Gradients for Maximum Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050b1f]/95 via-[#0b122f]/85 to-transparent"></div>
      {/* Mobile vertical gradient to protect text readability on narrow screens */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b1f]/50 via-transparent to-transparent md:hidden"></div>

      {/* Banner Content Container */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-md sm:max-w-xl md:max-w-2xl text-center md:text-left space-y-3 sm:space-y-4">
          
          <h1 className="text-white font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Where Garment Production <br className="hidden md:block" />
            <span className="text-[#7988d2]">Meets Precision</span>
          </h1>

          <p className="text-[#c6cbec] text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-prose">
            An advanced tracking system for modern factories. Manage orders, track
            production stages in real-time, and ensure timely delivery with
            precision.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Banner;