import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { GiRolledCloth } from "react-icons/gi";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <section className="bg-[#1e2238] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Left - Brand & Socials */}
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

            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#c6cbec] hover:text-white text-xl sm:text-2xl transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#c6cbec] hover:text-white text-xl sm:text-2xl transition-all duration-300 transform hover:scale-110"
              >
                <FaXTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#c6cbec] hover:text-white text-xl sm:text-2xl transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#c6cbec] hover:text-white text-xl sm:text-2xl transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Center - Quick Links */}
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

          {/* Right - Contact */}
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