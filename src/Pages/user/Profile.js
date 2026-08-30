import React, { useState, useEffect } from 'react';
import Layout from '../../component/Layout/Layout/Layout';
import Usermenu from '../../component/Layout/Layout/Usermenu';
import { useAuth } from '../context/Auth';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.users) {
      const { name, email, phone, address } = auth.users;
      setName(name || "");
      setEmail(email || "");
      setPhone(phone || "");
      setAddress(address || "");
    }
  }, [auth?.users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/api/v1/auth/profile', {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error || !data?.success) {
        toast.error(data?.message || "Profile update failed");
      } else {
        setAuth({ ...auth, users: data.updatedUser });
        let ls = localStorage.getItem("auth");
        if (ls) {
          ls = JSON.parse(ls);
          ls.users = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
        }
        setPassword("");
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <Layout title="Your Profile - Ecommerce">
      <div className="py-4 space-y-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          User Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-1">
            <Usermenu />
          </div>

          <div className="md:col-span-3">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl">
              <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-3">
                Update Account Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Enter Your Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address (Disabled)
                  </label>
                  <input
                    type="email"
                    value={email}
                    className="w-full bg-neutral-100 border border-neutral-200 text-neutral-500 text-sm rounded-xl px-3.5 py-2.5 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Leave blank to keep current password"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Enter Phone Number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Shipping Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Enter Shipping Address"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-sm transition-colors mt-2"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
