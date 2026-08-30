import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout/Layout";
import Usermenu from "../../component/Layout/Layout/Usermenu";
import axios, { API_BASE } from "../../api/axios";
import { useAuth } from "../context/Auth";
import moment from "moment";

const Orders = () => {
  const [orders, setorders] = useState([]);
  const [auth] = useAuth();

  const getorders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setorders(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getorders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders - Ecommerce">
      <div className="py-4 space-y-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Your Orders
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-1">
            <Usermenu />
          </div>

          <div className="md:col-span-3 space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500 shadow-sm">
                You haven't placed any orders yet.
              </div>
            ) : (
              orders.map((o, i) => (
                <div key={o._id || i} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm space-y-4 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3 text-xs text-neutral-500">
                    <div>
                      <span className="font-semibold text-neutral-800">Order #{i + 1}</span>
                      <span className="ml-2">({moment(o?.createdAt).fromNow()})</span>
                    </div>
                    <div>
                      Status:{" "}
                      <span className={`font-semibold px-2.5 py-0.5 rounded-full ${
                        o?.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        o?.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {o?.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Products List */}
                  <div className="space-y-3">
                    {o?.products?.map((p) => (
                      <div key={p._id} className="flex items-center gap-4 text-sm">
                        <img
                          src={`${API_BASE}/api/v1/product/photo-category/${p._id}`}
                          alt={p.name}
                          className="w-16 h-16 object-cover rounded-xl border border-neutral-100 bg-neutral-50"
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

export default Orders;
