import React from 'react';
import Layout from '../component/Layout/Layout/Layout';
import { useSearch } from './context/Search';
import ProductCard from '../component/ProductCard';

const Searchx = () => {
  const [values] = useSearch();

  return (
    <Layout title="Search Results - Ecommerce">
      <div className="py-6 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Search Results
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            {values?.result?.length < 1
              ? 'No products matched your query.'
              : `Found ${values.result.length} matching product(s)`}
          </p>
        </div>

        {values?.result?.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500 shadow-sm max-w-md mx-auto">
            Try searching with different keywords.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {values?.result?.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Searchx;
