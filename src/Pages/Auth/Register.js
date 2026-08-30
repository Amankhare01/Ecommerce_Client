import React, { useState } from 'react';
import axios from "../../api/axios";
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../../component/Layout/Layout/Layout';

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", { name, email, phone, address, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Layout title="Register - Ecommerce">
      <div className="py-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">Create an Account</h1>
            <p className="text-xs text-neutral-500 mt-1">Join our ecommerce platform today</p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="John Doe"
              />
            </div>

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
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Shipping Address
              </label>
              <textarea
                required
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                rows="2"
                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Street address, City, State, Zip"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-colors mt-2"
            >
              Register
            </button>
          </form>

          <p className="text-xs text-center text-neutral-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
