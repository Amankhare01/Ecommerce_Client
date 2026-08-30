import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth.js";
import Layout from "../../component/Layout/Layout/Layout.js";
import { FiShield, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect to admin dashboard
  useEffect(() => {
    if (auth?.token && auth?.users?.role === 1) {
      navigate("/dashboard/admin");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/auth/login", {
        email: email.trim(),
        password,
      });
      setLoading(false);

      if (res && res.data.success) {
        if (res.data.users.role !== 1) {
          toast.error("Access denied: You do not have administrator privileges.");
          return;
        }

        toast.success("Welcome back, Administrator!");
        setAuth({
          ...auth,
          users: res.data.users,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/dashboard/admin");
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      const errMsg = error.response?.data?.message || "Invalid administrator credentials";
      toast.error(errMsg);
    }
  };

  return (
    <Layout title="Administrator Login - Ecommerce">
      <div className="py-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <FiShield className="w-7 h-7 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">Admin Portal</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Restricted access: Authorized administrators only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors"
                  placeholder="admin@example.com"
                />
                <FiMail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-neutral-600 hover:text-neutral-900 font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors"
                  placeholder="••••••••"
                />
                <FiLock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Admin Panel"}</span>
              <FiArrowRight className="w-4 h-4 text-primary-400" />
            </button>
          </form>

          <p className="text-xs text-center text-neutral-500 mt-6 border-t border-neutral-100 pt-4">
            Not an admin?{" "}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">
              Customer Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
