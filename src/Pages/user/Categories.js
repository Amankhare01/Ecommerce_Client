import React from 'react'
import Layout from '../../component/Layout/Layout/Layout'
import { Link } from 'react-router-dom'
import Usecategory from '../../Hooks/Usecategory'

const Categories = () => {
  const categories = Usecategory();
  return (
    <Layout title="All Categories - Ecommerce">
      <div className="py-6 space-y-6 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight text-center">
          Browse Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          {categories?.map((c) => (
            <Link
              key={c._id}
              to={`/category/${c.slug}`}
              className="group bg-white border border-neutral-200 hover:border-primary-500 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              <h3 className="font-bold text-neutral-800 group-hover:text-primary-600 transition-colors text-base">
                {c.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Explore Collection →</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories
