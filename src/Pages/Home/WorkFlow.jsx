import React from "react";

const WorkFlow = () => {
  return (
    <>
      <div >
        <h1 className="font-bold text-4xl  text-center text-[#384bb4] mt-15 font-serif">
          Production Workflow
        </h1>
        <p className="text-xs mt-2 text-center"> Transparent process from order to delivery</p>
      </div>
      <section className="mt-15 grid grid-cols-2 lg:grid-cols-4 gap-6 px-9 ">
        <div className=" flex flex-col bg-[#e0e5fe]  rounded-2xl p-3 ">
          <div className="w-17 h-17 lg:ml-24 md:ml-37   my-4 bg-[#a0aadf] flex justify-center items-center rounded-full p-2">
            <p className="text-3xl text-[#192586]">1</p>
          </div>
          <h2 className="text-xl font-semibold text-[#5c6dc9]">
            Order Placement
          </h2>
          <p className="text-xs">
            Select products and place bulk orders easily
          </p>
        </div>

        <div className=" flex flex-col bg-[#e0e5fe]  rounded-2xl p-3  ">
          <div className="w-17 h-17 lg:ml-24 md:ml-37 my-4 bg-[#a0aadf] flex justify-center items-center rounded-full p-2">
            <p className="text-3xl text-[#192586]">2</p>
          </div>
          <h2 className="text-xl font-semibold text-[#5c6dc9]">Production</h2>
          <p className="text-xs">
            Cutting, sewing, and finishing with realtime updates
          </p>
        </div>

        <div className=" flex flex-col bg-[#e0e5fe]  rounded-2xl p-3 ">
          <div className="w-17 h-17 lg:ml-24 md:ml-37   my-4 bg-[#a0aadf] flex justify-center items-center rounded-full p-2">
            <p className="text-3xl text-[#192586]">3</p>
          </div>
          <h2 className="text-xl font-semibold text-[#5c6dc9]">
            Quality Check
          </h2>
          <p className="text-xs">
            Rigorous inspection to ensure premium quality.
          </p>
        </div>

        <div className=" flex flex-col bg-[#e0e5fe]  rounded-2xl p-3 ">
          <div className="w-17 h-17 lg:ml-24 md:ml-37   my-4 bg-[#a0aadf] flex justify-center items-center rounded-full p-2">
            <p className="text-3xl text-[#192586]">4</p>
          </div>
          <h2 className="text-xl font-semibold text-[#5c6dc9]">Delivery</h2>
          <p className="text-xs">
            Fast shipping with live tracking integration.
          </p>
        </div>
      </section>
    </>
  );
};

export default WorkFlow;
