import React from "react";
import {
  ShieldCheck,
  Truck,
  BadgeDollarSign,
  Headset,
} from "lucide-react";

const features = [
  {
    title: "Premium Quality",
    description: "High quality fabrics and trusted production.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description: "Nationwide quick delivery service anytime.",
    icon: Truck,
  },
  {
    title: "Best Pricing",
    description: "Affordable pricing with maximum value.",
    icon: BadgeDollarSign,
  },
  {
    title: "24/7 Support",
    description: "Dedicated customer support whenever needed.",
    icon: Headset,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-24 px-3 sm:px-6 lg:px-8  rounded-3xl">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading Section  */}
        <div className="text-center mb-8 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="font-bold text-xl sm:text-3xl md:text-4xl text-[#384bb4] font-serif">
            Why Choose Us
          </h2>

          <p className="mt-2 text-[11px] sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            We provide premium quality products with trusted service and fast delivery for our valuable customers.
          </p>
        </div>

        {/* 2 Columns on Mobile, 4 Columns on Desktop with tight gaps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-sky-50/50 border border-sky-100/60 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 text-center"
              >
                <div>
                  {/* Icon Container - Workflow এর মতো হোয়াইট গ্লসি ব্যাকগ্রাউন্ড */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-xs border border-sky-100/50 mb-3 sm:mb-5 mx-auto group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-700" />
                  </div>

                  {/* Responsive Title */}
                  <h3 className="text-sm sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2 tracking-tight line-clamp-1 sm:line-clamp-none">
                    {item.title}
                  </h3>

                  {/* Responsive Description - No overlapping */}
                  <p className="text-[11px] sm:text-xs md:text-sm text-black/65 leading-normal sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Bar Indicator */}
                <div className="mt-4 flex justify-center">
                  <div className="h-0.5 sm:h-1 w-8 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-300 group-hover:w-16"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;