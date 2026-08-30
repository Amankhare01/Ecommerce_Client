import React, { useEffect, useState } from "react";
import Layout from "./component/Layout/Layout/Layout";
import { useAuth } from "./Pages/context/Auth";
import { useCart } from "./Pages/context/Cart";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import axios, { API_BASE } from "./api/axios";
import toast from "react-hot-toast";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";

const Cartpage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

  const totalprice = () => {
    let total = 0;
    try {
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const removeProduct = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance?.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payments", { nonce, cart });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Payment failed. Please try again.");
    }
  };

  return (
    <Layout title="Your Shopping Cart - Ecommerce">
      <div className="py-4">
        {/* Header Title */}
        <div className="mb-6 border-b border-neutral-200 pb-4 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <FiShoppingBag className="text-primary-600" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            {cart?.length
              ? `You have ${cart.length} item(s) in your cart ${
                  auth?.token ? "" : "— Please login to complete checkout"
                }`
              : "Your shopping cart is currently empty."}
          </p>
        </div>

        {cart?.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
            <FiShoppingBag className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-800 mb-2">Your Cart is Empty</h3>
            <p className="text-sm text-neutral-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart?.map((p, index) => (
                <div
                  key={`${p._id}-${index}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                >
                  <div className="w-28 h-28 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-100">
                    <img
                      src={`${API_BASE}/api/v1/product/photo-category/${p._id}`}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-bold text-neutral-900 text-base truncate">{p.name}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 my-1">
                      {p.description}
                    </p>
                    <div className="text-base font-extrabold text-primary-600 mt-2">
                      ₹ {p.price}
                    </div>
                  </div>
                  <div className="sm:self-center">
                    <button
                      onClick={() => removeProduct(p._id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Payment Box */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm lg:sticky lg:top-20 space-y-6">
              <h2 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-neutral-900">{totalprice()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between text-base font-bold text-neutral-900">
                  <span>Total Amount</span>
                  <span className="text-primary-600">{totalprice()}</span>
                </div>
              </div>

              {/* Address Section */}
              <div className="border-t border-neutral-100 pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Shipping Address
                </h4>
                {auth?.users?.address ? (
                  <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-2">
                    <p className="font-medium text-neutral-900">{auth.users.name}</p>
                    <p className="line-clamp-2">{auth.users.address}</p>
                    <button
                      onClick={() => navigate("/dashboard/user/profile")}
                      className="text-primary-600 hover:underline font-semibold"
                    >
                      Change Address
                    </button>
                  </div>
                ) : (
                  <div>
                    {auth?.token ? (
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="w-full text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 py-2 rounded-xl transition-colors"
                      >
                        Add Shipping Address
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login", { state: "/cart" })}
                        className="w-full text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200 py-2 rounded-xl transition-colors"
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Braintree Payment Integration */}
              <div className="border-t border-neutral-100 pt-4">
                {!clientToken || !cart?.length || !auth?.token ? (
                  null
                ) : (
                  <div className="space-y-4">
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.users?.address}
                      className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold py-3 rounded-xl shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {loading ? "Processing Payment..." : "Complete Checkout"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cartpage;
