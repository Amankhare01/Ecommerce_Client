import React from 'react';
import Layout from '../component/Layout/Layout/Layout';
import { Link } from 'react-router-dom';
import { FiAward, FiTruck, FiHeadphones, FiShield, FiUsers, FiTrendingUp, FiShoppingBag, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const stats = [
    { label: "Active Shoppers", value: "50K+", icon: FiUsers },
    { label: "Curated Products", value: "10K+", icon: FiShoppingBag },
    { label: "Delivery Success Rate", value: "99.8%", icon: FiTruck },
    { label: "Customer Satisfaction", value: "4.9 / 5", icon: FiAward },
  ];

  const values = [
    {
      icon: FiShield,
      title: "100% Authentic Quality",
      desc: "Every item in our catalog undergoes multi-point inspection to ensure genuine quality and durability.",
    },
    {
      icon: FiTruck,
      title: "Fast & Insured Delivery",
      desc: "Rapid delivery across the country with real-time package tracking and zero-damage guarantees.",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Dedicated Support",
      desc: "Our responsive customer care team is available around the clock to assist you with orders and inquiries.",
    },
    {
      icon: FiTrendingUp,
      title: "Fair & Transparent Pricing",
      desc: "Direct-from-manufacturer sourcing eliminates middleman markups to give you best-in-market prices.",
    },
  ];

  return (
    <Layout title="About Us - Ecommerce">
      <div className="space-y-16 py-6 sm:py-10">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <FiAward className="w-3.5 h-3.5" />
            Our Story & Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Redefining Online Shopping with <span className="text-primary-600">Trust & Speed</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Founded with a commitment to craftsmanship and customer happiness, we connect discerning shoppers with premium products sourced directly from trusted artisans and manufacturers worldwide.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white border border-neutral-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-500 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </section>

        {/* Story & Commitment Section */}
        <section className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
              Behind The Brand
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Crafted For Shoppers Who Demand the Very Best
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Our journey started with a straightforward realization: online shopping should be seamless, transparent, and exhilarating. We eliminated clutter, complicated checkout flows, and unreliable shipping.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Today, our modern full-stack platform blends bleeding-edge web technology with top-tier product curation. From everyday essentials to premium electronics and designer fashion, each product is handpicked and thoroughly tested.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 font-medium">
                <FiCheckCircle className="text-primary-600 w-4 h-4 flex-shrink-0" />
                <span>Strict quality inspection before dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 font-medium">
                <FiCheckCircle className="text-primary-600 w-4 h-4 flex-shrink-0" />
                <span>Encrypted transactions and secure payments</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 font-medium">
                <FiCheckCircle className="text-primary-600 w-4 h-4 flex-shrink-0" />
                <span>30-day hassle-free replacement guarantee</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-3">
              <div className="inline-block bg-neutral-800 text-neutral-300 text-xs font-semibold px-3 py-1 rounded-full">
                Core Philosophy
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                "Customer satisfaction isn't just a metric — it's our foundational standard."
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Whether you're shopping for yourself or ordering gifts for loved ones, we ensure your purchase arrives on time, impeccably packaged, and exactly as described.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-white">Aman Kharwar</div>
                <div className="text-xs text-neutral-400">Founder & CEO</div>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Browse Catalog &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Why Customers Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Built on four core pillars that elevate your everyday online purchasing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-primary-300 hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-base">{v.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default About;
