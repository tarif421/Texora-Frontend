import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const {
    productImage,
    productName,
    description,
    price,
    category,
    availableQuantity,
  } = product;

  return (
    <div className="bg-base-100 shadow-sm rounded-lg sm:rounded-xl overflow-hidden hover:shadow-md transition flex flex-col h-full w-full border border-gray-100">

      {/*  Image Section - Exactly same responsive height & overflow logic */}
      <figure className="relative h-16 sm:h-28 md:h-36 lg:h-40 w-full overflow-hidden bg-gray-50">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />

        {/* Category Badge - Hidden on small mobile to prevent layout breaking */}
        <span className="hidden sm:block absolute top-1 right-1 lg:top-2 lg:right-2 px-2 py-[2px] text-[9px] lg:text-xs bg-[#192586] text-white rounded-full">
          {category}
        </span>
      </figure>

      {/*  Content Section */}
      <div className="p-1.5 sm:p-3 flex flex-col flex-grow gap-0.5 sm:gap-1">

        {/* Title - Strict sizing and clamping */}
        <h2 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-[#5c6dc9] line-clamp-1 sm:line-clamp-2 min-h-[14px] sm:min-h-[32px]">
          {productName}
        </h2>

        {/* Description - Hidden on mobile to keep exact same grid symmetry */}
        <p className="hidden sm:block text-[10px] md:text-xs text-gray-500 line-clamp-1 sm:line-clamp-2">
          {description}
        </p>

        {/* Price & Stock - Perfectly responsive alignment */}
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mt-auto pt-1 border-t border-gray-50 gap-0.5">
          <span className="text-[#5c6dc9] font-bold text-[10px] sm:text-xs md:text-sm lg:text-base">
            ${price}
          </span>
          <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">
            Stock: {availableQuantity}
          </span>
        </div>

        {/*  View Details Button */}
        <Link to={`/Details/${product._id}`} className="w-full mt-1 sm:mt-2">
          <button className="text-[9px] sm:text-xs lg:text-sm font-medium bg-[#394497] hover:bg-[#283175] text-white w-full py-1 sm:py-1.5 md:py-2 rounded md:rounded-lg transition-colors">
            View
          </button>
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;