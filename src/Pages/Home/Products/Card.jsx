import React from "react";
import { Link } from "react-router";

const Card = ({ product }) => {
  const {
    productImage,
    productName,
    description,
    price,
    category,
    availableQuantity,
  } = product;
  return (
    <>
    <div className="bg-base-100 lg:mx-7 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition flex flex-col h-full">

  {/* Image */}
  <figure className="relative h-24 sm:h-32 md:h-40 overflow-hidden">
    <img
      src={productImage}
      alt={productName}
      className="w-full h-full object-cover"
    />

    <span className="absolute top-1 right-1 sm:top-2 sm:right-2 px-2 py-[2px] text-[10px] sm:text-xs bg-[#192586] text-white rounded-full">
      {category}
    </span>
  </figure>

  {/* Content */}
  <div className="p-2  sm:p-3 flex flex-col gap-1 flex-grow">

    <h2 className="text-xs sm:text-sm md:text-base font-bold text-[#192586] line-clamp-2">
      {productName}
    </h2>

    <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
      {description}
    </p>

    <div className="flex justify-between items-center mt-1">
      <span className="text-[#5c6dc9] font-semibold text-[11px] sm:text-sm md:text-base">
        <p>Price: ${price} </p>
      </span>

      <span className="text-[10px] sm:text-xs text-gray-500">
        <p>stock:  {availableQuantity}</p>
      </span>
    </div>

    {/* ✅ Button always bottom */}
    <Link to={`/Details/${product._id}`} className="mt-auto">
      <button className="btn btn-xs sm:btn-sm bg-[#394497] text-white w-full mt-2 rounded-lg">
        View Details
      </button>
    </Link>

  </div>
</div>

    </>
  );
};

export default Card;
