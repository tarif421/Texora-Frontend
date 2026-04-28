import React from "react";

const Card = ({ product }) => {
  const {
    productImage,
    productName,
    description,
    price,
    category,
    availableQuantity,
  } = product;
  return <>
    <div className="   p-2 bg-base-100 shadow-md rounded-xl mt-2">
      {/* Image */}
      <figure className="relative h-56 overflow-hidden rounded-t-xl">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full  object-cover"
        />

        {/* Category badge */}
        <span className="absolute top-3 right-3 badge bg-[#192586] text-[#ffffff] text-xs">
          {category}
        </span>
      </figure>

      {/* Content */}
      <div className="card-body p-2">
        <h2 className="card-title text-[#192586]  h-[40px] overflow-hidden font-bold">
          {productName}
        </h2>

        <p className="text-sm text-start text-gray-500 h-[40px] overflow-hidden">{description}</p>

        {/* Price & stock */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-[#5c6dc9] font-bold text-lg ">
            price: ${price}
          </span>

          <span className="text-xs text-gray-500">
            Stock: {availableQuantity}
          </span>
        </div>

        {/* Button */}
        <button className="btn bg-[#5c6dc9] text-[#ffffff] w-full mt-4">
          View Details →
        </button>
      </div>

      
    </div>
    
  </>;
};

export default Card;
