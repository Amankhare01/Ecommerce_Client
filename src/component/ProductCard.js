import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Pages/context/Cart';
import { API_BASE } from '../api/axios';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.quantity !== undefined && product.quantity <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success(`${product.name} added to cart`);
  };

  const formattedPrice = (product.price || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const photoUrl = product._id
    ? `${API_BASE}/api/v1/product/photo-category/${product._id}`
    : '/placeholder.png';

  return (
    <div className="group rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full bg-white">
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {isOutOfStock && (
          <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10 shadow-sm">
            Out of Stock
          </span>
        )}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={photoUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/product/${product.slug}`} className="block group-hover:text-primary-600 transition-colors">
            <h3 className="font-bold text-neutral-900 text-xs sm:text-base mb-1 truncate" title={product.name}>
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] sm:text-xs text-neutral-500 mb-2 sm:mb-3 line-clamp-2 min-h-[28px] sm:min-h-[32px]">
            {product.description || 'No description available'}
          </p>
        </div>

        <div>
          <div className="text-sm sm:text-lg font-extrabold text-primary-600 mb-2 sm:mb-3">
            {formattedPrice}
          </div>

          <div className="flex gap-1.5 sm:gap-2 mt-auto">
            <button
              onClick={() => navigate(`/product/${product.slug}`)}
              className="flex-1 text-[11px] sm:text-xs font-medium px-2 sm:px-3 py-1.5 sm:py-2 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              View
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${
                isOutOfStock
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
