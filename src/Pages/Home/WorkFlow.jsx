import React from "react";
import { ShoppingCart, Factory, BadgeCheck, Truck } from "lucide-react";

const workflowSteps = [
  {
    id: "01",
    title: "Order Placement",
    description:
      "Select products and place bulk orders easily with a smooth process.",
    icon: ShoppingCart,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Production",
    description:
      "Cutting, sewing, and finishing with real-time production updates.",
    icon: Factory,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Quality Check",
    description:
      "Rigorous inspection to ensure premium export-quality standards.",
    icon: BadgeCheck,
    image:
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Delivery",
    description:
      "Fast shipping with secure packaging and live tracking integration.",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1200&auto=format&fit=crop",
  },
];

const WorkFlow = () => {
  return (
    <section className="   px-3 sm:px-6 lg:px-8  rounded-3xl">
      <div className="max-w-7xl mx-auto ">
        {/* Heading Section */}
        <div className="text-center mt-8 sm:mt-12 md:mt-15 px-4 max-w-3xl mx-auto">
          <h1 className="font-bold text-xl sm:text-3xl md:text-4xl text-[#384bb4] font-serif">
            Production Workflow
          </h1>

          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1.5 sm:mt-2 max-w-xl mx-auto leading-relaxed mb-8">
            A transparent and organized production process from order
            confirmation to final delivery.
          </p>
        </div>

        {/* 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-sky-50/50 border border-sky-100/60 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Image  2-column mobile */}
                  <div className="relative h-28 sm:h-48 md:h-56 lg:h-44 xl:h-52 w-full overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950/10 to-transparent"></div>

                    {/* Smaller Badge for Mobile */}
                    <div className="absolute top-2 right-2 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-sky-700 font-bold text-xs sm:text-lg shadow-xs select-none">
                      {step.id}
                    </div>
                  </div>

                  {/* Card Content with reduced padding on mobile */}
                  <div className="p-3 sm:p-6">
                    {/* Fluid Icon Size */}
                    <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-xs border border-sky-100/50 mb-2 sm:mb-5">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-sky-700" />
                    </div>

                    {/* Title with smaller font to prevent word-wrap breakdown */}
                    <h3 className="text-sm sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2 tracking-tight line-clamp-1 sm:line-clamp-none">
                      {step.title}
                    </h3>

                    {/* Small crisp description text for mobile */}
                    <p className="text-[11px] sm:text-xs md:text-sm text-black/65 leading-normal sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar Container */}
                <div className="px-3 sm:px-6 pb-3 sm:pb-6">
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

export default WorkFlow;
