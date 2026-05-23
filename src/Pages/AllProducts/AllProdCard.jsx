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
    <div className="bg-base-100 shadow-sm rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col h-full">

      {/*  Image */}
      <figure className="relative h-28 overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />

        <span className="absolute top-2 right-2 px-2 py-[2px] text-xs bg-[#192586] text-white rounded-full">
          {category}
        </span>
      </figure>

      {/*  Content */}
      <div className="p-2 flex flex-col flex-grow">

        {/* Title */}
        <h2 className="text-xs sm:text-sm font-semibold text-[#192586] line-clamp-2">
          {productName}
        </h2>

        {/* Description */}
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>

        {/* Price + Stock */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#5c6dc9] font-bold text-xs sm:text-sm">
            ${price}
          </span>

          <span className="text-[10px] text-gray-500">
            {availableQuantity} pcs
          </span>
        </div>

        {/*  Button bottom lock */}
        <Link to={`/Details/${product._id}`} className="mt-auto">
          <button className="btn btn-xs bg-[#394497] hover:bg-[#27379b] text-white w-full mt-2 rounded-md transition duration-300">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;