import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GiRolledCloth } from "react-icons/gi";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <section className="bg-[#1A1A1A] text-white mt-12 px-4 sm:px-6 md:px-10 py-10">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Left */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl">
                <GiRolledCloth />
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-bold">
                Texora
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#c6cbec] mt-4 leading-relaxed">
              Empowering garment factories with digital tools for better
              management, transparency, and efficiency.
            </p>
          </div>

          {/* Center */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Quick Links
            </h2>

            <div className="flex flex-col gap-2 text-sm sm:text-base text-[#c6cbec]">
              <a className="hover:text-white transition" href="">
                Home
              </a>

              <a className="hover:text-white transition" href="">
                All Products
              </a>

              <a className="hover:text-white transition" href="">
                Login
              </a>

              <a className="hover:text-white transition" href="">
                Register
              </a>
            </div>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Contact
            </h2>

            <div className="flex flex-col gap-3 text-sm sm:text-base text-[#c6cbec]">

              <div className="flex items-center gap-2">
                <FaLocationDot className="text-white text-base" />
                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-2">
                <MdEmail className="text-white text-base" />
                <p>texora@gmail.com</p>
              </div>

              <div className="flex items-center gap-2">
                <IoCallSharp className="text-white text-base" />
                <p>+880123837940</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Bottom Footer */}
      <div className="bg-[#111] text-[#c6cbec] text-center py-4 text-xs sm:text-sm">
        © {new Date().getFullYear()} Texora. All rights reserved.
      </div>
    </>
  );
};

export default Footer;