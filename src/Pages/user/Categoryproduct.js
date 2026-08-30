import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import ProductCard from '../../component/ProductCard';

const Categoryproduct = () => {
    const params = useParams();
    const [products, setproduct] = useState([]);
    const [category, setcategory] = useState();

    useEffect(() => {
        if (params?.slug) getproductbycategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.slug]);

    const getproductbycategory = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setproduct(data?.products);
            setcategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={`Category - ${category?.name || 'Products'}`}>
            <div className="py-6 space-y-6">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                        {category?.name || 'Category Products'}
                    </h1>
                    <p className="text-sm text-neutral-500 font-medium">
                        {products?.length || 0} product(s) found in this category
                    </p>
                </div>

                {products?.length === 0 ? (
                    <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500 shadow-sm max-w-md mx-auto">
                        No products available in this category yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {products?.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Categoryproduct;
