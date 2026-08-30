import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout/Layout";
import { useParams } from "react-router-dom";
import axios, { API_BASE } from "../api/axios";
import { useCart } from "./context/Cart";
import toast from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";

const Productdetail = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product || {});
    } catch (error) {
      console.log(error);
    }
  };

  const isOutOfStock = product.quantity !== undefined && product.quantity <= 0;

  const addToCart = () => {
    if (isOutOfStock) return;
    if (product && Object.keys(product).length > 0) {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Item added to cart");
    }
  };

  const formattedPrice = (product.price || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <Layout title={`${product.name || 'Product Details'} - Ecommerce`}>
      <div className="py-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Image Column */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm aspect-square relative">
            {isOutOfStock && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-sm">
                Out of Stock
              </span>
            )}
            {product._id ? (
              <img
                src={`${API_BASE}/api/v1/product/photo-category/${product._id}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                Loading product image...
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              {product?.category?.name && (
                <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-3 tracking-tight">
                {product.name}
              </h1>
              <div className="text-2xl sm:text-3xl font-black text-primary-600 mb-4">
                {formattedPrice}
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h3 className="text-sm font-semibold text-neutral-800 mb-2">Description</h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <button
                onClick={addToCart}
                disabled={isOutOfStock}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-colors shadow-sm ${
                  isOutOfStock
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white"
                }`}
              >
                <FaCartShopping className="w-5 h-5" />
                <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetail;
