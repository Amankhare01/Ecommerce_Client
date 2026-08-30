import React, { useEffect, useState } from 'react';
import AdminMenu from '../../component/Layout/Layout/AdminMenu';
import Layout from '../../component/Layout/Layout/Layout';
import { useAuth } from '../context/Auth';
import axios from '../../api/axios';
import { FiBox, FiFolder, FiShoppingBag, FiDollarSign } from "react-icons/fi";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, orderRes] = await Promise.allSettled([
        axios.get('/api/v1/product/product-count'),
        axios.get('/api/v1/category/get-category'),
        axios.get('/api/v1/auth/all-orders'),
      ]);

      const productCount = prodRes.status === 'fulfilled' ? prodRes.value.data?.total || 0 : 0;
      const categoryCount = catRes.status === 'fulfilled' ? catRes.value.data?.category?.length || 0 : 0;
      const orders = orderRes.status === 'fulfilled' ? orderRes.value.data || [] : [];
      
      let revenue = 0;
      orders.forEach((o) => {
        if (o.payments?.transaction?.amount) {
          revenue += parseFloat(o.payments.transaction.amount);
        } else if (o.products && Array.isArray(o.products)) {
          o.products.forEach((p) => {
            revenue += p.price || 0;
          });
        }
      });

      setStats({
        products: productCount,
        categories: categoryCount,
        orders: orders.length,
        revenue,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching admin dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Layout title="Admin Dashboard - Ecommerce">
      <div className="py-4 space-y-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Admin Sidebar */}
          <div className="md:col-span-1">
            <AdminMenu />
          </div>

          {/* Main Dashboard Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Admin Profile Details */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-neutral-900 mb-3 border-b border-neutral-100 pb-2">
                Administrator Profile
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-400 block">Name</span>
                  <span className="font-semibold text-neutral-800">{auth?.users?.name}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-400 block">Email</span>
                  <span className="font-semibold text-neutral-800">{auth?.users?.email}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-400 block">Phone</span>
                  <span className="font-semibold text-neutral-800">{auth?.users?.phone || 'N/A'}</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500">
                Loading dashboard metrics...
              </div>
            ) : (
              <>
                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-neutral-500 mb-2">
                      <span className="text-xs font-semibold uppercase">Products</span>
                      <FiBox className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-black text-neutral-900">{stats.products}</div>
                  </div>

                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-neutral-500 mb-2">
                      <span className="text-xs font-semibold uppercase">Categories</span>
                      <FiFolder className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-black text-neutral-900">{stats.categories}</div>
                  </div>

                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-neutral-500 mb-2">
                      <span className="text-xs font-semibold uppercase">Orders</span>
                      <FiShoppingBag className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-2xl font-black text-neutral-900">{stats.orders}</div>
                  </div>

                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-neutral-500 mb-2">
                      <span className="text-xs font-semibold uppercase">Revenue</span>
                      <FiDollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-neutral-900">
                      ₹ {stats.revenue.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-neutral-900 mb-4">
                    Recent Customer Orders
                  </h3>
                  {recentOrders.length === 0 ? (
                    <p className="text-sm text-neutral-500">No orders placed yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-neutral-600">
                        <thead className="text-xs uppercase bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                          <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Buyer</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Items</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {recentOrders.map((o, idx) => (
                            <tr key={o._id || idx} className="hover:bg-neutral-50">
                              <td className="px-4 py-3 font-semibold text-neutral-900">{idx + 1}</td>
                              <td className="px-4 py-3">{o?.buyer?.name || 'Customer'}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  o?.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                  o?.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-700'
                                }`}>
                                  {o?.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">{o?.products?.length || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
