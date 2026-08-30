import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout/Layout/Layout";
import AdminMenu from "../../component/Layout/Layout/AdminMenu";
import axios, { API_BASE } from "../../api/axios";
import { useAuth } from "../context/Auth";
import moment from "moment";

const AdminOrders = () => {
  const [status] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]);
  const [orders, setorders] = useState([]);
  const [auth] = useAuth();

  const getorders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setorders(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getorders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getorders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Customer Orders - Admin">
      <div className="py-4 space-y-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Manage Customer Orders
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-1">
            <AdminMenu />
          </div>

          <div className="md:col-span-3 space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500 shadow-sm">
                No orders found.
              </div>
            ) : (
              orders.map((o, i) => (
                <div key={o._id || i} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-3 text-xs">
                    <div>
                      <span className="font-bold text-neutral-900 text-sm">Order #{i + 1}</span>
                      <span className="text-neutral-500 ml-2">by {o?.buyer?.name || 'Customer'}</span>
                      <span className="text-neutral-400 ml-2">• {moment(o?.createdAt).fromNow()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 font-medium">Status:</span>
                      <select
                        value={o?.status}
                        onChange={(e) => handleChange(o._id, e.target.value)}
                        className="bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {status.map((s, idx) => (
                          <option key={idx} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Order Products */}
                  <div className="space-y-3">
                    {o?.products?.map((p) => (
                      <div key={p._id} className="flex items-center gap-4 text-sm">
                        <img
                          src={`${API_BASE}/api/v1/product/photo-category/${p._id}`}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-xl border border-neutral-100 bg-neutral-50"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-neutral-900 truncate">{p.name}</h4>
                          <p className="text-xs text-neutral-500 truncate">{p.description}</p>
                          <span className="text-xs font-bold text-primary-600">₹ {p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
