import React, { useState } from 'react';
import axios from "../../api/axios";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/Auth.js';
import Layout from '../../component/Layout/Layout/Layout.js';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          users: res.data.users,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <Layout title="Login - Ecommerce">
      <div className="py-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">Welcome Back</h1>
            <p className="text-xs text-neutral-500 mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="••••••••"
              />
              
            </div>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-center text-neutral-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-600 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
