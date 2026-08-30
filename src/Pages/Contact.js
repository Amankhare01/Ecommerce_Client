import React, { useState } from 'react';
import Layout from '../component/Layout/Layout/Layout';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiMessageSquare, FiShield, FiUserCheck, FiHelpCircle } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await axios.post("/api/v1/auth/contact", formData);
      setSubmitting(false);

      if (data?.success) {
        toast.success(data.message || "Thank you! Your message has been received.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data?.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitting(false);
      console.error(error);
      const errMsg = error.response?.data?.message || "Error sending message. Please try again.";
      toast.error(errMsg);
    }
  };

  return (
    <Layout title="Contact Us - Ecommerce">
      <div className="space-y-12 py-6 sm:py-10">
        
        {/* Page Header */}
        <section className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <FiMessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Contact Our Team
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            Have questions about an order, delivery, or business partnership? Reach out through our dedicated support channels.
          </p>
        </section>

        {/* Dedicated Email Cards Grid (Admin & User) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* 1. Admin & Business Email Card */}
          <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-neutral-800 text-primary-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <FiShield className="w-3.5 h-3.5" />
                  Admin & Corporate
                </span>
                <span className="text-xs text-neutral-400 font-medium">B2B & Partnerships</span>
              </div>
              <h2 className="text-xl font-bold text-white">Administrator Office</h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                For vendor applications, brand collaborations, bulk supply requests, and official administrative matters.
              </p>
            </div>

            <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl p-4 space-y-2">
              <div className="text-xs text-neutral-400 font-semibold">Official Admin Email:</div>
              <a
                href="mailto:amankhare.aa@gmail.com?subject=Admin%20Inquiry%20-%20Ecommerce"
                className="text-sm sm:text-base font-bold text-white hover:text-primary-300 transition-colors flex items-center gap-2 break-all"
              >
                <FiMail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>amankhare.aa@gmail.com</span>
              </a>
              <div className="text-[11px] text-neutral-400">Average response: Within 4 business hours</div>
            </div>

            <a
              href="mailto:amankhare.aa@gmail.com?subject=Admin%20Inquiry%20-%20Ecommerce"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-sm"
            >
              <FiSend className="w-3.5 h-3.5" />
              <span>Email Administrator</span>
            </a>
          </div>

          {/* 2. Customer Support / User Email Card */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <FiUserCheck className="w-3.5 h-3.5" />
                  Customer Support
                </span>
                <span className="text-xs text-neutral-400 font-medium">Orders & Helpdesk</span>
              </div>
              <h2 className="text-xl font-bold text-neutral-900">User Helpdesk</h2>
              <p className="text-xs text-neutral-500 leading-relaxed">
                For order tracking, returns, cancellations, payment verifications, and general shopper inquiries.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs text-neutral-500 font-semibold">User Support Email:</div>
              <a
                href="mailto:amankhare.aa@gmail.com?subject=Customer%20Support%20Request%20-%20Ecommerce"
                className="text-sm sm:text-base font-bold text-neutral-900 hover:text-primary-600 transition-colors flex items-center gap-2 break-all"
              >
                <FiMail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span>amankhare.aa@gmail.com</span>
              </a>
              <div className="text-[11px] text-neutral-500">Live Support: 9:00 AM – 8:00 PM IST</div>
            </div>

            <a
              href="mailto:amankhare.aa@gmail.com?subject=Customer%20Support%20Request%20-%20Ecommerce"
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-sm"
            >
              <FiSend className="w-3.5 h-3.5" />
              <span>Email Support Team</span>
            </a>
          </div>

        </section>

        {/* 2-Column: Details & Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Phone, Office, and FAQ */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold text-neutral-900">Office & Phone Contact</h3>
            
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase">Direct Helpline</div>
                  <a href="tel:+917800024774" className="text-sm font-bold text-neutral-900 hover:text-primary-600">
                    +91 78000 24774
                  </a>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM IST</p>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-3 flex items-start gap-3.5">
                <div className="w-9 h-9 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase">Headquarters</div>
                  <div className="text-sm font-semibold text-neutral-800">Bkt, Lucknow, Uttar Pradesh</div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Pincode: 226201, India</p>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-3 flex items-start gap-3.5">
                <div className="w-9 h-9 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiClock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase">Operating Schedule</div>
                  <div className="text-xs font-semibold text-neutral-800">Monday to Saturday</div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Sunday: Emergency support only</p>
                </div>
              </div>
            </div>

            {/* Quick Help Card */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-primary-700 text-xs font-bold">
                <FiHelpCircle className="w-4 h-4" />
                <span>Checking on an existing order?</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Log in to your account and open the <strong>Orders</strong> tab in your User Dashboard to view live fulfillment updates.
              </p>
            </div>
          </div>

          {/* Right Column: Send Us a Direct Message Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="border-b border-neutral-100 pb-4 mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Send a Message</h2>
              <p className="text-xs text-neutral-500 mt-1">Submit your message directly and our team will reply to your email.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Order Inquiry, Partnership, Feedback, etc."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-sm transition-colors disabled:opacity-50"
              >
                <FiSend className="w-4 h-4" />
                <span>{submitting ? "Sending..." : "Submit Message"}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Contact;
