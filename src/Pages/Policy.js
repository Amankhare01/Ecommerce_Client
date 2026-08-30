import React, { useState } from 'react';
import Layout from '../component/Layout/Layout/Layout';
import { Link } from 'react-router-dom';
import { FiShield, FiLock, FiFileText, FiRefreshCw, FiCheck, FiMail, FiHelpCircle } from 'react-icons/fi';

const Policy = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: FiShield },
    { id: 'security', label: 'Data & Payment Security', icon: FiLock },
    { id: 'terms', label: 'Terms of Service', icon: FiFileText },
    { id: 'refund', label: 'Returns & Refunds', icon: FiRefreshCw },
  ];

  return (
    <Layout title="Privacy Policy & Terms - Ecommerce">
      <div className="space-y-10 py-6 sm:py-10">
        
        {/* Page Header */}
        <section className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <FiShield className="w-3.5 h-3.5" />
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Privacy Policy & Terms
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            Transparency, data privacy, and customer protection are at the core of everything we build.
          </p>
          <div className="text-xs text-neutral-400 font-medium">
            Last Updated: August 2026 • Version 2.4
          </div>
        </section>

        {/* Tab Selector Bar */}
        <div className="flex justify-center">
          <div className="bg-neutral-100 p-1.5 rounded-2xl flex flex-wrap gap-1 max-w-2xl w-full justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto space-y-8">
          
          {/* TAB 1: Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Privacy Policy</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  How we collect, handle, and safeguard your personal details.
                </p>
              </div>

              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    1. Information We Collect
                  </h3>
                  <p>
                    When you register an account, place an order, or browse our store, we collect necessary information to fulfill your orders and enhance your experience:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600">
                    <li><strong>Account Details:</strong> Name, verified email address, phone number, and delivery address.</li>
                    <li><strong>Order History:</strong> Products purchased, order amounts, tracking IDs, and delivery status.</li>
                    <li><strong>Device & Browsing Data:</strong> IP address, browser type, and session timestamps to prevent fraud.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    2. How We Use Your Information
                  </h3>
                  <p>
                    We process your information strictly for legitimate commercial and operational purposes:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
                      <FiCheck className="text-green-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Processing and shipping your orders directly to your address</span>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
                      <FiCheck className="text-green-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Sending OTP verification codes and critical account alerts</span>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
                      <FiCheck className="text-green-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Preventing unauthorized account access and payment fraud</span>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
                      <FiCheck className="text-green-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Providing responsive customer support and warranty assistance</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    3. No Third-Party Data Selling
                  </h3>
                  <p>
                    We <strong>never sell, rent, or trade</strong> your personal information to third-party marketing companies. Data is only shared with essential logistics partners to deliver your packages.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Data & Payment Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Data & Payment Security</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Industry-leading protocols keeping your transactions and credentials safe.
                </p>
              </div>

              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    1. Bank-Grade Encryption & Tokenized Payments
                  </h3>
                  <p>
                    All credit/debit card transactions are processed through certified Level-1 PCI-DSS compliant gateways (Braintree by PayPal). 
                    <strong> We do not store raw card numbers, CVVs, or bank passwords on our servers.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    2. Cryptographic Password Hashing
                  </h3>
                  <p>
                    All passwords are salted and hashed using industry-standard bcrypt algorithms. No plaintext passwords exist in our databases.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    3. Secure OTP Recovery
                  </h3>
                  <p>
                    Account password resets utilize time-limited 6-digit One-Time Passwords (OTPs) with automated 5-minute database expiry (TTL).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Terms of Service */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Terms of Service</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  User guidelines and store terms governing platform usage.
                </p>
              </div>

              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    1. Account Registration
                  </h3>
                  <p>
                    You are responsible for maintaining the confidentiality of your account login credentials and restricting unauthorized access to your devices.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    2. Product Pricing & Availability
                  </h3>
                  <p>
                    All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to correct typographical pricing errors before shipment.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    3. Prohibited Activities
                  </h3>
                  <p>
                    Users agree not to engage in malicious scraping, denial-of-service attempts, fraudulent order placement, or unauthorized API access.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Returns & Refunds */}
          {activeTab === 'refund' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Returns & Refund Policy</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Our commitment to a transparent and hassle-free return experience.
                </p>
              </div>

              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    1. 30-Day Hassle-Free Returns
                  </h3>
                  <p>
                    If you are not completely satisfied with your order, you may request a return within <strong>30 days of delivery</strong> for items in their original, unwashed, and undamaged condition with tags intact.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    2. Return Pickup & Inspection
                  </h3>
                  <p>
                    Our courier partner will arrange a doorstep pickup from your registered address. Once the item passes quality inspection at our fulfillment center, your refund is initiated immediately.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                    3. Refund Timeline
                  </h3>
                  <p>
                    Refunds are credited back to your original payment method within <strong>5-7 business days</strong> after approval.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Support Help Callout */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiHelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-neutral-900">Have questions about our policies?</h4>
                <p className="text-xs text-neutral-500">Our legal and compliance support team is happy to assist.</p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              <FiMail className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Policy;
