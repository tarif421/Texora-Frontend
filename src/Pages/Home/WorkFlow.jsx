import React from "react";

const WorkFlow = () => {
  return (
    <>
      {/* Heading */}
      <div className="px-4">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center text-[#384bb4] mt-10 sm:mt-12 md:mt-15 font-serif">
          Production Workflow
        </h1>
        <p className="text-xs sm:text-sm mt-2 text-center">
          Transparent process from order to delivery
        </p>
      </div>

      {/* Cards */}
      <section className="mt-10 sm:mt-12 md:mt-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-10">
        
        {/* Card 1 */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left bg-[#e0e5fe] rounded-2xl p-4 sm:p-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 my-4 bg-[#a0aadf] flex justify-center items-center rounded-full">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#192586]">1</p>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#5c6dc9]">
            Order Placement
          </h2>
          <p className="text-xs sm:text-sm">
            Select products and place bulk orders easily
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left bg-[#e0e5fe] rounded-2xl p-4 sm:p-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 my-4 bg-[#a0aadf] flex justify-center items-center rounded-full">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#192586]">2</p>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#5c6dc9]">
            Production
          </h2>
          <p className="text-xs sm:text-sm">
            Cutting, sewing, and finishing with realtime updates
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left bg-[#e0e5fe] rounded-2xl p-4 sm:p-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 my-4 bg-[#a0aadf] flex justify-center items-center rounded-full">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#192586]">3</p>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#5c6dc9]">
            Quality Check
          </h2>
          <p className="text-xs sm:text-sm">
            Rigorous inspection to ensure premium quality.
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left bg-[#e0e5fe] rounded-2xl p-4 sm:p-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 my-4 bg-[#a0aadf] flex justify-center items-center rounded-full">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#192586]">4</p>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#5c6dc9]">
            Delivery
          </h2>
          <p className="text-xs sm:text-sm">
            Fast shipping with live tracking integration.
          </p>
        </div>

      </section>
    </>
  );
};

export default WorkFlow;
