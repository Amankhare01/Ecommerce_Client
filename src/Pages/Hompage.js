import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import Layout from "../component/Layout/Layout/Layout";
import ProductCard from "../component/ProductCard";
import { Prices } from "../component/Layout/Prices";
import { FiFilter, FiRotateCcw } from "react-icons/fi";

const Hompage = () => {
  const [products, setProducts] = useState([]);
  const [category, setcategories] = useState([]);
  const [chacked, setchacked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const getallcategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setcategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallcategories();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setloading(false);
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error(data?.message || "Failed to fetch products");
      }
    } catch (error) {
      setloading(false);
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handlefilter = (value, id) => {
    let all = [...chacked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchacked(all);
  };

  useEffect(() => {
    if (!chacked.length && !radio.length) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chacked.length, radio.length]);

  useEffect(() => {
    if (chacked.length || radio.length) filterproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chacked, radio]);

  const filterproduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", { chacked, radio });
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadmore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setloading(false);
      setProducts((prev) => [...prev, ...(data?.products || [])]);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const resetFilters = () => {
    setchacked([]);
    setRadio([]);
    getAllProducts();
  };

  return (
    <Layout title={"All Products - Ecommerce"}>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-800 font-medium px-4 py-2.5 rounded-xl shadow-sm hover:bg-neutral-50 transition-colors"
        >
          <FiFilter className="w-4 h-4 text-primary-600" />
          <span>{filterOpen ? "Hide Filters" : "Filter Products"}</span>
          {(chacked.length > 0 || radio.length > 0) && (
            <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {chacked.length + (radio.length ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start">
        
        {/* Sidebar Filters */}
        <aside className={`bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-6 ${filterOpen ? "block" : "hidden md:block"}`}>
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-neutral-900 text-base flex items-center gap-2">
              <FiFilter className="text-primary-600" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <FiRotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="font-semibold text-neutral-800 text-sm mb-3">Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {category?.map((c) => (
                <label key={c._id} className="flex items-center gap-2.5 text-sm text-neutral-600 hover:text-neutral-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chacked.includes(c._id)}
                    onChange={(e) => handlefilter(e.target.checked, c._id)}
                    className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                  />
                  <span className="truncate">{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h4 className="font-semibold text-neutral-800 text-sm mb-3">Price Band</h4>
            <div className="space-y-2">
              {Prices?.map((p) => (
                <label key={p._id} className="flex items-center gap-2.5 text-sm text-neutral-600 hover:text-neutral-900 cursor-pointer">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={JSON.stringify(radio) === JSON.stringify(p.Array)}
                    onChange={() => setRadio(p.Array)}
                    className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                  />
                  <span>{p.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              All Products
            </h1>
            <span className="text-xs sm:text-sm text-neutral-500 font-medium">
              Showing {products.length} product(s)
            </span>
          </div>

          {products.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">
              <p className="text-neutral-500 font-medium mb-3">No products match your selected filters.</p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-xl transition-colors shadow-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {products.length > 0 && products.length < total && (
            <div className="mt-8 text-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setpage(page + 1);
                }}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center font-semibold text-sm text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 px-8 py-3 rounded-xl shadow-sm transition-colors disabled:opacity-50"
              >
                {loading ? "Loading products..." : "Load More Products"}
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Hompage;
