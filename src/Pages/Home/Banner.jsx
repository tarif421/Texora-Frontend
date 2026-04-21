import React from "react";

const Banner = () => {
  return (
    <section className="bg-green-600 w-full h-[350px] relative ">
      {/* Background Image */}
      <img
        className="absolute w-full h-full  "
        src="https://i.ibb.co.com/LDQK5Nmb/hero.jpg"
        alt="fabrio"
      />

      {/* bg gradient */}
      <div className="absolute inset-0  bg-gradient-to-r from-[#050b1f]/95 via-[#0b122f]/85 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-[#050b1f]/45 via-[#0b122f]/5 to-transparent"></div>
      {/* banner text */}
      <div className="absolute  mt-13 p-10  ">
        <h1 className="text-[#ffffff] font-serif text-5xl ">
          Where Garment Production <br />{" "}
          <span className="text-[#7988d2]">Meets Precision</span>
        </h1>
        <p className="text-[#c6cbec] mt-5">
          An advance tracking system for modern factories. Manage orders, track{" "}
          <br />
          production stages in real-time, and ensure timely delivery with
          precision.
        </p>
      </div>
    </section>
  );
};

export default Banner;
