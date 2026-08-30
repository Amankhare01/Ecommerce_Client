import React, { useState } from "react";
import Layout from "../../component/Layout/Layout/Layout";
import AdminMenu from "../../component/Layout/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import { FiUserPlus, FiMail, FiPhone, FiMapPin, FiLock, FiUser, FiCheckCircle } from "react-icons/fi";

const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/create-admin", {
        name,
        email: email.trim(),
        password,
        phone,
        address,
      });
      setLoading(false);

      if (data?.success) {
        toast.success(data.message || "New administrator created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
      } else {
        toast.error(data?.message || "Failed to create administrator");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      const errMsg = error.response?.data?.message || "Error creating administrator";
      toast.error(errMsg);
    }
  };

  return (
    <Layout title="Create Admin - Admin Panel">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">
        <AdminMenu />
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-5 mb-6">
            <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
              <FiUserPlus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">Create Administrator</h1>
              <p className="text-xs text-neutral-500">Grant administrator privileges to another team member</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Admin Full Name"
                />
                <FiUser className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

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
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="admin.partner@example.com"
                />
                <FiMail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="+91 9876543210"
                />
                <FiPhone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Office / Work Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Office Location, City, Pincode"
                />
                <FiMapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Initial Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Minimum 6 characters"
                />
                <FiLock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-50"
            >
              <FiCheckCircle className="w-4 h-4" />
              <span>{loading ? "Creating Administrator..." : "Create Administrator Account"}</span>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAdmin;
